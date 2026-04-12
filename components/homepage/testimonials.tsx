import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-ink mb-3">Ce que disent nos clients</h2>
          <p className="text-muted text-lg">Avis verifies par SMS apres chaque mission</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name + t.quarter} className="bg-white border border-gray-100 rounded-card shadow-card p-6">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? "fill-amber text-amber" : "text-gray-200"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-ink text-sm italic leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-lg flex-shrink-0">
                  👤
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.city}, {t.quarter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
