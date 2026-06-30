import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

function statGridClass(idx: number, total: number) {
  return cn(
    "text-center",
    total % 2 !== 0 && idx === total - 1 && "sm:col-span-2 md:col-span-1",
  );
}

function StatsGrid({ stats }: { stats: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((s, idx) => {
        let numericValue = 0;
        const valueStr = String(s.value).toUpperCase();

        if (valueStr.includes("K")) {
          numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, "")) * 1000;
        } else if (valueStr.includes("L")) {
          numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, "")) * 100000;
        } else if (valueStr.includes("CR")) {
          numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, "")) * 10000000;
        } else {
          numericValue = parseFloat(valueStr.replace(/[^0-9.]/g, ""));
        }

        return (
          <motion.div
            key={s.id ?? idx}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.07, duration: 0.5 }}
            className={statGridClass(idx, stats.length)}
          >
            <div
              className={cn(
                "font-display text-2xl font-bold leading-none sm:text-3xl md:text-4xl",
                s.color === "secondary"
                  ? "text-secondary"
                  : s.color === "accent"
                    ? "text-accent"
                    : "text-primary",
              )}
            >
              <Counter value={numericValue || 0} suffix={s.suffix || ""} />
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm md:normal-case md:tracking-normal">
              {s.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ImpactStats({ overlap = true }: { overlap?: boolean }) {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    api
      .getImpactStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch impact stats:", error);
        setLoading(false);
      });
  }, []);

  const sectionClass = cn(
    "relative",
    overlap ? "-mt-14 z-20" : "z-10 pt-10",
  );

  if (loading) {
    return (
      <section className={sectionClass}>
        <div className="container-page">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-10 w-16 mx-auto bg-muted rounded" />
                  <div className="h-4 w-20 mx-auto bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass}>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "rounded-3xl bg-card p-6 shadow-glow md:p-10",
            isInView && "border border-border"
          )}
        >
          <StatsGrid stats={stats} />
        </motion.div>
      </div>
    </section>
  );
}
