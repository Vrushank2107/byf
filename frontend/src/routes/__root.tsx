import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/layout/SiteLayout";

function NotFoundComponent() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-[110px] font-bold leading-none gradient-text">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Go home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Baroda Youth Federation — Together We Can, Together We Care" },
      { name: "description", content: "BYF is a Vadodara-based youth nonprofit working in education, women's health, disaster relief and rural welfare since 2014." },
      { name: "author", content: "Baroda Youth Federation" },
      { name: "theme-color", content: "#1E3A8A" },
      { property: "og:title", content: "Baroda Youth Federation — Together We Can, Together We Care" },
      { property: "og:description", content: "BYF is a Vadodara-based youth nonprofit working in education, women's health, disaster relief and rural welfare since 2014." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Baroda Youth Federation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@BYF" },
      { name: "twitter:title", content: "Baroda Youth Federation — Together We Can, Together We Care" },
      { name: "twitter:description", content: "BYF is a Vadodara-based youth nonprofit working in education, women's health, disaster relief and rural welfare since 2014." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de4e7556-fd01-4bee-a844-77de4f6e9b31/id-preview-099a39f5--943bcba4-54e4-41f2-9e3f-e7b40ece6b61.lovable.app-1782403992123.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de4e7556-fd01-4bee-a844-77de4f6e9b31/id-preview-099a39f5--943bcba4-54e4-41f2-9e3f-e7b40ece6b61.lovable.app-1782403992123.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
    scripts: [
      { src: "https://checkout.razorpay.com/v1/checkout.js", async: true },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      {isAdminRoute ? (
        <Outlet />
      ) : (
        <SiteLayout>
          <Outlet />
        </SiteLayout>
      )}
    </QueryClientProvider>
  );
}
