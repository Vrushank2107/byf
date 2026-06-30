import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { IMG } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () =>
    createPageSeo({
      title: "Events — Baroda Youth Federation events",
      description: "Join the next Baroda Youth Federation event in Vadodara. Notebook drives, blanket distribution, JoyCation, festivals and more.",
      path: "/events",
      keywords: ["Baroda Youth Federation events", "NGO events Vadodara", "community drives Gujarat"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
      ]),
    }),
  component: EventsPage,
});

function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(IMG.flag);
  
  useEffect(() => {
    Promise.all([
      api.getEvents().then((data) => {
        setEvents(data);
        setLoading(false);
      }).catch((error) => {
        console.error('Failed to fetch events:', error);
        setLoading(false);
      }),
      api.getSettings().then((data) => {
        if (data.eventsHeroImage) {
          setHeroImage(imageUrl(data.eventsHeroImage));
        }
      }).catch((error) => {
        console.error('Failed to fetch site settings:', error);
      }),
    ]);
  }, []);

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
        image={heroImage}
      />

      <section className="section-y">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-3xl border border-border bg-muted animate-pulse" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No events yet</h3>
              <p className="text-muted-foreground">Check back soon for upcoming events</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((ev: any, idx: number) => {
                const { day, month } = monthLabel(ev.date);
                return (
                  <motion.article
                    key={ev.id}
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
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
