import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/partners")({
  component: AdminPartners,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const { confirm, dialog } = useConfirmDialog();

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await api.getPartners();
      setPartners(data);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete partner?",
      description: "Are you sure you want to delete this partner? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deletePartner(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete partner:', error);
      toast.error('Failed to delete partner');
    }
  };

  const handleEdit = (partner: any) => {
    setEditingPartner(partner);
    setShowAddForm(true);
  };

  const handleSave = async (partner: any) => {
    try {
      if (editingPartner && editingPartner.id) {
        await api.updatePartner(editingPartner.id, partner);
      } else {
        await api.createPartner(partner);
      }
      setShowAddForm(false);
      setEditingPartner(null);
      refresh();
    } catch (error) {
      console.error('Failed to save partner:', error);
      alert('Failed to save partner');
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Partners</h1>
            <p className="text-muted-foreground">Manage sponsors and partners</p>
          </div>
          <button
            onClick={() => {
              setEditingPartner(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Partner
          </button>
        </div>

        {showAddForm && (
          <PartnerForm
            partner={editingPartner}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingPartner(null);
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
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-card border border-border rounded-xl p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
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

function PartnerForm({
  partner,
  onSave,
  onCancel,
}: {
  partner: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    partner || {
      name: "",
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
        {partner ? "Edit Partner" : "Add Partner"}
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
