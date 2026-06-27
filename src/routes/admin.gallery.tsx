import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { GALLERY_TAGS } from "@/lib/site-data";
import { useGalleryStore, type GalleryItem } from "@/lib/admin-store";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { ImageInput } from "@/components/admin/ImageInput";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
  beforeLoad: () => {
    if (!checkAdminAuth()) throw redirect({ to: "/admin" });
  },
});

function AdminGallery() {
  const [gallery, setGallery] = useGalleryStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filteredGallery =
    selectedTag === "All" ? gallery : gallery.filter((item) => item.tag === selectedTag);

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      setGallery(gallery.filter((_, i) => i !== index));
    }
  };

  const handleAdd = (item: GalleryItem) => {
    setGallery([item, ...gallery]);
    setShowAddForm(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Gallery</h1>
            <p className="text-muted-foreground">Manage gallery photos</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Photo
          </button>
        </div>

        {showAddForm && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Add New Photo</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <AddPhotoForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {GALLERY_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:bg-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => {
            const originalIndex = gallery.indexOf(item);
            return (
              <div key={originalIndex} className="relative group">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full aspect-square object-cover rounded-xl border border-border"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(originalIndex)}
                    className="p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="inline-block px-2 py-1 bg-black/70 text-white text-xs rounded-md">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

function AddPhotoForm({
  onAdd,
  onCancel,
}: {
  onAdd: (item: GalleryItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<GalleryItem>({ src: "", tag: "Education", alt: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.src || !formData.alt) return;
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageInput
        value={formData.src}
        onChange={(val) => setFormData({ ...formData, src: val })}
      />

      <div>
        <label className="block text-sm font-medium mb-2">Tag</label>
        <select
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {GALLERY_TAGS.filter((t) => t !== "All").map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Alt Text</label>
        <input
          type="text"
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Add Photo
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
  );
}
