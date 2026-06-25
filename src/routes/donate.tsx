import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, FileCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DONATION_FUNDS, IMG } from "@/lib/site-data";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate to BYF — Every rupee changes a life in Vadodara" },
      { name: "description", content: "Donate to Baroda Youth Federation's education, women's empowerment, relief and general funds. 80G tax-deductible." },
      { property: "og:title", content: "Donate — BYF" },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const PRESETS = [500, 1000, 2500, 5000, 10000, 25000];
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function DonatePage() {
  const [fund, setFund] = useState(DONATION_FUNDS[0].slug);
  const [amount, setAmount] = useState<number>(2500);

  const active = DONATION_FUNDS.find((f) => f.slug === fund)!;

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title={<>₹500 feeds a family for a week. <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Your turn.</span></>}
        description="100% of donations go directly to programs. Operations are funded separately. 80G-eligible receipts issued instantly."
        image={IMG.heroBlankets}
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeader eyebrow="Where your money goes" title={<>Choose a <span className="gradient-text">fund.</span></>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {DONATION_FUNDS.map((f, idx) => {
              const pct = Math.min(100, Math.round((f.raised / f.goal) * 100));
              const accentCls = f.accent === "secondary"
                ? "from-secondary to-secondary/70"
                : f.accent === "accent"
                ? "from-accent to-accent/70"
                : "from-primary to-primary/70";
              return (
                <motion.button
                  key={f.slug}
                  onClick={() => setFund(f.slug)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-3xl border bg-card p-6 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow ${
                    fund === f.slug ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br opacity-25 blur-2xl ${accentCls}`} />
                  <div className="relative">
                    <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    <div className="mt-5 flex items-baseline justify-between text-xs text-muted-foreground">
                      <span><span className="font-display text-base font-bold text-foreground">{fmt(f.raised)}</span> raised</span>
                      <span>Goal {fmt(f.goal)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full bg-gradient-to-r ${accentCls}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-1 text-right text-[11px] font-semibold uppercase tracking-wider text-primary">{pct}% funded</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Selected fund</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground">{active.title}</h3>

              <div className="mt-8">
                <label className="text-sm font-semibold text-foreground">Choose an amount</label>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount(p)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                        amount === p
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary"
                      }`}
                    >
                      {fmt(p)}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center rounded-xl border border-border bg-background pl-4 pr-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="font-display text-base font-semibold text-muted-foreground">₹</span>
                  <input
                    type="number"
                    min={100}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value || 0))}
                    className="w-full bg-transparent px-3 py-3 text-base font-semibold text-foreground outline-none"
                  />
                </div>
              </div>

              <button
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-warm py-4 font-display font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5"
              >
                <Heart className="h-5 w-5 fill-current" />
                Donate {fmt(amount)}
              </button>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> Secure</div>
                <div className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-accent" /> 80G receipt</div>
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> 100% to program</div>
              </div>
            </div>

            <div className="space-y-5">
              <article className="rounded-3xl border border-border bg-primary p-7 text-primary-foreground shadow-soft">
                <h4 className="font-display text-xl font-bold">What your money becomes</h4>
                <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹500</span> — 1 month of meals for a child</li>
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹1,000</span> — School kit for 5 students</li>
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹2,500</span> — Sanitary pads for 25 girls / year</li>
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹10,000</span> — Full notebook kit for a school</li>
                </ul>
              </article>

              <article className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Donor story</p>
                <blockquote className="mt-3 font-display text-base leading-relaxed text-foreground">
                  "I started with ₹500 a month. Three years later, the school they built with our funds is my proudest investment."
                </blockquote>
                <p className="mt-4 text-sm text-muted-foreground">— Arjun Mehta, Monthly donor since 2022</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
