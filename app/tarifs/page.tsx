import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import BookingForm from "@/components/shared/booking-form";
import { faqJsonLd } from "@/lib/seo";
import { CheckCircle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs services a domicile au Maroc 2026 | Prix reels | allo-maison.ma",
  description:
    "Consultez les tarifs reels des services a domicile au Maroc en 2026. Prix min, moyen et max pour plomberie, electricite, menage, peinture et 16 services. Devis gratuit.",
  alternates: { canonical: "https://allo-maison.ma/tarifs" },
  openGraph: {
    title: "Tarifs services a domicile au Maroc 2026 | Prix reels | allo-maison.ma",
    description:
      "Prix min, moyen et max pour 16 services a domicile au Maroc. Tarifs transparents et actualises. Devis gratuit.",
    url: "https://allo-maison.ma/tarifs",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Les tarifs affiches sont-ils des prix fixes ou des estimations ?",
    answer:
      "Les tarifs affiches sont des fourchettes indicatives basees sur des prestations reelles effectuees sur notre plateforme. Le prix exact depend de la complexite du travail, des materiaux necessaires et de votre quartier. Nous fournissons toujours un devis precis avant toute intervention.",
  },
  {
    question: "Y a-t-il des frais de deplacement en plus ?",
    answer:
      "Pour la plupart des services, les frais de deplacement sont inclus dans le tarif minimum. Pour les zones periurbaines (plus de 20 km du centre), un supplement de 30 a 80 DH peut s'appliquer. Cela est toujours indique dans le devis.",
  },
  {
    question: "Les tarifs changent-ils selon l'urgence ?",
    answer:
      "Oui. Pour les interventions d'urgence (nuit, weekend, jour ferie), un supplement d'urgence de 30 a 50% peut s'appliquer. Ce supplement est clairement indique avant que vous confirmiez la demande.",
  },
  {
    question: "Peut-on negocier les tarifs avec les artisans ?",
    answer:
      "Les tarifs sont fixes selon nos standards de qualite. Cependant, pour des travaux importants ou recurrents (menage hebdomadaire, entretien regulier), les artisans peuvent proposer des tarifs degressifs. Mentionnez-le dans votre description.",
  },
  {
    question: "Allo-Maison prend-il une commission sur le prix ?",
    answer:
      "Non. Allo-Maison ne prend aucune commission sur la transaction entre vous et l'artisan. Le prix convenu avec l'artisan est le prix final que vous payez. Notre modele est base sur l'abonnement des artisans a la plateforme, pas sur des commissions.",
  },
];

const PRICE_DATA = [
  {
    category: "Urgences",
    services: [
      { name: "Plomberie", slug: "plombier", icon: "🔧", min: 150, avg: 350, max: 800, unit: "par intervention", note: "Hors materiaux" },
      { name: "Electricite", slug: "electricien", icon: "⚡", min: 200, avg: 400, max: 1000, unit: "par intervention", note: "Hors pieces" },
      { name: "Serrurerie", slug: "serrurier", icon: "🔑", min: 200, avg: 350, max: 600, unit: "par intervention", note: "Serrure incluse possible" },
    ],
  },
  {
    category: "Entretien",
    services: [
      { name: "Menage a domicile", slug: "femme-de-menage", icon: "🧹", min: 120, avg: 200, max: 400, unit: "par session", note: "4h minimum" },
      { name: "Jardinage", slug: "jardinier", icon: "🌿", min: 150, avg: 280, max: 600, unit: "par session", note: "Outils inclus" },
    ],
  },
  {
    category: "Travaux",
    services: [
      { name: "Peinture", slug: "peintre", icon: "🖌️", min: 300, avg: 800, max: 2500, unit: "par piece", note: "Peinture non incluse" },
      { name: "Carrelage", slug: "carreleur", icon: "🏠", min: 200, avg: 450, max: 1200, unit: "par m²", note: "Pose uniquement" },
      { name: "Menuiserie", slug: "menuisier", icon: "🪵", min: 300, avg: 700, max: 2000, unit: "par ouvrage", note: "Materiaux en sus" },
      { name: "Renovation", slug: "renovation", icon: "🏗️", min: 500, avg: 3000, max: 15000, unit: "par piece", note: "Selon ampleur" },
      { name: "Etancheite", slug: "etancheite", icon: "🏚️", min: 300, avg: 600, max: 2000, unit: "par m²", note: "Produits inclus" },
    ],
  },
  {
    category: "Installations",
    services: [
      { name: "Climatisation", slug: "climatisation", icon: "❄️", min: 250, avg: 500, max: 1200, unit: "par unite", note: "Clim fournie en sus" },
      { name: "Vitrerie", slug: "vitrier", icon: "🪟", min: 200, avg: 450, max: 1500, unit: "par vitre", note: "Verre standard" },
      { name: "Desinsectisation", slug: "desinsectisation", icon: "🐛", min: 250, avg: 450, max: 900, unit: "par logement", note: "Produits inclus" },
    ],
  },
  {
    category: "Autres",
    services: [
      { name: "Bricolage", slug: "bricoleur", icon: "🪛", min: 100, avg: 200, max: 500, unit: "par heure", note: "2h minimum" },
      { name: "Informatique", slug: "technicien-informatique", icon: "💻", min: 200, avg: 350, max: 700, unit: "par intervention", note: "A domicile" },
      { name: "Demenagement", slug: "demenagement", icon: "📦", min: 500, avg: 1200, max: 3500, unit: "par demenagement", note: "Vehicule inclus" },
    ],
  },
];

const CITY_COMPARISON = [
  { city: "Casablanca", plombier: "250-800 DH", menage: "150-400 DH", peinture: "400-2500 DH" },
  { city: "Rabat", plombier: "220-700 DH", menage: "130-350 DH", peinture: "350-2000 DH" },
  { city: "Marrakech", plombier: "180-600 DH", menage: "120-300 DH", peinture: "300-1800 DH" },
  { city: "Tanger", plombier: "170-580 DH", menage: "110-280 DH", peinture: "280-1600 DH" },
  { city: "Fes", plombier: "160-550 DH", menage: "100-260 DH", peinture: "260-1500 DH" },
  { city: "Agadir", plombier: "160-530 DH", menage: "110-270 DH", peinture: "270-1500 DH" },
];

const PRICE_FACTORS = [
  {
    title: "Urgence",
    description: "Une intervention d'urgence (nuit, weekend) coute 30 a 50% de plus qu'un rendez-vous planifie.",
    impact: "+30-50%",
    color: "text-red-600 bg-red-50",
  },
  {
    title: "Quartier",
    description: "Les quartiers huppés (Anfa, Maarif, Agdal) peuvent avoir des tarifs 15-20% plus eleves.",
    impact: "+15-20%",
    color: "text-orange-600 bg-orange-50",
  },
  {
    title: "Complexite",
    description: "Un travail necessitant des competences specifiques ou du materiel specialise est naturellement plus cher.",
    impact: "Variable",
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Materiaux",
    description: "La plupart des tarifs n'incluent pas les materiaux (carrelage, peinture, pieces detachees). Comptez 20-30% en plus.",
    impact: "+20-30%",
    color: "text-purple-600 bg-purple-50",
  },
];

export default function TarifsPage() {
  const breadcrumbItems = [
    { name: "Tarifs", url: "https://allo-maison.ma/tarifs" },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-3 py-1.5 rounded-badge">
              <CheckCircle className="w-3.5 h-3.5" />
              Tarifs verifies et actualises
            </div>
            <span className="text-xs text-muted">Derniere mise a jour: Avril 2026</span>
          </div>
          <h1 className="text-4xl font-extrabold text-ink mb-4">
            Tarifs des services a domicile au Maroc en 2026
          </h1>
          <p className="text-lg text-muted max-w-3xl">
            Prix reels bases sur des milliers de prestations effectuees sur notre plateforme.
            Fourchettes indicatives — un devis precis vous est fourni avant chaque intervention.
          </p>
        </div>

        {/* Price info banner */}
        <div className="flex items-start gap-3 bg-primary-light border border-primary/20 rounded-card p-4 mb-10">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-primary-deep">
            <strong>Comment sont calcules nos prix :</strong> Nos tarifs sont bases sur la moyenne
            des devis acceptes sur notre plateforme en 2025-2026. Les prix varient selon la ville,
            l&apos;urgence et la complexite du travail. Demandez toujours un devis avant de confirmer.
          </p>
        </div>

        {/* Price tables by category */}
        <div className="space-y-10 mb-14">
          {PRICE_DATA.map((cat) => (
            <section key={cat.category}>
              <h2 className="text-xl font-bold text-ink mb-4">{cat.category}</h2>
              <div className="overflow-x-auto rounded-card border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-ink">Service</th>
                      <th className="text-right px-4 py-3 font-semibold text-trust-text">Prix min</th>
                      <th className="text-right px-4 py-3 font-semibold text-ink">Prix moyen</th>
                      <th className="text-right px-4 py-3 font-semibold text-red-600">Prix max</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted">Unite</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cat.services.map((s) => (
                      <tr key={s.slug} className="hover:bg-surface/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{s.icon}</span>
                            <span className="font-medium text-ink">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-trust">
                          {s.min} DH
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-ink">
                          {s.avg} DH
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-red-500">
                          {s.max} DH
                        </td>
                        <td className="px-4 py-3 text-muted">{s.unit}</td>
                        <td className="px-4 py-3 text-muted text-xs">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Factors */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-2">
            Facteurs qui influencent le prix
          </h2>
          <p className="text-muted mb-6">
            Plusieurs elements peuvent faire varier le tarif final par rapport a la fourchette indicative.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRICE_FACTORS.map((factor) => (
              <div key={factor.title} className="bg-white rounded-card border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-ink">{factor.title}</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-badge ${factor.color}`}>
                    {factor.impact}
                  </span>
                </div>
                <p className="text-sm text-muted">{factor.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* City comparison */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-2">
            Comparaison des tarifs par ville
          </h2>
          <p className="text-muted mb-6">
            Les prix varient selon les villes. Casablanca et Rabat ont les tarifs les plus eleves,
            les autres villes sont generalement 15 a 25% moins cheres.
          </p>
          <div className="overflow-x-auto rounded-card border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-ink">Ville</th>
                  <th className="text-right px-4 py-3 font-semibold text-ink">Plombier 🔧</th>
                  <th className="text-right px-4 py-3 font-semibold text-ink">Menage 🧹</th>
                  <th className="text-right px-4 py-3 font-semibold text-ink">Peinture 🖌️</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {CITY_COMPARISON.map((row) => (
                  <tr key={row.city} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-ink">{row.city}</td>
                    <td className="px-4 py-3 text-right text-muted">{row.plombier}</td>
                    <td className="px-4 py-3 text-right text-muted">{row.menage}</td>
                    <td className="px-4 py-3 text-right text-muted">{row.peinture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Questions sur les tarifs
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-card overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-ink text-sm list-none hover:bg-surface transition-colors">
                  {faq.question}
                  <span className="text-muted ml-4 flex-shrink-0 text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-4 text-muted text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA with Booking Form */}
        <section className="bg-gradient-to-r from-primary to-primary-deep rounded-card p-8 text-white">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">Obtenez un devis gratuit</h2>
              <p className="text-white/80 mb-4">
                Decrivez votre besoin et recevez un devis precis en moins de 5 minutes via WhatsApp.
                Sans engagement, sans avance.
              </p>
              <ul className="space-y-2">
                {[
                  "Devis gratuit et sans engagement",
                  "Reponse en moins de 5 minutes",
                  "Artisans verifies et assures",
                  "Garantie satisfaction 7 jours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-amber flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-80 bg-white rounded-card p-5">
              <p className="font-semibold text-ink mb-4">Reserver maintenant</p>
              <BookingForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
