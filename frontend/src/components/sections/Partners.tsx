import { api } from "@/lib/api";
import { useState, useEffect } from "react";

function PartnerBadge({ name }: { name: string }) {
  return (
    <div className="flex min-h-16 shrink-0 items-center justify-center rounded-xl bg-card px-5 py-3 text-center shadow-soft sm:px-6">
      <span className="font-display text-sm font-semibold leading-snug text-muted-foreground sm:text-base">
        {name}
      </span>
    </div>
  );
}

export function Partners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getPartners()
      .then((data) => {
        setPartners(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch partners:", error);
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
            <div className="flex animate-[scroll_30s_linear_infinite] gap-6 sm:gap-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="h-16 min-w-[120px] shrink-0 rounded-xl bg-muted sm:min-w-[140px]"
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

  if (partners.length === 0) {
    return null;
  }

  const loop = [...partners, ...partners];

  return (
    <section className="border-y border-border bg-surface py-14">
      <div className="container-page">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Sponsors &amp; Partners
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[scroll_30s_linear_infinite] gap-6 sm:gap-10">
            {loop.map((p, i) => (
              <PartnerBadge key={p.id + i} name={p.name} />
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
