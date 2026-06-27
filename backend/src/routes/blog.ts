import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const blogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  date: z.string(),
  image: z.string(),
  read: z.string(),
  content: z.string().optional(),
})

// GET all blog posts
app.get('/', async (c) => {
  const data = await prisma.blog.findMany({
    orderBy: { date: 'desc' },
  })
  return c.json(data)
})

// GET single blog post by slug
app.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const data = await prisma.blog.findUnique({
    where: { slug },
  })
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

// POST create blog post (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const validated = blogSchema.parse(body)

  const data = await prisma.blog.create({
    data: validated,
  })

  return c.json(data, 201)
})

// PUT update blog post (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const validated = blogSchema.partial().parse(body)

  const data = await prisma.blog.update({
    where: { id },
    data: validated,
  })

  return c.json(data)
})

// DELETE blog post (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.blog.delete({
    where: { id },
  })
  return c.json({ success: true })
})

export default app
