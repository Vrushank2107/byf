import Redis from 'ioredis'

let redis: Redis | null = null
let redisUnavailable = false

export async function getRedis(): Promise<Redis | null> {
  if (!process.env.REDIS_URL || redisUnavailable) return null
  if (redis) return redis

  try {
    const client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
      lazyConnect: true,
    })
    await client.connect()
    await client.ping()
    redis = client
    console.log('Redis connected for rate limiting')
    return redis
  } catch (err) {
    redisUnavailable = true
    console.warn('Redis unavailable, using in-memory rate limiting:', err instanceof Error ? err.message : err)
    return null
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit()
    redis = null
  }
}
