import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useEventsStore, useBlogStore, type EventItem, type BlogItem } from "@/lib/admin-store";
import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, FileText } from "lucide-react";
import { ImageInput } from "@/components/admin/ImageInput";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
  beforeLoad: () => {
    if (!checkAdminAuth()) throw redirect({ to: "/admin" });
  },
});

type Tab = "events" | "blog";

function AdminEvents() {
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [events, setEvents] = useEventsStore();
  const [blog, setBlog] = useBlogStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const list = activeTab === "events" ? events : blog;

  const handleDelete = (index: number) => {
    if (!confirm(`Delete this ${activeTab === "events" ? "event" : "blog post"}?`)) return;
    if (activeTab === "events") setEvents(events.filter((_, i) => i !== index));
    else setBlog(blog.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleSaveEvent = (item: EventItem) => {
    if (editingIndex !== null) {
      setEvents(events.map((e, i) => (i === editingIndex ? item : e)));
    } else {
      setEvents([item, ...events]);
    }
    setShowAddForm(false);
    setEditingIndex(null);
  };

  const handleSaveBlog = (item: BlogItem) => {
    if (editingIndex !== null) {
      setBlog(blog.map((b, i) => (i === editingIndex ? item : b)));
    } else {
      setBlog([item, ...blog]);
    }
    setShowAddForm(false);
    setEditingIndex(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Events & Blog</h1>
            <p className="text-muted-foreground">Manage events and blog posts</p>
          </div>
          <button
            onClick={() => {
              setEditingIndex(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add {activeTab === "events" ? "Event" : "Blog Post"}
          </button>
        </div>

        <div className="flex gap-2">
          <TabBtn active={activeTab === "events"} onClick={() => { setActiveTab("events"); setShowAddForm(false); }}>
            <Calendar className="h-4 w-4" /> Events
          </TabBtn>
          <TabBtn active={activeTab === "blog"} onClick={() => { setActiveTab("blog"); setShowAddForm(false); }}>
            <FileText className="h-4 w-4" /> Blog
          </TabBtn>
        </div>

        {showAddForm && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit" : "Add"} {activeTab === "events" ? "Event" : "Blog Post"}
            </h2>
            {activeTab === "events" ? (
              <EventForm
                initial={editingIndex !== null ? events[editingIndex] : undefined}
                onSave={handleSaveEvent}
                onCancel={() => { setShowAddForm(false); setEditingIndex(null); }}
              />
            ) : (
              <BlogForm
                initial={editingIndex !== null ? blog[editingIndex] : undefined}
                onSave={handleSaveBlog}
                onCancel={() => { setShowAddForm(false); setEditingIndex(null); }}
              />
            )}
          </div>
        )}

        <div className="grid gap-4">
          {list.length === 0 && (
            <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
              No {activeTab === "events" ? "events" : "blog posts"} yet.
            </div>
          )}
          {list.map((item, index) => {
            const isEvent = "location" in item;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 min-w-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    {isEvent ? (
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date((item as EventItem).date).toLocaleDateString()} ·{" "}
                        {(item as EventItem).upcoming ? "Upcoming" : "Past"}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-2">
                        {(item as BlogItem).category} · {(item as BlogItem).read} read
                      </p>
                    )}
                    <p className="text-sm line-clamp-2">
                      {isEvent ? (item as EventItem).description : (item as BlogItem).excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function EventForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: EventItem;
  onSave: (item: EventItem) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState<EventItem>(
    initial ?? { title: "", date: "", location: "", description: "", image: "", upcoming: true },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title || !data.date) return;
    onSave(data);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} required />
        <Field label="Date" type="date" value={data.date} onChange={(v) => setData({ ...data, date: v })} required />
        <Field label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
        <div className="flex items-center gap-2 pt-7">
          <input
            type="checkbox"
            id="upcoming"
            checked={data.upcoming}
            onChange={(e) => setData({ ...data, upcoming: e.target.checked })}
          />
          <label htmlFor="upcoming" className="text-sm font-medium">Upcoming event</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      <ImageInput value={data.image} onChange={(v) => setData({ ...data, image: v })} />
      <FormButtons onCancel={onCancel} />
    </form>
  );
}

function BlogForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: BlogItem;
  onSave: (item: BlogItem) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState<BlogItem>(
    initial ?? {
      slug: "",
      title: "",
      excerpt: "",
      category: "Success Stories",
      date: new Date().toISOString().slice(0, 10),
      image: "",
      read: "5 min",
    },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title || !data.slug) return;
    onSave(data);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Slug" value={data.slug} onChange={(v) => setData({ ...data, slug: v })} required />
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option>Success Stories</option>
            <option>Activities</option>
            <option>Community Impact</option>
            <option>Volunteer Experiences</option>
          </select>
        </div>
        <Field label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} required />
        <Field label="Date" type="date" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
        <Field label="Read time" value={data.read} onChange={(v) => setData({ ...data, read: v })} placeholder="5 min" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => setData({ ...data, excerpt: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      <ImageInput value={data.image} onChange={(v) => setData({ ...data, image: v })} />
      <FormButtons onCancel={onCancel} />
    </form>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

function FormButtons({ onCancel }: { onCancel: () => void }) {
  return (
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
  );
}
