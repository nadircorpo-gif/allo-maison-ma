import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import ServiceCard from "@/components/shared/service-card";
import SearchBar from "@/components/shared/search-bar";
import { SERVICES } from "@/lib/data/services";
import { faqJsonLd } from "@/lib/seo";
import { CheckCircle, Users, Star, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Services a domicile au Maroc | Artisans Verifies | allo-maison.ma",
  description:
    "Tous nos services a domicile au Maroc : plomberie, electricite, menage, renovation et plus. 500+ artisans verifies et encadres. Devis gratuit via WhatsApp.",
  alternates: { canonical: "https://allo-maison.ma/services" },
  openGraph: {
    title: "Services a domicile au Maroc | Artisans Verifies | allo-maison.ma",
    description:
      "Tous nos services a domicile au Maroc : plomberie, electricite, menage, renovation et plus. 500+ artisans verifies et encadres.",
    url: "https://allo-maison.ma/services",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const CATEGORIES = [
  {
    title: "Urgences",
    description: "Disponibles 24h/24, intervention en 30 minutes",
    slugs: ["plombier", "electricien", "serrurier"],
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    title: "Entretien",
    description: "Entretien regulier de votre maison",
    slugs: ["femme-de-menage", "jardinier"],
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    title: "Travaux",
    description: "Travaux de renovation et finition",
    slugs: ["peintre", "carreleur", "menuisier", "renovation", "etancheite"],
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    title: "Installations",
    description: "Installation et maintenance d'equipements",
    slugs: ["climatisation", "vitrier", "desinsectisation"],
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Autres Services",
    description: "Bricolage, informatique, demenagement",
    slugs: ["bricoleur", "technicien-informatique", "demenagement"],
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne la mise en relation avec un artisan ?",
    answer:
      "Selectionnez votre service et votre ville, puis soumettez votre demande via WhatsApp. Nous vous mettons en relation avec un artisan verifie disponible en moins de 5 minutes. Vous recevez son profil, ses avis et son tarif avant de confirmer.",
  },
  {
    question: "Les artisans sont-ils vraiment verifies ?",
    answer:
      "Oui, chaque artisan passe par notre processus de verification : identite, competences, references clients et entretien individuel. Seuls 1 artisan sur 3 est accepte.",
  },
  {
    question: "Quels sont les delais d'intervention ?",
    answer:
      "Pour les urgences (plomberie, electricite, serrurerie), nos artisans interviennent en moins de 30 minutes dans les grandes villes. Pour les autres services, nous confirmons un rendez-vous dans les 24 heures selon votre disponibilite.",
  },
  {
    question: "Comment sont fixes les tarifs ?",
    answer:
      "Nos tarifs sont transparents et affiches a l'avance. Chaque service a un prix minimum indique. Vous recevez un devis precis avant toute intervention. Pas de mauvaise surprise : le prix convenu est le prix final.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer:
      "Allo-Maison garantit votre satisfaction. En cas de probleme, nous envoyons gratuitement un autre artisan dans les 48 heures. Si le probleme persiste, vous etes rembourse jusqu'a 2000 DH. La garantie couvre 7 jours apres la prestation.",
  },
];

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: "Services", url: "https://allo-maison.ma/services" },
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "500+", label: "Artisans verifies" },
    { icon: <Star className="w-6 h-6" />, value: "4.8/5", label: "Note moyenne" },
    { icon: <CheckCircle className="w-6 h-6" />, value: "2000+", label: "Missions realisees" },
    { icon: <Shield className="w-6 h-6" />, value: "2017", label: "Depuis" },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-3 py-1.5 rounded-badge mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            Depuis 2017, la confiance au service de votre maison
          </div>
          <h1 className="text-4xl font-extrabold text-ink mb-4">
            Tous nos services a domicile au Maroc
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Plomberie, electricite, menage, renovation et bien plus. Des artisans verifies,
            disponibles 7j/7 dans les 6 grandes villes du Maroc.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-5 bg-white rounded-card shadow-card border border-gray-100"
            >
              <div className="text-primary mb-2">{stat.icon}</div>
              <div className="text-2xl font-extrabold text-ink">{stat.value}</div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services by category */}
        <div className="space-y-12">
          {CATEGORIES.map((cat) => {
            const services = cat.slugs
              .map((slug) => SERVICES.find((s) => s.slug === slug))
              .filter(Boolean);

            return (
              <section key={cat.title}>
                <div className={`flex items-center gap-3 p-4 rounded-card border mb-6 ${cat.color}`}>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-badge ${cat.badgeColor}`}>
                    {cat.title}
                  </span>
                  <p className="text-sm text-muted">{cat.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {services.map((service) => (
                    service && (
                      <ServiceCard
                        key={service.slug}
                        service={service}
                        city="casablanca"
                      />
                    )
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Questions frequentes sur nos services
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
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

        {/* Bottom CTA */}
        <section className="mt-14 text-center bg-gradient-to-r from-primary to-primary-deep rounded-card p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">
            Besoin d&apos;un artisan maintenant ?
          </h2>
          <p className="text-white/80 mb-6">
            Reponse garantie en moins de 5 minutes via WhatsApp.
          </p>
          <a
            href="https://wa.me/212600000000?text=Bonjour%2C%20je%20cherche%20un%20artisan%20verifie."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-btn hover:bg-gray-100 transition-colors"
          >
            Trouver un artisan →
          </a>
        </section>
      </div>
    </>
  );
}
