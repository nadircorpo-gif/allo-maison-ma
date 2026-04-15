import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Urgence 24/7 au Maroc — Plombier, Électricien, Serrurier | Allo-Maison",
  description:
    "Un artisan vérifié chez vous en 30 minutes, 24 h/24 et 7 j/7. Plombier, électricien ou serrurier d'urgence dans 6 grandes villes du Maroc. Sans avance, sans engagement.",
  alternates: { canonical: "https://allo-maison.ma/urgence" },
  openGraph: {
    title: "Urgence 24/7 au Maroc — Plombier, Électricien, Serrurier | Allo-Maison",
    description:
      "Un artisan vérifié chez vous en 30 minutes, 24 h/24 et 7 j/7. Plombier, électricien ou serrurier d'urgence dans 6 grandes villes du Maroc.",
    url: "https://allo-maison.ma/urgence",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const URGENCE_SLUGS = ["plombier", "electricien", "serrurier"] as const;

const STEPS = [
  {
    title: "Vous nous appelez",
    description:
      "Un coup de fil ou un message WhatsApp suffit. Notre équipe humaine répond en moins de 2 minutes, 24 h/24.",
  },
  {
    title: "On qualifie l'urgence",
    description:
      "Nous identifions votre besoin (fuite, panne, serrure bloquée) et les premiers gestes à faire pour limiter les dégâts.",
  },
  {
    title: "Un pro part chez vous",
    description:
      "Nous mobilisons un artisan vérifié disponible dans votre quartier. Départ immédiat, arrivée sous 30 minutes.",
  },
  {
    title: "Paiement après intervention",
    description:
      "Le devis est annoncé avant toute intervention. Vous payez en espèces ou par virement après le dépannage — pas d'avance.",
  },
];

export default function UrgenceHubPage() {
  const urgenceServices = URGENCE_SLUGS
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const whatsappUrl = buildWhatsAppUrl(
    "URGENCE : j'ai besoin d'un artisan immediatement. Pouvez-vous m'aider ?"
  );
  const phoneHref = `tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}`;

  const breadcrumbItems = [{ name: "Urgence", url: "https://allo-maison.ma/urgence" }];

  return (
    <>
      {/* ========= Sticky urgency bar ========= */}
      <div className="sticky top-0 z-40 bg-terracotta text-cream border-b border-primary-deep shadow-terracotta">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          <p className="font-display text-lg font-[500] flex-1 text-center sm:text-left">
            Urgence 24 h/24 · <em className="italic">intervention en 30 min</em>
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
                <span className="eyebrow text-[10px]">Urgence 24 h/24 · 7 j/7</span>
              </div>
              <h1
                className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5"
                style={{ textWrap: "balance" }}
              >
                Urgence à domicile ·<br />
                <em className="italic text-terracotta">24/7 au Maroc.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl">
                Plombier, électricien ou serrurier vérifié chez vous en 30 minutes. Nuit, week-end et jours fériés inclus. Sans avance, sans engagement.
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ========= 3 services × 6 villes ========= */}
        <div className="space-y-16">
          {urgenceServices.map((service, idx) => (
            <section key={service.slug}>
              <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
                <div>
                  <p className="eyebrow mb-2">
                    {String(idx + 1).padStart(2, "0")} — {service.name} d&apos;urgence
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
                    SOS {service.name.toLowerCase()}{" "}
                    <em className="italic text-terracotta">24/7.</em>
                  </h2>
                  <p className="text-sm text-muted mt-2 max-w-xl">{service.description}</p>
                </div>
                <Link
                  href={`/urgence/${service.slug}`}
                  className="text-sm font-medium text-terracotta hover:text-primary-deep transition-colors underline underline-offset-4"
                >
                  Tout voir →
                </Link>
              </div>

              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 border-t border-paper-border pt-6">
                {CITIES.map((city) => (
                  <li key={`${service.slug}-${city.slug}`}>
                    <Link
                      href={`/urgence/${service.slug}/${city.slug}`}
                      className="group block bg-white border border-paper-border rounded-xl p-4 hover:border-terracotta hover:shadow-sm transition-all h-full"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">
                        SOS 30 min
                      </p>
                      <p className="font-display text-base font-[550] text-ink leading-tight">
                        {service.name} d&apos;urgence à{" "}
                        <span className="text-terracotta group-hover:underline">
                          {city.name}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* ========= Comment ça marche en urgence ========= */}
        <section className="mt-20">
          <p className="eyebrow mb-2">Comment ça marche</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Un pro chez vous <em className="italic text-terracotta">en 30 minutes.</em>
          </h2>
          <div className="border-t border-ink">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="grid grid-cols-12 gap-4 py-6 border-b border-paper-border"
              >
                <span className="col-span-2 sm:col-span-1 font-display text-3xl sm:text-4xl font-[500] text-terracotta tab-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <p className="font-display text-lg font-[550] text-ink">{step.title}</p>
                  <p className="text-muted text-sm mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========= CTA ========= */}
        <section className="mt-20 bg-zellige text-cream rounded-2xl p-10 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-3" style={{ color: "#D4A24C" }}>
              Une urgence maintenant ?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-4">
              Un artisan chez vous,<br />
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
