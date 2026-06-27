import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as ExternalLink, F as FolderKanban, G as Calendar, K as Building2, M as Heart, S as MessageCircle, _ as Quote, i as User, j as Image, p as Settings, r as Users, s as TrendingUp, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AdminLayout } from "./AdminLayout-DNCwNVxf.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as useGalleryStore, c as useMessagesStore, d as useSettingsStore, f as useTestimonialsStore, i as useDonationsStore, l as usePartnersStore, o as useImpactStatsStore, p as useVolunteersStore, r as useActivitiesStore, s as useLeadersStore, u as useProjectsStore } from "./admin-store-BVt5Ru0H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-6gd87zNN.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const { data: projects, loading: projectsLoading } = useProjectsStore();
	const { data: gallery, loading: galleryLoading } = useGalleryStore();
	const { data: volunteers, loading: volunteersLoading } = useVolunteersStore();
	const { data: messages, loading: messagesLoading } = useMessagesStore();
	const { data: settings, loading: settingsLoading } = useSettingsStore();
	const { data: donations, loading: donationsLoading } = useDonationsStore();
	const { data: activities, loading: activitiesLoading } = useActivitiesStore();
	const { data: testimonials, loading: testimonialsLoading } = useTestimonialsStore();
	const { data: impactStats, loading: impactStatsLoading } = useImpactStatsStore();
	const { data: leaders, loading: leadersLoading } = useLeadersStore();
	const { data: partners, loading: partnersLoading } = usePartnersStore();
	const loading = projectsLoading || galleryLoading || volunteersLoading || messagesLoading || settingsLoading || donationsLoading || activitiesLoading || testimonialsLoading || impactStatsLoading || leadersLoading || partnersLoading;
	const unread = messages.filter((m) => !m.read).length;
	const pendingDonations = donations.filter((d) => d.status === "pending").length;
	const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi ${settings.whatsappName}, this is an update from the BYF admin panel.`)}`;
	const stats = [
		{
			icon: FolderKanban,
			label: "Projects",
			value: projects.length,
			color: "text-primary"
		},
		{
			icon: Image,
			label: "Gallery Photos",
			value: gallery.length,
			color: "text-secondary"
		},
		{
			icon: Calendar,
			label: "Activities",
			value: activities.length,
			color: "text-accent"
		},
		{
			icon: Quote,
			label: "Testimonials",
			value: testimonials.length,
			color: "text-primary"
		},
		{
			icon: TrendingUp,
			label: "Impact Stats",
			value: impactStats.length,
			color: "text-secondary"
		},
		{
			icon: User,
			label: "Leaders",
			value: leaders.length,
			color: "text-accent"
		},
		{
			icon: Building2,
			label: "Partners",
			value: partners.length,
			color: "text-primary"
		},
		{
			icon: Heart,
			label: "Donations",
			value: donations.length,
			color: "text-destructive"
		},
		{
			icon: Users,
			label: "Volunteer Forms",
			value: volunteers.length,
			color: "text-accent"
		},
		{
			icon: MessageSquare,
			label: `Messages (${unread} new)`,
			value: messages.length,
			color: "text-destructive"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold mb-2",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Welcome to the BYF Admin Panel"
			})] }),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
				children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-xl" }, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-7 w-7 ${s.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-bold",
							children: s.value
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium",
						children: s.label
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold mb-4",
				children: "Quick Actions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/projects",
						icon: FolderKanban,
						title: "Manage Projects",
						desc: "Create and manage projects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/gallery",
						icon: Image,
						title: "Gallery",
						desc: "Upload and organize images"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/activities",
						icon: Calendar,
						title: "Activities",
						desc: "Manage activity listings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/donations",
						icon: Heart,
						title: "View Donations",
						desc: `${pendingDonations} pending`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/volunteers",
						icon: Users,
						title: "View Volunteers",
						desc: `${volunteers.length} submission${volunteers.length === 1 ? "" : "s"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/messages",
						icon: MessageSquare,
						title: "View Messages",
						desc: `${unread} unread`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
						to: "/admin/settings",
						icon: Settings,
						title: "Site Settings",
						desc: "Social links, WhatsApp, portfolio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: whatsappUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "bg-card border border-border rounded-xl p-6 hover:border-green-500 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6 text-green-500 mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold mb-1",
								children: "WhatsApp Update"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["Message ", settings.whatsappName]
							})
						]
					})
				]
			})] }),
			settings.founderPortfolioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Founder Portfolio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "View Rukmil Shah's personal portfolio"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: settings.founderPortfolioUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), "Visit Portfolio"]
					})]
				})
			})
		]
	}) });
}
function QuickLink({ to, icon: Icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-1",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: desc
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
