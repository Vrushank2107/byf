import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

interface Event {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete event?",
      description: "Are you sure you want to delete this event? This action cannot be undone.",
    });
    if (!ok) return;
    setEvents(events.filter((e) => e.id !== id));
    toast.success("Event deleted");
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowAddForm(true);
  };

  const handleSave = async (event: Event) => {
    if (editingEvent && editingEvent.id) {
      setEvents(events.map((e) => (e.id === editingEvent.id ? { ...event, id: editingEvent.id } : e)));
      toast.success("Event updated");
    } else {
      const newEvent = { ...event, id: Date.now().toString() };
      setEvents([...events, newEvent]);
      toast.success("Event created");
    }
    setShowAddForm(false);
    setEditingEvent(null);
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground">Manage your events</p>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>

        {showAddForm && (
          <EventForm
            event={editingEvent}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingEvent(null);
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
          ) : events.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No events yet</h3>
              <p className="text-muted-foreground">Create your first event to get started</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 min-w-0">
                  <img src={event.image} alt={event.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id || '')}
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

function EventForm({
  event,
  onSave,
  onCancel,
}: {
  event: Event | null;
  onSave: (data: Event) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Event>(
    event || {
      title: "",
      date: "",
      location: "",
      description: "",
      image: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) return;
    onSave(formData);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-display text-xl font-semibold mb-4">
        {event ? "Edit Event" : "Add Event"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              placeholder="e.g., Vadodara, Gujarat"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            rows={4}
            required
          />
        </div>
        <ImageInput
          label="Image"
          value={formData.image}
          onChange={(image) => setFormData({ ...formData, image })}
          folder="events"
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
