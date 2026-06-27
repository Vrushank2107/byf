import { o as __toESM } from "../_runtime.mjs";
import { n as DONATION_FUNDS, o as IMG } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { t as PageHero } from "./PageHero-CUOvFO6N.mjs";
import { t as SectionHeader } from "./SectionHeader-Dn_NjRVN.mjs";
import { L as FileCheck, M as Heart, Q as LoaderCircle, Z as Sparkles, d as Shield } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/donate-D0y6SktU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	500,
	1e3,
	2500,
	5e3,
	1e4,
	25e3
];
var fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
function DonatePage() {
	const [fund, setFund] = (0, import_react.useState)(DONATION_FUNDS[0].slug);
	const [amount, setAmount] = (0, import_react.useState)(2500);
	const [showDonorForm, setShowDonorForm] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showReceipt, setShowReceipt] = (0, import_react.useState)(false);
	const [receiptData, setReceiptData] = (0, import_react.useState)(null);
	const [donorInfo, setDonorInfo] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		address: "",
		pan: "",
		isAnonymous: false
	});
	const active = DONATION_FUNDS.find((f) => f.slug === fund);
	const handleDonate = async () => {
		setLoading(true);
		try {
			const orderData = await api.createDonationOrder({
				...donorInfo,
				amount,
				fund
			});
			const options = {
				key: orderData.keyId,
				amount: orderData.amount,
				currency: orderData.currency,
				name: "Baroda Youth Federation",
				description: `Donation to ${active.title}`,
				order_id: orderData.orderId,
				handler: async function(response) {
					try {
						setReceiptData((await api.verifyDonation({
							razorpayOrderId: response.razorpay_order_id,
							razorpayPaymentId: response.razorpay_payment_id,
							razorpaySignature: response.razorpay_signature,
							donationId: orderData.donationId
						})).donation);
						setShowReceipt(true);
						setShowDonorForm(false);
						setDonorInfo({
							name: "",
							email: "",
							phone: "",
							address: "",
							pan: "",
							isAnonymous: false
						});
					} catch {
						alert("Payment verification failed. Please contact support.");
					}
				},
				prefill: {
					name: donorInfo.name,
					email: donorInfo.email,
					contact: donorInfo.phone
				},
				theme: { color: "#E11D48" }
			};
			const rzp = new window.Razorpay(options);
			rzp.open();
			rzp.on("payment.failed", function(response) {
				alert("Payment failed. Please try again.");
			});
		} catch (error) {
			console.error("Donation error:", error);
			alert("Failed to process donation. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Donate",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["₹500 feeds a family for a week. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent",
				children: "Your turn."
			})] }),
			description: "100% of donations go directly to programs. Operations are funded separately. 80G-eligible receipts issued instantly.",
			image: IMG.heroBlankets
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-y",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						eyebrow: "Where your money goes",
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Choose a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gradient-text",
							children: "fund."
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
						children: DONATION_FUNDS.map((f, idx) => {
							const pct = Math.min(100, Math.round(f.raised / f.goal * 100));
							const accentCls = f.accent === "secondary" ? "from-secondary to-secondary/70" : f.accent === "accent" ? "from-accent to-accent/70" : "from-primary to-primary/70";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								onClick: () => setFund(f.slug),
								initial: {
									opacity: 0,
									y: 16
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									delay: idx * .05,
									duration: .4
								},
								className: `group relative overflow-hidden rounded-3xl border bg-card p-6 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow ${fund === f.slug ? "border-primary ring-2 ring-primary/20" : "border-border"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br opacity-25 blur-2xl ${accentCls}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-lg font-semibold text-foreground",
											children: f.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: f.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 flex items-baseline justify-between text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-base font-bold text-foreground",
												children: fmt(f.raised)
											}), " raised"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Goal ", fmt(f.goal)] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full rounded-full bg-gradient-to-r ${accentCls}`,
												style: { width: `${pct}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 text-right text-[11px] font-semibold uppercase tracking-wider text-primary",
											children: [pct, "% funded"]
										})
									]
								})]
							}, f.slug);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-[0.18em] text-secondary",
									children: "Selected fund"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-2xl font-bold text-foreground",
									children: active.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-semibold text-foreground",
											children: "Choose an amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6",
											children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setAmount(p),
												className: `rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${amount === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary"}`,
												children: fmt(p)
											}, p))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-center rounded-xl border border-border bg-background pl-4 pr-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-base font-semibold text-muted-foreground",
												children: "₹"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 100,
												value: amount,
												onChange: (e) => setAmount(Number(e.target.value || 0)),
												className: "w-full bg-transparent px-3 py-3 text-base font-semibold text-foreground outline-none"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowDonorForm(true),
									className: "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-warm py-4 font-display font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 fill-current" }),
										"Donate ",
										fmt(amount)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-accent" }), " Secure"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "h-4 w-4 text-accent" }), " 80G receipt"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-accent" }), " 100% to program"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-3xl border border-border bg-primary p-7 text-primary-foreground shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xl font-bold",
									children: "What your money becomes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-5 space-y-3 text-sm text-primary-foreground/85",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display font-bold text-secondary",
												children: "₹500"
											}), " — 1 month of meals for a child"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display font-bold text-secondary",
												children: "₹1,000"
											}), " — School kit for 5 students"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display font-bold text-secondary",
												children: "₹2,500"
											}), " — Sanitary pads for 25 girls / year"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display font-bold text-secondary",
												children: "₹10,000"
											}), " — Full notebook kit for a school"]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-3xl border border-border bg-card p-7 shadow-soft",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-[0.18em] text-secondary",
										children: "Donor story"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
										className: "mt-3 font-display text-base leading-relaxed text-foreground",
										children: "\"I started with ₹500 a month. Three years later, the school they built with our funds is my proudest investment.\""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm text-muted-foreground",
										children: "— Arjun Mehta, Monthly donor since 2022"
									})
								]
							})]
						})]
					})
				]
			})
		}),
		showDonorForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-bold text-foreground",
						children: "Donor Information"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Required for 80G tax receipt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Full Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: donorInfo.name,
								onChange: (e) => setDonorInfo({
									...donorInfo,
									name: e.target.value
								}),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary",
								placeholder: "Enter your full name"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Email *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: donorInfo.email,
								onChange: (e) => setDonorInfo({
									...donorInfo,
									email: e.target.value
								}),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary",
								placeholder: "your@email.com"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Phone *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								value: donorInfo.phone,
								onChange: (e) => setDonorInfo({
									...donorInfo,
									phone: e.target.value
								}),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary",
								placeholder: "+91 98765 43210"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Address *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: donorInfo.address,
								onChange: (e) => setDonorInfo({
									...donorInfo,
									address: e.target.value
								}),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary",
								rows: 3,
								placeholder: "Your full address"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-semibold text-foreground",
								children: "PAN Number (for 80G)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: donorInfo.pan,
								onChange: (e) => setDonorInfo({
									...donorInfo,
									pan: e.target.value.toUpperCase()
								}),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary",
								placeholder: "ABCDE1234F",
								maxLength: 10
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									id: "anonymous",
									checked: donorInfo.isAnonymous,
									onChange: (e) => setDonorInfo({
										...donorInfo,
										isAnonymous: e.target.checked
									}),
									className: "h-5 w-5 rounded border-border"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "anonymous",
									className: "text-sm text-muted-foreground",
									children: "Make this donation anonymous"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowDonorForm(false),
							className: "flex-1 rounded-full border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleDonate,
							disabled: loading || !donorInfo.name || !donorInfo.email || !donorInfo.phone || !donorInfo.address,
							className: "flex-1 rounded-full gradient-warm px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "inline h-5 w-5 animate-spin" }), "Processing..."] }) : `Pay ${fmt(amount)}`
						})]
					})
				]
			})
		}),
		showReceipt && receiptData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-8 w-8 fill-green-600 text-green-600" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-foreground",
								children: "Thank You!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Your donation has been received successfully"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 rounded-2xl border border-border bg-muted/50 p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Receipt Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: receiptData.receiptNumber
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Amount"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: fmt(receiptData.amount)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Fund"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: active.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: new Date(receiptData.createdAt).toLocaleDateString("en-IN", {
											day: "numeric",
											month: "short",
											year: "numeric"
										})
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl bg-primary/10 p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-primary",
							children: "80G Tax Exempt Receipt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "This receipt is valid for tax deduction under Section 80G of the Income Tax Act."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowReceipt(false),
						className: "mt-6 w-full rounded-full gradient-warm px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5",
						children: "Close"
					})
				]
			})
		})
	] });
}
//#endregion
export { DonatePage as component };
