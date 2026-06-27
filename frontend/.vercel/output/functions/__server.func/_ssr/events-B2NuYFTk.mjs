import { o as __toESM } from "../_runtime.mjs";
import { o as IMG, r as EVENTS } from "./site-data-3zwADvDn.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { t as PageHero } from "./PageHero-CUOvFO6N.mjs";
import { G as Calendar, w as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-B2NuYFTk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	const [tab, setTab] = (0, import_react.useState)("upcoming");
	const list = EVENTS.filter((e) => tab === "upcoming" ? e.upcoming : !e.upcoming);
	const monthLabel = (iso) => {
		const d = new Date(iso);
		return {
			day: d.getDate(),
			month: d.toLocaleString("en-US", { month: "short" })
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Events",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Show up. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
			children: "Be the change."
		})] }),
		description: "From notebook drives to festival celebrations — every event is open to volunteers and donors.",
		image: IMG.flag
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-y",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex w-fit items-center rounded-full border border-border bg-card p-1.5 shadow-soft",
				children: ["upcoming", "past"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(t),
					className: `rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${tab === t ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`,
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: list.map((ev, idx) => {
					const { day, month } = monthLabel(ev.date);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: idx * .05,
							duration: .45
						},
						className: "group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/10] overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: ev.image,
									alt: ev.title,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-4 top-4 grid h-16 w-16 place-items-center rounded-2xl bg-white text-center shadow-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-2xl font-bold leading-none text-primary",
										children: day
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: month
									})] })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground",
									children: ev.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: ev.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }), new Date(ev.date).toLocaleDateString("en-IN", {
											day: "numeric",
											month: "long",
											year: "numeric"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-secondary" }), ev.location]
									})]
								}),
								ev.upcoming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
									children: "Register Interest"
								})
							]
						})]
					}, ev.title);
				})
			})]
		})
	})] });
}
//#endregion
export { EventsPage as component };
