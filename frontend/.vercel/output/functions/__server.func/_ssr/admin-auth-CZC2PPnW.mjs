import { t as api } from "./api-pAUbCncO.mjs";
import { D as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-CZC2PPnW.js
var sessionCache = null;
var SESSION_CACHE_MS = 3e4;
function clearSessionCache() {
	sessionCache = null;
}
async function checkAdminAuth() {
	if (typeof window === "undefined") return false;
	if (sessionCache && Date.now() - sessionCache.checkedAt < SESSION_CACHE_MS) return sessionCache.valid;
	try {
		const result = await api.checkSession();
		sessionCache = {
			valid: result.authenticated,
			checkedAt: Date.now()
		};
		return result.authenticated;
	} catch {
		sessionCache = {
			valid: false,
			checkedAt: Date.now()
		};
		return false;
	}
}
async function requireAdminAuth() {
	if (!await checkAdminAuth()) throw redirect({ to: "/admin" });
}
async function loginAdmin(password) {
	try {
		if ((await api.login(password)).success) {
			clearSessionCache();
			sessionCache = {
				valid: true,
				checkedAt: Date.now()
			};
			return true;
		}
		return false;
	} catch (error) {
		console.error("Login failed:", error);
		return false;
	}
}
async function logoutAdmin() {
	try {
		await api.logout();
	} catch {} finally {
		clearSessionCache();
	}
}
//#endregion
export { requireAdminAuth as i, loginAdmin as n, logoutAdmin as r, checkAdminAuth as t };
