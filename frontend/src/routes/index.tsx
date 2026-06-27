import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { MissionGrid } from "@/components/sections/MissionGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Activities } from "@/components/sections/Activities";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { ORG } from "@/lib/site-data";
import { createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    createPageSeo({
      title: `${ORG.name} — ${ORG.tagline}`,
      description:
        "Vadodara's youth-led nonprofit. 5,000+ students reached, 50,000+ notebooks, 61,000+ flood beneficiaries. Donate or volunteer today.",
      path: "/",
      keywords: [
        "Baroda Youth Federation",
        "BYF Vadodara",
        "nonprofit Gujarat",
        "donate Vadodara",
        "volunteer Gujarat",
        "youth NGO India",
      ],
    }),
  component: Home,
});

function Home() {
  // Tip: pt-16 on main offsets header — undo for full-bleed hero
  return (
    <div className="-mt-16 md:-mt-20">
      <Hero />
      <ImpactStats />
      <MissionGrid />
      <FeaturedProjects />
      <Activities />
      <VolunteerCTA />
      <Testimonials />
    </div>
  );
}
