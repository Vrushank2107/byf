import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, HandHeart, Sparkles } from "lucide-react";
import { IMG, ORG, type Project } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";

const SLIDES = [
  {
    image: IMG.heroEducation,
    eyebrow: "Education",
    title: "Every child deserves a notebook,",
    titleAccent: "a teacher, and a chance.",
    desc: "5,000+ first-generation learners are in school today because someone believed in them.",
  },
  {
    image: IMG.heroFlood,
    eyebrow: "Disaster Relief",
    title: "When the waters rose,",
    titleAccent: "61,000 people had us by their side.",
    desc: "28 days. 450 volunteers. Food, water and medicine to every family in need.",
  },
  {
    image: IMG.heroBlankets,
    eyebrow: "Winter Drive",
    title: "Ten thousand blankets,",
    titleAccent: "ten thousand warmer nights.",
    desc: "Reaching the elderly, daily-wage workers and street families every winter since 2016.",
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [heroProjects, setHeroProjects] = useState<Project[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    api.getProjects()
      .then((projects) => {
        setHeroProjects(projects.filter((project) => project.showInHero));
      })
      .catch((error) => {
        console.error("Failed to fetch hero projects:", error);
      });

    api.getSettings()
      .then((settings) => {
        setSiteSettings(settings);
      })
      .catch((error) => {
        console.error("Failed to fetch site settings:", error);
      });
  }, []);

  const slides = heroProjects.length > 0
    ? heroProjects.map((project) => ({
        image: project.image,
        eyebrow: project.category,
        title: project.title,
        titleAccent: "featured by BYF.",
        desc: project.short,
      }))
    : SLIDES;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    setI((current) => Math.min(current, slides.length - 1));
  }, [slides.length]);

  const slide = slides[i] ?? slides[0];
  const heroImage = siteSettings?.homeHeroImage ? imageUrl(siteSettings.homeHeroImage) : slide.image;

  return (
    <section className="relative isolate min-h-[85vh] md:min-h-[100svh] overflow-hidden bg-foreground text-background">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/55 to-foreground/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-secondary/25 mix-blend-overlay" />

      <div className="container-page relative flex min-h-[70vh] md:min-h-[100svh] flex-col justify-center pb-8 pt-20 md:justify-end md:pb-24 md:pt-32">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                {ORG.tagline}
              </span>

              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}{" "}
                <span className="block bg-gradient-to-r from-secondary via-secondary to-accent bg-clip-text text-transparent">
                  {slide.titleAccent}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full gradient-warm px-6 py-3.5 font-display text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4 fill-current" />
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-display text-sm font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <HandHeart className="h-4 w-4" />
              Become a Volunteer
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 flex items-center gap-3">
            {slides.map((_, k) => (
              <button
                key={k}
                aria-label={`Slide ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-10 bg-secondary" : "w-5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
            <span className="ml-3 text-xs uppercase tracking-[0.2em] text-white/60">
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
