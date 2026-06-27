import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EVENTS, IMG } from "@/lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Upcoming & past BYF events" },
      { name: "description", content: "Join the next BYF event in Vadodara. Notebook drives, blanket distribution, JoyCation, festivals and more." },
      { property: "og:title", content: "Events — BYF" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = EVENTS.filter((e) => (tab === "upcoming" ? e.upcoming : !e.upcoming));

  const monthLabel = (iso: string) => {
    const d = new Date(iso);
    return { day: d.getDate(), month: d.toLocaleString("en-US", { month: "short" }) };
  };

  return (
    <>
      <PageHero
        eyebrow="Events"
        title={<>Show up. <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Be the change.</span></>}
        description="From notebook drives to festival celebrations — every event is open to volunteers and donors."
        image={IMG.flag}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto flex w-fit items-center rounded-full border border-border bg-card p-1.5 shadow-soft">
            {(["upcoming", "past"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${
                  tab === t ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((ev, idx) => {
              const { day, month } = monthLabel(ev.date);
              return (
                <motion.article
                  key={ev.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.45 }}
                  className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={ev.image} alt={ev.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute left-4 top-4 grid h-16 w-16 place-items-center rounded-2xl bg-white text-center shadow-soft">
                      <div>
                        <div className="font-display text-2xl font-bold leading-none text-primary">{day}</div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{month}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{ev.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ev.description}</p>
                    <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" />{new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-secondary" />{ev.location}</span>
                    </div>
                    {ev.upcoming && (
                      <button className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                        Register Interest
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
