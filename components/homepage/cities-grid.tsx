import Link from "next/link";
import { CITIES } from "@/lib/data/cities";

export default function CitiesGrid() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-ink mb-2">Disponible dans 6 grandes villes</h2>
          <p className="text-muted text-lg">Et bientot dans tout le Maroc</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/plombier-${city.slug}`}
              className="relative block overflow-hidden"
              style={{ height: 160, borderRadius: 16 }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-[1.02]"
                style={{ backgroundImage: `url(${city.image})` }}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-base leading-tight">{city.name}</p>
                <p className="text-white/80 text-xs">{city.artisanCount}+ artisans</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
