import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { X as SquarePen, c as Trash2, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DNCwNVxf.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { u as useProjectsStore } from "./admin-store-BVt5Ru0H.mjs";
import { t as ImageInput } from "./ImageInput-BO67Q8xa.mjs";
import { t as useConfirmDialog } from "./use-confirm-dialog-DIgJQpNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects-DzhspqbK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminProjects() {
	const { data: projects, loading, refresh } = useProjectsStore();
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [editingProject, setEditingProject] = (0, import_react.useState)(null);
	const { confirm, dialog } = useConfirmDialog();
	const handleDelete = async (id) => {
		if (!await confirm({
			title: "Delete project?",
			description: "Are you sure you want to delete this project? This action cannot be undone."
		})) return;
		try {
			await api.deleteProject(id);
			refresh();
		} catch (error) {
			console.error("Failed to delete project:", error);
			toast.error("Failed to delete project");
		}
	};
	const handleEdit = (project) => {
		setEditingProject(project);
		setShowAddForm(true);
	};
	const handleSave = async (project) => {
		try {
			if (editingProject && editingProject.id) await api.updateProject(editingProject.id, project);
			else await api.createProject(project);
			setShowAddForm(false);
			setEditingProject(null);
			refresh();
		} catch (error) {
			console.error("Failed to save project:", error);
			alert("Failed to save project");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [dialog, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold mb-2",
					children: "Projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage your projects"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditingProject(null);
						setShowAddForm(true);
					},
					className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Project"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectForm, {
				project: editingProject,
				onSave: handleSave,
				onCancel: () => {
					setShowAddForm(false);
					setEditingProject(null);
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2 w-32 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-8" })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" })]
					})]
				}, i)) }) : projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: project.image,
							alt: project.title,
							className: "w-20 h-20 rounded-lg object-cover shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: project.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mb-2",
									children: project.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: project.short
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 w-32 bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-primary rounded-full",
											style: { width: `${project.progress}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [project.progress, "%"]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleEdit(project),
							className: "p-2 rounded-lg hover:bg-muted transition-colors",
							"aria-label": "Edit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(project.id || ""),
							className: "p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors",
							"aria-label": "Delete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, project.slug))
			})
		]
	})] });
}
function ProjectForm({ project, onSave, onCancel }) {
	const [formData, setFormData] = (0, import_react.useState)(project ?? {
		slug: "",
		title: "",
		category: "Education",
		short: "",
		fullStory: "",
		image: "",
		stats: [],
		progress: 0
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.slug || !formData.title || !formData.short) return;
		onSave(formData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card border border-border rounded-xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold mb-4",
			children: project ? "Edit Project" : "Add New Project"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium mb-2",
						children: "Slug"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: formData.slug,
						onChange: (e) => setFormData({
							...formData,
							slug: e.target.value
						}),
						className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
						required: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium mb-2",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: formData.category,
						onChange: (e) => setFormData({
							...formData,
							category: e.target.value
						}),
						className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Education",
								children: "Education"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "WomenEmpowerment",
								children: "Women Empowerment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CommunityWelfare",
								children: "Community Welfare"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "DisasterRelief",
								children: "Disaster Relief"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CulturalActivities",
								children: "Cultural Activities"
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-medium mb-2",
					children: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: formData.title,
					onChange: (e) => setFormData({
						...formData,
						title: e.target.value
					}),
					className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-medium mb-2",
					children: "Short Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: formData.short,
					onChange: (e) => setFormData({
						...formData,
						short: e.target.value
					}),
					className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
					rows: 3,
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium mb-2",
						children: "Full Story (Optional)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: formData.fullStory || "",
						onChange: (e) => setFormData({
							...formData,
							fullStory: e.target.value
						}),
						className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
						rows: 10,
						placeholder: "Enter the detailed story of this project..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "This will be shown when users click \"Read full story\" on the project card."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
					value: formData.image,
					onChange: (val) => setFormData({
						...formData,
						image: val
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium mb-2",
					children: [
						"Progress: ",
						formData.progress,
						"%"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: "0",
					max: "100",
					value: formData.progress,
					onChange: (e) => setFormData({
						...formData,
						progress: parseInt(e.target.value)
					}),
					className: "w-full"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
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
export { AdminProjects as component };
