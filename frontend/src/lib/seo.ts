import { ORG } from "@/lib/site-data";

/** Trim trailing slash — used for canonical URLs, sitemap, and Open Graph. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const DEFAULT_DESCRIPTION =
  "BYF is a Vadodara-based youth nonprofit working in education, women's health, disaster relief and rural welfare since 2014.";

export const SITEMAP_ENTRIES = [
  { path: "/", changefreq: "weekly" as const, priority: "1.0" },
  { path: "/about", changefreq: "monthly" as const, priority: "0.9" },
  { path: "/projects", changefreq: "weekly" as const, priority: "0.9" },
  { path: "/gallery", changefreq: "weekly" as const, priority: "0.7" },
  { path: "/events", changefreq: "weekly" as const, priority: "0.8" },
  { path: "/blog", changefreq: "weekly" as const, priority: "0.8" },
  { path: "/volunteer", changefreq: "monthly" as const, priority: "0.9" },
  { path: "/donate", changefreq: "monthly" as const, priority: "1.0" },
  { path: "/contact", changefreq: "monthly" as const, priority: "0.7" },
];

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return SITE_URL ? `${SITE_URL}${normalized}` : normalized;
}

export function ogImageUrl(path: string = DEFAULT_OG_IMAGE): string {
  return absoluteUrl(path);
}

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  keywords?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function createPageSeo({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  keywords,
  jsonLd,
}: PageSeoOptions) {
  const url = absoluteUrl(path);
  const image = ogImageUrl(ogImage);

  const meta = [
    { title },
    { name: "description", content: description },
    ...(keywords?.length ? [{ name: "keywords", content: keywords.join(", ") }] : []),
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:site_name", content: ORG.name },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: `${ORG.name} — ${ORG.tagline}` },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@BarodaYouth" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  const links = [{ rel: "canonical" as const, href: url }];

  const scripts = jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ]
    : [];

  return { meta, links, scripts };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORG.name,
    alternateName: ORG.short,
    url: SITE_URL || undefined,
    logo: SITE_URL ? absoluteUrl("/favicon.png") : undefined,
    description: DEFAULT_DESCRIPTION,
    slogan: ORG.tagline,
    foundingDate: "2014",
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vadodara",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: Object.values(ORG.social),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG.name,
    url: SITE_URL || undefined,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "NGO",
      name: ORG.name,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
