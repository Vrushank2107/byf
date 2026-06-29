const TOKEN_KEY = 'baroda_youth_federation_admin_token'

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(TOKEN_KEY)
}
