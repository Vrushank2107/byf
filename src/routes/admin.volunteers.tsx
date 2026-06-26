import { createFileRoute, Navigate } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Users, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/volunteers")({
  component: AdminVolunteers,
  beforeLoad: () => {
    if (!checkAdminAuth()) {
      throw new Navigate({ to: "/admin" });
    }
  },
});

function AdminVolunteers() {
  // In a real app, this would fetch from a database
  const [volunteers] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      area: "Alkapuri",
      availability: "Weekends",
      interests: ["Education", "Events"],
      submittedAt: "2025-01-15",
    },
    {
      id: 2,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 87654 32109",
      area: "Gotri",
      availability: "Weekdays",
      interests: ["Roti Bank", "Disaster Relief"],
      submittedAt: "2025-01-18",
    },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Volunteer Forms</h1>
          <p className="text-muted-foreground">View submitted volunteer applications</p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {volunteers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No volunteer forms submitted yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {volunteers.map((volunteer) => (
                <div key={volunteer.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted on {new Date(volunteer.submittedAt).toLocaleDateString()}
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
                      <span>{volunteer.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.availability}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
