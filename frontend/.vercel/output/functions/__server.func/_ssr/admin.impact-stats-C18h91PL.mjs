import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { X as SquarePen, c as Trash2, s as TrendingUp, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DNCwNVxf.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { o as useImpactStatsStore } from "./admin-store-BVt5Ru0H.mjs";
import { t as useConfirmDialog } from "./use-confirm-dialog-DIgJQpNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.impact-stats-C18h91PL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminImpactStats() {
	const { data: stats, loading, refresh } = useImpactStatsStore();
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [editingStat, setEditingStat] = (0, import_react.useState)(null);
	const { confirm, dialog } = useConfirmDialog();
	const handleDelete = async (id) => {
		if (!await confirm({
			title: "Delete impact stat?",
			description: "Are you sure you want to delete this impact stat? This action cannot be undone."
		})) return;
		try {
			await api.deleteImpactStat(id);
			refresh();
		} catch (error) {
			console.error("Failed to delete impact stat:", error);
			toast.error("Failed to delete impact stat");
		}
	};
	const handleEdit = (stat) => {
		setEditingStat(stat);
		setShowAddForm(true);
	};
	const handleSave = async (stat) => {
		try {
			if (editingStat && editingStat.id) await api.updateImpactStat(editingStat.id, stat);
			else await api.createImpactStat(stat);
			setShowAddForm(false);
			setEditingStat(null);
			refresh();
		} catch (error) {
			console.error("Failed to save impact stat:", error);
			alert("Failed to save impact stat");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [dialog, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold mb-2",
					children: "Impact Stats"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage impact statistics shown on homepage"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditingStat(null);
						setShowAddForm(true);
					},
					className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Stat"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactStatForm, {
				stat: editingStat,
				onSave: handleSave,
				onCancel: () => {
					setShowAddForm(false);
					setEditingStat(null);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-6 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-3/4 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" })]
					})]
				}, i)) }) : stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-6 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-8 w-8 place-items-center rounded-lg ${stat.color === "secondary" ? "bg-secondary text-white" : stat.color === "accent" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-foreground",
								children: stat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [stat.value, stat.suffix || ""]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleEdit(stat),
							className: "p-2 rounded-lg hover:bg-muted transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(stat.id),
							className: "p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, stat.id))
			})
		]
	})] });
}
function ImpactStatForm({ stat, onSave, onCancel }) {
	const [formData, setFormData] = (0, import_react.useState)(stat || {
		label: "",
		value: "",
		suffix: "",
		color: "primary",
		order: 0
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card border border-border rounded-xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold mb-4",
			children: stat ? "Edit Impact Stat" : "Add Impact Stat"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Label"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.label,
					onChange: (e) => setFormData({
						...formData,
						label: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						children: "Value"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: formData.value,
						onChange: (e) => setFormData({
							...formData,
							value: e.target.value
						}),
						className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
						required: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						children: "Suffix (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: formData.suffix,
						onChange: (e) => setFormData({
							...formData,
							suffix: e.target.value
						}),
						className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
						placeholder: "+"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						children: "Color"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: formData.color,
						onChange: (e) => setFormData({
							...formData,
							color: e.target.value
						}),
						className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "primary",
								children: "Primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "secondary",
								children: "Secondary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "accent",
								children: "Accent"
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						children: "Order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: formData.order,
						onChange: (e) => setFormData({
							...formData,
							order: parseInt(e.target.value)
						}),
						className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
						children: "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						className: "px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors",
						children: "Cancel"
					})]
				})
			]
		})]
	});
}
//#endregion
export { AdminImpactStats as component };
