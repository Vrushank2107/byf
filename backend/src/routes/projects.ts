import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.enum(['Education', 'WomenEmpowerment', 'CommunityWelfare', 'DisasterRelief', 'CulturalActivities']),
  short: z.string(),
  fullStory: z.string().optional(),
  image: z.string(),
  images: z.array(z.string()).optional(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  progress: z.number().min(0).max(100),
  showInHero: z.boolean().default(false),
})

// GET all projects
app.get('/', async (c) => {
  const data = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return c.json(data)
})

// GET single project by slug
app.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const data = await prisma.project.findUnique({
    where: { slug },
  })
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

// POST create project (admin only)
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const validated = projectSchema.parse(body)

  const data = await prisma.project.create({
    data: validated,
  })

  return c.json(data, 201)
})

// PUT update project (admin only)
app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const validated = projectSchema.partial().parse(body)

  const data = await prisma.project.update({
    where: { id },
    data: validated,
  })

  return c.json(data)
})

// DELETE project (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await prisma.project.delete({
    where: { id },
  })
  return c.json({ success: true })
})

export default app
