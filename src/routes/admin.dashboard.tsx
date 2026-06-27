import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FolderKanban,
  Calendar,
  Image as ImageIcon,
  ExternalLink,
  MessageCircle,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  useProjectsStore,
  useGalleryStore,
  useEventsStore,
  useBlogStore,
  useVolunteersStore,
  useMessagesStore,
  useSettingsStore,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
  beforeLoad: () => {
    if (!checkAdminAuth()) throw redirect({ to: "/admin" });
  },
});

function AdminDashboard() {
  const [projects] = useProjectsStore();
  const [gallery] = useGalleryStore();
  const [events] = useEventsStore();
  const [blog] = useBlogStore();
  const [volunteers] = useVolunteersStore();
  const [messages] = useMessagesStore();
  const [settings] = useSettingsStore();

  const unread = messages.filter((m) => !m.read).length;
  const upcoming = events.filter((e) => e.upcoming).length;

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Hi ${settings.whatsappName}, this is an update from the BYF admin panel.`,
  )}`;

  const stats = [
    { icon: FolderKanban, label: "Projects", value: projects.length, color: "text-primary" },
    { icon: ImageIcon, label: "Gallery Photos", value: gallery.length, color: "text-secondary" },
    { icon: Calendar, label: "Upcoming Events", value: upcoming, color: "text-accent" },
    { icon: LayoutDashboard, label: "Blog Posts", value: blog.length, color: "text-primary" },
    { icon: Users, label: "Volunteer Forms", value: volunteers.length, color: "text-accent" },
    { icon: MessageSquare, label: `Messages (${unread} new)`, value: messages.length, color: "text-destructive" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the BYF Admin Panel</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-7 w-7 ${s.color}`} />
                <span className="text-2xl font-bold">{s.value}</span>
              </div>
              <p className="text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickLink href="/admin/projects" icon={FolderKanban} title="Add New Project" desc="Create and manage projects" />
            <QuickLink href="/admin/gallery" icon={ImageIcon} title="Add Gallery Photo" desc="Upload new images" />
            <QuickLink href="/admin/events" icon={Calendar} title="Add Event / Blog" desc="Schedule events and posts" />
            <QuickLink href="/admin/volunteers" icon={Users} title="View Volunteers" desc={`${volunteers.length} submission${volunteers.length === 1 ? "" : "s"}`} />
            <QuickLink href="/admin/messages" icon={MessageSquare} title="View Messages" desc={`${unread} unread`} />
            <QuickLink href="/admin/settings" icon={SettingsIcon} title="Site Settings" desc="Social links, WhatsApp, portfolio" />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-green-500 transition-colors"
            >
              <MessageCircle className="h-6 w-6 text-green-500 mb-3" />
              <h3 className="font-semibold mb-1">WhatsApp Update</h3>
              <p className="text-sm text-muted-foreground">Message {settings.whatsappName}</p>
            </a>
          </div>
        </div>

        {settings.founderPortfolioUrl && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-semibold mb-1">Founder Portfolio</h3>
                <p className="text-sm text-muted-foreground">View Rukmil Shah's personal portfolio</p>
              </div>
              <a
                href={settings.founderPortfolioUrl}
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

function QuickLink({
  href,
  icon: Icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <a
      href={href}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors block"
    >
      <Icon className="h-6 w-6 text-primary mb-3" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </a>
  );
}
