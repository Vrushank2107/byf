import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const sitemapLine = SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml` : "";
        const body = `User-agent: *
Allow: /
Disallow: /admin${sitemapLine}
`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
