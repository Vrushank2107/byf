import { o as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { N as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as loginAdmin, t as checkAdminAuth } from "./admin-auth-CZC2PPnW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-2Rzv6Ifi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [checkingSession, setCheckingSession] = (0, import_react.useState)(true);
	const [isLoggedIn, setIsLoggedIn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		checkAdminAuth().then((authed) => {
			setIsLoggedIn(authed);
			setCheckingSession(false);
		});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		if (await loginAdmin(password)) window.location.href = "/admin/dashboard";
		else {
			setError("Incorrect password");
			setLoading(false);
		}
	};
	if (checkingSession) return null;
	if (isLoggedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin/dashboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-2xl shadow-xl p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold gradient-text mb-2",
						children: "Admin Panel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Enter password to access"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "password",
							className: "block text-sm font-medium mb-2",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							id: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
							placeholder: "Enter admin password",
							required: true
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: loading ? "Logging in..." : "Login"
						})
					]
				})]
			})
		})
	});
}
//#endregion
export { AdminLogin as component };
