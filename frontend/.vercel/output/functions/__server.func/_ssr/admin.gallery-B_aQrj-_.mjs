import { o as __toESM } from "../_runtime.mjs";
import { a as GALLERY_TAGS } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as Trash2, n as X, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DNCwNVxf.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as useGalleryStore } from "./admin-store-BVt5Ru0H.mjs";
import { t as ImageInput } from "./ImageInput-BO67Q8xa.mjs";
import { t as useConfirmDialog } from "./use-confirm-dialog-DIgJQpNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.gallery-B_aQrj-_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminGallery() {
	const { data: gallery, loading, refresh } = useGalleryStore();
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [selectedTag, setSelectedTag] = (0, import_react.useState)("All");
	const { confirm, dialog } = useConfirmDialog();
	const filteredGallery = selectedTag === "All" ? gallery : gallery.filter((item) => item.tag === selectedTag);
	const handleDelete = async (id) => {
		if (!await confirm({
			title: "Delete photo?",
			description: "Are you sure you want to delete this photo? This action cannot be undone."
		})) return;
		try {
			await api.deleteGalleryItem(id);
			refresh();
		} catch (error) {
			console.error("Failed to delete photo:", error);
			toast.error("Failed to delete photo");
		}
	};
	const handleAdd = async (item) => {
		try {
			await api.createGalleryItem(item);
			setShowAddForm(false);
			refresh();
		} catch (error) {
			console.error("Failed to add photo:", error);
			alert("Failed to add photo");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [dialog, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold mb-2",
					children: "Gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage gallery photos"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(true),
					className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Photo"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Add New Photo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowAddForm(false),
						className: "p-2 rounded-lg hover:bg-muted transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPhotoForm, {
					onAdd: handleAdd,
					onCancel: () => setShowAddForm(false)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: GALLERY_TAGS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSelectedTag(tag),
					className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTag === tag ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`,
					children: tag
				}, tag))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-square rounded-xl" }, i)) }) : filteredGallery.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.src,
							alt: item.alt,
							className: "w-full aspect-square object-cover rounded-xl border border-border"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(item.id || ""),
								className: "p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors",
								"aria-label": "Delete",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-2 left-2 right-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block px-2 py-1 bg-black/70 text-white text-xs rounded-md",
								children: item.tag
							})
						})
					]
				}, item.id || item.src))
			})
		]
	})] });
}
function AddPhotoForm({ onAdd, onCancel }) {
	const [formData, setFormData] = (0, import_react.useState)({
		src: "",
		tag: "Education",
		alt: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.src || !formData.alt) return;
		onAdd(formData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
				value: formData.src,
				onChange: (val) => setFormData({
					...formData,
					src: val
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-medium mb-2",
				children: "Tag"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: formData.tag,
				onChange: (e) => setFormData({
					...formData,
					tag: e.target.value
				}),
				className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
				children: GALLERY_TAGS.filter((t) => t !== "All").map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: tag,
					children: tag
				}, tag))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-medium mb-2",
				children: "Alt Text"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: formData.alt,
				onChange: (e) => setFormData({
					...formData,
					alt: e.target.value
				}),
				className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
				required: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
					children: "Add Photo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCancel,
					className: "px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors",
					children: "Cancel"
				})]
			})
		]
	});
}
//#endregion
export { AdminGallery as component };
