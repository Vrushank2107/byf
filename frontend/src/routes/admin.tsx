import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminRouteLayout,
  ssr: false,
});

function AdminRouteLayout() {
  return <Outlet />;
}
