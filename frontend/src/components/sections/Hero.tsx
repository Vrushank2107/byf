import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, HandHeart, Sparkles } from "lucide-react";
import { ORG } from "@/lib/site-data";
import { api } from "@/lib/api";

export function Hero() {
  const [i, setI] = useState(0);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const loadedImagesRef = useRef<Record<string, boolean>>({});

  // Preload images
  const preloadImage = (url: string) => {
    if (!url || loadedImagesRef.current[url]) return;
    const img = new Image();
    img.onload = () => {
      loadedImagesRef.current[url] = true;
      setImagesLoaded({ ...loadedImagesRef.current });
    };
    img.src = url;
  };

  useEffect(() => {
    api.getSettings()
      .then((settings) => {
        setSiteSettings(settings);
        // Preload hero images
        if (settings.homeHeroImage1) preloadImage(settings.homeHeroImage1);
        if (settings.homeHeroImage2) preloadImage(settings.homeHeroImage2);
        if (settings.homeHeroImage3) preloadImage(settings.homeHeroImage3);
      })
      .catch((error) => {
        console.error("Failed to fetch site settings:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const heroSlides = [
    siteSettings?.homeHeroImage1 && {
      image: siteSettings.homeHeroImage1,
      eyebrow: "Our Impact",
      title: "Making a difference,",
      titleAccent: "one community at a time.",
      desc: "Join us in creating positive change across Vadodara and beyond.",
    },
    siteSettings?.homeHeroImage2 && {
      image: siteSettings.homeHeroImage2,
      eyebrow: "Our Mission",
      title: "Empowering youth,",
      titleAccent: "building tomorrow's leaders.",
      desc: "Education, relief, and community service since 2017.",
    },
    siteSettings?.homeHeroImage3 && {
      image: siteSettings.homeHeroImage3,
      eyebrow: "Get Involved",
      title: "Your support matters,",
      titleAccent: "every contribution counts.",
      desc: "Volunteer, donate, or partner with us to make an impact.",
    },
  ].filter(Boolean);

  const slides = heroSlides;

  useEffect(() => {
    if (slides.length > 0) {
      const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
      return () => clearInterval(t);
    }
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      setI((current) => Math.min(current, slides.length - 1));
    }
  }, [slides.length]);

  const slide = slides[i] ?? slides[0];
  const heroImage = slide?.image;
  const isCurrentImageLoaded = heroImage ? imagesLoaded[heroImage] : false;

  // Loading state
  if (isLoading || (slides.length > 0 && !isCurrentImageLoaded)) {
    return (
      <section className="relative isolate min-h-[85vh] md:min-h-[100svh] overflow-hidden bg-foreground text-background flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/55 to-foreground/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-secondary/25 mix-blend-overlay" />
        
        {/* Animated gradient background while loading */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
        
        <div className="container-page relative text-center py-20 md:py-32">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            {ORG.tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Making a difference,{" "}
            <span className="block bg-gradient-to-r from-secondary via-secondary to-accent bg-clip-text text-transparent">
              one community at a time.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg mx-auto"
          >
            Join us in creating positive change across Vadodara and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex flex-wrap gap-3 justify-center"
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
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative isolate min-h-[85vh] md:min-h-[100svh] overflow-hidden bg-foreground text-background flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/55 to-foreground/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-secondary/25 mix-blend-overlay" />
        
        <div className="container-page relative text-center py-20 md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            {ORG.tagline}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Making a difference,{" "}
            <span className="block bg-gradient-to-r from-secondary via-secondary to-accent bg-clip-text text-transparent">
              one community at a time.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg mx-auto">
            Join us in creating positive change across Vadodara and beyond.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3 justify-center"
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
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate min-h-[85vh] md:min-h-[100svh] overflow-hidden bg-foreground text-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.1, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: -20 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
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
              initial={{ opacity: 0, y: 30, skewY: 1 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              exit={{ opacity: 0, y: -30, skewY: -1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
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
            {slides.map((_: any, k: number) => (
              <motion.button
                key={k}
                aria-label={`Slide ${k + 1}`}
                onClick={() => setI(k)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: k === i ? 1 : 0.9,
                  opacity: 1,
                  width: k === i ? "2.5rem" : "1.25rem",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "bg-secondary" : "bg-white/40 hover:bg-white/70"
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
