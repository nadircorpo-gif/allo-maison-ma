import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Siren } from "lucide-react";

import Breadcrumb from "@/components/shared/breadcrumb";
import JsonLd from "@/components/seo/json-ld";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

import { CITIES, getCityBySlug } from "@/lib/data/cities";
import { SERVICES, URGENCE_SERVICES } from "@/lib/data/services";

const CITY_SLUGS = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];

export function generateStaticParams() {
  return CITY_SLUGS.map((ville) => ({ ville }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return {};

  const title = `Artisans à ${city.name} | Allo-Maison`;
  const description = `Artisans vérifiés à ${city.name} : plomberie, électricité, ménage et ${SERVICES.length - 3} autres services. ${city.artisanCount}+ pros, ${city.neighborhoods.length} quartiers.`;

  return {
    title,
    description,
    alternates: { canonical: `https://allo-maison.ma/villes/${ville}` },
    openGraph: {
      title,
      description,
      url: `https://allo-maison.ma/villes/${ville}`,
      siteName: "Allo-Maison",
      locale: "fr_MA",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function VilleHubPage({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const city = getCityBySlug(ville);

  if (!city) notFound();

  const breadcrumbItems = [
    { name: "Villes", url: "https://allo-maison.ma/villes" },
    { name: city.name, url: `https://allo-maison.ma/villes/${ville}` },
  ];
  const serviceItems = SERVICES.map((s) => ({
    name: s.name,
    url: `https://allo-maison.ma/${s.slug}-${city.slug}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={itemListJsonLd(`Services à ${city.name}`, serviceItems)} />

      {/* ======= HERO ======= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Hub ville · {city.name}</span>
              </div>
              <h1
                className="font-display text-[40px] sm:text-[52px] font-[550] leading-[0.98] tracking-[-0.028em] text-ink mb-4"
                style={{ textWrap: "balance" }}
              >
                Artisans vérifiés<br />
                à <em className="italic text-terracotta">{city.name}.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                {SERVICES.length} services à domicile, {city.artisanCount}+ professionnels certifiés et {city.neighborhoods.length} quartiers couverts à {city.name}. Devis WhatsApp en moins de 24 h.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-7 border-t border-paper-border pt-5 tab-nums max-w-md">
                <div>
                  <p className="font-display text-2xl font-[500] leading-none">{city.artisanCount}+</p>
                  <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">artisans</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-[500] leading-none">{SERVICES.length}</p>
                  <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">services</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-[500] leading-none">{city.neighborhoods.length}</p>
                  <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">quartiers</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-clay">
                <Image
                  src={city.image}
                  alt={`Artisans à ${city.name}`}
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-80">Ville</p>
                  <p className="font-display text-xl font-medium">{city.name}, Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ======= 19 SERVICES ======= */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="eyebrow mb-2">01 — Services à domicile</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
              {SERVICES.length} métiers disponibles<br />
              à <em className="italic">{city.name}.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}-${city.slug}`}
                className="group flex flex-col rounded-2xl border border-paper-border bg-white p-5 transition-all hover:border-ink hover:shadow-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <span aria-hidden className="text-2xl">{service.icon}</span>
                  {service.urgenceAvailable && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-terracotta font-semibold">
                      <Siren className="h-2.5 w-2.5" />
                      24/7
                    </span>
                  )}
                </div>
                <p className="font-display text-lg font-medium text-ink mb-1.5">
                  {service.name} à {city.name}
                </p>
                <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs tab-nums">
                  <span className="flex items-center gap-1 text-muted">
                    <span className="font-medium text-ink">Pros vérifiés</span>
                  </span>
                  <span className="font-medium text-terracotta">
                    dès {service.priceMin} MAD
                  </span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ink">
                  Voir les pros
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ======= URGENCE ======= */}
        <section className="mb-20">
          <div className="mb-6">
            <p className="eyebrow mb-2 text-terracotta">02 — Urgences 24/7</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
              Intervention urgente<br />
              <em className="italic text-terracotta">à {city.name}.</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {URGENCE_SERVICES.map((urgService) => (
              <Link
                key={urgService.slug}
                href={`/urgence/${urgService.slug}/${city.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-5 transition-colors hover:bg-terracotta/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream">
                  <Siren className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="eyebrow text-[10px] text-terracotta">Urgence</p>
                  <p className="font-display text-base font-medium text-ink">
                    SOS {urgService.name} 24/7
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">à {city.name}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-terracotta transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* ======= QUARTIERS ======= */}
        <section className="mb-20">
          <div className="mb-6">
            <p className="eyebrow mb-2">03 — Quartiers couverts</p>
            <h2 className="font-display text-2xl sm:text-3xl font-[550] tracking-[-0.02em] text-ink">
              <MapPin className="inline-block h-6 w-6 text-terracotta -mt-1 mr-1" />
              {city.neighborhoods.length} quartiers de {city.name}.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {city.neighborhoods.map((q) => (
              <span
                key={q}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-paper-border rounded-full text-sm text-ink"
              >
                {q}
              </span>
            ))}
          </div>
        </section>

        {/* ======= AUTRES VILLES ======= */}
        <section className="border-t border-paper-border pt-10">
          <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
            <div>
              <p className="eyebrow mb-2">04 — Aller plus loin</p>
              <h2 className="font-display text-2xl sm:text-3xl font-[550] tracking-[-0.02em] text-ink">
                Autres villes.
              </h2>
            </div>
            <Link
              href="/villes"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-terracotta"
            >
              Voir toutes les villes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CITIES.filter((c) => c.slug !== city.slug).map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/villes/${otherCity.slug}`}
                className="group flex items-center justify-between gap-2 rounded-lg border border-paper-border bg-white px-4 py-3 text-sm text-ink transition-colors hover:border-ink hover:bg-cream"
              >
                <span className="font-medium">{otherCity.name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
