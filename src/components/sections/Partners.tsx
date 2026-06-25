import { PARTNERS } from "@/lib/site-data";

export function Partners() {
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section className="border-y border-border bg-surface py-14">
      <div className="container-page">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Sponsors &amp; Partners
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-[scroll_30s_linear_infinite] gap-12 whitespace-nowrap">
            {loop.map((p, i) => (
              <div
                key={p + i}
                className="grid h-16 min-w-[160px] place-items-center rounded-xl bg-card px-6 font-display text-lg font-bold text-muted-foreground shadow-soft"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
