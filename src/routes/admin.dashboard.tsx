import { createFileRoute, Navigate } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { LayoutDashboard, MessageSquare, Users, FolderKanban, Calendar, Image as ImageIcon, ExternalLink, MessageCircle } from "lucide-react";
import { ORG } from "@/lib/site-data";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
  beforeLoad: () => {
    if (!checkAdminAuth()) {
      throw new Navigate({ to: "/admin" });
    }
  },
});

function AdminDashboard() {
  const whatsappMessage = encodeURIComponent(`Hi Rukmil, this is an update from the BYF admin panel.`);
  const whatsappUrl = `https://wa.me/919723784628?text=${whatsappMessage}`;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the BYF Admin Panel</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FolderKanban className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">8</span>
            </div>
            <p className="text-sm font-medium">Active Projects</p>
            <p className="text-xs text-muted-foreground">Manage and track</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <ImageIcon className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-bold">16</span>
            </div>
            <p className="text-sm font-medium">Gallery Photos</p>
            <p className="text-xs text-muted-foreground">Visual content</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-sm font-medium">Volunteer Forms</p>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="h-8 w-8 text-destructive" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-sm font-medium">Contact Messages</p>
            <p className="text-xs text-muted-foreground">New inquiries</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/projects"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors group"
            >
              <FolderKanban className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Add New Project</h3>
              <p className="text-sm text-muted-foreground">Create and manage projects</p>
            </a>

            <a
              href="/admin/gallery"
              className="bg-card border border-border rounded-xl p-6 hover:border-secondary transition-colors group"
            >
              <ImageIcon className="h-6 w-6 text-secondary mb-3" />
              <h3 className="font-semibold mb-1">Add Gallery Photo</h3>
              <p className="text-sm text-muted-foreground">Upload new images</p>
            </a>

            <a
              href="/admin/events"
              className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors group"
            >
              <Calendar className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Add Event/Blog</h3>
              <p className="text-sm text-muted-foreground">Schedule events and posts</p>
            </a>

            <a
              href="/admin/volunteers"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors group"
            >
              <Users className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">View Volunteers</h3>
              <p className="text-sm text-muted-foreground">Review volunteer forms</p>
            </a>

            <a
              href="/admin/messages"
              className="bg-card border border-border rounded-xl p-6 hover:border-secondary transition-colors group"
            >
              <MessageSquare className="h-6 w-6 text-secondary mb-3" />
              <h3 className="font-semibold mb-1">View Messages</h3>
              <p className="text-sm text-muted-foreground">Check contact inquiries</p>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-green-500 transition-colors group"
            >
              <MessageCircle className="h-6 w-6 text-green-500 mb-3" />
              <h3 className="font-semibold mb-1">WhatsApp Update</h3>
              <p className="text-sm text-muted-foreground">Message Rukmil Shah</p>
            </a>
          </div>
        </div>

        {/* Founder Portfolio Link */}
        {ORG.founderPortfolioUrl && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Founder Portfolio</h3>
                <p className="text-sm text-muted-foreground">View Rukmil Shah's personal portfolio</p>
              </div>
              <a
                href={ORG.founderPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Portfolio
              </a>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
