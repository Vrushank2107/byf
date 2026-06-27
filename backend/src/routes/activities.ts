import { Hono } from 'hono'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// GET all activities
app.get('/', async (c) => {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return c.json(activities)
})

// POST create activity (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const activity = await prisma.activity.create({
    data: body
  })
  return c.json(activity)
})

// PUT update activity (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const activity = await prisma.activity.update({
    where: { id },
    data: body
  })
  return c.json(activity)
})

// DELETE activity (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.activity.delete({
    where: { id }
  })
  return c.json({ success: true })
})

export default app
