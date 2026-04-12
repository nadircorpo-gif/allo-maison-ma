import { notFound } from "next/navigation";
import type { Metadata } from "next";

import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import ArtisanCard from "@/components/shared/artisan-card";
import BookingForm from "@/components/shared/booking-form";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import StarRating from "@/components/shared/star-rating";

import { getServiceBySlug } from "@/lib/data/services";
import { getCityBySlug } from "@/lib/data/cities";
import { getArtisansByServiceAndCity } from "@/lib/data/artisans";
import { getServiceCityFAQ } from "@/lib/data/faq";
import {
  generateServiceCityMetadata,
  serviceCityJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import { CheckCircle, MapPin } from "lucide-react";

// --- Static params: ALL services × 6 cities ---
const SERVICE_SLUGS = [
  "plombier", "electricien", "femme-de-menage", "peintre", "climatisation", "serrurier",
  "bricoleur", "renovation", "jardinier", "technicien-informatique", "demenagement",
  "carreleur", "menuisier", "etancheite", "desinsectisation", "vitrier",
  "cuisiniere", "concierge", "nounou",
];
const CITY_SLUGS = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const service of SERVICE_SLUGS) {
    for (const city of CITY_SLUGS) {
      params.push({ slug: `${service}-${city}` });
    }
  }
  return params;
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { service, city } = parseSlug(slug);
  if (!service || !city) return {};
  return generateServiceCityMetadata(
    service.name,
    service.slug,
    city.name,
    city.slug,
    service.priceMin
  );
}

// --- Slug parser ---
function parseSlug(slug: string) {
  for (const serviceSlug of SERVICE_SLUGS) {
    if (slug.startsWith(`${serviceSlug}-`)) {
      const citySlug = slug.slice(serviceSlug.length + 1);
      const service = getServiceBySlug(serviceSlug);
      const city = getCityBySlug(citySlug);
      return { service, city };
    }
  }
  return { service: undefined, city: undefined };
}

// --- Page ---
export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { service, city } = parseSlug(slug);

  if (!service || !city) notFound();

  const artisans = getArtisansByServiceAndCity(service.slug, city.slug);
  const faqs = getServiceCityFAQ(service.name, city.name);
  const whatsappUrl = buildBookingWhatsAppUrl(service.name, city.name);

  const breadcrumbItems = [
    { name: service.name, url: `https://allo-maison.ma/${service.slug}-casablanca` },
    { name: city.name, url: `https://allo-maison.ma/${slug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={serviceCityJsonLd(
          service.name,
          city.name,
          service.priceMin,
          service.rating,
          service.reviewCount
        )}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ---- MAIN (2/3) ---- */}
          <main className="flex-1 min-w-0">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-3 py-1.5 rounded-badge mb-4">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              Pros verifies CIN + Casier judiciaire
            </div>

            {/* H1 */}
            <h1 className="text-3xl font-extrabold text-ink mb-3">
              {service.name} a {city.name} | Pros verifies
            </h1>

            {/* Description */}
            <p className="text-muted text-base leading-relaxed mb-6">{service.description}</p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 p-4 bg-surface rounded-card border border-gray-100 mb-8">
              <div className="flex items-center gap-2">
                <StarRating rating={service.rating} reviewCount={service.reviewCount} />
              </div>
              <div className="flex items-center gap-2 text-sm text-ink">
                <CheckCircle className="w-4 h-4 text-trust" />
                <span className="font-medium">{service.priceLabel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">{city.artisanCount}+ artisans a {city.name}</span>
              </div>
            </div>

            {/* Artisan list */}
            <h2 className="text-xl font-bold text-ink mb-4">
              Artisans disponibles a {city.name}
            </h2>

            {artisans.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {artisans.map((artisan) => (
                  <ArtisanCard
                    key={artisan.id}
                    artisan={artisan}
                    serviceName={service.name}
                    cityName={city.name}
                  />
                ))}
              </div>
            ) : (
              /* Placeholder when no artisans */
              <div className="bg-primary-light border border-primary/20 rounded-card p-8 text-center mb-10">
                <p className="text-ink font-semibold mb-2">
                  Des pros sont disponibles a {city.name} !
                </p>
                <p className="text-muted text-sm mb-4">
                  Contactez-nous via WhatsApp et nous vous mettons en relation rapidement.
                </p>
                <WhatsAppButton url={whatsappUrl} label="Trouver un pro maintenant" size="md" />
              </div>
            )}

            {/* Neighborhoods */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-ink mb-3">
                Quartiers servis a {city.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {city.neighborhoods.map((q) => (
                  <span
                    key={q}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-surface border border-gray-200 rounded-badge text-sm text-ink"
                  >
                    <MapPin className="w-3 h-3 text-muted" />
                    {q}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div>
              <h2 className="text-xl font-bold text-ink mb-4">Questions frequentes</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-white border border-gray-200 rounded-card overflow-hidden group"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-ink text-sm list-none hover:bg-surface transition-colors">
                      {faq.question}
                      <span className="text-muted ml-4 flex-shrink-0 text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="px-5 pb-4 text-muted text-sm leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </main>

          {/* ---- SIDEBAR (1/3) ---- */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6 bg-white border border-gray-200 rounded-card shadow-card p-6">
              <h3 className="font-bold text-ink text-lg mb-1">Reserver un {service.name}</h3>
              <p className="text-muted text-sm mb-5">Reponse en moins de 5 minutes</p>
              <BookingForm defaultService={service.slug} defaultCity={city.slug} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
