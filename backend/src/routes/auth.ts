import { Hono } from 'hono'
import { setCookie, deleteCookie } from 'hono/cookie'
import { z } from 'zod'
import { generateToken, verifyToken, getTokenFromRequest } from '../middleware/auth'
import { AUTH_COOKIE, getCookieOptions } from '../lib/cookies'

const app = new Hono()

const authSchema = z.object({
  password: z.string(),
})

app.post('/login', async (c) => {
  const body = await c.req.json()
  const validated = authSchema.parse(body)

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (!ADMIN_PASSWORD) {
    return c.json({ error: 'Server configuration error' }, 500)
  }

  if (validated.password !== ADMIN_PASSWORD) {
    return c.json({ error: 'Invalid password' }, 401)
  }

  const token = generateToken({ isAdmin: true })
  setCookie(c, AUTH_COOKIE, token, getCookieOptions())

  return c.json({ success: true, token })
})

app.get('/session', async (c) => {
  const token = getTokenFromRequest(c)
  if (!token) {
    return c.json({ authenticated: false })
  }

  const payload = verifyToken(token)
  return c.json({ authenticated: !!payload?.isAdmin })
})

app.post('/logout', async (c) => {
  const { path, secure, sameSite } = getCookieOptions()
  deleteCookie(c, AUTH_COOKIE, { path, secure, sameSite })
  return c.json({ success: true })
})

export default app
