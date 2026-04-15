import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

const TESTIMONIAL_AVATARS = [
  { bg: "#C24D2C" }, // terracotta
  { bg: "#D4A24C" }, // saffron
  { bg: "#7FB8A4" }, // mint
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">04 — Ils témoignent</p>
          <h2 className="font-display text-4xl sm:text-5xl font-[550] tracking-[-0.02em] text-ink">
            12 847 clients<br />
            <em className="italic text-terracotta">qui en parlent mieux que nous.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name + t.quarter}
              className={
                i === 1
                  ? "bg-zellige text-cream rounded-2xl p-6"
                  : "bg-white border border-paper-border rounded-2xl p-6"
              }
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < t.rating ? "fill-saffron text-saffron" : i === 1 ? "text-white/20" : "text-paper-border"}`}
                  />
                ))}
              </div>
              <p className={`leading-relaxed mb-5 ${i === 1 ? "font-display italic text-lg" : "text-sm"}`}>
                « {t.text} »
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: TESTIMONIAL_AVATARS[i % TESTIMONIAL_AVATARS.length].bg }}
                  aria-hidden
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className={`text-xs ${i === 1 ? "opacity-70" : "text-muted"}`}>
                    {t.city}, {t.quarter}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
