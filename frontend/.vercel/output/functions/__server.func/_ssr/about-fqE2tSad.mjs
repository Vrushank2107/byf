import { o as __toESM } from "../_runtime.mjs";
import { c as ORG, o as IMG, u as TIMELINE } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { t as PageHero } from "./PageHero-CUOvFO6N.mjs";
import { t as SectionHeader } from "./SectionHeader-Dn_NjRVN.mjs";
import { t as ImpactStats } from "./ImpactStats-CE6gienn.mjs";
import { B as ExternalLink, M as Heart, Z as Sparkles, f as ShieldCheck, l as Target, r as Users, z as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-fqE2tSad.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VALUES = [
	{
		icon: ShieldCheck,
		title: "Integrity",
		desc: "Every rupee is tracked. Audited accounts, public reports, zero overhead on most drives."
	},
	{
		icon: Users,
		title: "Community first",
		desc: "We listen before we lead. Programs are designed with beneficiaries, not for them."
	},
	{
		icon: Heart,
		title: "Compassion",
		desc: "Dignity is non-negotiable. We never document people in ways we wouldn't want for ourselves."
	},
	{
		icon: Sparkles,
		title: "Youth energy",
		desc: "Run by people in their 20s and 30s — moving fast, learning faster."
	}
];
function AboutPage() {
	const [leaders, setLeaders] = (0, import_react.useState)([]);
	const [loadingLeaders, setLoadingLeaders] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		api.getLeaders().then((data) => {
			setLeaders(data);
			setLoadingLeaders(false);
		}).catch((error) => {
			console.error("Failed to fetch leaders:", error);
			setLoadingLeaders(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "About Us",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["A decade of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
				children: "grassroots work."
			})] }),
			description: "Baroda Youth Federation started in 2014 with eight students and a single Sunday tuition class. Today we're 450 volunteers running programs across five missions.",
			image: IMG.heroEducation
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-start gap-12 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					className: "relative aspect-[4/5] overflow-hidden rounded-3xl shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: IMG.flag,
						alt: "BYF volunteers with students",
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					align: "left",
					eyebrow: "Our story",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Built by Vadodara, for ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "Vadodara."
					})] }),
					description: "What began as weekend tutoring in two slum pockets is now a city-wide federation reaching thousands of families. We've stayed local, transparent and youth-led on purpose."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-primary text-primary-foreground p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-6 w-6 text-secondary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-lg font-semibold",
								children: "Vision"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-primary-foreground/85",
								children: "A Vadodara where no child goes to bed hungry, cold or uneducated — and where young people lead that change."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-6 w-6 text-secondary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-lg font-semibold text-foreground",
								children: "Mission"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: "Run honest, measurable programs in education, women's health, relief, environment and culture — alongside the people who need them."
							})
						]
					})]
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Core values",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["What we won't ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "compromise on."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4",
					children: VALUES.map((v, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: idx * .06,
							duration: .5
						},
						className: "rounded-3xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-lg font-semibold text-foreground",
								children: v.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: v.desc
							})
						]
					}, v.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Timeline",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Eleven years, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "one block at a time."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto mt-16 max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-12",
						children: TIMELINE.map((t, idx) => {
							const isLeft = idx % 2 === 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: {
									once: true,
									margin: "-80px"
								},
								transition: { duration: .55 },
								className: `relative grid items-center gap-6 pl-12 md:grid-cols-2 md:gap-12 md:pl-0`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-4 top-2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-secondary ring-4 ring-background md:left-1/2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `${isLeft ? "md:order-1 md:text-right" : "md:order-2"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-3xl font-bold text-primary",
												children: t.year
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 font-display text-xl font-semibold text-foreground",
												children: t.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-muted-foreground",
												children: t.desc
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `${isLeft ? "md:order-2" : "md:order-1"} hidden md:block` })
								]
							}, t.year);
						})
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Leadership",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The people ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "behind BYF."
					})] }),
					description: "A core team of six leads, supported by 8 program coordinators and 450+ active volunteers."
				}), loadingLeaders ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3",
					children: [
						1,
						2,
						3,
						4,
						5,
						6
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-20 bg-muted rounded-2xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-3/4 bg-muted rounded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 bg-muted rounded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full bg-muted rounded" })
						]
					}, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3",
					children: leaders.map((p, idx) => {
						const isFounder = p.role.toLowerCase().includes("founder");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								delay: idx * .06,
								duration: .5
							},
							className: "rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 place-items-center rounded-2xl gradient-hero font-display text-2xl font-bold text-white",
									children: p.name.split(" ").map((n) => n[0]).join("")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 font-display text-lg font-semibold text-foreground",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-secondary",
									children: p.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: p.bio
								}),
								isFounder && ORG.founderPortfolioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: ORG.founderPortfolioUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5",
									children: ["View Founder's Portfolio ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
								})
							]
						}, p.id);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pb-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactStats, {})
		})
	] });
}
//#endregion
export { AboutPage as component };
