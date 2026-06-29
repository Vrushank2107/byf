import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Target, Users, Heart } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/project/$slug")({
  loader: async ({ params }: any) => {
    try {
      const project = await api.getProject(params.slug);
      return { project };
    } catch (error) {
      return { project: null };
    }
  },
  head: ({ loaderData }: any) => {
    const project = loaderData?.project;
    if (!project) {
      return createPageSeo({
        title: "Project Not Found — Baroda Youth Federation",
        description: "The project you are looking for does not exist.",
        path: "/projects/$slug",
      });
    }
    return createPageSeo({
      title: `${project.title} — Baroda Youth Federation`,
      description: project.short,
      path: `/projects/${project.slug}`,
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.title, path: `/project/${project.slug}` },
      ]),
    });
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const loaderData = Route.useLoaderData() as { project: any } | undefined;
  const project = loaderData?.project;

  console.log('Project data:', project);
  console.log('Images:', project?.images);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Project Details"
        title={project.title}
        description={project.short}
        image={imageUrl(project.image)}
      />

      <section className="section-y">
        <div className="container-page">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all projects
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Story */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="prose prose-lg max-w-none dark:prose-invert"
              >
                <h2 className="font-display text-3xl font-bold mb-6">About This Project</h2>
                {project.fullStory ? (
                  project.fullStory.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-muted-foreground">{project.short}</p>
                )}
              </motion.div>

              {/* Project Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {project.images && project.images.length > 0 ? (
                  <>
                    <h2 className="font-display text-3xl font-bold mb-6">Project Photos</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {project.images.map((img: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className={`overflow-hidden rounded-2xl ${idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                        >
                          <img
                            src={imageUrl(img)}
                            alt={`${project.title} - Image ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-[16/9] overflow-hidden rounded-2xl"
                  >
                    <img
                      src={imageUrl(project.image)}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block rounded-full bg-white/95 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Key Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-6 md:grid-cols-2"
              >
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To create sustainable impact through community-driven initiatives that empower individuals and transform lives.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Who We Help</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Underprivileged communities, women, children, and families in need across Vadodara and surrounding regions.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-xl font-bold mb-6">Impact at a Glance</h3>
                <div className="space-y-4">
                  {project.stats.map((stat: any, idx: number) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                      className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <span className="font-display text-lg font-bold text-primary">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-xl font-bold mb-4">Project Progress</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Completion</span>
                    <span className="font-display text-2xl font-bold text-primary">{project.progress}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full gradient-warm"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This project is {project.progress}% complete. Your support helps us reach our goals faster.
                </p>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-glow"
              >
                <h3 className="font-display text-xl font-bold mb-3">Support This Project</h3>
                <p className="text-sm text-white/90 mb-6">
                  Your contribution can make a real difference in the lives of those we serve.
                </p>
                <Link
                  to="/donate"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-105"
                >
                  Donate Now
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-xl font-bold mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Vadodara, Gujarat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Started</p>
                      <p className="text-sm text-muted-foreground">Ongoing initiative</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
