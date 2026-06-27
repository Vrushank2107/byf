import { Hono } from 'hono'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// GET all impact stats
app.get('/', async (c) => {
  const stats = await prisma.impactStat.findMany({
    orderBy: { order: 'asc' }
  })
  return c.json(stats)
})

// POST create impact stat (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const stat = await prisma.impactStat.create({
    data: body
  })
  return c.json(stat)
})

// PUT update impact stat (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const stat = await prisma.impactStat.update({
    where: { id },
    data: body
  })
  return c.json(stat)
})

// DELETE impact stat (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.impactStat.delete({
    where: { id }
  })
  return c.json({ success: true })
})

export default app
