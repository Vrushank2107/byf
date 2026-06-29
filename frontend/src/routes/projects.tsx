import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { type ProjectCategory, IMG, PROJECT_CATEGORY_OPTIONS, PROJECT_CUSTOM_CATEGORY_OPTION } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  ...PROJECT_CATEGORY_OPTIONS,
  PROJECT_CUSTOM_CATEGORY_OPTION,
];

export const Route = createFileRoute("/projects")({
  head: () =>
    createPageSeo({
      title: "Projects — Baroda Youth Federation",
      description:
        "Education, women's health, disaster relief, community welfare and cultural projects run by Baroda Youth Federation in Vadodara.",
      path: "/projects",
      keywords: ["Baroda Youth Federation projects", "education NGO Vadodara", "disaster relief Gujarat", "women empowerment NGO"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
    }),
  component: ProjectsPage,
});

function normalizeProjectCategory(category: string | undefined): ProjectCategory | null {
  if (!category) return null;

  const normalized = category.trim();
  const mapping: Record<string, ProjectCategory> = {
    Education: "Education",
    "Women Empowerment": "Women Empowerment",
    "WomenEmpowerment": "Women Empowerment",
    CommunityWelfare: "Community Welfare",
    "Community Welfare": "Community Welfare",
    DisasterRelief: "Disaster Relief",
    "Disaster Relief": "Disaster Relief",
    CulturalActivities: "Cultural Activities",
    "Cultural Activities": "Cultural Activities",
  };

  return mapping[normalized] ?? null;
}

function ProjectsPage() {
  const [filter, setFilter] = useState<(ProjectCategory | "All")>("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    api.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch projects:', error);
      setLoading(false);
    });

    api.getSettings().then((data) => {
      setSiteSettings(data);
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });
  }, []);

  const visible = filter === "All"
    ? projects
    : projects.filter((p) => normalizeProjectCategory(p.category) === filter || p.category === filter);
  const heroImage = siteSettings?.projectsHeroImage ? imageUrl(siteSettings.projectsHeroImage) : IMG.pNotebooks;

  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Our Projects"
          title={<>Multiple programs, <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">one mission.</span></>}
          description="Filter by category to explore each project's scale, impact and progress."
          image={heroImage}
        />
        <section className="section-y">
          <div className="container-page">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {CATEGORIES.map((c) => (
                <Skeleton key={c} className="h-10 w-24 rounded-full" />
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="flex flex-1 flex-col p-6">
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3 mb-4" />
                    <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                      <div>
                        <Skeleton className="h-6 w-16 mb-2" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-16 mb-2" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                    <div className="mt-5">
                      <Skeleton className="h-3 w-12 mb-2" />
                      <Skeleton className="h-1.5 w-full rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title={<>Multiple programs, <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">one mission.</span></>}
        description="Filter by category to explore each project's scale, impact and progress."
        image={IMG.pNotebooks}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, idx) => (
              <Link
                key={p.slug}
                to="/project/$slug"
                params={{ slug: p.slug }}
              >
                <motion.article
                  id={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.45 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={imageUrl(p.image)} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {p.category}
                    </span>
                    <h3 className="absolute inset-x-4 bottom-4 font-display text-xl font-bold text-white">{p.title}</h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                      {p.stats.map((s: any) => (
                        <div key={s.label}>
                          <div className="font-display text-lg font-bold text-foreground">{s.value}</div>
                          <div className="text-xs text-muted-foreground">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <span>Progress</span>
                        <span className="text-primary">{p.progress}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full gradient-warm" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                    {p.fullStory && (
                      <div className="mt-6 inline-flex w-fit items-center gap-1.5 self-start text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                        Read full story
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
