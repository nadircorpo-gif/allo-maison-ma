import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import ServiceCard from "@/components/shared/service-card";
import SearchBar from "@/components/shared/search-bar";
import { SERVICES } from "@/lib/data/services";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services à domicile au Maroc | Artisans vérifiés | allo-maison.ma",
  description:
    "Tous nos services à domicile au Maroc : plomberie, électricité, ménage, rénovation et plus. 1 017 artisans vérifiés et encadrés. Devis gratuit via WhatsApp.",
  alternates: { canonical: "https://allo-maison.ma/services" },
  openGraph: {
    title: "Services à domicile au Maroc | Artisans vérifiés | allo-maison.ma",
    description:
      "Tous nos services à domicile au Maroc : plomberie, électricité, ménage, rénovation et plus. 1 017 artisans vérifiés et encadrés.",
    url: "https://allo-maison.ma/services",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const CATEGORIES = [
  {
    title: "Urgences",
    description: "Disponibles 24 h/24, intervention en 30 minutes",
    slugs: ["plombier", "electricien", "serrurier"],
  },
  {
    title: "Entretien",
    description: "Entretien régulier de votre maison",
    slugs: ["jardinier"],
  },
  {
    title: "Travaux",
    description: "Travaux de rénovation et finition",
    slugs: ["peintre", "carreleur", "menuisier", "renovation", "etancheite"],
  },
  {
    title: "Installations",
    description: "Installation et maintenance d'équipements",
    slugs: ["climatisation", "vitrier", "desinsectisation"],
  },
  {
    title: "Services à la personne",
    description: "Aide à domicile, garde d'enfants, cuisine",
    slugs: ["femme-de-menage", "cuisiniere", "nounou", "concierge"],
  },
  {
    title: "Autres services",
    description: "Bricolage, informatique, déménagement",
    slugs: ["bricoleur", "technicien-informatique", "demenagement"],
  },
];

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne la mise en relation avec un artisan ?",
    answer:
      "Sélectionnez votre service et votre ville, puis soumettez votre demande via WhatsApp. Nous vous mettons en relation avec un artisan vérifié disponible en moins de 5 minutes. Vous recevez son profil, ses avis et son tarif avant de confirmer.",
  },
  {
    question: "Les artisans sont-ils vraiment vérifiés ?",
    answer:
      "Oui, chaque artisan passe par notre processus de vérification en 7 étapes : identité, casier, assurance, compétences, références clients, test pratique et contrôle qualité continu. Seul 1 candidat sur 3 est accepté.",
  },
  {
    question: "Quels sont les délais d'intervention ?",
    answer:
      "Pour les urgences (plomberie, électricité, serrurerie), nos artisans interviennent en moins de 30 minutes dans les grandes villes. Pour les autres services, nous confirmons un rendez-vous sous 24 heures selon votre disponibilité.",
  },
  {
    question: "Comment sont fixés les tarifs ?",
    answer:
      "Nos tarifs sont transparents et affichés à l'avance. Chaque service a un prix minimum indiqué. Vous recevez un devis précis avant toute intervention. Pas de mauvaise surprise : le prix convenu est le prix final.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer:
      "Allo-Maison garantit votre satisfaction. En cas de problème, nous envoyons gratuitement un autre artisan vérifié sous 48 heures. La garantie couvre 7 jours après la prestation.",
  },
];

const STATS = [
  { value: "1 017", label: "artisans vérifiés" },
  { value: "4.8/5", label: "note moyenne" },
  { value: "12 847", label: "avis collectés" },
  { value: "2017", label: "depuis" },
];

export default function ServicesPage() {
  const breadcrumbItems = [{ name: "Services", url: "https://allo-maison.ma/services" }];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />

      {/* ========= HERO ========= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Tous nos services · Depuis 2017</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                19 métiers,<br />
                <em className="italic text-terracotta">une exigence.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Plomberie, électricité, ménage, rénovation, et bien plus. Chaque artisan est vérifié, encadré, et disponible 7 j/7 dans les 6 grandes villes du Maroc.
              </p>
              <div className="mt-6 max-w-xl">
                <SearchBar />
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Allo Maison — services certifiés"
                width={320}
                height={400}
                className="w-36 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-b border-paper-border py-10 tab-nums">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl sm:text-5xl font-[500] text-ink leading-none">{stat.value}</p>
                <p className="text-xs text-muted mt-2 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <div className="space-y-16">
          {CATEGORIES.map((cat, i) => {
            const services = cat.slugs
              .map((slug) => SERVICES.find((s) => s.slug === slug))
              .filter(Boolean);

            return (
              <section key={cat.title}>
                <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
                  <div>
                    <p className="eyebrow mb-2">{String(i + 1).padStart(2, "0")} — {cat.title}</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-muted mt-2">{cat.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {services.map(
                    (service) =>
                      service && (
                        <ServiceCard key={service.slug} service={service} city="casablanca" />
                      )
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="mt-20">
          <p className="eyebrow mb-2">Questions fréquentes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Ce que vous nous demandez <em className="italic">le plus.</em>
          </h2>
          <div className="border-t border-ink max-w-3xl">
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

        {/* CTA */}
        <section className="mt-20 bg-zellige text-cream rounded-2xl p-10 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-3" style={{ color: "#D4A24C" }}>Besoin d&apos;un pro maintenant ?</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-4">
              Un artisan chez vous,<br />
              <em className="italic text-saffron">en 24 h.</em>
            </h2>
            <p className="text-cream/75 mb-6">
              Réponse humaine sous 47 min en moyenne, via WhatsApp. Sans avance, sans engagement.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}?text=Bonjour%2C%20je%20cherche%20un%20artisan%20verifie.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-saffron text-ink font-bold rounded-lg hover:bg-[#E0B55C] transition-colors"
            >
              Trouver un artisan →
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
