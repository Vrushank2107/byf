import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/leaders")({
  component: AdminLeaders,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminLeaders() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLeader, setEditingLeader] = useState<any>(null);
  const { confirm, dialog } = useConfirmDialog();

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await api.getLeaders();
      setLeaders(data);
    } catch (error) {
      console.error('Failed to fetch leaders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete leader?",
      description: "Are you sure you want to delete this leader? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteLeader(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete leader:', error);
      toast.error('Failed to delete leader');
    }
  };

  const handleEdit = (leader: any) => {
    setEditingLeader(leader);
    setShowAddForm(true);
  };

  const handleSave = async (leader: any) => {
    try {
      if (editingLeader && editingLeader.id) {
        await api.updateLeader(editingLeader.id, leader);
      } else {
        await api.createLeader(leader);
      }
      setShowAddForm(false);
      setEditingLeader(null);
      refresh();
    } catch (error) {
      console.error('Failed to save leader:', error);
      alert('Failed to save leader');
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Leadership</h1>
            <p className="text-muted-foreground">Manage leadership team</p>
          </div>
          <button
            onClick={() => {
              setEditingLeader(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Leader
          </button>
        </div>

        {showAddForm && (
          <LeaderForm
            leader={editingLeader}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingLeader(null);
            }}
          />
        )}

        <div className="grid gap-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4">
                  <div className="flex gap-4 min-w-0">
                    <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full" />
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
            leaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 min-w-0">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl gradient-hero font-display text-2xl font-bold text-white">
                    {leader.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{leader.name}</h3>
                    <p className="text-sm text-muted-foreground">{leader.role}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{leader.bio}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(leader)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(leader.id)}
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

function LeaderForm({
  leader,
  onSave,
  onCancel,
}: {
  leader: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    leader || {
      name: "",
      role: "",
      bio: "",
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
        {leader ? "Edit Leader" : "Add Leader"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm resize-none"
            rows={4}
            required
          />
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
