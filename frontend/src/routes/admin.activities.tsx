import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivitiesStore, type ActivityItem } from "@/lib/admin-store";
import { api } from "@/lib/api";
import { useState } from "react";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/activities")({
  component: AdminActivities,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminActivities() {
  const { data: activities, loading, refresh } = useActivitiesStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete activity?",
      description: "Are you sure you want to delete this activity? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteActivity(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete activity:', error);
      toast.error('Failed to delete activity');
    }
  };

  const handleEdit = (activity: ActivityItem) => {
    setEditingActivity(activity);
    setShowAddForm(true);
  };

  const handleSave = async (activity: ActivityItem) => {
    try {
      if (editingActivity && editingActivity.id) {
        await api.updateActivity(editingActivity.id, activity);
      } else {
        await api.createActivity(activity);
      }
      setShowAddForm(false);
      setEditingActivity(null);
      refresh();
    } catch (error) {
      console.error('Failed to save activity:', error);
      alert('Failed to save activity');
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Activities</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage latest activities</p>
          </div>
          <button
            onClick={() => {
              setEditingActivity(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Activity</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {showAddForm && (
          <ActivityForm
            activity={editingActivity}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingActivity(null);
            }}
          />
        )}

        <div className="grid gap-3 sm:gap-4">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                    <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 self-end sm:self-start">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-card border border-border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="flex gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                  <img src={activity.image} alt={activity.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-foreground">{activity.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{activity.tag}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {activity.date}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => activity.id && handleDelete(activity.id)}
                    className="p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
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

function ActivityForm({
  activity,
  onSave,
  onCancel,
}: {
  activity: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    activity || {
      title: "",
      tag: "",
      date: "",
      image: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl font-semibold mb-4">
        {activity ? "Edit Activity" : "Add Activity"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Tag</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Date</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            placeholder="e.g., Jan 15, 2024"
            required
          />
        </div>
        <ImageInput
          label="Image"
          value={formData.image}
          onChange={(image) => setFormData({ ...formData, image })}
          folder="activities"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
