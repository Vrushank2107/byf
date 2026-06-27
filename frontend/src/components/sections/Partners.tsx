import { api } from "@/lib/api";
import { useState, useEffect } from "react";

export function Partners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPartners().then((data) => {
      setPartners(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch partners:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="border-y border-border bg-surface py-14">
        <div className="container-page">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Sponsors &amp; Partners
          </p>
          <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-[scroll_30s_linear_infinite] gap-12 whitespace-nowrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="grid h-16 min-w-[160px] place-items-center rounded-xl bg-muted px-6 font-display text-lg font-bold text-muted-foreground"
                />
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

  const loop = [...partners, ...partners];
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
                key={p.id + i}
                className="grid h-16 min-w-[160px] place-items-center rounded-xl bg-card px-6 font-display text-lg font-bold text-muted-foreground shadow-soft"
              >
                {p.name}
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
