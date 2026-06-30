import { Hono } from 'hono'
import { ZodError } from 'zod'
import { prisma } from './lib/prisma'
import { validateEnv } from './lib/env'
import { getAllowedOrigins, resolveCorsOrigin } from './lib/cors'
import projects from './routes/projects'
import gallery from './routes/gallery'
import events from './routes/events'
import blog from './routes/blog'
import volunteers from './routes/volunteers'
import messages from './routes/messages'
import settings from './routes/settings'
import auth from './routes/auth'
import upload from './routes/upload'
import activities from './routes/activities'
import testimonials from './routes/testimonials'
import impactStats from './routes/impact-stats'
import leaders from './routes/leaders'
import partners from './routes/partners'
import donations from './routes/donations'

validateEnv()

const allowedOrigins = getAllowedOrigins()

const app = new Hono()

// Custom CORS middleware
app.use('*', async (c, next) => {
  const requestOrigin = c.req.header('origin')
  const resolvedOrigin = resolveCorsOrigin(requestOrigin, allowedOrigins)
  
  // Always set CORS headers
  c.header('Access-Control-Allow-Origin', resolvedOrigin || '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Only set credentials if we have a specific origin
  if (resolvedOrigin) {
    c.header('Access-Control-Allow-Credentials', 'true')
    c.header('Vary', 'Origin')
  }
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200)
  }
  
  await next()
})

app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'Baroda Youth Federation Backend API' })
})

app.get('/health', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return c.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() })
  } catch {
    return c.json({ status: 'degraded', db: 'disconnected', timestamp: new Date().toISOString() }, 503)
  }
})

app.route('/api/projects', projects)
app.route('/api/gallery', gallery)
app.route('/api/events', events)
app.route('/api/blog', blog)
app.route('/api/volunteers', volunteers)
app.route('/api/messages', messages)
app.route('/api/settings', settings)
app.route('/api/auth', auth)
app.route('/api/upload', upload)
app.route('/api/activities', activities)
app.route('/api/testimonials', testimonials)
app.route('/api/impact-stats', impactStats)
app.route('/api/leaders', leaders)
app.route('/api/partners', partners)
app.route('/api/donations', donations)

app.onError((err, c) => {
  if (err instanceof ZodError) {
    return c.json({ error: 'Validation failed', details: err.errors }, 400)
  }
  console.error('Unhandled error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app
