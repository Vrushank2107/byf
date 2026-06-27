import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const eventSchema = z.object({
  title: z.string(),
  date: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string(),
  upcoming: z.boolean().default(true),
})

// GET all events
app.get('/', async (c) => {
  const data = await prisma.event.findMany({
    orderBy: { date: 'asc' },
  })
  return c.json(data)
})

// GET upcoming events
app.get('/upcoming', async (c) => {
  const data = await prisma.event.findMany({
    where: { upcoming: true },
    orderBy: { date: 'asc' },
  })
  return c.json(data)
})

// POST create event (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const validated = eventSchema.parse(body)

  const data = await prisma.event.create({
    data: validated,
  })

  return c.json(data, 201)
})

// PUT update event (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const validated = eventSchema.partial().parse(body)

  const data = await prisma.event.update({
    where: { id },
    data: validated,
  })

  return c.json(data)
})

// DELETE event (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.event.delete({
    where: { id },
  })
  return c.json({ success: true })
})

export default app
