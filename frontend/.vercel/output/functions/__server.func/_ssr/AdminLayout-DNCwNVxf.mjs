import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { E as LogOut, F as FolderKanban, G as Calendar, K as Building2, M as Heart, _ as Quote, i as User, j as Image, k as LayoutDashboard, p as Settings, r as Users, s as TrendingUp, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { d as Outlet, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as logoutAdmin } from "./admin-auth-CZC2PPnW.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLayout-DNCwNVxf.js
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var ADMIN_NAV = [
	{
		to: "/admin/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/admin/projects",
		label: "Projects",
		icon: FolderKanban
	},
	{
		to: "/admin/gallery",
		label: "Gallery",
		icon: Image
	},
	{
		to: "/admin/activities",
		label: "Activities",
		icon: Calendar
	},
	{
		to: "/admin/testimonials",
		label: "Testimonials",
		icon: Quote
	},
	{
		to: "/admin/impact-stats",
		label: "Impact Stats",
		icon: TrendingUp
	},
	{
		to: "/admin/leaders",
		label: "Leadership",
		icon: User
	},
	{
		to: "/admin/partners",
		label: "Partners",
		icon: Building2
	},
	{
		to: "/admin/donations",
		label: "Donations",
		icon: Heart
	},
	{
		to: "/admin/messages",
		label: "Messages",
		icon: MessageSquare
	},
	{
		to: "/admin/volunteers",
		label: "Volunteers",
		icon: Users
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
];
function AdminLayout({ children }) {
	const handleLogout = async () => {
		await logoutAdmin();
		window.location.href = "/admin";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-0 z-50 bg-background border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-page",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between h-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-bold gradient-text",
								children: "BYF Admin"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/",
								className: "text-sm text-muted-foreground hover:text-foreground hidden sm:inline",
								children: "View site →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleLogout,
								className: "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Logout"]
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "w-64 shrink-0 hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "sticky top-24 space-y-1",
							children: ADMIN_NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-background transition-colors",
								activeProps: { className: "bg-primary text-primary-foreground" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
							}, item.to))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 min-w-0",
						children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminLayout as t };
