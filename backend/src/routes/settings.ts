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
  heroEducation: z.string().optional(),
  heroBlankets: z.string().optional(),
  heroFlood: z.string().optional(),
  heroWomen: z.string().optional(),
  pNotebooks: z.string().optional(),
  pSanitary: z.string().optional(),
  pRotibank: z.string().optional(),
  pJoycation: z.string().optional(),
  blanket: z.string().optional(),
  chappal: z.string().optional(),
  diwali: z.string().optional(),
  diwali2: z.string().optional(),
  diwali3: z.string().optional(),
  flag: z.string().optional(),
  holi: z.string().optional(),
  holi2: z.string().optional(),
  holi3: z.string().optional(),
  joycation1: z.string().optional(),
  donateHeroImage: z.string().optional(),
  aboutHeroImage: z.string().optional(),
  aboutSectionImage: z.string().optional(),
  contactHeroImage: z.string().optional(),
  eventsHeroImage: z.string().optional(),
  blogHeroImage: z.string().optional(),
  volunteerHeroImage: z.string().optional(),
  volunteerFormImage: z.string().optional(),
  galleryHeroImage: z.string().optional(),
  projectsHeroImage: z.string().optional(),
})

// GET site settings
app.get('/', async (c) => {
  const settings = await prisma.siteSettings.findFirst()
  if (!settings) {
    return c.json({ error: 'Settings not found' }, 404)
  }
  return c.json(settings)
})

// PUT update site settings (admin only)
app.put('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  const validated = settingsSchema.strict().parse(body)

  const settings = await prisma.siteSettings.findFirst()
  
  if (settings) {
    const updated = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: validated,
    })
    return c.json(updated)
  } else {
    const created = await prisma.siteSettings.create({
      data: validated,
    })
    return c.json(created, 201)
  }
})

export default app
