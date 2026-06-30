import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { useState, useEffect } from "react";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects().then((data) => {
      const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setProjects(sorted.slice(0, 6));
      setLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch projects:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="section-y">
        <div className="container-page">
          <div className="text-center py-8">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow="Featured Projects"
            title={<>Real work, <span className="gradient-text">real outcomes.</span></>}
            description="Each of these projects has been running for years and is measured against numbers we publish openly."
          />
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <Link
              key={p.id}
              to="/project/$slug"
              params={{ slug: p.slug }}
            >
              <motion.article
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.05, duration: 0.55 }}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={imageUrl(p.image)}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                  <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                    {p.stats.map((s: any) => (
                      <div key={s.label}>
                        <div className="font-display text-base font-bold text-foreground">{s.value}</div>
                        <div className="mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <span>Progress</span>
                      <span className="text-primary">{p.progress}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full gradient-warm"
                      />
                    </div>
                  </div>
                  {p.fullStory && (
                    <div className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                      View full story
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
  );
}
