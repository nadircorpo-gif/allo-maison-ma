import Link from "next/link";
import { CITIES } from "@/lib/data/cities";

export default function CitiesGrid() {
  return (
    <section className="py-20 bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3" style={{ color: "#D4A24C" }}>05 — Couverture</p>
            <h2 className="font-display text-4xl sm:text-5xl font-[550] tracking-[-0.02em] text-cream">
              Six villes. <em className="italic text-saffron">Partout chez vous.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/plombier-${city.slug}`}
              className="group border border-white/10 hover:border-saffron rounded-lg p-5 transition"
            >
              <p className="font-display text-2xl font-medium mb-1">{city.name}</p>
              <p className="text-xs opacity-60 tab-nums">{city.artisanCount}+ artisans</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
