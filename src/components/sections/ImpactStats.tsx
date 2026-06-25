import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { IMPACT_STATS } from "@/lib/site-data";

export function ImpactStats() {
  return (
    <section className="relative -mt-14 z-20 px-5">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-glow md:p-10"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {IMPACT_STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className={`font-display text-3xl font-bold leading-none md:text-4xl ${
                    s.color === "secondary" ? "text-secondary" : s.color === "accent" ? "text-accent" : "text-primary"
                  }`}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm md:normal-case md:tracking-normal">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
