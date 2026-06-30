import { createFileRoute, Link } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Users,
  FolderKanban,
  Image as ImageIcon,
  ExternalLink,
  MessageCircle,
  Settings as SettingsIcon,
  Heart,
  Calendar,
  Quote,
  TrendingUp,
  User as UserIcon,
  Building2,
  FileText,
} from "lucide-react";
import {
  useProjectsStore,
  useGalleryStore,
  useVolunteersStore,
  useMessagesStore,
  useSettingsStore,
  useDonationsStore,
  useActivitiesStore,
  useTestimonialsStore,
  useImpactStatsStore,
  useLeadersStore,
  usePartnersStore,
  useEventsStore,
  useBlogStore,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminDashboard() {
  const { data: projects, loading: projectsLoading } = useProjectsStore();
  const { data: gallery, loading: galleryLoading } = useGalleryStore();
  const { data: volunteers, loading: volunteersLoading } = useVolunteersStore();
  const { data: messages, loading: messagesLoading } = useMessagesStore();
  const { data: settings, loading: settingsLoading } = useSettingsStore();
  const { data: donations, loading: donationsLoading } = useDonationsStore();
  const { data: activities, loading: activitiesLoading } = useActivitiesStore();
  const { data: testimonials, loading: testimonialsLoading } = useTestimonialsStore();
  const { data: impactStats, loading: impactStatsLoading } = useImpactStatsStore();
  const { data: leaders, loading: leadersLoading } = useLeadersStore();
  const { data: partners, loading: partnersLoading } = usePartnersStore();
  const { data: events, loading: eventsLoading } = useEventsStore();
  const { data: blog, loading: blogLoading } = useBlogStore();

  const loading =
    projectsLoading ||
    galleryLoading ||
    volunteersLoading ||
    messagesLoading ||
    settingsLoading ||
    donationsLoading ||
    activitiesLoading ||
    testimonialsLoading ||
    impactStatsLoading ||
    leadersLoading ||
    partnersLoading ||
    eventsLoading ||
    blogLoading;

  const unread = messages.filter((m) => !m.read).length;
  const pendingDonations = donations.filter((d) => d.status === "pending").length;

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Hi ${settings.whatsappName}, this is an update from the Baroda Youth Federation admin panel.`,
  )}`;

  const stats = [
    { icon: FolderKanban, label: "Projects", value: projects.length, color: "text-primary" },
    { icon: ImageIcon, label: "Gallery Photos", value: gallery.length, color: "text-secondary" },
    { icon: Calendar, label: "Events", value: events.length, color: "text-accent" },
    { icon: FileText, label: "Blog Posts", value: blog.length, color: "text-primary" },
    { icon: Calendar, label: "Activities", value: activities.length, color: "text-secondary" },
    { icon: Quote, label: "Testimonials", value: testimonials.length, color: "text-accent" },
    { icon: TrendingUp, label: "Impact Stats", value: impactStats.length, color: "text-primary" },
    { icon: UserIcon, label: "Leaders", value: leaders.length, color: "text-secondary" },
    { icon: Building2, label: "Partners", value: partners.length, color: "text-accent" },
    { icon: Heart, label: "Donations", value: donations.length, color: "text-destructive" },
    { icon: Users, label: "Volunteer Forms", value: volunteers.length, color: "text-accent" },
    { icon: MessageSquare, label: `Messages (${unread} new)`, value: messages.length, color: "text-destructive" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Welcome to the Baroda Youth Federation Admin Panel</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-20 sm:h-24 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-3 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <s.icon className={`h-5 w-5 sm:h-7 sm:w-7 ${s.color}`} />
                  <span className="text-xl sm:text-2xl font-bold">{s.value}</span>
                </div>
                <p className="text-[10px] sm:text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <QuickLink to="/admin/projects" icon={FolderKanban} title="Manage Projects" desc="Create and manage projects" />
            <QuickLink to="/admin/gallery" icon={ImageIcon} title="Gallery" desc="Upload and organize images" />
            <QuickLink to="/admin/events" icon={Calendar} title="Events" desc={`${events.length} event${events.length === 1 ? "" : "s"}`} />
            <QuickLink to="/admin/blog" icon={FileText} title="Blog" desc={`${blog.length} post${blog.length === 1 ? "" : "s"}`} />
            <QuickLink to="/admin/activities" icon={Calendar} title="Activities" desc="Manage activity listings" />
            <QuickLink to="/admin/donations" icon={Heart} title="View Donations" desc={`${pendingDonations} pending`} />
            <QuickLink to="/admin/volunteers" icon={Users} title="View Volunteers" desc={`${volunteers.length} submission${volunteers.length === 1 ? "" : "s"}`} />
            <QuickLink to="/admin/messages" icon={MessageSquare} title="View Messages" desc={`${unread} unread`} />
            <QuickLink to="/admin/testimonials" icon={Quote} title="Testimonials" desc="Manage volunteer quotes" />
            <QuickLink to="/admin/impact-stats" icon={TrendingUp} title="Impact Stats" desc="Update homepage numbers" />
            <QuickLink to="/admin/leaders" icon={UserIcon} title="Leadership" desc="Manage team profiles" />
            <QuickLink to="/admin/partners" icon={Building2} title="Partners" desc="Manage sponsors list" />
            <QuickLink to="/admin/settings" icon={SettingsIcon} title="Site Settings" desc="Contact info and social links" />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-green-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mb-2 sm:mb-3" />
              <h3 className="font-semibold text-sm sm:text-base mb-1">WhatsApp Update</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Message {settings.whatsappName}</p>
            </a>
          </div>
        </div>

        {settings.founderPortfolioUrl && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">Founder Portfolio</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">View Rukmil Shah&apos;s personal portfolio</p>
              </div>
              <a
                href={settings.founderPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors block"
    >
      <Icon className="h-6 w-6 text-primary mb-3" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </Link>
  );
}
