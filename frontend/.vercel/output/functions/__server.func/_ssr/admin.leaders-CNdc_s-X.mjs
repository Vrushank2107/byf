import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { X as SquarePen, c as Trash2, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DNCwNVxf.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as useConfirmDialog } from "./use-confirm-dialog-DIgJQpNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.leaders-CNdc_s-X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLeaders() {
	const [leaders, setLeaders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [editingLeader, setEditingLeader] = (0, import_react.useState)(null);
	const { confirm, dialog } = useConfirmDialog();
	const refresh = async () => {
		setLoading(true);
		try {
			setLeaders(await api.getLeaders());
		} catch (error) {
			console.error("Failed to fetch leaders:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	const handleDelete = async (id) => {
		if (!await confirm({
			title: "Delete leader?",
			description: "Are you sure you want to delete this leader? This action cannot be undone."
		})) return;
		try {
			await api.deleteLeader(id);
			refresh();
		} catch (error) {
			console.error("Failed to delete leader:", error);
			toast.error("Failed to delete leader");
		}
	};
	const handleEdit = (leader) => {
		setEditingLeader(leader);
		setShowAddForm(true);
	};
	const handleSave = async (leader) => {
		try {
			if (editingLeader && editingLeader.id) await api.updateLeader(editingLeader.id, leader);
			else await api.createLeader(leader);
			setShowAddForm(false);
			setEditingLeader(null);
			refresh();
		} catch (error) {
			console.error("Failed to save leader:", error);
			alert("Failed to save leader");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [dialog, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold mb-2",
					children: "Leadership"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage leadership team"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditingLeader(null);
						setShowAddForm(true);
					},
					className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Leader"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderForm, {
				leader: editingLeader,
				onSave: handleSave,
				onCancel: () => {
					setShowAddForm(false);
					setEditingLeader(null);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-16 h-16 rounded-lg shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-3/4 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" })]
					})]
				}, i)) }) : leaders.map((leader) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-16 w-16 shrink-0 place-items-center rounded-2xl gradient-hero font-display text-2xl font-bold text-white",
							children: leader.name.split(" ").map((n) => n[0]).join("")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-foreground",
									children: leader.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: leader.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1 line-clamp-2",
									children: leader.bio
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleEdit(leader),
							className: "p-2 rounded-lg hover:bg-muted transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(leader.id),
							className: "p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, leader.id))
			})
		]
	})] });
}
function LeaderForm({ leader, onSave, onCancel }) {
	const [formData, setFormData] = (0, import_react.useState)(leader || {
		name: "",
		role: "",
		bio: "",
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
			children: leader ? "Edit Leader" : "Add Leader"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.name,
					onChange: (e) => setFormData({
						...formData,
						name: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Role"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.role,
					onChange: (e) => setFormData({
						...formData,
						role: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Bio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: formData.bio,
					onChange: (e) => setFormData({
						...formData,
						bio: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm resize-none",
					rows: 4,
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
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
				})] }),
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
export { AdminLeaders as component };
