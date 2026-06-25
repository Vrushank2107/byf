import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          eyebrow="Voices"
          title={<>Stories from the <span className="gradient-text">people we serve.</span></>}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <Quote className="h-8 w-8 text-secondary/40" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <img src={t.image} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-soft" />
                <div>
                  <div className="font-display font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
