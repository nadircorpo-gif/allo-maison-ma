import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import BookingForm from "@/components/shared/booking-form";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs services à domicile 2026 | Allo-Maison",
  description:
    "Tarifs réels 2026 des services à domicile au Maroc. Prix min, moyen et max pour plomberie, électricité, ménage, peinture et 16 services. Devis gratuit.",
  alternates: { canonical: "https://allo-maison.ma/tarifs" },
  openGraph: {
    title: "Tarifs services à domicile 2026 | Allo-Maison",
    description:
      "Prix min, moyen et max pour 16 services à domicile au Maroc. Tarifs transparents et actualisés. Devis gratuit.",
    url: "https://allo-maison.ma/tarifs",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const FAQ_ITEMS = [
  {
    question: "Les tarifs affichés sont-ils des prix fixes ou des estimations ?",
    answer:
      "Les tarifs affichés sont des fourchettes indicatives basées sur des prestations réelles effectuées sur notre plateforme. Le prix exact dépend de la complexité du travail, des matériaux nécessaires et de votre quartier. Nous fournissons toujours un devis précis avant toute intervention.",
  },
  {
    question: "Y a-t-il des frais de déplacement en plus ?",
    answer:
      "Pour la plupart des services, les frais de déplacement sont inclus dans le tarif minimum. Pour les zones périurbaines (plus de 20 km du centre), un supplément de 30 à 80 MAD peut s'appliquer. Cela est toujours indiqué dans le devis.",
  },
  {
    question: "Les tarifs changent-ils selon l'urgence ?",
    answer:
      "Oui. Pour les interventions d'urgence (nuit, weekend, jour férié), un supplément d'urgence de 30 à 50 % peut s'appliquer. Ce supplément est clairement indiqué avant que vous confirmiez la demande.",
  },
  {
    question: "Peut-on négocier les tarifs avec les artisans ?",
    answer:
      "Les tarifs sont fixés selon nos standards de qualité. Cependant, pour des travaux importants ou récurrents (ménage hebdomadaire, entretien régulier), les artisans peuvent proposer des tarifs dégressifs. Mentionnez-le dans votre description.",
  },
  {
    question: "Allo-Maison prend-il une commission sur le prix ?",
    answer:
      "Non. Allo-Maison ne prend aucune commission sur la transaction entre vous et l'artisan. Le prix convenu avec l'artisan est le prix final que vous payez. Notre modèle est basé sur l'abonnement des artisans à la plateforme, pas sur des commissions.",
  },
];

const PRICE_DATA = [
  {
    category: "Urgences",
    services: [
      { name: "Plomberie", slug: "plombier", min: 150, avg: 350, max: 800, unit: "par intervention", note: "Hors matériaux" },
      { name: "Électricité", slug: "electricien", min: 200, avg: 400, max: 1000, unit: "par intervention", note: "Hors pièces" },
      { name: "Serrurerie", slug: "serrurier", min: 200, avg: 350, max: 600, unit: "par intervention", note: "Serrure possible" },
    ],
  },
  {
    category: "Entretien",
    services: [
      { name: "Ménage à domicile", slug: "femme-de-menage", min: 120, avg: 200, max: 400, unit: "par session", note: "4h minimum" },
      { name: "Jardinage", slug: "jardinier", min: 150, avg: 280, max: 600, unit: "par session", note: "Outils inclus" },
    ],
  },
  {
    category: "Travaux",
    services: [
      { name: "Peinture", slug: "peintre", min: 300, avg: 800, max: 2500, unit: "par pièce", note: "Peinture non incluse" },
      { name: "Carrelage", slug: "carreleur", min: 200, avg: 450, max: 1200, unit: "par m²", note: "Pose uniquement" },
      { name: "Menuiserie", slug: "menuisier", min: 300, avg: 700, max: 2000, unit: "par ouvrage", note: "Matériaux en sus" },
      { name: "Rénovation", slug: "renovation", min: 500, avg: 3000, max: 15000, unit: "par pièce", note: "Selon ampleur" },
      { name: "Étanchéité", slug: "etancheite", min: 300, avg: 600, max: 2000, unit: "par m²", note: "Produits inclus" },
    ],
  },
  {
    category: "Installations",
    services: [
      { name: "Climatisation", slug: "climatisation", min: 250, avg: 500, max: 1200, unit: "par unité", note: "Clim fournie en sus" },
      { name: "Vitrerie", slug: "vitrier", min: 200, avg: 450, max: 1500, unit: "par vitre", note: "Verre standard" },
      { name: "Désinsectisation", slug: "desinsectisation", min: 250, avg: 450, max: 900, unit: "par logement", note: "Produits inclus" },
    ],
  },
  {
    category: "Autres",
    services: [
      { name: "Bricolage", slug: "bricoleur", min: 100, avg: 200, max: 500, unit: "par heure", note: "2h minimum" },
      { name: "Informatique", slug: "technicien-informatique", min: 200, avg: 350, max: 700, unit: "par intervention", note: "À domicile" },
      { name: "Déménagement", slug: "demenagement", min: 500, avg: 1200, max: 3500, unit: "par déménagement", note: "Véhicule inclus" },
    ],
  },
];

const CITY_COMPARISON = [
  { city: "Casablanca", plombier: "250–800", menage: "150–400", peinture: "400–2 500" },
  { city: "Rabat", plombier: "220–700", menage: "130–350", peinture: "350–2 000" },
  { city: "Marrakech", plombier: "180–600", menage: "120–300", peinture: "300–1 800" },
  { city: "Tanger", plombier: "170–580", menage: "110–280", peinture: "280–1 600" },
  { city: "Fès", plombier: "160–550", menage: "100–260", peinture: "260–1 500" },
  { city: "Agadir", plombier: "160–530", menage: "110–270", peinture: "270–1 500" },
];

const PRICE_FACTORS = [
  {
    title: "Urgence",
    description: "Une intervention d'urgence (nuit, weekend) coûte 30 à 50 % de plus qu'un rendez-vous planifié.",
    impact: "+30 à 50 %",
  },
  {
    title: "Quartier",
    description: "Les quartiers huppés (Anfa, Maârif, Agdal) peuvent avoir des tarifs 15 à 20 % plus élevés.",
    impact: "+15 à 20 %",
  },
  {
    title: "Complexité",
    description: "Un travail nécessitant des compétences spécifiques ou du matériel spécialisé est naturellement plus cher.",
    impact: "Variable",
  },
  {
    title: "Matériaux",
    description: "La plupart des tarifs n'incluent pas les matériaux (carrelage, peinture, pièces détachées). Comptez 20 à 30 % en plus.",
    impact: "+20 à 30 %",
  },
];

export default function TarifsPage() {
  const breadcrumbItems = [{ name: "Tarifs", url: "https://allo-maison.ma/tarifs" }];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      {/* ========= HERO ========= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Barème 2026 · Actualisé chaque mois</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                Tarifs des services<br />
                à domicile, <em className="italic text-terracotta">sans surprise.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Prix réels basés sur des milliers de prestations effectuées via la plateforme. Fourchettes indicatives — un devis précis vous est fourni avant chaque intervention.
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-muted mt-4">
                <Clock className="w-3 h-3" />
                Mis à jour Avril 2026 · Basé sur 1 342 devis collectés Q1 2026
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Allo Maison — tarifs vérifiés et actualisés"
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
          {/* ========= PRICE TABLES ========= */}
          <div className="space-y-14 mb-16">
            {PRICE_DATA.map((cat, catIdx) => (
              <section key={cat.category}>
                <p className="eyebrow mb-2">
                  {String(catIdx + 1).padStart(2, "0")} — Tarifs {cat.category.toLowerCase()}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-5">
                  {cat.category}
                </h2>
                <div className="bg-white border border-paper-border rounded-xl overflow-hidden">
                  <div className="grid grid-cols-12 bg-cream py-3 px-4 sm:px-6 text-[10px] uppercase tracking-wider font-bold text-muted border-b border-paper-border">
                    <span className="col-span-5 sm:col-span-4">Service</span>
                    <span className="col-span-2 text-right">Min</span>
                    <span className="col-span-2 text-right text-terracotta">Moyen</span>
                    <span className="col-span-3 sm:col-span-2 text-right">Max</span>
                    <span className="hidden sm:block sm:col-span-2 text-left pl-4">Note</span>
                  </div>
                  <div className="divide-y divide-paper-border tab-nums">
                    {cat.services.map((s) => (
                      <div key={s.slug} className="grid grid-cols-12 px-4 sm:px-6 py-4 items-baseline hover:bg-cream/50 transition-colors">
                        <div className="col-span-5 sm:col-span-4">
                          <p className="font-medium text-ink text-sm">{s.name}</p>
                          <p className="text-[10px] text-muted mt-0.5">{s.unit}</p>
                        </div>
                        <span className="col-span-2 text-right text-sm text-muted">{s.min}</span>
                        <span className="col-span-2 text-right font-display text-xl text-terracotta">{s.avg}</span>
                        <span className="col-span-3 sm:col-span-2 text-right text-sm text-muted">{s.max} <span className="text-[10px]">MAD</span></span>
                        <span className="hidden sm:block sm:col-span-2 text-[11px] text-muted italic pl-4">{s.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* ========= PRICE FACTORS ========= */}
          <section className="mb-16">
            <p className="eyebrow mb-2">06 — Ce qui fait varier le prix</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-3">
              Pourquoi deux devis peuvent <em className="italic text-terracotta">tout changer.</em>
            </h2>
            <p className="text-muted mb-8 max-w-xl">
              Quatre facteurs font varier le tarif final par rapport à la fourchette indicative.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRICE_FACTORS.map((f, i) => (
                <article key={f.title} className="border-t-2 border-ink pt-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="font-display text-3xl font-[500] text-terracotta tab-nums">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <span className="font-display tab-nums text-sm text-zellige font-semibold">
                      {f.impact}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink mb-2">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ========= CITY COMPARISON ========= */}
          <section className="mb-16">
            <p className="eyebrow mb-2">07 — Par ville</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-3">
              Casa, Rabat, Marrakech : <em className="italic">qui paie quoi ?</em>
            </h2>
            <p className="text-muted mb-6 max-w-xl">
              Casablanca et Rabat ont les tarifs les plus élevés. Les autres villes sont généralement 15 à 25 % moins chères.
            </p>
            <div className="bg-white border border-paper-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-cream py-3 px-4 sm:px-6 text-[10px] uppercase tracking-wider font-bold text-muted border-b border-paper-border">
                <span className="col-span-3">Ville</span>
                <span className="col-span-3 text-right">Plombier</span>
                <span className="col-span-3 text-right">Ménage</span>
                <span className="col-span-3 text-right">Peinture</span>
              </div>
              <div className="divide-y divide-paper-border tab-nums">
                {CITY_COMPARISON.map((row, i) => (
                  <div key={row.city} className="grid grid-cols-12 px-4 sm:px-6 py-4 hover:bg-cream/50 transition-colors">
                    <span className="col-span-3 font-display text-lg font-medium text-ink">{row.city}</span>
                    <span className="col-span-3 text-right text-sm text-muted">{row.plombier} <span className="text-[10px]">MAD</span></span>
                    <span className="col-span-3 text-right text-sm text-muted">{row.menage} <span className="text-[10px]">MAD</span></span>
                    <span className="col-span-3 text-right text-sm text-muted">{row.peinture} <span className="text-[10px]">MAD</span></span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========= FAQ ========= */}
          <section>
            <p className="eyebrow mb-2">08 — Questions fréquentes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
              Ce que vous nous demandez <em className="italic">le plus.</em>
            </h2>
            <div className="border-t border-ink">
              {FAQ_ITEMS.map((faq, i) => (
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

        {/* ========= SIDEBAR ========= */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-4">
            <div className="bg-white border border-paper-border rounded-2xl p-6 shadow-card-hover">
              <p className="eyebrow mb-2">Devis gratuit</p>
              <h3 className="font-display text-2xl font-[550] text-ink mb-1">
                Votre devis,<br />
                <em className="italic text-terracotta">en 24 h.</em>
              </h3>
              <p className="text-sm text-muted mb-5">
                Décrivez votre besoin, on vous envoie un tarif précis.
              </p>
              <BookingForm />
              <div className="border-t border-paper-border mt-5 pt-4 flex items-center justify-between text-[10px] text-muted tab-nums">
                <span>● Gratuit</span>
                <span>● Sans engagement</span>
                <span>● Pros certifiés</span>
              </div>
            </div>

            <div className="bg-zellige text-cream rounded-2xl p-5 flex items-center gap-4">
              <Image
                src="/brand/logo-mark.svg"
                alt="Allo Maison — artisans certifiés depuis 2017"
                width={320}
                height={400}
                className="w-10 h-12 shrink-0"
              />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-saffron font-bold">Certifiés</p>
                <p className="text-sm font-bold mt-0.5">Vérifiés depuis 2017</p>
                <p className="text-xs opacity-75 mt-0.5">1 017 artisans encadrés.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
