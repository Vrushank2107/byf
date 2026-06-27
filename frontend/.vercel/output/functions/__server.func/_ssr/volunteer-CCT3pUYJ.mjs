import { o as __toESM } from "../_runtime.mjs";
import { o as IMG } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { t as PageHero } from "./PageHero-CUOvFO6N.mjs";
import { t as SectionHeader } from "./SectionHeader-Dn_NjRVN.mjs";
import { $ as CircleCheck, Z as Sparkles, a as Upload, b as Network, q as Award, s as TrendingUp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/volunteer-CCT3pUYJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BENEFITS = [
	{
		icon: TrendingUp,
		title: "Real social impact",
		desc: "Hands-on work where your hours translate to meals, books and warm nights."
	},
	{
		icon: Award,
		title: "Certificates",
		desc: "Annual certificates and recommendation letters for college, jobs and visas."
	},
	{
		icon: Network,
		title: "Networking",
		desc: "Build relationships across 450+ peers from every industry in Vadodara."
	},
	{
		icon: Sparkles,
		title: "Leadership growth",
		desc: "Coordinate teams, run events, present to donors — skills you can't learn in class."
	}
];
function VolunteerPage() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const fd = new FormData(form);
		const resume = fd.get("resume");
		setLoading(true);
		try {
			let resumeUrl = void 0;
			if (resume && resume.size > 0) resumeUrl = (await api.uploadImage(resume, "resumes")).url;
			await api.createVolunteer({
				name: String(fd.get("name") ?? ""),
				email: String(fd.get("email") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				address: String(fd.get("address") ?? ""),
				skills: String(fd.get("skills") ?? ""),
				availability: String(fd.get("availability") ?? ""),
				resumeName: resume && resume.size > 0 ? resume.name : void 0,
				resumeUrl
			});
			setSubmitted(true);
			form.reset();
			setTimeout(() => setSubmitted(false), 5e3);
		} catch (error) {
			console.error("Failed to submit volunteer application:", error);
			alert("Failed to submit application. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Volunteer with BYF",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Show up. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
				children: "Change a year."
			})] }),
			description: "No prior experience needed. Just bring time, energy and the willingness to listen first.",
			image: IMG.joycation1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Why volunteer",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["What you'll ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "walk away with."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4",
					children: BENEFITS.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								className: "grid h-12 w-12 place-items-center rounded-2xl gradient-warm text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-lg font-semibold text-foreground",
								children: b.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: b.desc
							})
						]
					}, b.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: IMG.holi2,
							alt: "Volunteers at Holi event",
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-6 bottom-6 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold leading-tight",
								children: "\"This is the most honest team I've ever worked with.\""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-white/85",
								children: "— Kunal T., volunteer since 2019"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					align: "left",
					eyebrow: "Registration",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign up in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "two minutes."
					})] }),
					description: "We'll reach out within 48 hours with your first event invitation."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-8 grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full name",
									name: "name",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									name: "email",
									type: "email",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									name: "phone",
									type: "tel",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "City / Area",
									name: "address",
									required: true
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Skills / interests",
							name: "skills",
							placeholder: "Teaching, design, event ops, driving..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-semibold text-foreground",
							children: "Availability"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "availability",
							required: true,
							className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select availability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Weekends only" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Weekday evenings" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Flexible — anytime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Event-based only" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-semibold text-foreground",
							children: "Resume / CV (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-4 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								name: "resume",
								accept: ".pdf,.doc,.docx",
								className: "block w-full text-sm"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-warm px-7 py-3.5 font-display text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed",
							children: loading ? "Submitting..." : "Submit Application"
						}),
						submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3 text-sm font-medium text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-accent" }), "Thanks! We've received your application — expect to hear from us within 48 hours."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "By submitting you agree to be contacted by BYF about volunteer opportunities. We never share your details."
						})
					]
				})] })]
			})
		})
	] });
}
function Field({ label, name, type = "text", required, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-sm font-semibold text-foreground",
		children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-0.5 text-secondary",
			children: "*"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		name,
		type,
		required,
		placeholder,
		className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
	})] });
}
//#endregion
export { VolunteerPage as component };
