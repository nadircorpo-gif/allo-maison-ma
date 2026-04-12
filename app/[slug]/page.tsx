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
import { getRichContent } from "@/lib/data/content";
import { CheckCircle, MapPin, ExternalLink, Play, Lightbulb, Clock } from "lucide-react";

// --- Static params: ALL services x 6 cities ---
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

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { service, city } = parseSlug(slug);
  if (!service || !city) return {};

  const rich = getRichContent(slug);
  if (rich) {
    return {
      title: rich.metaTitle,
      description: rich.metaDescription,
      alternates: { canonical: `https://allo-maison.ma/${slug}` },
      openGraph: { title: rich.metaTitle, description: rich.metaDescription },
    };
  }

  return generateServiceCityMetadata(
    service.name, service.slug, city.name, city.slug, service.priceMin
  );
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
  const rich = getRichContent(slug);
  const faqs = rich?.faqs || getServiceCityFAQ(service.name, city.name);
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
          service.name, city.name, service.priceMin, service.rating, service.reviewCount
        )}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ---- MAIN (2/3) ---- */}
          <main className="flex-1 min-w-0">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-3 py-1.5 rounded-badge mb-4">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              Depuis 2017, pros verifies et encadres
            </div>

            {/* H1 */}
            <h1 className="text-3xl font-extrabold text-ink mb-3">
              {rich?.h1 || `${service.name} a ${city.name} | Pros verifies`}
            </h1>

            {/* Hero text */}
            <p className="text-muted text-base leading-relaxed mb-6">
              {rich?.heroText || service.description}
            </p>

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
              {rich?.lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="w-4 h-4" />
                  <span>Mis a jour : {rich.lastUpdated}</span>
                </div>
              )}
            </div>

            {/* ===== RICH CONTENT SECTIONS ===== */}
            {rich?.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl font-bold text-ink mb-3">{section.title}</h2>
                <div
                  className="text-muted text-[15px] leading-relaxed prose prose-slate max-w-none
                    [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5
                    [&_li]:mb-1 [&_strong]:text-ink [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-4 [&_h3]:mb-2"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}

            {/* ===== PRICE TABLE ===== */}
            {rich && rich.priceTable.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-ink mb-4">
                  Tarifs {service.name.toLowerCase()} a {city.name} en 2026
                </h2>
                <div className="overflow-x-auto rounded-card border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface">
                        <th className="text-left py-3 px-4 font-semibold text-ink">Intervention</th>
                        <th className="text-right py-3 px-4 font-semibold text-ink">Min</th>
                        <th className="text-right py-3 px-4 font-semibold text-primary">Moyen</th>
                        <th className="text-right py-3 px-4 font-semibold text-ink">Max</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rich.priceTable.map((row, i) => (
                        <tr key={i} className="border-t border-gray-100 hover:bg-surface/50">
                          <td className="py-3 px-4 text-ink font-medium">{row.intervention}</td>
                          <td className="py-3 px-4 text-right text-muted">{row.prixMin} DH</td>
                          <td className="py-3 px-4 text-right text-primary font-semibold">{row.prixMoyen} DH</td>
                          <td className="py-3 px-4 text-right text-muted">{row.prixMax} DH</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted mt-2 italic">
                  * Prix indicatifs constates a {city.name}. Tarifs reels selon complexite. Derniere mise a jour : {rich.lastUpdated}.
                </p>
              </div>
            )}

            {/* ===== YOUTUBE VIDEO ===== */}
            {rich?.youtubeVideoId && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  {rich.youtubeVideoTitle || "Video : conseils pratiques"}
                </h2>
                <div className="relative w-full aspect-video rounded-card overflow-hidden border border-gray-200">
                  <iframe
                    src={`https://www.youtube.com/embed/${rich.youtubeVideoId}`}
                    title={rich.youtubeVideoTitle || "Video conseil"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* ===== EXPERT TIPS ===== */}
            {rich && rich.tips.length > 0 && (
              <div className="mb-10 bg-primary-light border border-primary/10 rounded-card p-6">
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Conseils d&apos;expert
                </h2>
                <ul className="space-y-3">
                  {rich.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-ink leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ===== LOCAL KNOWLEDGE ===== */}
            {rich?.localKnowledge && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-ink mb-3">
                  Connaissance locale : {city.name}
                </h2>
                <div
                  className="text-muted text-[15px] leading-relaxed [&_p]:mb-4 [&_strong]:text-ink"
                  dangerouslySetInnerHTML={{ __html: rich.localKnowledge }}
                />
              </div>
            )}

            {/* ===== ARTISAN LIST ===== */}
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

            {/* ===== EXTERNAL LINKS ===== */}
            {rich && rich.externalLinks.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-bold text-ink mb-3">Ressources utiles</h2>
                <div className="grid gap-2">
                  {rich.externalLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-surface border border-gray-200 rounded-btn hover:border-primary transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-ink group-hover:text-primary">{link.label}</span>
                        <span className="text-xs text-muted ml-2">{link.description}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TESTIMONIALS ===== */}
            {rich && rich.testimonials.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-ink mb-4">Avis clients verifies</h2>
                <div className="grid gap-4">
                  {rich.testimonials.map((t, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-card p-5">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <span key={j} className="text-amber text-sm">&#11088;</span>
                        ))}
                      </div>
                      <p className="text-sm text-ink leading-relaxed italic mb-3">&ldquo;{t.text}&rdquo;</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-ink">{t.name} &middot; {t.quarter}, {t.city}</span>
                        <span className="text-xs text-muted">{t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== NEIGHBORHOODS ===== */}
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

            {/* ===== FAQ ACCORDION ===== */}
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
            <div className="sticky top-20 space-y-6">
              <div className="bg-white border border-gray-200 rounded-card shadow-card p-6">
                <h3 className="font-bold text-ink text-lg mb-1">Reserver un {service.name.toLowerCase()}</h3>
                <p className="text-muted text-sm mb-5">Reponse en moins de 5 minutes</p>
                <BookingForm defaultService={service.slug} defaultCity={city.slug} />
              </div>

              {/* Guarantee mini-card */}
              <div className="bg-ink rounded-card p-4 text-center">
                <p className="text-white font-semibold text-sm mb-1">Garantie Allo-Maison</p>
                <p className="text-white/60 text-xs">Remboursement jusqu&apos;a 2000 DH si travail non conforme</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
