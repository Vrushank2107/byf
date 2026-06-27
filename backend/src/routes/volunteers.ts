import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const volunteerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  skills: z.string(),
  availability: z.string(),
  resumeName: z.string().optional(),
  resumeUrl: z.string().optional(),
})

// GET all volunteer submissions (admin only)
app.get('/', authMiddleware, async (c) => {
  const data = await prisma.volunteer.findMany({
    orderBy: { submittedAt: 'desc' },
  })
  return c.json(data)
})

// POST create volunteer submission (public)
app.post('/', async (c) => {
  const body = await c.req.json()
  const validated = volunteerSchema.parse(body)

  const data = await prisma.volunteer.create({
    data: validated,
  })

  return c.json(data, 201)
})

// PUT mark as reviewed (admin only)
app.put('/:id/review', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.volunteer.update({
    where: { id },
    data: { reviewed: true },
  })
  return c.json({ success: true })
})

// DELETE volunteer submission (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.volunteer.delete({
    where: { id },
  })
  return c.json({ success: true })
})

export default app
