 import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, Calendar, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useEventsStore, type EventItem } from "@/lib/admin-store";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminEvents() {
  const { data: events, loading, refresh } = useEventsStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirmDialog();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAddForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAddForm]);

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete event?",
      description: "Are you sure you want to delete this event? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteEvent(id);
      refresh();
      toast.success("Event deleted");
    } catch (error) {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event');
    }
  };

  const handleEdit = (event: EventItem) => {
    setEditingEvent(event);
    setShowAddForm(true);
  };

  const handleSave = async (event: EventItem) => {
    if (!event.image) {
      await confirm({
        title: "Image required",
        description: "Please upload a photo before saving.",
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
      return;
    }

    if (event.image.startsWith("data:")) {
      await confirm({
        title: "Image still uploading",
        description: "Wait for the upload to finish, then try saving again.",
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
      return;
    }

    setSaving(true);
    try {
      if (editingEvent && editingEvent.id) {
        await api.updateEvent(editingEvent.id, event);
        toast.success("Event updated");
      } else {
        await api.createEvent(event);
        toast.success("Event created");
      }
      setShowAddForm(false);
      setEditingEvent(null);
      refresh();
    } catch (error) {
      console.error('Failed to save event:', error);
      const message = error instanceof Error ? error.message : "Failed to save event";
      await confirm({
        title: "Could not save event",
        description: message,
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Events</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your events</p>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Event</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {showAddForm && (
          <div ref={formRef} className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg sm:text-xl font-semibold">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingEvent(null);
                }}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <EventForm
              event={editingEvent}
              saving={saving}
              onSave={handleSave}
              onCancel={() => {
                setShowAddForm(false);
                setEditingEvent(null);
              }}
            />
          </div>
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
          ) : events.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 sm:p-12 text-center">
              <Calendar className="h-10 sm:h-12 w-10 sm:w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2">No events yet</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Create your first event to get started</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="flex gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                  <img src={event.image} alt={event.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-foreground">{event.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => event.id && handleDelete(event.id)}
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
  saving,
  onSave,
  onCancel,
}: {
  event: EventItem | null;
  saving: boolean;
  onSave: (data: EventItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<EventItem>(
    event || {
      title: "",
      date: "",
      location: "",
      description: "",
      image: "",
      upcoming: false,
    }
  );

  useEffect(() => {
    if (event) {
      // Convert ISO date to yyyy-MM-dd format for date input
      const dateForInput = event.date ? event.date.split('T')[0] : '';
      setFormData({ ...event, date: dateForInput });
    } else {
      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
        image: "",
        upcoming: false,
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) return;
    // Convert yyyy-MM-dd to ISO format for backend
    const isoDate = new Date(formData.date).toISOString();
    onSave({ ...formData, date: isoDate });
  };

  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
  );
}
