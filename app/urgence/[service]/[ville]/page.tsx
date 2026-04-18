import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";

import { getServiceBySlug } from "@/lib/data/services";
import { getCityBySlug } from "@/lib/data/cities";
import { getUrgenceFAQ } from "@/lib/data/faq";
import { generateUrgenceMetadata, faqJsonLd, breadcrumbJsonLd, howToJsonLd, professionalServiceJsonLd, urgenceServiceJsonLd, getUrgenceMetier } from "@/lib/seo";
import { buildUrgenceWhatsAppUrl } from "@/lib/whatsapp";
import { getProfessionalsByServiceAndCity } from "@/lib/data/professionals";
import ArtisanCardV2 from "@/components/shared/artisan-card-v2";
import { Phone, Clock, MapPin, ShieldCheck, Wrench, Zap, Key, BadgeCheck, Wallet } from "lucide-react";

const URGENCE_SERVICE_SLUGS = ["plombier", "electricien", "serrurier"];
const CITY_SLUGS = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];

export function generateStaticParams() {
  const params: { service: string; ville: string }[] = [];
  for (const service of URGENCE_SERVICE_SLUGS) {
    for (const ville of CITY_SLUGS) {
      params.push({ service, ville });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; ville: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, ville: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return generateUrgenceMetadata(service.name, city.name, service.slug, city.slug);
}

const EMERGENCY_STEPS: Record<string, string[]> = {
  plombier: [
    "Coupez l'arrivée d'eau principale",
    "Coupez l'électricité dans la zone inondée",
    "Posez des serpillières pour limiter les dégâts",
    "Appelez un plombier d'urgence Allo Maison",
  ],
  electricien: [
    "Coupez le disjoncteur général immédiatement",
    "Ne touchez pas les fils ou appareils sous tension",
    "Évacuez si vous sentez une odeur de brûlé",
    "Appelez un électricien d'urgence Allo Maison",
  ],
  serrurier: [
    "Vérifiez si vous avez un double de la clé",
    "Ne forcez pas la serrure, vous risquez de la casser",
    "Restez près de la porte en attendant le pro",
    "Appelez un serrurier d'urgence Allo Maison",
  ],
};

type PricingRow = {
  intervention: string;
  price: string;
  delay: string;
};

const PRICING_BY_SERVICE: Record<string, PricingRow[]> = {
  plombier: [
    { intervention: "Débouchage évier / lavabo", price: "250 – 400 DH", delay: "30 – 60 min" },
    { intervention: "Fuite sous évier ou mitigeur", price: "300 – 500 DH", delay: "30 min" },
    { intervention: "Chauffe-eau en panne", price: "400 – 800 DH", delay: "45 min" },
    { intervention: "WC bouché / débordement", price: "300 – 500 DH", delay: "30 – 60 min" },
    { intervention: "Installation robinet / mitigeur", price: "200 – 350 DH", delay: "45 min" },
    { intervention: "Recherche de fuite (acoustique)", price: "500 – 800 DH", delay: "60 min" },
  ],
  electricien: [
    { intervention: "Panne générale (tableau)", price: "300 – 600 DH", delay: "30 min" },
    { intervention: "Court-circuit localisé", price: "250 – 450 DH", delay: "30 min" },
    { intervention: "Disjoncteur qui saute", price: "200 – 400 DH", delay: "30 min" },
    { intervention: "Prise / interrupteur HS", price: "150 – 300 DH", delay: "30 min" },
    { intervention: "Installation luminaire / spot", price: "200 – 350 DH", delay: "45 min" },
    { intervention: "Tableau électrique neuf", price: "1 500 – 4 000 DH", delay: "4 – 8 h" },
  ],
  serrurier: [
    { intervention: "Porte claquée (ouverture)", price: "250 – 450 DH", delay: "20 – 30 min" },
    { intervention: "Serrure cassée (remplacement standard)", price: "400 – 700 DH", delay: "45 min" },
    { intervention: "Clé cassée dans la serrure", price: "350 – 550 DH", delay: "30 min" },
    { intervention: "Coffre-fort bloqué", price: "600 – 1 200 DH", delay: "60 min" },
    { intervention: "Pose serrure haute sécurité A2P", price: "800 – 2 000 DH", delay: "60 – 90 min" },
    { intervention: "Changement de cylindre", price: "300 – 500 DH", delay: "30 min" },
  ],
};

const QUARTIERS_BY_CITY: Record<string, string[]> = {
  casablanca: [
    "Maarif",
    "Aïn Diab",
    "Bourgogne",
    "Gauthier",
    "Racine",
    "2 Mars",
    "CIL",
    "Oasis",
    "Sbata",
    "Sidi Maârouf",
    "Hay Hassani",
    "Anfa",
  ],
  rabat: [
    "Hay Riad",
    "Agdal",
    "Hassan",
    "L'Océan",
    "Souissi",
    "Les Orangers",
    "Yacoub El Mansour",
    "Témara centre",
    "Aviation",
    "Diour Jamaâ",
  ],
  marrakech: [
    "Guéliz",
    "Hivernage",
    "Médina",
    "Agdal",
    "Palmeraie",
    "Targa",
    "Semlalia",
    "Daoudiate",
    "M'Hamid",
    "Kechla",
  ],
  tanger: [
    "Centre-ville",
    "Malabata",
    "Californie",
    "Souani",
    "Iberia",
    "Houara",
    "Jbel Kbir",
    "Val Fleuri",
    "Charf",
    "Beni Makada",
  ],
  fes: [
    "Ville nouvelle",
    "Médina (Fès El Bali)",
    "Fès Jdid",
    "Atlas",
    "Saïss",
    "Narjiss",
    "Oued Fès",
    "Dar Debibagh",
    "Agdal",
    "Zouagha",
  ],
  agadir: [
    "Secteur touristique",
    "Cité Dakhla",
    "Talborjt",
    "Founty",
    "Charaf",
    "Hay Mohammadi",
    "Bensergao",
    "Al Houda",
    "Tikiouine",
  ],
};

const SERVICE_ICON: Record<string, typeof Wrench> = {
  plombier: Wrench,
  electricien: Zap,
  serrurier: Key,
};

const USP_ITEMS: { title: string; description: string }[] = [
  {
    title: "Intervention en moins de 30 minutes",
    description:
      "Délai moyen constaté auprès de nos pros vérifiés. Un technicien près de chez vous est mobilisé immédiatement après votre appel.",
  },
  {
    title: "Pros vérifiés et assurés",
    description:
      "Identité contrôlée, références confirmées et attestation d'assurance responsabilité civile professionnelle à jour pour chaque artisan du réseau.",
  },
  {
    title: "Prix forfaitaire annoncé avant intervention",
    description:
      "Le tarif exact est communiqué par WhatsApp ou téléphone avant le déplacement. Pas de majoration surprise une fois sur place.",
  },
  {
    title: "Paiement sur place, au choix",
    description:
      "Réglez en espèces, par virement ou par carte bancaire selon le pro. Aucun acompte demandé avant la fin de l'intervention.",
  },
];

export default async function UrgencePage({
  params,
}: {
  params: Promise<{ service: string; ville: string }>;
}) {
  const { service: serviceSlug, ville: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city || !service.urgenceAvailable) notFound();

  const metier = getUrgenceMetier(serviceSlug, service.name);
  const [faqs, topPros] = await Promise.all([
    Promise.resolve(getUrgenceFAQ(metier.label, city.name)),
    getProfessionalsByServiceAndCity(serviceSlug, citySlug, 3),
  ]);
  const whatsappUrl = buildUrgenceWhatsAppUrl(metier.lowerLabel, city.name);
  const phoneHref = `tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}`;
  const steps = EMERGENCY_STEPS[serviceSlug] ?? EMERGENCY_STEPS.plombier;
  const lowerService = metier.lowerLabel;
  const pricingRows = PRICING_BY_SERVICE[serviceSlug] ?? [];
  const quartiers = QUARTIERS_BY_CITY[citySlug] ?? [];
  const ServiceIcon = SERVICE_ICON[serviceSlug] ?? Wrench;
  const hasPros = topPros.length > 0;

  const breadcrumbItems = [
    { name: "Urgence", url: "https://allo-maison.ma/urgence" },
    { name: service.name, url: `https://allo-maison.ma/urgence/${serviceSlug}` },
    { name: city.name, url: `https://allo-maison.ma/urgence/${serviceSlug}/${citySlug}` },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={urgenceServiceJsonLd(
        service.name,
        city.name,
        serviceSlug,
        citySlug,
        service.priceMin
      )} />
      <JsonLd data={howToJsonLd(
        `Que faire en urgence ${lowerService} à ${city.name}`,
        `Étapes pour gérer une urgence ${lowerService} en attendant l'arrivée du professionnel à ${city.name}.`,
        steps,
        "PT5M"
      )} />
      {topPros.map((p, i) => (
        <JsonLd key={`urg-pro-${i}`} data={professionalServiceJsonLd({
          id: p.id,
          name: p.displayName,
          serviceName: service.name,
          cityName: city.name,
          rating: p.rating,
          reviewCount: p.reviewCount,
          phone: p.phone ?? undefined,
          yearsExperience: p.experienceYears ?? undefined,
        })} />
      ))}

      {/* ========= Sticky urgency bar (zellige) ========= */}
      <div className="sticky top-0 z-40 bg-terracotta text-cream border-b border-primary-deep shadow-terracotta">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          <p className="font-display text-lg font-[500] flex-1 text-center sm:text-left">
            SOS {lowerService} · {city.name} · <em className="italic">intervention en 30 min</em>
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-cream font-bold rounded-lg text-sm hover:bg-[#2a2824] transition-colors uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              Appeler
            </a>
            <WhatsAppButton url={whatsappUrl} label="WhatsApp" size="sm" />
          </div>
        </div>
      </div>

      {/* ========= HERO ========= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Urgence 24 h/24 · {city.name}</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                {service.name} urgence<br />
                <em className="italic text-terracotta">en 30 minutes.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl">
                Un professionnel vérifié arrive chez vous sous 30 minutes à {city.name}. Disponible 7 j/7, y compris la nuit et les jours fériés.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white font-bold rounded-lg shadow-terracotta hover:bg-primary-deep transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Appeler maintenant
                </a>
                <WhatsAppButton url={whatsappUrl} label="WhatsApp urgence" size="lg" />
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Allo Maison — intervention d'urgence certifiée"
                width={320}
                height={400}
                className="w-36 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 min-w-0">
          {/* Emergency steps */}
          <section className="mb-16">
            <p className="eyebrow mb-2">01 — Premiers réflexes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
              Que faire <em className="italic text-terracotta">en attendant</em> le pro ?
            </h2>
            <div className="border-t border-ink">
              {steps.map((step, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-6 border-b border-paper-border">
                  <span className="col-span-2 sm:col-span-1 font-display text-3xl sm:text-4xl font-[500] text-terracotta tab-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="col-span-10 sm:col-span-11 text-ink text-base sm:text-lg leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Prix transparents urgence */}
          {pricingRows.length > 0 && (
            <section className="mb-16">
              <p className="eyebrow mb-2">02 — Prix réels urgence</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-4">
                Tarifs {lowerService}{" "}
                <em className="italic text-terracotta">à {city.name}.</em>
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-2xl">
                Prix moyens constatés à {city.name} en 2026. Le pro vous confirme le tarif exact par WhatsApp avant l&apos;intervention, sans surprise. Pas de frais cachés, pas d&apos;acompte avant travaux.
              </p>

              <div className="overflow-hidden border border-paper-border rounded-2xl bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-cream border-b border-paper-border">
                    <tr>
                      <th className="text-left px-5 py-3 font-display font-[550] text-ink text-[13px] uppercase tracking-wider">
                        Intervention
                      </th>
                      <th className="text-left px-5 py-3 font-display font-[550] text-ink text-[13px] uppercase tracking-wider">
                        Prix forfait
                      </th>
                      <th className="text-left px-5 py-3 font-display font-[550] text-ink text-[13px] uppercase tracking-wider">
                        Délai
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row, i) => (
                      <tr
                        key={i}
                        className={i < pricingRows.length - 1 ? "border-b border-paper-border" : ""}
                      >
                        <td className="px-5 py-4 text-ink font-medium">
                          <div className="flex items-center gap-3">
                            <ServiceIcon className="w-4 h-4 text-terracotta shrink-0" />
                            <span>{row.intervention}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-ink tab-nums font-semibold whitespace-nowrap">
                          {row.price}
                        </td>
                        <td className="px-5 py-4 text-muted tab-nums whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
                            <span>{row.delay}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream border border-paper-border text-muted font-medium uppercase tracking-wider">
                  <Wallet className="w-3 h-3" />
                  Paiement sur place
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream border border-paper-border text-muted font-medium uppercase tracking-wider">
                  <BadgeCheck className="w-3 h-3" />
                  Devis gratuit WhatsApp
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream border border-paper-border text-muted font-medium uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  Majoration nuit +30 à 50 %
                </span>
              </div>
            </section>
          )}

          {/* Quartiers couverts */}
          {quartiers.length > 0 && (
            <section className="mb-16">
              <p className="eyebrow mb-2">03 — Zones couvertes</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-4">
                Quartiers desservis à{" "}
                <em className="italic text-terracotta">{city.name}.</em>
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-2xl">
                Nos {lowerService}s couvrent l&apos;ensemble de {city.name} et ses principaux quartiers. Le pro le plus proche de votre adresse est mobilisé en priorité pour minimiser le délai d&apos;intervention, souvent sous 30 minutes en zone intra-muros.
              </p>

              <div className="flex flex-wrap gap-2">
                {quartiers.map((q) => (
                  <span
                    key={q}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-paper-border text-ink text-sm font-medium hover:border-terracotta transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    {q}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm text-muted leading-relaxed max-w-2xl">
                Vous habitez en périphérie de {city.name} ou dans une commune limitrophe ? Précisez-le dans votre message WhatsApp : un {lowerService} vérifié peut se déplacer, avec un éventuel supplément kilométrique annoncé à l&apos;avance.
              </p>
            </section>
          )}

          {/* Pourquoi Allo Maison (USP) */}
          <section className="mb-16">
            <p className="eyebrow mb-2">04 — Pourquoi Allo Maison</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
              4 engagements pour votre urgence{" "}
              <em className="italic text-terracotta">à {city.name}.</em>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {USP_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-paper-border rounded-2xl p-6 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream border border-paper-border flex items-center justify-center shrink-0">
                      {i === 0 && <Clock className="w-5 h-5 text-terracotta" />}
                      {i === 1 && <ShieldCheck className="w-5 h-5 text-terracotta" />}
                      {i === 2 && <BadgeCheck className="w-5 h-5 text-terracotta" />}
                      {i === 3 && <Wallet className="w-5 h-5 text-terracotta" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-[550] text-ink mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-ink text-cream rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <p className="eyebrow mb-2" style={{ color: "#D4A24C" }}>
                  Une urgence en cours ?
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-[550] leading-tight">
                  Un {lowerService} vérifié chez vous{" "}
                  <em className="italic text-saffron">sous 30 minutes.</em>
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-terracotta text-white font-bold rounded-lg shadow-terracotta hover:bg-primary-deep transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </a>
                <WhatsAppButton url={whatsappUrl} label="WhatsApp urgence" size="lg" />
              </div>
            </div>
          </section>

          {/* Top 3 pros */}
          {hasPros && (
            <section className="mb-16">
              <p className="eyebrow mb-2">05 — Pros disponibles maintenant</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
                {topPros.length} {lowerService}s disponibles à{" "}
                <em className="italic text-terracotta">{city.name}.</em>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topPros.map((pro) => (
                  <ArtisanCardV2
                    key={pro.id}
                    pro={pro}
                    serviceName={service.name}
                    cityName={city.name}
                  />
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section>
            <p className="eyebrow mb-2">{hasPros ? "06" : "05"} — Questions fréquentes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
              Ce que vous nous demandez <em className="italic">le plus.</em>
            </h2>
            <div className="border-t border-ink">
              {faqs.map((faq, i) => (
                <details key={i} className="border-b border-paper-border group py-5">
                  <summary className="font-display font-medium text-lg text-ink cursor-pointer list-none flex justify-between items-start gap-4">
                    <span>{faq.question}</span>
                    <span className="font-display italic text-2xl text-muted group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        {/* Sticky sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-4">
            <div className="bg-ink text-cream rounded-2xl p-6">
              <p className="eyebrow mb-2" style={{ color: "#D4A24C" }}>Urgence 24 h/24</p>
              <h3 className="font-display text-2xl font-[550] mb-1">
                Un pro chez vous<br />
                <em className="italic text-saffron">sous 30 min.</em>
              </h3>
              <p className="text-sm text-cream/70 mb-5">
                Notre équipe humaine vous met en relation avec un artisan vérifié de {city.name} en moins de 5 minutes.
              </p>
              <div className="space-y-2">
                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-terracotta text-white font-bold rounded-lg shadow-terracotta transition-transform active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  Appeler maintenant
                </a>
                <WhatsAppButton url={whatsappUrl} label="WhatsApp urgence" size="lg" className="w-full" />
              </div>
              <div className="border-t border-white/10 mt-5 pt-4 flex items-center justify-between text-[10px] text-cream/50 tab-nums">
                <span>● 24 h/24</span>
                <span>● Gratuit</span>
                <span>● Pros certifiés</span>
              </div>
            </div>

            <div className="bg-white border border-paper-border rounded-2xl p-5 flex items-center gap-4">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={320}
                height={400}
                className="w-10 h-12 shrink-0"
              />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Depuis 2017</p>
                <p className="text-sm font-bold mt-0.5 text-ink">Pros vérifiés</p>
                <p className="text-xs text-muted mt-0.5">Et certifiés</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
