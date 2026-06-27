import { Outlet, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Calendar,
  Quote,
  TrendingUp,
  User,
  Building2,
  Heart,
} from "lucide-react";
import { logoutAdmin } from "@/lib/admin-auth";
import { Toaster } from "@/components/ui/sonner";

const ADMIN_NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/activities", label: "Activities", icon: Calendar },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/impact-stats", label: "Impact Stats", icon: TrendingUp },
  { to: "/admin/leaders", label: "Leadership", icon: User },
  { to: "/admin/partners", label: "Partners", icon: Building2 },
  { to: "/admin/donations", label: "Donations", icon: Heart },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/volunteers", label: "Volunteers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminLayout({ children }: { children?: ReactNode }) {
  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Toaster />
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold gradient-text">BYF Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline"
              >
                View site →
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-page py-8">
        <div className="flex gap-8">
          <aside className="w-64 shrink-0 hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-background transition-colors"
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">{children ?? <Outlet />}</main>
        </div>
      </div>
    </div>
  );
}
