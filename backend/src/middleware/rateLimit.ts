import { Context, Next } from 'hono'
import { getRedis } from '../lib/redis'

interface RateLimitStore {
  count: number
  resetTime: number
}

const memoryStore = new Map<string, RateLimitStore>()

export interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  keyPrefix?: string
}

function getClientIp(c: Context): string {
  const forwarded = c.req.header('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return c.req.header('x-real-ip') || 'unknown'
}

async function checkMemoryLimit(key: string, windowMs: number, maxRequests: number): Promise<boolean> {
  const now = Date.now()
  const record = memoryStore.get(key)

  if (!record || now > record.resetTime) {
    memoryStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) return false

  record.count++
  return true
}

async function checkRedisLimit(key: string, windowMs: number, maxRequests: number): Promise<boolean> {
  const client = await getRedis()
  if (!client) return checkMemoryLimit(key, windowMs, maxRequests)

  const count = await client.incr(key)
  if (count === 1) {
    await client.pexpire(key, windowMs)
  }
  return count <= maxRequests
}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, keyPrefix = 'rate_limit' } = options

  return async (c: Context, next: Next) => {
    const ip = getClientIp(c)
    const key = `${keyPrefix}:${ip}`

    const allowed = await checkRedisLimit(key, windowMs, maxRequests)
    if (!allowed) {
      return c.json({ error: 'Too many requests, please try again later' }, 429)
    }

    await next()
  }
}

setInterval(() => {
  const now = Date.now()
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetTime) {
      memoryStore.delete(key)
    }
  }
}, 60_000)
