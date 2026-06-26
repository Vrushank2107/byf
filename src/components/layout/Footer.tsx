import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";
import { ORG } from "@/lib/site-data";
import byfLogo from "@/assets/byf-logo.png.asset.json";


const COL_LINKS = [
  { to: "/about", label: "About BYF" },
  { to: "/projects", label: "Our Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
] as const;

const COL_PROJECTS = [
  { to: "/projects", label: "Project Progress", hash: "project-progress" },
  { to: "/projects", label: "JoyCation", hash: "joycation" },
  { to: "/projects", label: "Sankalp Notebooks", hash: "sankalp" },
  { to: "/projects", label: "Flood Relief", hash: "flood-relief" },
  { to: "/projects", label: "Roti Bank", hash: "roti-bank" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />

      {/* Donation CTA strip */}
      <div className="container-page py-12">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 shadow-glow">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {ORG.tagline}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
                Your contribution feeds, teaches and warms a real family.
              </h3>
            </div>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-5 w-5 fill-current text-secondary" />
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-12 pb-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5">
            <img
              src={byfLogo.url}
              alt={`${ORG.name} logo`}
              className="h-10 w-10 rounded-xl object-cover"
            />
            <div>
              <div className="font-display text-lg font-bold">{ORG.short}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-background/60">
                {ORG.name}
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/70">
            A youth-led nonprofit in Vadodara working across education, women's
            health, disaster relief and rural welfare since 2014.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { href: ORG.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: ORG.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: ORG.social.twitter, Icon: Twitter, label: "Twitter / X" },
              { href: ORG.social.youtube, Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-background/80 transition-colors hover:bg-secondary hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-background/90">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-background/70">
            {COL_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-secondary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-background/90">
            Projects
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-background/70">
            {COL_PROJECTS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-secondary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-background/90">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-background/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>{ORG.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <a href={`mailto:${ORG.email}`} className="hover:text-secondary">{ORG.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <a href={`tel:${ORG.phone.replace(/\s/g, "")}`} className="hover:text-secondary">{ORG.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {ORG.name}. All rights reserved.</p>
          <p>Made with <span className="text-secondary">♥</span> in Vadodara · 80G &amp; 12A registered</p>
        </div>
      </div>
    </footer>
  );
}
