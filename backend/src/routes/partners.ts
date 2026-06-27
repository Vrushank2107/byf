import { Hono } from 'hono'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// GET all partners
app.get('/', async (c) => {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' }
  })
  return c.json(partners)
})

// POST create partner (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const partner = await prisma.partner.create({
    data: body
  })
  return c.json(partner)
})

// PUT update partner (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const partner = await prisma.partner.update({
    where: { id },
    data: body
  })
  return c.json(partner)
})

// DELETE partner (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.partner.delete({
    where: { id }
  })
  return c.json({ success: true })
})

export default app
