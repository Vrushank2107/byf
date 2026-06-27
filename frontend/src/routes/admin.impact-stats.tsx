import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useImpactStatsStore, type ImpactStatItem } from "@/lib/admin-store";
import { api } from "@/lib/api";
import { useState } from "react";
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/impact-stats")({
  component: AdminImpactStats,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminImpactStats() {
  const { data: stats, loading, refresh } = useImpactStatsStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStat, setEditingStat] = useState<ImpactStatItem | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete impact stat?",
      description: "Are you sure you want to delete this impact stat? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteImpactStat(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete impact stat:', error);
      toast.error('Failed to delete impact stat');
    }
  };

  const handleEdit = (stat: ImpactStatItem) => {
    setEditingStat(stat);
    setShowAddForm(true);
  };

  const handleSave = async (stat: ImpactStatItem) => {
    try {
      if (editingStat && editingStat.id) {
        await api.updateImpactStat(editingStat.id, stat);
      } else {
        await api.createImpactStat(stat);
      }
      setShowAddForm(false);
      setEditingStat(null);
      refresh();
    } catch (error) {
      console.error('Failed to save impact stat:', error);
      alert('Failed to save impact stat');
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Impact Stats</h1>
            <p className="text-muted-foreground">Manage impact statistics shown on homepage</p>
          </div>
          <button
            onClick={() => {
              setEditingStat(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Stat
          </button>
        </div>

        {showAddForm && (
          <ImpactStatForm
            stat={editingStat}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingStat(null);
            }}
          />
        )}

        <div className="grid gap-4">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
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
            stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-card border border-border rounded-xl p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg ${
                    stat.color === 'secondary' ? 'bg-secondary text-white' :
                    stat.color === 'accent' ? 'bg-accent text-accent-foreground' :
                    'bg-primary text-primary-foreground'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.value}{stat.suffix || ''}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(stat)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(stat.id)}
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

function ImpactStatForm({
  stat,
  onSave,
  onCancel,
}: {
  stat: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    stat || {
      label: "",
      value: "",
      suffix: "",
      color: "primary",
      order: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-display text-xl font-semibold mb-4">
        {stat ? "Edit Impact Stat" : "Add Impact Stat"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Label</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Value</label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Suffix (optional)</label>
            <input
              type="text"
              value={formData.suffix}
              onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
              placeholder="+"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Color</label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="accent">Accent</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3">
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
