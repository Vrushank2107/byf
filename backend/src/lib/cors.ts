const LOCAL_ORIGINS = ['http://localhost:5173', 'http://localhost:8080'] as const

/** Production frontend — keep in sync with frontend/.env.example VITE_SITE_URL */
const DEFAULT_PRODUCTION_ORIGIN = 'https://baroda-youth-federation.vercel.app'

const VERCEL_ORIGIN = /^https:\/\/[\w.-]+\.vercel\.app$/

export function getAllowedOrigins(): string[] {
  const fromEnv = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)

  const origins = new Set<string>([...LOCAL_ORIGINS, ...fromEnv])

  const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '')
  if (frontendUrl) origins.add(frontendUrl)

  if (process.env.NODE_ENV === 'production') {
    origins.add(DEFAULT_PRODUCTION_ORIGIN)
  }

  return [...origins]
}

export function resolveCorsOrigin(
  requestOrigin: string | undefined,
  allowedOrigins: string[],
): string | undefined {
  if (!requestOrigin) return undefined
  if (allowedOrigins.includes(requestOrigin)) return requestOrigin

  const allowsVercel = allowedOrigins.some((o) => VERCEL_ORIGIN.test(o))
  if (allowsVercel && VERCEL_ORIGIN.test(requestOrigin)) return requestOrigin

  return undefined
}
