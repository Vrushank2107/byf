import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { G as Calendar, X as SquarePen, c as Trash2, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DNCwNVxf.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { r as useActivitiesStore } from "./admin-store-BVt5Ru0H.mjs";
import { t as ImageInput } from "./ImageInput-BO67Q8xa.mjs";
import { t as useConfirmDialog } from "./use-confirm-dialog-DIgJQpNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.activities-DWz4_MX5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminActivities() {
	const { data: activities, loading, refresh } = useActivitiesStore();
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [editingActivity, setEditingActivity] = (0, import_react.useState)(null);
	const { confirm, dialog } = useConfirmDialog();
	const handleDelete = async (id) => {
		if (!await confirm({
			title: "Delete activity?",
			description: "Are you sure you want to delete this activity? This action cannot be undone."
		})) return;
		try {
			await api.deleteActivity(id);
			refresh();
		} catch (error) {
			console.error("Failed to delete activity:", error);
			toast.error("Failed to delete activity");
		}
	};
	const handleEdit = (activity) => {
		setEditingActivity(activity);
		setShowAddForm(true);
	};
	const handleSave = async (activity) => {
		try {
			if (editingActivity && editingActivity.id) await api.updateActivity(editingActivity.id, activity);
			else await api.createActivity(activity);
			setShowAddForm(false);
			setEditingActivity(null);
			refresh();
		} catch (error) {
			console.error("Failed to save activity:", error);
			alert("Failed to save activity");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [dialog, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold mb-2",
					children: "Activities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage latest activities"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditingActivity(null);
						setShowAddForm(true);
					},
					className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Activity"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityForm, {
				activity: editingActivity,
				onSave: handleSave,
				onCancel: () => {
					setShowAddForm(false);
					setEditingActivity(null);
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
					className: "bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-20 h-20 rounded-lg shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}, i)) }) : activities.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: activity.image,
							alt: activity.title,
							className: "w-20 h-20 rounded-lg object-cover shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-foreground",
									children: activity.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: activity.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), activity.date]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleEdit(activity),
							className: "p-2 rounded-lg hover:bg-muted transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(activity.id),
							className: "p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, activity.id))
			})
		]
	})] });
}
function ActivityForm({ activity, onSave, onCancel }) {
	const [formData, setFormData] = (0, import_react.useState)(activity || {
		title: "",
		tag: "",
		date: "",
		image: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card border border-border rounded-xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold mb-4",
			children: activity ? "Edit Activity" : "Add Activity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.title,
					onChange: (e) => setFormData({
						...formData,
						title: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Tag"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.tag,
					onChange: (e) => setFormData({
						...formData,
						tag: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-semibold",
					children: "Date"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.date,
					onChange: (e) => setFormData({
						...formData,
						date: e.target.value
					}),
					className: "mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm",
					placeholder: "e.g., Jan 15, 2024",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
					label: "Image",
					value: formData.image,
					onChange: (image) => setFormData({
						...formData,
						image
					})
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
export { AdminActivities as component };
