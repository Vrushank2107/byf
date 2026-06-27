import { motion } from "framer-motion";
import { GraduationCap, Sprout, Heart, Leaf, Sparkles, type LucideIcon } from "lucide-react";
import { MISSIONS } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap, Sprout, Heart, Leaf, Sparkles,
};

export function MissionGrid() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionHeader
          eyebrow="What we do"
          title={<>Five missions, <span className="gradient-text">one community.</span></>}
          description="BYF works across the issues that matter most to Vadodara — and we measure ourselves by lives changed, not press coverage."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {MISSIONS.map((m, idx) => {
            const Icon = ICONS[m.icon];
            return (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div
                  aria-hidden
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity ${
                    idx % 2 === 0 ? "bg-primary/10" : "bg-secondary/15"
                  } group-hover:opacity-80`}
                />
                <div className="relative">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      idx === 0 ? "bg-primary text-white"
                        : idx === 1 ? "bg-accent text-accent-foreground"
                        : idx === 2 ? "bg-secondary text-white"
                        : idx === 3 ? "bg-accent/70 text-accent-foreground"
                        : "bg-primary/90 text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
