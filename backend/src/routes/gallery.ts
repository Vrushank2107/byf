import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const gallerySchema = z.object({
  src: z.string(),
  tag: z.string(),
  alt: z.string().optional().default(''),
})

// GET all gallery items
app.get('/', async (c) => {
  const data = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return c.json(data)
})

// GET gallery items by tag
app.get('/tag/:tag', async (c) => {
  const tag = c.req.param('tag')
  const data = await prisma.gallery.findMany({
    where: { tag },
    orderBy: { createdAt: 'desc' },
  })
  return c.json(data)
})

// POST create gallery item (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const validated = gallerySchema.parse(body)

  const data = await prisma.gallery.create({
    data: validated,
  })

  return c.json(data, 201)
})

// DELETE gallery item (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.gallery.delete({
    where: { id },
  })
  return c.json({ success: true })
})

export default app
