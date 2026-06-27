export const AUTH_COOKIE = 'byf_admin_token'

export function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production'
  const sameSite = (process.env.COOKIE_SAME_SITE as 'Lax' | 'Strict' | 'None' | undefined) ?? (isProd ? 'None' : 'Lax')

  return {
    httpOnly: true,
    secure: sameSite === 'None' || isProd,
    sameSite,
    path: '/',
    maxAge: 24 * 60 * 60,
  } as const
}
