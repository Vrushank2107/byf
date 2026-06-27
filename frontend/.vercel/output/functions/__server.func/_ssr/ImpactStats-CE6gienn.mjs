import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImpactStats-CE6gienn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Counter({ value, suffix = "", duration = 1.6 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-50px"
	});
	const [display, setDisplay] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		const start = performance.now();
		let raf = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - start) / (duration * 1e3));
			const eased = 1 - Math.pow(1 - p, 3);
			setDisplay(Math.round(value * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		inView,
		value,
		duration
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
		ref,
		className: "tabular-nums",
		children: [display.toLocaleString("en-IN"), suffix]
	});
}
function ImpactStats() {
	const [stats, setStats] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		api.getImpactStats().then((data) => {
			setStats(data);
			setLoading(false);
		}).catch((error) => {
			console.error("Failed to fetch impact stats:", error);
			setLoading(false);
		});
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative -mt-14 z-20 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-3xl border border-border bg-card p-6 md:p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-16 mx-auto bg-muted rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-20 mx-auto bg-muted rounded" })]
					}, i))
				})
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative -mt-14 z-20 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				className: "rounded-3xl border border-border bg-card p-6 shadow-glow md:p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5",
					children: stats.map((s, idx) => {
						let numericValue = 0;
						const valueStr = String(s.value).toUpperCase();
						if (valueStr.includes("K")) numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, "")) * 1e3;
						else if (valueStr.includes("L")) numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, "")) * 1e5;
						else if (valueStr.includes("CR")) numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, "")) * 1e7;
						else numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, ""));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								delay: idx * .07,
								duration: .5
							},
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `font-display text-3xl font-bold leading-none md:text-4xl ${s.color === "secondary" ? "text-secondary" : s.color === "accent" ? "text-accent" : "text-primary"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									value: numericValue || 0,
									suffix: s.suffix || ""
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm md:normal-case md:tracking-normal",
								children: s.label
							})]
						}, s.id);
					})
				})
			})
		})
	});
}
//#endregion
export { ImpactStats as t };
