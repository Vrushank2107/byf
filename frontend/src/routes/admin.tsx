import { createFileRoute, Outlet } from "@tanstack/react-router";
import { createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () =>
    createPageSeo({
      title: "Admin — Baroda Youth Federation",
      description: "BYF admin dashboard.",
      path: "/admin",
      noindex: true,
    }),
  component: AdminRouteLayout,
  ssr: false,
});

function AdminRouteLayout() {
  return <Outlet />;
}
