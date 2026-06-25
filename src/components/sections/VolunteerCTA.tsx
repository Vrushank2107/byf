import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HandHeart, ArrowRight } from "lucide-react";
import { IMG } from "@/lib/site-data";

export function VolunteerCTA() {
  return (
    <section className="section-y">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-glow"
        >
          <img src={IMG.joycation1} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />

          <div className="relative grid items-center gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <HandHeart className="h-3.5 w-3.5 text-secondary" />
                Join 450+ volunteers
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                One Sunday a month is all it takes to change a child's year.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                Whether you can teach, design, organise events, drive, cook or just show up — there is a place for you at BYF.
              </p>
              <Link
                to="/volunteer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-4 font-display text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5"
              >
                Become a Volunteer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
              {[
                { v: "450+", l: "Active volunteers" },
                { v: "12k+", l: "Volunteer hours / year" },
                { v: "8", l: "Working teams" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur">
                  <div className="font-display text-2xl font-bold">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-white/80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
