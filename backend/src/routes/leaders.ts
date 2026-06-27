import { Hono } from 'hono'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// GET all leaders
app.get('/', async (c) => {
  const leaders = await prisma.leader.findMany({
    orderBy: { order: 'asc' }
  })
  return c.json(leaders)
})

// POST create leader (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const leader = await prisma.leader.create({
    data: body
  })
  return c.json(leader)
})

// PUT update leader (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const leader = await prisma.leader.update({
    where: { id },
    data: body
  })
  return c.json(leader)
})

// DELETE leader (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.leader.delete({
    where: { id }
  })
  return c.json({ success: true })
})

export default app
