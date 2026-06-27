import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { type Project } from "@/lib/site-data";
import { useProjectsStore } from "@/lib/admin-store";
import { api } from "@/lib/api";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminProjects() {
  const { data: projects, loading, refresh } = useProjectsStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
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
    try {
      if (editingProject && editingProject.id) {
        await api.updateProject(editingProject.id, project);
      } else {
        await api.createProject(project);
      }
      setShowAddForm(false);
      setEditingProject(null);
      refresh();
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Projects</h1>
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
  onSave,
  onCancel,
}: {
  project: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Project>(
    project ?? {
      slug: "",
      title: "",
      category: "Education",
      short: "",
      fullStory: "",
      image: "",
      stats: [],
      progress: 0,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.title || !formData.short) return;
    onSave(formData);
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
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as Project["category"] })
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Education">Education</option>
              <option value="WomenEmpowerment">Women Empowerment</option>
              <option value="CommunityWelfare">Community Welfare</option>
              <option value="DisasterRelief">Disaster Relief</option>
              <option value="CulturalActivities">Cultural Activities</option>
            </select>
          </div>
        </div>

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
            value={formData.fullStory || ""}
            onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={10}
            placeholder="Enter the detailed story of this project..."
          />
          <p className="text-xs text-muted-foreground mt-1">This will be shown when users click "Read full story" on the project card.</p>
        </div>

        <ImageInput
          value={formData.image}
          onChange={(val) => setFormData({ ...formData, image: val })}
        />

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

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
