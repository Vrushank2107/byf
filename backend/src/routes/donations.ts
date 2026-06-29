import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// Initialize Razorpay (only if keys are available)
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

const donationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  pan: z.string().optional(),
  amount: z.number().min(100),
  fund: z.string(),
  isAnonymous: z.boolean().default(false),
})

// POST create Razorpay order
app.post('/create-order', async (c) => {
  if (!razorpay) {
    return c.json({ error: 'Payment gateway not configured' }, 500)
  }

  const body = await c.req.json()
  const validated = donationSchema.parse(body)

  try {
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: validated.amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      notes: {
        fund: validated.fund,
        donor_email: validated.email,
      },
    })

    // Create pending donation record
    const donation = await prisma.donation.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        pan: validated.pan,
        amount: validated.amount,
        fund: validated.fund,
        status: 'Pending',
        razorpayOrderId: order.id,
        isAnonymous: validated.isAnonymous,
      },
    })

    return c.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      donationId: donation.id,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return c.json({ error: 'Failed to create payment order' }, 500)
  }
})

// POST verify payment and update donation
app.post('/verify', async (c) => {
  const body = await c.req.json()
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, donationId } = body

  try {
    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex')

    if (generatedSignature !== razorpaySignature) {
      return c.json({ error: 'Invalid payment signature' }, 400)
    }

    // Update donation record
    const donation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: 'Completed',
        razorpayPaymentId,
        razorpaySignature,
        receiptNumber: `BARODA-YOUTH-FEDERATION-${Date.now()}`,
        receiptGenerated: true,
      },
    })

    return c.json({ success: true, donation })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return c.json({ error: 'Payment verification failed' }, 500)
  }
})

// POST webhook handler for Razorpay
app.post('/webhook', async (c) => {
  const body = await c.req.json()
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  const signature = c.req.header('x-razorpay-signature')

  if (!webhookSecret || !signature) {
    return c.json({ error: 'Missing webhook secret or signature' }, 400)
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(body))
    .digest('hex')

  if (expectedSignature !== signature) {
    return c.json({ error: 'Invalid webhook signature' }, 400)
  }

  const event = body.event
  const payload = body.payload.payment.entity

  try {
    if (event === 'payment.captured') {
      const donation = await prisma.donation.findFirst({
        where: { razorpayOrderId: payload.order_id },
      })

      if (donation) {
        await prisma.donation.update({
          where: { id: donation.id },
          data: {
            status: 'Completed',
            razorpayPaymentId: payload.id,
            razorpaySignature: signature,
            receiptNumber: `BARODA-YOUTH-FEDERATION-${Date.now()}`,
            receiptGenerated: true,
          },
        })
      }
    } else if (event === 'payment.failed') {
      const donation = await prisma.donation.findFirst({
        where: { razorpayOrderId: payload.order_id },
      })

      if (donation) {
        await prisma.donation.update({
          where: { id: donation.id },
          data: { status: 'Failed' },
        })
      }
    }

    return c.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return c.json({ error: 'Webhook processing failed' }, 500)
  }
})

// GET all donations (admin only)
app.get('/', authMiddleware, async (c) => {
  const data = await prisma.donation.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return c.json(data)
})

// GET single donation (admin only)
app.get('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const data = await prisma.donation.findUnique({
    where: { id },
  })
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

// DELETE donation (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  try {
    await prisma.donation.delete({ where: { id } })
    return c.json({ success: true })
  } catch {
    return c.json({ error: 'Not found' }, 404)
  }
})

export default app
