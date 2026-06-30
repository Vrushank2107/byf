import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { getGalleryFilterTags, IMG } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    createPageSeo({
      title: "Gallery — Baroda Youth Federation moments from the ground",
      description: "Photos from Baroda Youth Federation events: education, JoyCation, Holi, Diwali, blanket and flood relief drives.",
      path: "/gallery",
      keywords: ["Baroda Youth Federation gallery", "NGO photos Vadodara", "community events Gujarat"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
      ]),
    }),
  component: GalleryPage,
});

function GalleryPage() {
  const [tag, setTag] = useState<string>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(IMG.diwali);

  useEffect(() => {
    api.getGallery().then((data) => {
      setGallery(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch gallery:', error);
      setLoading(false);
    });

    api.getSettings().then((data) => {
      if (data.galleryHeroImage) {
        setHeroImage(imageUrl(data.galleryHeroImage));
      }
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });
  }, []);

  const filterTags = useMemo(() => getGalleryFilterTags(gallery), [gallery]);

  const visible = useMemo(
    () => (tag === "All" ? [...gallery] : gallery.filter((g) => g.tag === tag)),
    [tag, gallery],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, visible.length]);

  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Gallery"
          title={<>Moments from <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">the ground.</span></>}
          description="Real photos from our events. Tap any image for fullscreen."
          image={heroImage}
        />
        <section className="section-y">
          <div className="container-page">
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {filterTags.map((t) => (
                <Skeleton key={t} className="h-9 w-20 rounded-full" />
              ))}
            </div>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="mb-4 w-full aspect-[4/3] rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={<>Moments from <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">the ground.</span></>}
        description="Real photos from our events. Tap any image for fullscreen."
        image={IMG.diwali}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap justify-center gap-2">
            {filterTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  tag === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]">
            {visible.map((g, idx) => (
              <motion.button
                key={g.id + idx}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: (idx % 8) * 0.03 }}
                onClick={() => setOpenIdx(idx)}
                className="group mb-4 block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className="relative">
                  <img src={imageUrl(g.src)} alt={g.alt} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {g.tag}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4"
            onClick={() => setOpenIdx(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setOpenIdx(null)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); setOpenIdx((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)); }}
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); setOpenIdx((i) => (i === null ? null : (i + 1) % visible.length)); }}
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.img
              key={visible[openIdx].id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={imageUrl(visible[openIdx].src)}
              alt={visible[openIdx].alt}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-glow"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
