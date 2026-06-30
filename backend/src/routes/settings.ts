import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const donationFundSchema = z.object({
  slug: z.string(),
  title: z.string(),
  desc: z.string(),
  raised: z.number(),
  goal: z.number(),
  accent: z.enum(["primary", "secondary", "accent"]),
})

const settingsSchema = z.object({
  email: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  whatsappName: z.string(),
  address: z.string(),
  instagram: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  youtube: z.string(),
  founderPortfolioUrl: z.string().optional(),
  donationFunds: z.array(donationFundSchema).optional().default([]),
  donateHeroImage: z.string().nullable().optional(),
  aboutHeroImage: z.string().nullable().optional(),
  aboutSectionImage: z.string().nullable().optional(),
  contactHeroImage: z.string().nullable().optional(),
  eventsHeroImage: z.string().nullable().optional(),
  blogHeroImage: z.string().nullable().optional(),
  volunteerHeroImage: z.string().nullable().optional(),
  volunteerFormImage: z.string().nullable().optional(),
  galleryHeroImage: z.string().nullable().optional(),
  projectsHeroImage: z.string().nullable().optional(),
})

// GET site settings
app.get('/', async (c) => {
  const settings = await prisma.siteSettings.findFirst()
  if (!settings) {
    return c.json({ error: 'Settings not found' }, 404)
  }
  return c.json(settings)
})

// Partial schema for updates (all fields optional)
const partialSettingsSchema = settingsSchema.partial()

// PUT update site settings (admin only)
app.put('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const validated = partialSettingsSchema.parse(body)

  const settings = await prisma.siteSettings.findFirst()
  
  if (settings) {
    const updated = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: validated,
    })
    return c.json(updated)
  } else {
    // For creation, require all fields
    const fullValidated = settingsSchema.parse(body)
    const created = await prisma.siteSettings.create({
      data: fullValidated,
    })
    return c.json(created, 201)
  }
})

export default app
