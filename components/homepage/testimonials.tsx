import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

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
                <div className="w-10 h-10 rounded-full bg-clay overflow-hidden shrink-0">
                  <Image
                    src={`https://i.pravatar.cc/80?img=${20 + i * 13}`}
                    alt={t.name}
                    width={40}
                    height={40}
                  />
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
