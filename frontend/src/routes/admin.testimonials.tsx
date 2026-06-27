import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonialsStore, type TestimonialItem } from "@/lib/admin-store";
import { api } from "@/lib/api";
import { useState } from "react";
import { Plus, Edit, Trash2, Quote } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminTestimonials() {
  const { data: testimonials, loading, refresh } = useTestimonialsStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete testimonial?",
      description: "Are you sure you want to delete this testimonial? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteTestimonial(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setShowAddForm(true);
  };

  const handleSave = async (testimonial: any) => {
    try {
      if (editingTestimonial && editingTestimonial.id) {
        await api.updateTestimonial(editingTestimonial.id, testimonial);
      } else {
        await api.createTestimonial(testimonial);
      }
      setShowAddForm(false);
      setEditingTestimonial(null);
      refresh();
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      alert('Failed to save testimonial');
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Testimonials</h1>
            <p className="text-muted-foreground">Manage testimonials from people we serve</p>
          </div>
          <button
            onClick={() => {
              setEditingTestimonial(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        </div>

        {showAddForm && (
          <TestimonialForm
            testimonial={editingTestimonial}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingTestimonial(null);
            }}
          />
        )}

        <div className="grid gap-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4">
                  <div className="flex gap-4 min-w-0">
                    <Skeleton className="w-12 h-12 rounded-full shrink-0" />
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
            testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 min-w-0">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">"{testimonial.quote}"</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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

function TestimonialForm({
  testimonial,
  onSave,
  onCancel,
}: {
  testimonial: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    testimonial || {
      name: "",
      role: "",
      quote: "",
      image: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-display text-xl font-semibold mb-4">
        {testimonial ? "Edit Testimonial" : "Add Testimonial"}
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
          <label className="text-sm font-semibold">Quote</label>
          <textarea
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border background px-4 py-3 text-sm resize-none"
            rows={3}
            required
          />
        </div>
        <ImageInput
          label="Photo"
          value={formData.image}
          onChange={(image) => setFormData({ ...formData, image })}
        />
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
