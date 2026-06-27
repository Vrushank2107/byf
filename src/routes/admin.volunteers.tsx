import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Users, Mail, Phone, MapPin, Calendar, Trash2, FileText } from "lucide-react";
import { useVolunteersStore } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/volunteers")({
  component: AdminVolunteers,
  beforeLoad: () => {
    if (!checkAdminAuth()) throw redirect({ to: "/admin" });
  },
});

function AdminVolunteers() {
  const [volunteers, setVolunteers] = useVolunteersStore();

  const handleDelete = (id: string) => {
    if (confirm("Delete this volunteer submission?")) {
      setVolunteers(volunteers.filter((v) => v.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Volunteer Submissions</h1>
          <p className="text-muted-foreground">
            {volunteers.length} application{volunteers.length === 1 ? "" : "s"} received
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {volunteers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No volunteer forms submitted yet</p>
              <p className="text-xs text-muted-foreground mt-2">
                Submissions from the public Volunteer page will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {volunteers.map((volunteer) => (
                <div key={volunteer.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted {new Date(volunteer.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${volunteer.email}`}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        title="Send email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href={`tel:${volunteer.phone}`}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(volunteer.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.availability}</span>
                    </div>
                    {volunteer.resumeName && (
                      <div className="flex items-center gap-2 md:col-span-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Resume attached: {volunteer.resumeName}</span>
                      </div>
                    )}
                  </div>

                  {volunteer.skills && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-1">Skills / Interests:</p>
                      <p className="text-sm text-muted-foreground">{volunteer.skills}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
