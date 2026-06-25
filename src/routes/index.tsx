import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { MissionGrid } from "@/components/sections/MissionGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Activities } from "@/components/sections/Activities";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Baroda Youth Federation — Together We Can, Together We Care" },
      { name: "description", content: "Vadodara's youth-led nonprofit. 5,000+ students reached, 50,000+ notebooks, 61,000+ flood beneficiaries. Donate or volunteer today." },
      { property: "og:title", content: "Baroda Youth Federation" },
      { property: "og:description", content: "Vadodara's youth-led nonprofit. Donate or volunteer today." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
      <Partners />
      <Testimonials />
    </div>
  );
}
