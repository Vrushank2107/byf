import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { ORG } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import byfLogo from "@/assets/byf-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);



  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 shadow-soft backdrop-blur-md",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 group">
          <img
            src={byfLogo}
            alt={`${ORG.name} logo`}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-soft ring-1 ring-border"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
              {ORG.short}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Baroda Youth Federation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:text-primary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 rounded-full gradient-warm px-5 py-2.5 text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5"
          >
            <Heart className="h-4 w-4 fill-current" />
            Donate
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-page pb-5">
            <div className="rounded-2xl border border-border bg-card p-3 shadow-soft animate-in fade-in slide-in-from-top-2">
              <nav className="grid gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/donate"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl gradient-warm px-4 py-3 text-sm font-semibold text-white shadow-warm"
                >
                  <Heart className="h-4 w-4 fill-current" />
                  Donate Now
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
