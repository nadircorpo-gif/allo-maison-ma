import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "Plomberie", slug: "plombier", count: 184, price: "dès 150 MAD", seed: "plomb-casa" },
  { name: "Électricité", slug: "electricien", count: 142, price: "dès 120 MAD", seed: "elec-casa" },
  { name: "Ménage", slug: "femme-de-menage", count: 268, price: "dès 100 MAD/h", seed: "menage-rab" },
  { name: "Climatisation", slug: "climatisation", count: 91, price: "dès 250 MAD", seed: "clim-mar" },
  { name: "Peinture", slug: "peintre", count: 76, price: "dès 60 MAD/m²", seed: "peint-tan" },
  { name: "Serrurerie", slug: "serrurier", count: 54, price: "dès 200 MAD", seed: "serr-fes" },
  { name: "Nounou", slug: "nounou", count: 63, price: "dès 80 MAD/h", seed: "nounou-agd" },
];

export default function Categories() {
  return (
    <section className="bg-cream py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">01 — Services certifiés</p>
            <h2 className="font-display text-4xl sm:text-5xl font-[550] tracking-[-0.02em] text-ink">
              Pour chaque geste<br />du quotidien.
            </h2>
            <p className="text-muted mt-4">
              Chaque service est <span className="font-semibold text-ink">contrôlé et encadré</span> par notre équipe avant d&apos;être proposé. Aucun pro non vérifié sur la plateforme.
            </p>
          </div>
          {/* Certification seal (V2) floating */}
          <div className="flex items-center gap-4">
            <Image
              src="/brand/logo-seal.svg"
              alt="Service certifié Allo Maison"
              width={360}
              height={360}
              className="w-28 h-28 lg:w-32 lg:h-32 drop-shadow-sm"
            />
            <div className="hidden sm:block max-w-[180px]">
              <p className="text-xs uppercase tracking-widest text-zellige font-bold mb-1">Certifié</p>
              <p className="text-sm text-muted leading-snug">Chaque artisan passe par notre process de vérification en 7 étapes.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}-casablanca`}
              className="group bg-white border border-paper-border rounded-xl overflow-hidden transition hover:-translate-y-0.5 hover:shadow-card-hover relative"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-clay">
                <Image
                  src={`https://picsum.photos/seed/${cat.seed}/500/400`}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-semibold bg-white/95 text-ink px-2.5 py-1 rounded-full tab-nums">
                  {cat.count} artisans
                </span>
                {/* Certified check badge */}
                <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-mint border-2 border-white flex items-center justify-center shadow-sm" aria-label="Service certifié">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl font-medium text-ink mb-1">{cat.name}</h3>
                <p className="text-xs text-muted tab-nums">{cat.price}</p>
              </div>
            </Link>
          ))}

          <Link
            href="/services"
            className="group rounded-xl overflow-hidden flex flex-col justify-center items-center text-center p-6 bg-zellige text-cream transition hover:-translate-y-0.5"
          >
            <svg className="w-10 h-10 mb-3 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 12h16M12 4v16" />
            </svg>
            <h3 className="font-display text-xl font-medium mb-1">7 autres services</h3>
            <p className="text-xs opacity-70">Bricolage · Rénovation · Jardinage · Déménagement…</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
