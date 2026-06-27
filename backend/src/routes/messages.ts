import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const messageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
})

// GET all messages (admin only)
app.get('/', authMiddleware, async (c) => {
  const data = await prisma.message.findMany({
    orderBy: { submittedAt: 'desc' },
  })
  return c.json(data)
})

// POST create message (public)
app.post('/', async (c) => {
  const body = await c.req.json()
  const validated = messageSchema.parse(body)

  const data = await prisma.message.create({
    data: validated,
  })

  return c.json(data, 201)
})

// PUT mark as read (admin only)
app.put('/:id/read', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.message.update({
    where: { id },
    data: { read: true },
  })
  return c.json({ success: true })
})

// DELETE message (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.message.delete({
    where: { id },
  })
  return c.json({ success: true })
})

export default app
