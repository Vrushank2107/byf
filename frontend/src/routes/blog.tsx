import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";
import holi from "@/assets/byf/holi.jpg";

const CATS = ["All", "Success Stories", "Activities", "Community Impact", "Volunteer Experiences"] as const;

export const Route = createFileRoute("/blog")({
  head: () =>
    createPageSeo({
      title: "Blog — Stories from Baroda Youth Federation's grassroots work",
      description:
        "Success stories, activity reports, community impact and volunteer experiences from Baroda Youth Federation.",
      path: "/blog",
      keywords: ["Baroda Youth Federation blog", "NGO stories Vadodara", "community impact Gujarat"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    }),
  component: BlogPage,
});

function BlogPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(holi);

  useEffect(() => {
    api.getSettings().then((data) => {
      if (data.blogHeroImage) {
        setHeroImage(imageUrl(data.blogHeroImage));
      }
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });

    api.getBlogPosts().then((data) => {
      setBlogPosts(data);
    }).catch((error) => {
      console.error('Failed to fetch blog posts:', error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const list = cat === "All" ? blogPosts : blogPosts.filter((b) => b.category === cat);
  const featured = list[0];
  const rest = list.slice(1);

  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Blog"
          title={<>Stories from <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">the ground.</span></>}
          description="The work, the wins, the failures and the people behind them — written by our team and volunteers."
          image={heroImage}
        />
        <section className="section-y">
          <div className="container-page">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATS.map((c) => (
                <Skeleton key={c} className="h-10 w-24 rounded-full" />
              ))}
            </div>
            <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:grid-cols-2">
              <Skeleton className="aspect-[16/11] w-full" />
              <div className="flex flex-col justify-center p-7 md:p-12">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <Skeleton className="aspect-[16/10] w-full" />
                  <div className="flex flex-1 flex-col p-6">
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
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
        eyebrow="Blog"
        title={<>Stories from <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">the ground.</span></>}
        description="The work, the wins, the failures and the people behind them — written by our team and volunteers."
        image={heroImage}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="mt-12 text-center text-muted-foreground">No blog posts found.</div>
          ) : (
            <>
              {featured && (
                <motion.article
                  key={featured.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group mt-12 grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow md:grid-cols-2"
                >
                  <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto">
                    <img src={imageUrl(featured.image)} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-5 top-5 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      Featured
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{featured.category}</span>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">{featured.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{new Date(featured.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.read}</span>
                    </div>
                  </div>
                </motion.article>
              )}

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((b, idx) => (
                  <motion.article
                    key={b.slug}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.45 }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={imageUrl(b.image)} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{b.category}</span>
                      <h3 className="mt-2 font-display text-lg font-bold text-foreground">{b.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{b.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                        <span>{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.read}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
