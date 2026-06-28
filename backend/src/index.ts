import 'dotenv/config'
import { fileURLToPath } from 'node:url'
import { serve } from '@hono/node-server'
import app from './app'
import { prisma } from './lib/prisma'
import { disconnectRedis } from './lib/redis'

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url)
const isVercel = process.env.VERCEL === '1'

if (isMainModule && !isVercel) {
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
}

export default app
