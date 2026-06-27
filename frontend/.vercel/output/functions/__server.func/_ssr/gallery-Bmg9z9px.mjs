import { o as __toESM } from "../_runtime.mjs";
import { a as GALLERY_TAGS, o as IMG } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as PageHero } from "./PageHero-CUOvFO6N.mjs";
import { H as ChevronRight, U as ChevronLeft, n as X } from "../_libs/lucide-react.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-Bmg9z9px.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const [tag, setTag] = (0, import_react.useState)("All");
	const [openIdx, setOpenIdx] = (0, import_react.useState)(null);
	const [gallery, setGallery] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		api.getGallery().then((data) => {
			setGallery(data);
			setLoading(false);
		}).catch((error) => {
			console.error("Failed to fetch gallery:", error);
			setLoading(false);
		});
	}, []);
	const visible = (0, import_react.useMemo)(() => tag === "All" ? [...gallery] : gallery.filter((g) => g.tag === tag), [tag, gallery]);
	(0, import_react.useEffect)(() => {
		if (openIdx === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpenIdx(null);
			if (e.key === "ArrowRight") setOpenIdx((i) => i === null ? null : (i + 1) % visible.length);
			if (e.key === "ArrowLeft") setOpenIdx((i) => i === null ? null : (i - 1 + visible.length) % visible.length);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [openIdx, visible.length]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Gallery",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Moments from ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
			children: "the ground."
		})] }),
		description: "Real photos from our events. Tap any image for fullscreen.",
		image: IMG.diwali3
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-y",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-2 mb-10",
				children: GALLERY_TAGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-20 rounded-full" }, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]",
				children: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-4 w-full aspect-[4/3] rounded-2xl" }, i))
			})]
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Gallery",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Moments from ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
				children: "the ground."
			})] }),
			description: "Real photos from our events. Tap any image for fullscreen.",
			image: IMG.diwali3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-center gap-2",
					children: GALLERY_TAGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTag(t),
						className: `rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${tag === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary hover:text-primary"}`,
						children: t
					}, t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]",
					children: visible.map((g, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						layout: true,
						initial: {
							opacity: 0,
							scale: .97
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .35,
							delay: idx % 8 * .03
						},
						onClick: () => setOpenIdx(idx),
						className: "group mb-4 block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: g.src,
								alt: g.alt,
								loading: "lazy",
								className: "w-full object-cover transition-transform duration-500 group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary",
									children: g.tag
								})
							})]
						})
					}, g.id + idx))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4",
			onClick: () => setOpenIdx(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Close",
					onClick: () => setOpenIdx(null),
					className: "absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Previous",
					onClick: (e) => {
						e.stopPropagation();
						setOpenIdx((i) => i === null ? null : (i - 1 + visible.length) % visible.length);
					},
					className: "absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Next",
					onClick: (e) => {
						e.stopPropagation();
						setOpenIdx((i) => i === null ? null : (i + 1) % visible.length);
					},
					className: "absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					src: visible[openIdx].src,
					alt: visible[openIdx].alt,
					className: "max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-glow",
					onClick: (e) => e.stopPropagation()
				}, visible[openIdx].id)
			]
		}) })
	] });
}
//#endregion
export { GalleryPage as component };
