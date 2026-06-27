const REQUIRED_IN_PRODUCTION = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ADMIN_PASSWORD',
] as const

export function validateEnv(): void {
  if (process.env.NODE_ENV !== 'production') return

  const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key])
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`)
    process.exit(1)
  }

  if (!process.env.ALLOWED_ORIGINS) {
    console.warn('WARNING: ALLOWED_ORIGINS is not set — CORS will only allow localhost origins')
  }
}
