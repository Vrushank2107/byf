import { o as __toESM } from "../_runtime.mjs";
import { c as ORG } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Instagram, C as Menu, M as Heart, R as Facebook, T as Mail, n as X, o as Twitter, t as Youtube, w as MapPin, y as Phone } from "../_libs/lucide-react.mjs";
import { P as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as requireAdminAuth } from "./admin-auth-CZC2PPnW.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B_9_5bi3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CGjS8kC6.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var byf_logo_default = "/assets/byf-logo-93VVTo_r.png";
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/projects",
		label: "Projects"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/volunteer",
		label: "Volunteer"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 shadow-soft backdrop-blur-md"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex h-16 items-center justify-between gap-4 md:h-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-w-0 items-center gap-2.5 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: byf_logo_default,
						alt: `${ORG.name} logo`,
						className: "h-10 w-10 shrink-0 rounded-full object-cover shadow-soft ring-1 ring-border"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-bold tracking-tight text-foreground sm:text-lg",
							children: ORG.short
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block",
							children: "Baroda Youth Federation"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						activeOptions: { exact: item.to === "/" },
						className: "rounded-full px-3.5 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:text-primary data-[status=active]:bg-primary-soft data-[status=active]:text-primary",
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-2 lg:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/donate",
						className: "inline-flex items-center gap-2 rounded-full gradient-warm px-5 py-2.5 text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 fill-current" }), "Donate"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Open menu",
					onClick: () => setOpen((v) => !v),
					className: "grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-foreground lg:hidden",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page pb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-border bg-card p-3 shadow-soft animate-in fade-in slide-in-from-top-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "grid gap-1",
						children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							activeOptions: { exact: item.to === "/" },
							className: "rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary",
							children: item.label
						}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/donate",
							onClick: () => setOpen(false),
							className: "mt-2 inline-flex items-center justify-center gap-2 rounded-xl gradient-warm px-4 py-3 text-sm font-semibold text-white shadow-warm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 fill-current" }), "Donate Now"]
						})]
					})
				})
			})
		})]
	});
}
var COL_LINKS = [
	{
		to: "/about",
		label: "About BYF"
	},
	{
		to: "/projects",
		label: "Our Projects"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/volunteer",
		label: "Volunteer"
	}
];
var COL_PROJECTS = [
	{
		to: "/projects",
		label: "Project Progress",
		hash: "project-progress"
	},
	{
		to: "/projects",
		label: "JoyCation",
		hash: "joycation"
	},
	{
		to: "/projects",
		label: "Sankalp Notebooks",
		hash: "sankalp"
	},
	{
		to: "/projects",
		label: "Flood Relief",
		hash: "flood-relief"
	},
	{
		to: "/projects",
		label: "Roti Bank",
		hash: "roti-bank"
	}
];
function Footer() {
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
		short: ORG.short,
		tagline: ORG.tagline,
		email: settings.email || ORG.email,
		phone: settings.phone || ORG.phone,
		address: settings.address || ORG.address,
		social: {
			instagram: settings.instagram || ORG.social.instagram,
			facebook: settings.facebook || ORG.social.facebook,
			twitter: settings.twitter || ORG.social.twitter,
			youtube: settings.youtube || ORG.social.youtube
		}
	} : ORG;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-24 overflow-hidden bg-foreground text-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary/30 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid items-center gap-6 md:grid-cols-[1fr_auto]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.2em] text-white/70",
								children: org.tagline
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-3xl font-bold text-white md:text-4xl",
								children: "Your contribution feeds, teaches and warms a real family."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/donate",
								className: "inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 fill-current text-secondary" }), "Donate Now"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-12 pb-10 md:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: byf_logo_default,
									alt: `${org.name} logo`,
									className: "h-10 w-10 rounded-xl object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-bold",
									children: org.short
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] uppercase tracking-[0.18em] text-background/60",
									children: org.name
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-sm text-sm leading-relaxed text-background/70",
								children: "A youth-led nonprofit in Vadodara working across education, women's health, disaster relief and rural welfare since 2014."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: [
									{
										href: org.social.instagram,
										Icon: Instagram,
										label: "Instagram"
									},
									{
										href: org.social.facebook,
										Icon: Facebook,
										label: "Facebook"
									},
									{
										href: org.social.twitter,
										Icon: Twitter,
										label: "Twitter / X"
									},
									{
										href: org.social.youtube,
										Icon: Youtube,
										label: "YouTube"
									}
								].map(({ href, Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href,
									"aria-label": label,
									target: "_blank",
									rel: "noreferrer",
									className: "grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-background/80 transition-colors hover:bg-secondary hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								}, label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-sm font-semibold uppercase tracking-[0.16em] text-background/90",
							children: "Quick Links"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3 text-sm text-background/70",
							children: COL_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "hover:text-secondary",
								children: l.label
							}) }, l.label))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-sm font-semibold uppercase tracking-[0.16em] text-background/90",
							children: "Projects"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3 text-sm text-background/70",
							children: COL_PROJECTS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "hover:text-secondary",
								children: l.label
							}) }, l.label))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-sm font-semibold uppercase tracking-[0.16em] text-background/90",
							children: "Contact"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3 text-sm text-background/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: org.address })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${org.email}`,
										className: "hover:text-secondary",
										children: org.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${org.phone.replace(/\s/g, "")}`,
										className: "hover:text-secondary",
										children: org.phone
									})]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-background/60 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						org.name,
						". All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Made with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-secondary",
							children: "♥"
						}),
						" in Vadodara · 80G & 12A registered"
					] })]
				})
			})
		]
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pt-16 md:pt-20",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
/** Trim trailing slash — used for canonical URLs, sitemap, and Open Graph. */
var SITE_URL = "".replace(/\/$/, "");
var DEFAULT_OG_IMAGE = "/og-image.jpg";
var DEFAULT_DESCRIPTION = "BYF is a Vadodara-based youth nonprofit working in education, women's health, disaster relief and rural welfare since 2014.";
var SITEMAP_ENTRIES = [
	{
		path: "/",
		changefreq: "weekly",
		priority: "1.0"
	},
	{
		path: "/about",
		changefreq: "monthly",
		priority: "0.9"
	},
	{
		path: "/projects",
		changefreq: "weekly",
		priority: "0.9"
	},
	{
		path: "/gallery",
		changefreq: "weekly",
		priority: "0.7"
	},
	{
		path: "/events",
		changefreq: "weekly",
		priority: "0.8"
	},
	{
		path: "/blog",
		changefreq: "weekly",
		priority: "0.8"
	},
	{
		path: "/volunteer",
		changefreq: "monthly",
		priority: "0.9"
	},
	{
		path: "/donate",
		changefreq: "monthly",
		priority: "1.0"
	},
	{
		path: "/contact",
		changefreq: "monthly",
		priority: "0.7"
	}
];
function absoluteUrl(path) {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return SITE_URL ? `${SITE_URL}${normalized}` : normalized;
}
function ogImageUrl(path = DEFAULT_OG_IMAGE) {
	return absoluteUrl(path);
}
function createPageSeo({ title, description, path, ogImage = DEFAULT_OG_IMAGE, ogType = "website", noindex = false, keywords, jsonLd }) {
	const url = absoluteUrl(path);
	const image = ogImageUrl(ogImage);
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			...keywords?.length ? [{
				name: "keywords",
				content: keywords.join(", ")
			}] : [],
			{
				name: "robots",
				content: noindex ? "noindex, nofollow" : "index, follow"
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: ogType
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:site_name",
				content: ORG.name
			},
			{
				property: "og:image",
				content: image
			},
			{
				property: "og:image:alt",
				content: `${ORG.name} — ${ORG.tagline}`
			},
			{
				property: "og:locale",
				content: "en_IN"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@BarodaYouth"
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			},
			{
				name: "twitter:image",
				content: image
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}],
		scripts: jsonLd ? [{
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		}] : []
	};
}
function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "NGO",
		name: ORG.name,
		alternateName: ORG.short,
		url: SITE_URL || void 0,
		logo: SITE_URL ? absoluteUrl("/favicon.png") : void 0,
		description: DEFAULT_DESCRIPTION,
		slogan: ORG.tagline,
		foundingDate: "2014",
		email: ORG.email,
		telephone: ORG.phone,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Vadodara",
			addressRegion: "Gujarat",
			addressCountry: "IN"
		},
		sameAs: Object.values(ORG.social)
	};
}
function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: ORG.name,
		url: SITE_URL || void 0,
		description: DEFAULT_DESCRIPTION,
		publisher: {
			"@type": "NGO",
			name: ORG.name
		}
	};
}
function breadcrumbJsonLd(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	};
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page grid min-h-[60vh] place-items-center py-20 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[110px] font-bold leading-none gradient-text",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-2xl font-bold text-foreground",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "The page you're looking for doesn't exist or has been moved."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
				children: "Go home"
			})
		] })
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-semibold text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$25 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${ORG.name} — ${ORG.tagline}` },
			{
				name: "description",
				content: DEFAULT_DESCRIPTION
			},
			{
				name: "author",
				content: ORG.name
			},
			{
				name: "theme-color",
				content: "#1E3A8A"
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				property: "og:title",
				content: `${ORG.name} — ${ORG.tagline}`
			},
			{
				property: "og:description",
				content: DEFAULT_DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: ORG.name
			},
			{
				property: "og:url",
				content: absoluteUrl("/")
			},
			{
				property: "og:image",
				content: ogImageUrl()
			},
			{
				property: "og:image:alt",
				content: `${ORG.name} — ${ORG.tagline}`
			},
			{
				property: "og:locale",
				content: "en_IN"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@BarodaYouth"
			},
			{
				name: "twitter:title",
				content: `${ORG.name} — ${ORG.tagline}`
			},
			{
				name: "twitter:description",
				content: DEFAULT_DESCRIPTION
			},
			{
				name: "twitter:image",
				content: ogImageUrl()
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "canonical",
				href: absoluteUrl("/")
			}
		],
		scripts: [
			{
				src: "https://checkout.razorpay.com/v1/checkout.js",
				async: true
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(organizationJsonLd())
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(websiteJsonLd())
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$25.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: useRouter().state.location.pathname.startsWith("/admin") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$22 = () => import("./volunteer-CCT3pUYJ.mjs");
var Route$24 = createFileRoute("/volunteer")({
	head: () => createPageSeo({
		title: "Volunteer with BYF — One Sunday a month changes a life",
		description: "Join 450+ BYF volunteers. Teach, organise events, drive, design — we have a role for every skill.",
		path: "/volunteer",
		keywords: [
			"volunteer BYF",
			"volunteer Vadodara",
			"NGO volunteer Gujarat"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Volunteer",
			path: "/volunteer"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var Route$23 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const lastmod = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SITEMAP_ENTRIES.map((e) => `  <url>\n    <loc>${absoluteUrl(e.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var Route$22 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async () => {
	const body = `User-agent: *
Allow: /
Disallow: /admin${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml` : ""}
`;
	return new Response(body, { headers: {
		"Content-Type": "text/plain",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$21 = () => import("./projects-CC2dSTlA.mjs");
var Route$21 = createFileRoute("/projects")({
	head: () => createPageSeo({
		title: "Projects — Baroda Youth Federation",
		description: "Education, women's health, disaster relief, community welfare and cultural projects run by BYF in Vadodara.",
		path: "/projects",
		keywords: [
			"BYF projects",
			"education NGO Vadodara",
			"disaster relief Gujarat",
			"women empowerment NGO"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Projects",
			path: "/projects"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./gallery-Bmg9z9px.mjs");
var Route$20 = createFileRoute("/gallery")({
	head: () => createPageSeo({
		title: "Gallery — BYF moments from the ground",
		description: "Photos from BYF events: education, JoyCation, Holi, Diwali, blanket and flood relief drives.",
		path: "/gallery",
		keywords: [
			"BYF gallery",
			"NGO photos Vadodara",
			"community events Gujarat"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Gallery",
			path: "/gallery"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./events-B2NuYFTk.mjs");
var Route$19 = createFileRoute("/events")({
	head: () => createPageSeo({
		title: "Events — Upcoming & past BYF events",
		description: "Join the next BYF event in Vadodara. Notebook drives, blanket distribution, JoyCation, festivals and more.",
		path: "/events",
		keywords: [
			"BYF events",
			"NGO events Vadodara",
			"community drives Gujarat"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Events",
			path: "/events"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./donate-D0y6SktU.mjs");
var Route$18 = createFileRoute("/donate")({
	head: () => createPageSeo({
		title: "Donate to BYF — Every rupee changes a life in Vadodara",
		description: "Donate to Baroda Youth Federation's education, women's empowerment, relief and general funds. 80G tax-deductible.",
		path: "/donate",
		keywords: [
			"donate BYF",
			"charity Vadodara",
			"80G donation Gujarat",
			"nonprofit donation India"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Donate",
			path: "/donate"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./contact-CITAehp7.mjs");
var Route$17 = createFileRoute("/contact")({
	head: () => createPageSeo({
		title: "Contact BYF — Get in touch",
		description: "Reach Baroda Youth Federation by email, phone, WhatsApp or visit our office in Vadodara.",
		path: "/contact",
		keywords: [
			"contact BYF",
			"Baroda Youth Federation phone",
			"Vadodara NGO contact"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Contact",
			path: "/contact"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./blog-DHjFj4F7.mjs");
var Route$16 = createFileRoute("/blog")({
	head: () => createPageSeo({
		title: "Blog — Stories from BYF's grassroots work",
		description: "Success stories, activity reports, community impact and volunteer experiences from Baroda Youth Federation.",
		path: "/blog",
		keywords: [
			"BYF blog",
			"NGO stories Vadodara",
			"community impact Gujarat"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Blog",
			path: "/blog"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin-BZMSnITW.mjs");
var Route$15 = createFileRoute("/admin")({
	head: () => createPageSeo({
		title: "Admin — Baroda Youth Federation",
		description: "BYF admin dashboard.",
		path: "/admin",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	ssr: false
});
var $$splitComponentImporter$14 = () => import("./about-fqE2tSad.mjs");
var Route$14 = createFileRoute("/about")({
	head: () => createPageSeo({
		title: "About BYF — A decade of grassroots work in Vadodara",
		description: "How Baroda Youth Federation started in 2014 and grew into a 450-volunteer movement across education, health, relief and culture.",
		path: "/about",
		keywords: [
			"about BYF",
			"Baroda Youth Federation history",
			"Vadodara NGO",
			"youth nonprofit Gujarat"
		],
		jsonLd: breadcrumbJsonLd([{
			name: "Home",
			path: "/"
		}, {
			name: "About",
			path: "/about"
		}])
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./routes-BlJixdJW.mjs");
var Route$13 = createFileRoute("/")({
	head: () => createPageSeo({
		title: `${ORG.name} — ${ORG.tagline}`,
		description: "Vadodara's youth-led nonprofit. 5,000+ students reached, 50,000+ notebooks, 61,000+ flood beneficiaries. Donate or volunteer today.",
		path: "/",
		keywords: [
			"Baroda Youth Federation",
			"BYF Vadodara",
			"nonprofit Gujarat",
			"donate Vadodara",
			"volunteer Gujarat",
			"youth NGO India"
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.index-2Rzv6Ifi.mjs");
var Route$12 = createFileRoute("/admin/")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	ssr: false
});
var $$splitComponentImporter$11 = () => import("./admin.volunteers-CRZEBIFK.mjs");
var Route$11 = createFileRoute("/admin/volunteers")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$10 = () => import("./admin.testimonials-x_2Q3g3O.mjs");
var Route$10 = createFileRoute("/admin/testimonials")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$9 = () => import("./admin.settings-BeR0RoQw.mjs");
var Route$9 = createFileRoute("/admin/settings")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$8 = () => import("./admin.projects-DzhspqbK.mjs");
var Route$8 = createFileRoute("/admin/projects")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$7 = () => import("./admin.partners-BLIoV281.mjs");
var Route$7 = createFileRoute("/admin/partners")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$6 = () => import("./admin.messages-XAZ7NEj1.mjs");
var Route$6 = createFileRoute("/admin/messages")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$5 = () => import("./admin.leaders-CNdc_s-X.mjs");
var Route$5 = createFileRoute("/admin/leaders")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$4 = () => import("./admin.impact-stats-C18h91PL.mjs");
var Route$4 = createFileRoute("/admin/impact-stats")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$3 = () => import("./admin.gallery-B_aQrj-_.mjs");
var Route$3 = createFileRoute("/admin/gallery")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$2 = () => import("./admin.donations-CHdjnUHD.mjs");
var Route$2 = createFileRoute("/admin/donations")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter$1 = () => import("./admin.dashboard-6gd87zNN.mjs");
var Route$1 = createFileRoute("/admin/dashboard")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var $$splitComponentImporter = () => import("./admin.activities-DWz4_MX5.mjs");
var Route = createFileRoute("/admin/activities")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	ssr: false,
	beforeLoad: requireAdminAuth
});
var VolunteerRoute = Route$24.update({
	id: "/volunteer",
	path: "/volunteer",
	getParentRoute: () => Route$25
});
var SitemapDotxmlRoute = Route$23.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$25
});
var RobotsDottxtRoute = Route$22.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$25
});
var ProjectsRoute = Route$21.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$25
});
var GalleryRoute = Route$20.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$25
});
var EventsRoute = Route$19.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$25
});
var DonateRoute = Route$18.update({
	id: "/donate",
	path: "/donate",
	getParentRoute: () => Route$25
});
var ContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$25
});
var BlogRoute = Route$16.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$25
});
var AdminRoute = Route$15.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$25
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$25
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$25
});
var AdminIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminVolunteersRoute = Route$11.update({
	id: "/volunteers",
	path: "/volunteers",
	getParentRoute: () => AdminRoute
});
var AdminTestimonialsRoute = Route$10.update({
	id: "/testimonials",
	path: "/testimonials",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminProjectsRoute = Route$8.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => AdminRoute
});
var AdminPartnersRoute = Route$7.update({
	id: "/partners",
	path: "/partners",
	getParentRoute: () => AdminRoute
});
var AdminMessagesRoute = Route$6.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminRoute
});
var AdminLeadersRoute = Route$5.update({
	id: "/leaders",
	path: "/leaders",
	getParentRoute: () => AdminRoute
});
var AdminImpactStatsRoute = Route$4.update({
	id: "/impact-stats",
	path: "/impact-stats",
	getParentRoute: () => AdminRoute
});
var AdminGalleryRoute = Route$3.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => AdminRoute
});
var AdminDonationsRoute = Route$2.update({
	id: "/donations",
	path: "/donations",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$1.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminActivitiesRoute: Route.update({
		id: "/activities",
		path: "/activities",
		getParentRoute: () => AdminRoute
	}),
	AdminDashboardRoute,
	AdminDonationsRoute,
	AdminGalleryRoute,
	AdminImpactStatsRoute,
	AdminLeadersRoute,
	AdminMessagesRoute,
	AdminPartnersRoute,
	AdminProjectsRoute,
	AdminSettingsRoute,
	AdminTestimonialsRoute,
	AdminVolunteersRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	BlogRoute,
	ContactRoute,
	DonateRoute,
	EventsRoute,
	GalleryRoute,
	ProjectsRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	VolunteerRoute
};
var routeTree = Route$25._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
