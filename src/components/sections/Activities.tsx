import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { ACTIVITIES } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Activities() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionHeader
          eyebrow="Latest Activities"
          title={<>This month at <span className="gradient-text">BYF.</span></>}
          description="A small snapshot of what 450 active volunteers have been up to."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((a, idx) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="min-w-0 flex-1 py-1">
                <span className="inline-flex items-center rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {a.tag}
                </span>
                <h3 className="mt-1.5 line-clamp-2 font-display text-sm font-semibold text-foreground">{a.title}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {a.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
