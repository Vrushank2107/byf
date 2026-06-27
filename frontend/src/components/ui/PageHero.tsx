import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-background">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />}
      <div className="absolute inset-0 gradient-hero opacity-85" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-background/40 mix-blend-overlay" />

      <div className="container-page relative grid min-h-[42vh] place-items-center py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
