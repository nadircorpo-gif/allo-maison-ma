import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";

import Breadcrumb from "@/components/shared/breadcrumb";
import JsonLd from "@/components/seo/json-ld";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { getServiceBySlug } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

const URGENCE_SERVICE_SLUGS = ["plombier", "electricien", "serrurier"] as const;

export function generateStaticParams() {
  return URGENCE_SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service || !service.urgenceAvailable) {
    return { title: "Service d'urgence introuvable | Allo-Maison", robots: { index: false } };
  }
  const title = `${service.name} d'urgence au Maroc | Allo-Maison`;
  const description = `${service.name} d'urgence vérifié chez vous en 30 minutes, 24 h/24 et 7 j/7. Disponible à Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir. Sans avance.`;
  const url = `https://allo-maison.ma/urgence/${service.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Allo-Maison",
      locale: "fr_MA",
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

const WHEN_TO_CALL: Record<string, { title: string; description: string }[]> = {
  plombier: [
    {
      title: "Fuite d'eau qui inonde",
      description:
        "Une canalisation qui lâche, un flexible de machine à laver qui cède, un joint qui rompt. Chaque minute compte avant les dégâts sur le voisin du dessous.",
    },
    {
      title: "WC bouché qui déborde",
      description:
        "Un bouchon tenace, des eaux usées qui remontent. À traiter dans l'heure pour éviter les odeurs et risques sanitaires.",
    },
    {
      title: "Pas d'eau chaude",
      description:
        "Chauffe-eau en panne en plein hiver, ballon qui fuit. Nos plombiers interviennent en soirée, week-end et jours fériés.",
    },
    {
      title: "Fuite de gaz suspectée",
      description:
        "Odeur de gaz dans la cuisine, détecteur qui sonne. Fermez le robinet principal, aérez, et appelez-nous immédiatement.",
    },
  ],
  electricien: [
    {
      title: "Panne totale de courant",
      description:
        "Disjoncteur général qui saute sans raison, pas de courant alors que le quartier est alimenté. Diagnostic en 30 minutes.",
    },
    {
      title: "Odeur de brûlé dans une prise",
      description:
        "Risque d'incendie imminent. Coupez le disjoncteur général et appelez-nous. Intervention prioritaire 24/7.",
    },
    {
      title: "Court-circuit à répétition",
      description:
        "Un disjoncteur qui saute plusieurs fois par jour, une pièce qui n'a plus de courant. Faux contact à localiser d'urgence.",
    },
    {
      title: "Tableau électrique défaillant",
      description:
        "Fusibles qui claquent, différentiel qui ne tient plus. Nos électriciens agréés remplacent sur place les éléments défectueux.",
    },
  ],
  serrurier: [
    {
      title: "Porte claquée, clés à l'intérieur",
      description:
        "Vous êtes bloqué devant chez vous. Ouverture non destructive dans 9 cas sur 10, sans changer la serrure.",
    },
    {
      title: "Clé cassée dans la serrure",
      description:
        "Extraction propre du morceau de clé sans démonter la porte. Intervention rapide pour retrouver l'usage de votre entrée.",
    },
    {
      title: "Tentative d'effraction",
      description:
        "Porte forcée, serrure endommagée. Nous sécurisons sur place et remplaçons la serrure par un modèle A2P le jour même.",
    },
    {
      title: "Serrure bloquée ou grippée",
      description:
        "La clé tourne dans le vide, la porte ne ferme plus. Diagnostic immédiat et réparation sans casse dans la majorité des cas.",
    },
  ],
};

export default async function UrgenceServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service || !service.urgenceAvailable) notFound();

  const whatsappUrl = buildWhatsAppUrl(
    `URGENCE : j'ai besoin d'un ${service.name.toLowerCase()} immediatement. Pouvez-vous m'aider ?`
  );
  const phoneHref = `tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}`;
  const cases = WHEN_TO_CALL[service.slug] ?? [];
  const lowerService = service.name.toLowerCase();

  const breadcrumbItems = [
    { name: "Urgence", url: "https://allo-maison.ma/urgence" },
    { name: service.name, url: `https://allo-maison.ma/urgence/${service.slug}` },
  ];
  const cityItems = CITIES.map((city) => ({
    name: `${service.name} d'urgence à ${city.name}`,
    url: `https://allo-maison.ma/urgence/${service.slug}/${city.slug}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={itemListJsonLd(`${service.name} d'urgence par ville`, cityItems)} />
      {/* ========= Sticky urgency bar ========= */}
      <div className="sticky top-0 z-40 bg-terracotta text-cream border-b border-primary-deep shadow-terracotta">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          <p className="font-display text-lg font-[500] flex-1 text-center sm:text-left">
            SOS {lowerService} · <em className="italic">intervention en 30 min</em>
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
                <span className="eyebrow text-[10px]">
                  {service.name} urgence · 24 h/24 · 7 j/7
                </span>
              </div>
              <h1
                className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5"
                style={{ textWrap: "balance" }}
              >
                {service.name} d&apos;urgence<br />
                <em className="italic text-terracotta">en 30 minutes.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl">
                Un {lowerService} vérifié et agréé chez vous en 30 minutes, dans les 6 grandes villes du Maroc. Nuit, week-end et jours fériés inclus.
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
                alt={`Allo Maison — ${lowerService} d'urgence`}
                width={320}
                height={400}
                className="w-36 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/urgence"
            className="text-sm font-medium text-muted hover:text-terracotta transition-colors"
          >
            ← Tous les services d&apos;urgence
          </Link>
        </div>

        {/* ========= 6 villes ========= */}
        <section>
          <p className="eyebrow mb-2">01 — Villes couvertes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            {service.name} d&apos;urgence dans{" "}
            <em className="italic text-terracotta">6 villes.</em>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-paper-border pt-6">
            {CITIES.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/urgence/${service.slug}/${city.slug}`}
                  className="group flex items-center justify-between gap-4 bg-white border border-paper-border rounded-xl p-5 hover:border-terracotta hover:shadow-sm transition-all h-full"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">
                      SOS 30 min · 24 h/24
                    </p>
                    <p className="font-display text-lg font-[550] text-ink leading-tight">
                      {service.name} d&apos;urgence à{" "}
                      <span className="text-terracotta group-hover:underline">
                        {city.name}
                      </span>
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {city.artisanCount} artisans vérifiés
                    </p>
                  </div>
                  <span className="font-display italic text-2xl text-muted group-hover:text-terracotta transition-colors shrink-0">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ========= Quand appeler en urgence ========= */}
        {cases.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow mb-2">02 — Quand appeler ?</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
              Quand appeler un {lowerService}{" "}
              <em className="italic text-terracotta">en urgence ?</em>
            </h2>
            <div className="border-t border-ink">
              {cases.map((c, i) => (
                <div
                  key={c.title}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-paper-border"
                >
                  <span className="col-span-2 sm:col-span-1 font-display text-3xl sm:text-4xl font-[500] text-terracotta tab-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 sm:col-span-11">
                    <p className="font-display text-lg font-[550] text-ink">{c.title}</p>
                    <p className="text-muted text-sm mt-1 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========= Non-urgence cross-link ========= */}
        <section className="mt-16 bg-white border border-paper-border rounded-2xl p-6 sm:p-8">
          <p className="eyebrow mb-2">Pas une urgence ?</p>
          <p className="font-display text-xl sm:text-2xl font-[550] text-ink mb-3">
            Pour une intervention planifiée, découvrez nos artisans non urgents.
          </p>
          <Link
            href={`/${service.slug}-casablanca`}
            className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-primary-deep transition-colors underline underline-offset-4"
          >
            Voir aussi : {service.name} (non urgent) à Casablanca →
          </Link>
        </section>

        {/* ========= CTA ========= */}
        <section className="mt-16 bg-zellige text-cream rounded-2xl p-10 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-3" style={{ color: "#D4A24C" }}>
              Une urgence maintenant ?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-4">
              Un {lowerService} chez vous,<br />
              <em className="italic text-saffron">sous 30 minutes.</em>
            </h2>
            <p className="text-cream/75 mb-6">
              Réponse humaine en moins de 2 minutes, 24 h/24. Devis annoncé avant intervention.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-saffron text-ink font-bold rounded-lg hover:bg-[#E0B55C] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Appeler maintenant
              </a>
              <WhatsAppButton url={whatsappUrl} label="WhatsApp urgence" size="lg" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
