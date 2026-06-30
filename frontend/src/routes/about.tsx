import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Target, Heart, ShieldCheck, Users, Sparkles, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Partners } from "@/components/sections/Partners";
import { IMG, TIMELINE, ORG } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { useState, useEffect } from "react";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    createPageSeo({
      title: "About Baroda Youth Federation — A decade of grassroots work in Vadodara",
      description:
        "How Baroda Youth Federation started in 2017 and grew into a 450-volunteer movement across education, health, relief and culture.",
      path: "/about",
      keywords: ["about Baroda Youth Federation", "Baroda Youth Federation history", "Vadodara NGO", "youth nonprofit Gujarat"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    }),
  component: AboutPage,
});

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "Every rupee is tracked. Audited accounts, public reports, zero overhead on most drives." },
  { icon: Users, title: "Community first", desc: "We listen before we lead. Programs are designed with beneficiaries, not for them." },
  { icon: Heart, title: "Compassion", desc: "Dignity is non-negotiable. We never document people in ways we wouldn't want for ourselves." },
  { icon: Sparkles, title: "Youth energy", desc: "Run by people in their 20s and 30s — moving fast, learning faster." },
];

function AboutPage() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [heroImage, setHeroImage] = useState(IMG.heroEducation);
  const [loadingLeaders, setLoadingLeaders] = useState(true);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    api.getSettings().then((data) => {
      setSiteSettings(data);
      if (data.aboutHeroImage) {
        setHeroImage(imageUrl(data.aboutHeroImage));
      }
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });

    api.getLeaders().then((data) => {
      setLeaders(data);
      setLoadingLeaders(false);
    }).catch((error) => {
      console.error('Failed to fetch leaders:', error);
      setLoadingLeaders(false);
    });

    api.getSettings().then((data) => {
      setSiteSettings(data);
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });
  }, []);

  const resolvedHeroImage = siteSettings?.aboutHeroImage ? imageUrl(siteSettings.aboutHeroImage) : heroImage;

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>A decade of <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">grassroots work.</span></>}
        description="Baroda Youth Federation started in 2017 with eight students and a single Sunday tuition class. Today we're 450 volunteers running programs across five missions."
        image={resolvedHeroImage}
      />

      <section className="section-y">
        <div className="container-page grid items-start gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-glow"
          >
            <img src={IMG.flag} alt="Baroda Youth Federation volunteers with students" className="h-full w-full object-cover" />
          </motion.div>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our story"
              title={<>Built by Vadodara, for <span className="gradient-text">Vadodara.</span></>}
              description="What began as weekend tutoring in two slum pockets is now a city-wide federation reaching thousands of families. We've stayed local, transparent and youth-led on purpose."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-primary text-primary-foreground p-6 shadow-soft">
                <Eye className="h-6 w-6 text-secondary" />
                <h3 className="mt-3 font-display text-lg font-semibold">Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                  A Vadodara where no child goes to bed hungry, cold or uneducated — and where young people lead that change.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Target className="h-6 w-6 text-secondary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Run honest, measurable programs in education, women's health, relief, environment and culture — alongside the people who need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeader eyebrow="Core values" title={<>What we won't <span className="gradient-text">compromise on.</span></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeader eyebrow="Timeline" title={<>Nine years, <span className="gradient-text">one block at a time.</span></>} />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12">
              {TIMELINE.map((t, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                    className={`relative grid items-center gap-6 pl-12 md:grid-cols-2 md:gap-12 md:pl-0`}
                  >
                    <div className="absolute left-4 top-2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-secondary ring-4 ring-background md:left-1/2" />
                    <div className={`${isLeft ? "md:order-1 md:text-right" : "md:order-2"}`}>
                      <span className="font-display text-3xl font-bold text-primary">{t.year}</span>
                      <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{t.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                    </div>
                    <div className={`${isLeft ? "md:order-2" : "md:order-1"} hidden md:block`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeader eyebrow="Leadership" title={<>The people <span className="gradient-text">behind Baroda Youth Federation.</span></>} description="A core team of six leads, supported by 8 program coordinators and 450+ active volunteers." />
          {loadingLeaders ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-3xl border border-border bg-card p-6 space-y-4">
                  <div className="h-20 w-20 bg-muted rounded-2xl" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {leaders.map((p: any, idx: number) => {
                const isFounder = p.role.toLowerCase().includes("founder");
                return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <div className="grid h-20 w-20 place-items-center rounded-2xl gradient-hero font-display text-2xl font-bold text-white">
                    {p.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                  {isFounder && ORG.founderPortfolioUrl && (
                    <a
                      href={ORG.founderPortfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                    >
                      View Founder's Portfolio <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-background pb-10 pt-4">
        <ImpactStats overlap={false} />
      </section>
      <Partners />
    </>
  );
}
