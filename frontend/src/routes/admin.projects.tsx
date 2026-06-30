import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { type Project } from "@/lib/site-data";
import { PROJECT_CATEGORY_OPTIONS, PROJECT_CUSTOM_CATEGORY_OPTION } from "@/lib/site-data";
import { useProjectsStore } from "@/lib/admin-store";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    category: "Education",
    short: "",
    fullStory: "",
    image: "",
    images: [],
    stats: [],
    progress: 0,
    showInHero: false,
  };
}

function toProjectPayload(project: Project) {
  return {
    slug: project.slug.trim(),
    title: project.title.trim(),
    category: project.category,
    short: project.short.trim(),
    fullStory: project.fullStory?.trim() || undefined,
    image: project.image.trim(),
    images: [],
    stats: project.stats ?? [],
    progress: Number(project.progress),
    showInHero: Boolean(project.showInHero),
  };
}

function AdminProjects() {
  const { data: projects, loading, refresh } = useProjectsStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete project?",
      description: "Are you sure you want to delete this project? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteProject(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowAddForm(true);
  };

  const handleSave = async (project: Project) => {
    const payload = toProjectPayload(project);

    if (!payload.image) {
      await confirm({
        title: "Image required",
        description: "Please upload a photo before saving.",
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
      return;
    }

    if (payload.image.startsWith("data:")) {
      await confirm({
        title: "Image still uploading",
        description: "Wait for the upload to finish, then try saving again.",
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
      return;
    }

    setSaving(true);
    try {
      const id = editingProject?.id ?? project.id;
      if (id) {
        await api.updateProject(id, payload);
        toast.success("Project updated");
      } else {
        await api.createProject(payload);
        toast.success("Project created");
      }
      setShowAddForm(false);
      setEditingProject(null);
      refresh();
    } catch (error) {
      console.error("Failed to save project:", error);
      const message = error instanceof Error ? error.message : "Failed to save project";
      await confirm({
        title: "Could not save project",
        description: message,
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage your projects</p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>

        {showAddForm && (
          <ProjectForm
            project={editingProject}
            saving={saving}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProject(null);
            }}
          />
        )}

        <div className="grid gap-4">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4">
                  <div className="flex gap-4 min-w-0">
                    <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-2 w-32 rounded-full" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            projects.map((project) => (
              <div
                key={project.slug}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 min-w-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                    {project.showInHero && (
                      <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-secondary">
                        <Sparkles className="h-3 w-3" />
                        Hero
                      </span>
                    )}
                    <p className="text-sm">{project.short}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id || '')}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function ProjectForm({
  project,
  saving,
  onSave,
  onCancel,
}: {
  project: Project | null;
  saving: boolean;
  onSave: (project: Project) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Project>(project ? { ...project, stats: project.stats ?? [], images: [], showInHero: Boolean(project.showInHero) } : emptyProject());
  const [selectedCategory, setSelectedCategory] = useState<string>(PROJECT_CATEGORY_OPTIONS[0]);
  const [customCategory, setCustomCategory] = useState("");
  const isCustomCategory = selectedCategory === PROJECT_CUSTOM_CATEGORY_OPTION;

  useEffect(() => {
    setFormData(project ? { ...project, stats: project.stats ?? [], images: [], showInHero: Boolean(project.showInHero) } : emptyProject());
    const isPresetCategory = project?.category && PROJECT_CATEGORY_OPTIONS.includes(project.category as (typeof PROJECT_CATEGORY_OPTIONS)[number]);
    setSelectedCategory(isPresetCategory ? (project?.category as string) : PROJECT_CUSTOM_CATEGORY_OPTION);
    setCustomCategory(project?.category && !isPresetCategory ? project.category : "");
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = isCustomCategory ? customCategory.trim() : selectedCategory;
    if (!formData.slug || !formData.title || !formData.short || !category) return;
    onSave({ ...formData, category: category as Project["category"] });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-display text-xl font-semibold mb-4">
        {project ? "Edit Project" : "Add New Project"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {PROJECT_CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value={PROJECT_CUSTOM_CATEGORY_OPTION}>Other — write your own category</option>
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a category above, or choose “Other” to add a new one.
            </p>
          </div>
        </div>

        {isCustomCategory && (
          <div>
            <label className="block text-sm font-medium mb-2">Custom category</label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="e.g. Health & Nutrition, Rural Development"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <textarea
            value={formData.short}
            onChange={(e) => setFormData({ ...formData, short: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Story (Optional)</label>
          <textarea
            value={formData.fullStory || ''}
            onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={6}
            placeholder="Add detailed information about the project, its impact, and story..."
          />
          <p className="mt-1 text-xs text-muted-foreground">This will be displayed on the project detail page.</p>
        </div>

        <ImageInput
          value={formData.image}
          onChange={(val) => setFormData({ ...formData, image: val })}
          folder="projects"
        />

        <label className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
          <input
            type="checkbox"
            checked={Boolean(formData.showInHero)}
            onChange={(e) => setFormData({ ...formData, showInHero: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
          />
          <span>
            <span className="block text-sm font-medium">Show in home and about hero</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Selected projects appear in the homepage hero slider. The about page uses the first selected project image.
            </span>
          </span>
        </label>

        <div>
          <label className="block text-sm font-medium mb-2">Progress: {formData.progress}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Impact at a Glance</label>
          <div className="space-y-2">
            {(formData.stats || []).map((stat, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...(formData.stats || [])];
                    newStats[index] = { ...newStats[index], label: e.target.value };
                    setFormData({ ...formData, stats: newStats });
                  }}
                  placeholder="e.g., Children participated"
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...(formData.stats || [])];
                    newStats[index] = { ...newStats[index], value: e.target.value };
                    setFormData({ ...formData, stats: newStats });
                  }}
                  placeholder="e.g., 500+"
                  className="w-24 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newStats = (formData.stats || []).filter((_, i) => i !== index);
                    setFormData({ ...formData, stats: newStats });
                  }}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, stats: [...(formData.stats || []), { label: "", value: "" }] });
              }}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Stat
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Add key impact metrics like "Children participated: 500+"</p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
