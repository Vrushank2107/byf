import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { ZodError } from 'zod'
import dotenv from 'dotenv'
import { rateLimit } from './middleware/rateLimit'
import { prisma } from './lib/prisma'
import { validateEnv } from './lib/env'
import { disconnectRedis } from './lib/redis'

dotenv.config()
validateEnv()

const app = new Hono()

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:8080']

app.use('*', secureHeaders())
app.use('*', cors({
  origin: allowedOrigins,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', rateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100,
}))

app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'BYF Backend API' })
})

app.get('/health', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return c.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() })
  } catch {
    return c.json({ status: 'degraded', db: 'disconnected', timestamp: new Date().toISOString() }, 503)
  }
})

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

const port = parseInt(process.env.PORT || '3001')

console.log(`Backend server running on port ${port} (${process.env.NODE_ENV || 'development'})`)

const server = serve({ fetch: app.fetch, port })

async function shutdown(signal: string) {
  console.log(`${signal} received, shutting down gracefully...`)
  await Promise.all([prisma.$disconnect(), disconnectRedis()])
  server.close(() => {
    process.exit(0)
  })
  setTimeout(() => process.exit(1), 10_000)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
