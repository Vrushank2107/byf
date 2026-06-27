import { o as __toESM } from "../_runtime.mjs";
import { c as ORG, o as IMG } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { t as PageHero } from "./PageHero-CUOvFO6N.mjs";
import { $ as CircleCheck, S as MessageCircle, T as Mail, m as Send, w as MapPin, y as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CITAehp7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [done, setDone] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [settings, setSettings] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		api.getSettings().then((data) => {
			setSettings(data);
		}).catch((error) => {
			console.error("Failed to fetch settings:", error);
		});
	}, []);
	const org = settings ? {
		name: ORG.name,
		email: settings.email || ORG.email,
		phone: settings.phone || ORG.phone,
		address: settings.address || ORG.address,
		whatsapp: settings.whatsapp || ORG.whatsapp,
		whatsappName: settings.whatsappName || ORG.whatsappName
	} : ORG;
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const fd = new FormData(form);
		setLoading(true);
		try {
			await api.createMessage({
				name: String(fd.get("name") ?? ""),
				email: String(fd.get("email") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				subject: String(fd.get("subject") ?? ""),
				message: String(fd.get("message") ?? "")
			});
			setDone(true);
			form.reset();
			setTimeout(() => setDone(false), 5e3);
		} catch (error) {
			console.error("Failed to send message:", error);
			alert("Failed to send message. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Contact",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["We'd ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
			children: "love to hear from you."
		})] }),
		description: "Partnerships, press, volunteering or just a hello — drop us a note.",
		image: IMG.heroEducation
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-y",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page grid gap-10 lg:grid-cols-[1.1fr_1.4fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: MapPin,
						title: "Visit us",
						body: org.address,
						accent: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: Mail,
						title: "Email",
						body: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "hover:text-primary",
							href: `mailto:${org.email}`,
							children: org.email
						}),
						accent: "secondary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: Phone,
						title: "Call",
						body: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "hover:text-primary",
							href: `tel:${org.phone.replace(/\s/g, "")}`,
							children: org.phone
						}),
						accent: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: MessageCircle,
						title: "WhatsApp",
						body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									org.whatsappName,
									" · ",
									org.phone
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white",
								target: "_blank",
								rel: "noreferrer",
								href: `https://wa.me/${org.whatsapp}?text=${encodeURIComponent("Hi BYF, I'd like to know more.")}`,
								children: "Chat on WhatsApp"
							})]
						}),
						accent: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "BYF Office Location",
							src: "https://www.google.com/maps?q=Vadodara,Gujarat,India&output=embed",
							className: "h-72 w-full",
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "self-start rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-foreground",
						children: "Send a message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "We reply within one working day."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
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
								type: "tel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Subject",
								name: "subject",
								required: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-semibold text-foreground",
							children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-0.5 text-secondary",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "message",
							required: true,
							rows: 5,
							className: "mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading,
						className: "mt-6 inline-flex items-center gap-2 rounded-full gradient-warm px-7 py-3.5 font-display text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed",
						children: [
							loading ? "Sending..." : "Send Message",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						]
					}),
					done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mt-5 flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3 text-sm font-medium text-accent-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-accent" }), "Thanks! Your message is on its way. We'll be in touch soon."]
					})
				]
			})]
		})
	})] });
}
function ContactCard({ icon: Icon, title, body, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${accent === "secondary" ? "bg-secondary text-white" : accent === "accent" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-base text-foreground",
				children: body
			})]
		})]
	});
}
function Field({ label, name, type = "text", required }) {
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
		className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
	})] });
}
//#endregion
export { ContactPage as component };
