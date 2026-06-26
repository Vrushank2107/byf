import { createFileRoute, Navigate } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EVENTS, BLOG } from "@/lib/site-data";
import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
  beforeLoad: () => {
    if (!checkAdminAuth()) {
      throw new Navigate({ to: "/admin" });
    }
  },
});

function AdminEvents() {
  const [activeTab, setActiveTab] = useState<"events" | "blog">("events");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleDelete = (index: number, type: "events" | "blog") => {
    if (confirm(`Are you sure you want to delete this ${type === "events" ? "event" : "blog post"}?`)) {
      // In a real app, this would update the data source
      console.log("Delete", index, type);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleSave = (item: any) => {
    console.log("Save", item);
    setShowAddForm(false);
    setEditingItem(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Events & Blog</h1>
            <p className="text-muted-foreground">Manage events and blog posts</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add {activeTab === "events" ? "Event" : "Blog Post"}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "events"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Events
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "blog"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            <FileText className="h-4 w-4" />
            Blog
          </button>
        </div>

        {showAddForm && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-xl font-semibold mb-4">
              {editingItem ? `Edit ${activeTab === "events" ? "Event" : "Blog Post"}` : `Add New ${activeTab === "events" ? "Event" : "Blog Post"}`}
            </h2>
            <EventBlogForm
              type={activeTab}
              item={editingItem}
              onSave={handleSave}
              onCancel={() => {
                setShowAddForm(false);
                setEditingItem(null);
              }}
            />
          </div>
        )}

        <div className="grid gap-4">
          {(activeTab === "events" ? EVENTS : BLOG).map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 flex items-start justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {activeTab === "events" && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  )}
                  {activeTab === "blog" && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.category} · {item.read} read
                    </p>
                  )}
                  <p className="text-sm">{item.description || item.excerpt}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(index, activeTab)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function EventBlogForm({
  type,
  item,
  onSave,
  onCancel,
}: {
  type: "events" | "blog";
  item: any;
  onSave: (item: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    item || {
      slug: "",
      title: "",
      date: type === "events" ? "" : "",
      location: type === "events" ? "" : "",
      description: type === "events" ? "" : "",
      excerpt: type === "blog" ? "" : "",
      category: type === "blog" ? "Success Stories" : "",
      image: "",
      upcoming: type === "events" ? true : false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) return;
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
        {type === "events" && (
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        )}
        {type === "blog" && (
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Success Stories">Success Stories</option>
              <option value="Activities">Activities</option>
              <option value="Community Impact">Community Impact</option>
              <option value="Volunteer Experiences">Volunteer Experiences</option>
            </select>
          </div>
        )}
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

      {type === "events" && (
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          {type === "events" ? "Description" : "Excerpt"}
        </label>
        <textarea
          value={formData.description || formData.excerpt}
          onChange={(e) =>
            setFormData(
              type === "events"
                ? { ...formData, description: e.target.value }
                : { ...formData, excerpt: e.target.value }
            )
          }
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image URL</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="/assets/..."
        />
      </div>

      {type === "events" && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="upcoming"
            checked={formData.upcoming}
            onChange={(e) => setFormData({ ...formData, upcoming: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="upcoming" className="text-sm font-medium">
            Upcoming Event
          </label>
        </div>
      )}

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
  );
}
