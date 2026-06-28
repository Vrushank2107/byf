import { redirect } from "@tanstack/react-router";
import { api } from "./api";
import { clearAdminToken, getAdminToken, setAdminToken } from "./admin-token";

let sessionCache: { valid: boolean; checkedAt: number } | null = null;
const SESSION_CACHE_MS = 30_000;

export function clearSessionCache(): void {
  sessionCache = null;
}

export async function checkAdminAuth(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (!getAdminToken()) {
    sessionCache = { valid: false, checkedAt: Date.now() };
    return false;
  }

  if (sessionCache && Date.now() - sessionCache.checkedAt < SESSION_CACHE_MS) {
    return sessionCache.valid;
  }

  try {
    const result = await api.checkSession();
    sessionCache = { valid: result.authenticated, checkedAt: Date.now() };
    if (!result.authenticated) clearAdminToken();
    return result.authenticated;
  } catch {
    sessionCache = { valid: false, checkedAt: Date.now() };
    return false;
  }
}

export async function requireAdminAuth(): Promise<void> {
  const authed = await checkAdminAuth();
  if (!authed) {
    throw redirect({ to: "/admin" });
  }
}

export async function loginAdmin(password: string): Promise<boolean> {
  try {
    const result = await api.login(password);
    if (result.success && result.token) {
      setAdminToken(result.token);
      clearSessionCache();
      sessionCache = { valid: true, checkedAt: Date.now() };
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await api.logout();
  } catch {
    // Clear local session state even if the network call fails.
  } finally {
    clearAdminToken();
    clearSessionCache();
  }
}
