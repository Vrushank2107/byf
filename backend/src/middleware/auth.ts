import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AUTH_COOKIE } from '../lib/cookies'

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  return secret
}

export interface AdminPayload extends JwtPayload {
  isAdmin: boolean
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AdminPayload
    if (decoded.isAdmin) {
      return decoded
    }
    return null
  } catch {
    return null
  }
}

export function generateToken(payload: { isAdmin: boolean }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '24h' })
}

export function getTokenFromRequest(c: Context): string | null {
  const cookieToken = getCookie(c, AUTH_COOKIE)
  if (cookieToken) return cookieToken

  const authHeader = c.req.header('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  return null
}

export async function authMiddleware(c: Context, next: Next) {
  const token = getTokenFromRequest(c)

  if (!token) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401)
  }

  const payload = verifyToken(token)

  if (!payload?.isAdmin) {
    return c.json({ error: 'Unauthorized - Invalid token' }, 401)
  }

  c.set('user', payload)
  await next()
}
