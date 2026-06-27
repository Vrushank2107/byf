import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTestimonials().then((data) => {
      setTestimonials(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch testimonials:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="section-y">
        <div className="container-page">
          <SectionHeader eyebrow="Voices" title={<>Stories from the <span className="gradient-text">people we serve.</span></>} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <div className="h-8 w-8 bg-muted rounded mb-4" />
                <div className="mt-4 flex-1 space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="h-12 w-12 bg-muted rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          eyebrow="Voices"
          title={<>Stories from the <span className="gradient-text">people we serve.</span></>}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.id}
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
