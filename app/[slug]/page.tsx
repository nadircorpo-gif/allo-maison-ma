import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Play, Clock, Star } from "lucide-react";

import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import BookingForm from "@/components/shared/booking-form";
import WhatsAppButton from "@/components/shared/whatsapp-button";

import { getServiceBySlug } from "@/lib/data/services";
import { getCityBySlug } from "@/lib/data/cities";
import {
  getProfessionalsByServiceAndCity,
  countProfessionalsByServiceAndCity,
} from "@/lib/data/professionals";
import { getServiceHero } from "@/lib/data/service-heroes";
import { getServiceCityFAQ } from "@/lib/data/faq";
import {
  generateServiceCityMetadata,
  serviceCityJsonLd,
  faqJsonLd,
  videoObjectJsonLd,
} from "@/lib/seo";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import { getRichContent } from "@/lib/data/content";

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
      openGraph: {
        title: rich.metaTitle,
        description: rich.metaDescription,
        url: `https://allo-maison.ma/${slug}`,
        siteName: "Allo-Maison",
        locale: "fr_MA",
        type: "website",
      },
      twitter: { card: "summary_large_image", title: rich.metaTitle, description: rich.metaDescription },
    };
  }

  return generateServiceCityMetadata(
    service.name, service.slug, city.name, city.slug, service.priceMin
  );
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { service, city } = parseSlug(slug);

  if (!service || !city) notFound();

  const [professionals, totalPros] = await Promise.all([
    getProfessionalsByServiceAndCity(service.slug, city.slug, 12),
    countProfessionalsByServiceAndCity(service.slug, city.slug),
  ]);
  const heroImage = getServiceHero(service.slug);
  const rich = getRichContent(slug);
  const faqs = rich?.faqs || getServiceCityFAQ(service.name, city.name);
  const whatsappUrl = buildBookingWhatsAppUrl(service.name, city.name);
  const lowerService = service.name.toLowerCase();

  const breadcrumbItems = [
    { name: service.name, url: `https://allo-maison.ma/${service.slug}-casablanca` },
    { name: city.name, url: `https://allo-maison.ma/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceCityJsonLd(
          service.name, city.name, service.priceMin, service.rating, service.reviewCount
        )}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      {rich?.youtubeVideoId && (
        <JsonLd
          data={videoObjectJsonLd(
            rich.youtubeVideoId,
            rich.youtubeVideoTitle || `${service.name} à ${city.name} — conseils pratiques`,
            `Vidéo conseil pour trouver un ${lowerService} de confiance à ${city.name}.`
          )}
        />
      )}

      {/* ============ HERO (compact editorial) ============ */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <Breadcrumb items={breadcrumbItems} className="mb-4 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">
                  Service certifié · {service.name} · {city.name}
                </span>
              </div>

              <h1 className="font-display text-[28px] sm:text-[36px] font-[550] leading-[1.02] tracking-[-0.02em] text-ink mb-3" style={{ textWrap: "balance" }}>
                {rich?.h1 || (
                  <>
                    {service.name} à {city.name},{" "}
                    <em className="italic text-terracotta">bien choisi.</em>
                  </>
                )}
              </h1>

              <p className="text-sm text-muted max-w-lg mb-5" style={{ textWrap: "pretty" }}>
                {rich?.heroText || service.description}
              </p>

              {/* Editorial stats row */}
              <div className="grid grid-cols-4 gap-4 border-t border-paper-border pt-4 tab-nums">
                <div>
                  <p className="font-display text-xl sm:text-2xl font-[500] leading-none">{totalPros || city.artisanCount}+</p>
                  <p className="text-[10px] text-muted mt-1">
                    {lowerService}s vérifiés
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-[500] leading-none">
                    {service.rating.toFixed(1)}
                    <span className="text-xs text-muted">/5</span>
                  </p>
                  <p className="text-[10px] text-muted mt-1">{service.reviewCount.toLocaleString("fr")} avis</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-[500] leading-none">
                    {service.priceMin}
                    <span className="text-xs text-muted"> MAD</span>
                  </p>
                  <p className="text-[10px] text-muted mt-1">à partir de</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-[500] leading-none">24h</p>
                  <p className="text-[10px] text-muted mt-1">devis moyen</p>
                </div>
              </div>

              {rich?.lastUpdated && (
                <p className="flex items-center gap-1.5 text-[10px] text-muted mt-3">
                  <Clock className="w-3 h-3" />
                  Mis à jour {rich.lastUpdated}
                </p>
              )}
            </div>

            {/* Photo hero (Unsplash) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-clay">
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 35vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  <span className="text-[9px] uppercase tracking-[0.2em] bg-black/30 backdrop-blur text-white px-2 py-1 rounded font-semibold">
                    Service n° {(SERVICE_SLUGS.indexOf(service.slug) + 1).toString().padStart(2, "0")} · Certifié
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-80">Intervention vérifiée</p>
                  <p className="font-display text-lg font-medium">
                    {service.name} · {city.name}
                  </p>
                </div>
              </div>
              {/* Mini shield badge */}
              <div className="absolute -left-2 -bottom-2 bg-white border border-paper-border rounded-lg p-2 flex items-center gap-2 shadow-card">
                <Image src="/brand/logo-mark.svg" alt="" width={320} height={400} className="w-6 h-8" />
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-muted">Depuis 2017</p>
                  <p className="text-[11px] font-bold text-ink">Vérifié & certifié</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAIN GRID ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 py-16">
        <main className="lg:col-span-8 min-w-0">

          {/* ===== PROS directory ===== */}
          <section id="pros" className="mb-20 scroll-mt-24">
            <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
              <div>
                <p className="eyebrow mb-2">02 — Les pros</p>
                <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
                  Notre sélection du moment.
                </h2>
              </div>
              <span className="text-xs text-muted tab-nums">
                {professionals.length > 0 ? `${professionals.length} affichés sur ${totalPros}` : "Sur demande"}
              </span>
            </div>

            {professionals.length > 0 ? (
              <ol className="border-t border-ink">
                {professionals.map((pro, i) => {
                  const proWhatsApp = pro.phone
                    ? `https://wa.me/${pro.phone.replace(/[^\d]/g, "")}`
                    : whatsappUrl;
                  return (
                    <li
                      key={pro.id}
                      className="grid grid-cols-12 gap-3 sm:gap-4 py-5 border-b border-paper-border group hover:bg-white/60 transition"
                    >
                      <span className="col-span-1 tab-nums text-xs text-muted font-display mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="col-span-3 sm:col-span-2 aspect-square rounded-lg overflow-hidden relative flex items-center justify-center" style={{ background: i % 2 === 0 ? "#E8D5C4" : "#EAF0F2" }}>
                        <span className="font-display text-3xl sm:text-4xl text-zellige font-[500]">
                          {pro.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        {pro.verified && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-mint border-2 border-cream flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                          </span>
                        )}
                      </div>
                      <div className="col-span-8 sm:col-span-6 min-w-0">
                        <p className="font-display text-xl font-medium text-ink leading-tight">
                          {pro.displayName}
                        </p>
                        <p className="text-[11px] text-muted mt-1 tab-nums">
                          {pro.quartier ? `${pro.quartier} · ` : ""}
                          {city.name}
                          {pro.experienceYears ? ` · ${pro.experienceYears} ans d'exp.` : ""}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5 text-xs tab-nums">
                          <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
                          <span className="font-bold text-ink">{pro.rating.toFixed(1)}</span>
                          <span className="text-muted">· {pro.reviewCount} avis</span>
                        </div>
                        {pro.description && (
                          <p className="text-[11px] text-muted mt-2 line-clamp-1 italic">
                            « {pro.description.slice(0, 90)}
                            {pro.description.length > 90 ? "…" : ""} »
                          </p>
                        )}
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          <span className="text-[10px] bg-clay text-ink px-2 py-0.5 rounded-full font-semibold">
                            Identité ✓
                          </span>
                          {pro.phone && (
                            <span className="text-[10px] bg-clay text-ink px-2 py-0.5 rounded-full font-semibold">
                              Contact direct ✓
                            </span>
                          )}
                          {pro.scoreMaison >= 3 && (
                            <span className="text-[10px] bg-saffron text-ink px-2 py-0.5 rounded-full font-bold">
                              ★ Top pro
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-3 text-left sm:text-right tab-nums flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 pt-2 sm:pt-0">
                        <p className="font-display text-sm font-medium text-ink whitespace-nowrap">
                          {service.priceLabel}
                        </p>
                        <WhatsAppButton url={proWhatsApp} label="Contacter" size="sm" />
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="bg-white border border-paper-border rounded-xl p-8 text-center">
                <p className="font-display text-xl text-ink font-medium mb-2">
                  Des pros sont disponibles à {city.name}.
                </p>
                <p className="text-muted text-sm mb-5">
                  Contactez-nous sur WhatsApp, on vous met en relation en moins d&apos;une heure.
                </p>
                <WhatsAppButton url={whatsappUrl} label="Trouver un pro" size="md" />
              </div>
            )}

            {totalPros > professionals.length && (
              <p className="text-sm text-muted italic mt-6">
                + {totalPros - professionals.length} autres {lowerService}s vérifiés à {city.name}.
              </p>
            )}
          </section>

          {/* ===== RICH SECTIONS (from content registry) ===== */}
          {rich?.sections.map((section, i) => (
            <section key={i} className="mb-16">
              <p className="eyebrow mb-2">{String(i + 3).padStart(2, "0")} — {section.title}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-6">
                {section.title}
              </h2>
              <div
                className="text-muted leading-relaxed prose max-w-none
                  [&_p]:mb-4 [&_p]:text-[15px]
                  [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5
                  [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5
                  [&_li]:mb-1.5 [&_strong]:text-ink [&_strong]:font-semibold
                  [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-ink [&_h3]:mt-6 [&_h3]:mb-3"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}

          {/* ===== TARIFS (editorial) ===== */}
          {rich && rich.priceTable.length > 0 && (
            <section className="mb-16 zellige-bg -mx-4 sm:-mx-6 px-4 sm:px-6 py-12 rounded-2xl">
              <div className="mb-8">
                <p className="eyebrow mb-2">{String((rich?.sections.length ?? 0) + 3).padStart(2, "0")} — Tarifs 2026</p>
                <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
                  Ce que ça coûte, <em className="italic text-terracotta">vraiment.</em>
                </h2>
                <p className="text-muted mt-3 max-w-md text-sm">
                  Tarifs moyens constatés à {city.name}. Main d&apos;œuvre + matériel standard inclus.
                </p>
              </div>
              <div className="bg-white border border-paper-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-cream py-3 px-4 sm:px-6 text-[10px] uppercase tracking-wider font-bold text-muted border-b border-paper-border">
                  <span className="col-span-6">Intervention</span>
                  <span className="col-span-2 text-right">Min</span>
                  <span className="col-span-2 text-right text-terracotta">Moyen</span>
                  <span className="col-span-2 text-right">Max</span>
                </div>
                <div className="divide-y divide-paper-border tab-nums">
                  {rich.priceTable.map((row, i) => (
                    <div key={i} className="grid grid-cols-12 py-4 px-4 sm:px-6 items-baseline">
                      <span className="col-span-6 text-sm font-medium text-ink">{row.intervention}</span>
                      <span className="col-span-2 text-right text-xs text-muted">{row.prixMin} MAD</span>
                      <span className="col-span-2 text-right font-display text-xl text-terracotta">{row.prixMoyen}</span>
                      <span className="col-span-2 text-right text-xs text-muted">{row.prixMax} MAD</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted italic mt-3">
                * Prix indicatifs · varient selon complexité. Mise à jour : {rich.lastUpdated}.
              </p>
            </section>
          )}

          {/* ===== YOUTUBE VIDEO ===== */}
          {rich?.youtubeVideoId && (
            <section className="mb-16">
              <p className="eyebrow mb-2">Vidéo</p>
              <h2 className="font-display text-3xl font-[550] tracking-[-0.02em] text-ink mb-5 flex items-center gap-2">
                <Play className="w-5 h-5 text-terracotta" />
                {rich.youtubeVideoTitle || "Conseils pratiques en vidéo"}
              </h2>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-paper-border">
                <iframe
                  src={`https://www.youtube.com/embed/${rich.youtubeVideoId}`}
                  title={rich.youtubeVideoTitle || "Vidéo conseil"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
            </section>
          )}

          {/* ===== TIPS (pull-quotes) ===== */}
          {rich && rich.tips.length > 0 && (
            <section className="mb-16">
              <p className="eyebrow mb-2">Conseils d&apos;expert</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-10">
                {rich.tips.length} choses que{" "}
                <em className="italic text-terracotta">personne</em> ne vous dit.
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {rich.tips.slice(0, 6).map((tip, i) => (
                  <article key={i} className="border-t-2 border-ink pt-5">
                    <p className="font-display text-3xl font-[500] text-terracotta tab-nums mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">{tip}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ===== LOCAL KNOWLEDGE ===== */}
          {rich?.localKnowledge && (
            <section className="mb-16">
              <p className="eyebrow mb-2">Connaissance locale</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-5">
                À {city.name}, <em className="italic">ce qu&apos;il faut savoir.</em>
              </h2>
              <div
                className="text-muted leading-relaxed text-[15px] [&_p]:mb-4 [&_strong]:text-ink [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: rich.localKnowledge }}
              />
            </section>
          )}

          {/* ===== TESTIMONIALS (editorial 3-col) ===== */}
          {rich && rich.testimonials.length > 0 && (
            <section className="mb-16">
              <p className="eyebrow mb-2">Avis clients</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
                «{" "}
                <em className="italic text-terracotta">Enfin</em> un {lowerService}<br />
                qui respecte ses engagements. »
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {rich.testimonials.slice(0, 3).map((t, i) => {
                  const isFeatured = i === 1;
                  return (
                    <div
                      key={i}
                      className={
                        isFeatured
                          ? "bg-zellige text-cream rounded-2xl p-5"
                          : "bg-white border border-paper-border rounded-2xl p-5"
                      }
                    >
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-3.5 h-3.5 ${isFeatured ? "fill-saffron text-saffron" : "fill-saffron text-saffron"}`}
                          />
                        ))}
                      </div>
                      <p
                        className={
                          isFeatured
                            ? "font-display italic text-lg leading-snug mb-4"
                            : "text-sm leading-relaxed italic mb-4"
                        }
                      >
                        « {t.text} »
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-semibold ${isFeatured ? "text-cream" : "text-ink"}`}>
                          {t.name}
                        </span>
                        <span className={isFeatured ? "opacity-70" : "text-muted"}>{t.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ===== NEIGHBORHOODS ===== */}
          <section className="mb-16">
            <p className="eyebrow mb-2">Quartiers couverts</p>
            <h2 className="font-display text-2xl sm:text-3xl font-[550] tracking-[-0.02em] text-ink mb-5">
              {city.neighborhoods.length} quartiers de {city.name}.
            </h2>
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

          {/* ===== FAQ (editorial) ===== */}
          <section className="mb-10">
            <p className="eyebrow mb-2">Questions fréquentes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
              Ce que vous nous demandez <em className="italic">le plus.</em>
            </h2>
            <div className="border-t border-ink">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="border-b border-paper-border group py-5"
                >
                  <summary className="font-display font-medium text-lg text-ink cursor-pointer list-none flex justify-between items-start gap-4">
                    <span>{faq.question}</span>
                    <span className="font-display italic text-2xl text-muted group-open:rotate-45 transition-transform shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="text-muted text-sm mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </main>

        {/* ============ SIDEBAR ============ */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-4">
            <div className="bg-white border border-paper-border rounded-2xl p-6 shadow-card-hover">
              <p className="eyebrow mb-2">Devis gratuit</p>
              <h3 className="font-display text-2xl font-[550] text-ink mb-1">
                Votre {lowerService},<br />
                <em className="italic text-terracotta">en 24 h.</em>
              </h3>
              <p className="text-sm text-muted mb-5">Réponse humaine sous 47 min en moyenne.</p>
              <BookingForm defaultService={service.slug} defaultCity={city.slug} />
              <div className="border-t border-paper-border mt-5 pt-4 flex items-center justify-between text-[10px] text-muted tab-nums">
                <span>● Gratuit</span>
                <span>● Sans engagement</span>
                <span>● Pros certifiés</span>
              </div>
            </div>

            {/* Shield trust badge */}
            <div className="bg-zellige text-cream rounded-2xl p-5 flex items-center gap-4">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={320}
                height={400}
                className="w-10 h-12 shrink-0"
              />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-saffron font-bold">Certifiés</p>
                <p className="text-sm font-bold mt-0.5">Vérifiés depuis 2017</p>
                <p className="text-xs opacity-75 mt-0.5">Pas satisfait ? On règle.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
