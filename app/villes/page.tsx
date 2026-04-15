import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import Breadcrumb from "@/components/shared/breadcrumb";
import JsonLd from "@/components/seo/json-ld";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

import { CITIES } from "@/lib/data/cities";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Villes desservies au Maroc | Allo-Maison",
  description:
    "Artisans vérifiés à Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir. 19 services à domicile, 1 017 pros certifiés, devis WhatsApp en 24 h.",
  alternates: { canonical: "https://allo-maison.ma/villes" },
  openGraph: {
    title: "Villes desservies au Maroc | Allo-Maison",
    description:
      "Artisans vérifiés à Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir. 19 services à domicile, 1 017 pros certifiés.",
    url: "https://allo-maison.ma/villes",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villes desservies au Maroc | Allo-Maison",
    description:
      "Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir — 19 services, 1 017 artisans vérifiés.",
    images: ["/opengraph-image"],
  },
};

export default function VillesPage() {
  const breadcrumbItems = [{ name: "Villes", url: "https://allo-maison.ma/villes" }];
  const totalArtisans = CITIES.reduce((acc, c) => acc + c.artisanCount, 0);
  const cityItems = CITIES.map((c) => ({
    name: c.name,
    url: `https://allo-maison.ma/villes/${c.slug}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={itemListJsonLd("Villes desservies", cityItems)} />

      {/* ======= HERO ======= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Couverture nationale · 6 villes</span>
              </div>
              <h1
                className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5"
                style={{ textWrap: "balance" }}
              >
                6 villes,<br />
                <em className="italic text-terracotta">un seul standard.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Choisissez votre ville et accédez à la liste des {SERVICES.length} services à domicile, les quartiers couverts et les pros vérifiés.
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-3 gap-4 tab-nums">
              <div>
                <p className="font-display text-3xl font-[500] leading-none">{CITIES.length}</p>
                <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">villes</p>
              </div>
              <div>
                <p className="font-display text-3xl font-[500] leading-none">{SERVICES.length}</p>
                <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">services</p>
              </div>
              <div>
                <p className="font-display text-3xl font-[500] leading-none">{totalArtisans}+</p>
                <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">artisans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CITIES GRID ======= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <section>
          <div className="mb-8">
            <p className="eyebrow mb-2">01 — Nos villes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
              Artisans à domicile, <em className="italic">par ville.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/villes/${city.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-paper-border bg-white transition-shadow hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-clay">
                  <Image
                    src={city.image}
                    alt={`Artisans à ${city.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-[9px] uppercase tracking-[0.2em] opacity-80">Ville</p>
                    <p className="font-display text-2xl font-medium">Artisans à {city.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="flex items-center gap-4 text-xs text-muted tab-nums">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {city.neighborhoods.length} quartiers
                    </span>
                    <span>{city.artisanCount}+ pros</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink">
                    Voir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ======= CTA ======= */}
        <section className="mt-20 bg-zellige text-cream rounded-2xl p-10 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-3" style={{ color: "#D4A24C" }}>
              Besoin d&apos;un pro maintenant ?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-4">
              Un artisan chez vous,<br />
              <em className="italic text-saffron">en 24 h.</em>
            </h2>
            <p className="text-cream/75 mb-6">
              Sélectionnez votre ville, décrivez votre besoin. Réponse humaine sous 47 min via WhatsApp.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-saffron text-ink font-bold rounded-lg hover:bg-[#E0B55C] transition-colors"
            >
              Voir tous les services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
