import { Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Calendar, MessageSquare, Users, LogOut, ExternalLink } from "lucide-react";
import { logoutAdmin } from "@/lib/admin-auth";

const ADMIN_NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/events", label: "Events & Blogs", icon: Calendar },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/volunteers", label: "Volunteers", icon: Users },
] as const;

export function AdminLayout() {
  const handleLogout = () => {
    logoutAdmin();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold gradient-text">BYF Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-background transition-colors [&.active]:bg-primary [&.active]:text-primary-foreground"
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
