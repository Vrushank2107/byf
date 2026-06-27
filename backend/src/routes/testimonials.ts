import { Hono } from 'hono'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// GET all testimonials
app.get('/', async (c) => {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return c.json(testimonials)
})

// POST create testimonial (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const testimonial = await prisma.testimonial.create({
    data: body
  })
  return c.json(testimonial)
})

// PUT update testimonial (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: body
  })
  return c.json(testimonial)
})

// DELETE testimonial (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.testimonial.delete({
    where: { id }
  })
  return c.json({ success: true })
})

export default app
