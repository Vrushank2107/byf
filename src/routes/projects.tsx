import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { PROJECTS, type ProjectCategory, IMG } from "@/lib/site-data";

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Education",
  "Women Empowerment",
  "Community Welfare",
  "Disaster Relief",
  "Cultural Activities",
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Baroda Youth Federation" },
      { name: "description", content: "Education, women's health, disaster relief, community welfare and cultural projects run by BYF in Vadodara." },
      { property: "og:title", content: "Projects — BYF" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<(ProjectCategory | "All")>("All");
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title={<>Eight programs, <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">one mission.</span></>}
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
              <motion.article
                key={p.slug}
                id={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.45 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <h3 className="absolute inset-x-4 bottom-4 font-display text-xl font-bold text-white">{p.title}</h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                    {p.stats.map((s) => (
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
                  <button className="mt-6 inline-flex w-fit items-center gap-1.5 self-start text-sm font-semibold text-primary transition-transform hover:translate-x-0.5">
                    Read full story
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
