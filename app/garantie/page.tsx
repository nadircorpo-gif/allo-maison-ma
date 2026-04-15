import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import SearchBar from "@/components/shared/search-bar";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CheckCircle, XCircle, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Garantie satisfait ou refait | Allo-Maison",
  description:
    "Decouvrez la Garantie Allo-Maison : pros verifies et certifies, remplacement gratuit d'artisan, support 7j/7. Aucun risque pour vos services a domicile au Maroc.",
  alternates: { canonical: "https://allo-maison.ma/garantie" },
  openGraph: {
    title: "Garantie Allo-Maison : zero risque pour vous | allo-maison.ma",
    description:
      "Pros verifies et certifies, remplacement gratuit, support 7j/7. La garantie totale pour vos services a domicile au Maroc.",
    url: "https://allo-maison.ma/garantie",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const FAQ_ITEMS = [
  {
    question: "Quand puis-je activer la garantie Allo-Maison ?",
    answer:
      "Vous pouvez activer la garantie dans les 7 jours suivant la réalisation de la prestation. Au-delà de ce délai, la garantie expire. Contactez-nous via WhatsApp ou email avec votre référence de commande.",
  },
  {
    question: "Comment activer le remplacement d'artisan ?",
    answer:
      "Contactez notre support via WhatsApp avec votre référence de prestation et une description du problème. Notre équipe examine votre demande sous 24 heures. Si le problème est couvert par la garantie, un autre artisan est envoyé gratuitement sous 48 h.",
  },
  {
    question: "Le remplacement d'artisan est-il vraiment gratuit ?",
    answer:
      "Oui, complètement gratuit. Si vous n'êtes pas satisfait du travail réalisé, nous envoyons un autre artisan pour refaire la prestation sans frais supplémentaires. Ce service est disponible une fois par prestation.",
  },
  {
    question: "Quels travaux ne sont pas couverts par la garantie ?",
    answer:
      "La garantie ne couvre pas : les dommages causés par une mauvaise utilisation après la prestation, les matériaux fournis par le client, les pannes non liées à l'intervention de l'artisan, et les demandes déposées après le délai de 7 jours.",
  },
  {
    question: "Est-ce que la garantie fonctionne pour tous les services ?",
    answer:
      "La garantie Allo-Maison s'applique à tous les services de notre plateforme : plomberie, électricité, ménage, peinture, rénovation, et les 16 autres catégories. Elle couvre uniquement les prestations réalisées via Allo-Maison.",
  },
];

const PILLARS = [
  {
    title: "Pros vérifiés et certifiés",
    description:
      "Chaque artisan passe par notre process de certification en 7 étapes : identité, casier judiciaire, assurance RC, diplômes, références, test pratique, contrôle qualité continu.",
  },
  {
    title: "Remplacement gratuit",
    description:
      "Nous envoyons un autre artisan vérifié pour refaire la prestation gratuitement. Sans délai, sans discussion, sans frais cachés.",
  },
  {
    title: "Support humain 7 j/7",
    description:
      "Notre équipe est joignable 7 jours sur 7, de 8 h 30 à 22 h, pour répondre à vos demandes et traiter les réclamations sous 24 h.",
  },
];

const CLAIM_STEPS = [
  {
    title: "Contactez-nous sous 7 jours",
    description: "Signalez le problème via WhatsApp ou email en indiquant votre référence de prestation et une description du problème.",
  },
  {
    title: "Envoyez des photos si possible",
    description: "Des photos du travail non satisfaisant accélèrent le traitement et nous aident à évaluer la situation.",
  },
  {
    title: "Notre équipe examine votre dossier",
    description: "Nous analysons votre demande sous 24 h et vous proposons une solution : nouveau passage ou artisan de remplacement.",
  },
  {
    title: "Résolution rapide",
    description: "Un artisan de remplacement intervient sous 48 h, sans frais supplémentaires pour vous.",
  },
];

const COVERED = [
  "Travaux mal exécutés ou incomplets",
  "Absence de l'artisan après confirmation",
  "Non-respect du devis convenu",
  "Dommages causés lors de l'intervention",
  "Matériel défectueux installé par l'artisan",
  "Prestation non conforme à la description",
];

const NOT_COVERED = [
  "Dommages causés après la prestation par le client",
  "Matériaux fournis par le client qui sont défectueux",
  "Usure normale des équipements",
  "Pannes extérieures non liées à l'intervention",
  "Demandes au-delà de 7 jours après la prestation",
  "Prestations non réservées via Allo-Maison",
];

const TESTIMONIALS = [
  {
    name: "Karim B.",
    city: "Casablanca",
    text: "La plomberie avait une fuite résiduelle après l'intervention. J'ai contacté Allo-Maison le lendemain, un autre plombier est venu gratuitement et a tout réglé.",
    rating: 5,
  },
  {
    name: "Fatima Z.",
    city: "Rabat",
    text: "Le peintre avait laissé des coulures sur les murs. Le remplacement est arrivé en 48 h et a refait proprement. Zéro stress, zéro frais supplémentaire.",
    rating: 5,
  },
  {
    name: "Youssef T.",
    city: "Marrakech",
    text: "La garantie m'a sauvé une fois. Le carreleur avait laissé des joints incomplets. En 2 jours, tout était réglé sans débourser un centime de plus.",
    rating: 5,
  },
];

export default function GarantiePage() {
  const breadcrumbItems = [{ name: "Garantie", url: "https://allo-maison.ma/garantie" }];

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
                <span className="eyebrow text-[10px]">La garantie Allo Maison · depuis 2017</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                Zéro risque.<br />
                <em className="italic text-terracotta">Point final.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Chaque prestation est protégée par notre garantie totale. Pros vérifiés et certifiés, remplacement gratuit si besoin, support humain 7 j/7.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Garantie Allo Maison"
                width={320}
                height={400}
                className="w-40 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ========= 3 PILLARS ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">01 — Les 3 piliers</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Comment <em className="italic text-terracotta">on vous protège.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <article key={p.title} className="bg-white border border-paper-border rounded-2xl p-6">
                <p className="font-display text-5xl font-[500] text-terracotta tab-nums mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-xl font-medium text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ========= CLAIM STEPS ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">02 — Comment activer la garantie</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Quatre étapes. <em className="italic">Zéro paperasse.</em>
          </h2>
          <div className="border-t border-ink">
            {CLAIM_STEPS.map((step, i) => (
              <div key={step.title} className="grid grid-cols-12 gap-4 py-6 border-b border-paper-border">
                <span className="col-span-2 sm:col-span-1 font-display text-3xl sm:text-4xl font-[500] text-terracotta tab-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display text-xl font-medium text-ink mb-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========= COVERED / NOT COVERED ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">03 — Les conditions</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Ce qui est couvert, <em className="italic">ce qui ne l&apos;est pas.</em>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-paper-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-paper-border">
                <CheckCircle className="w-5 h-5 text-mint" />
                <h3 className="font-display text-lg font-medium text-ink">Ce qui est couvert</h3>
              </div>
              <ul className="space-y-3">
                {COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <CheckCircle className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream border border-paper-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-paper-border">
                <XCircle className="w-5 h-5 text-terracotta" />
                <h3 className="font-display text-lg font-medium text-ink">Ce qui n&apos;est pas couvert</h3>
              </div>
              <ul className="space-y-3">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <XCircle className="w-4 h-4 text-terracotta/60 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========= TESTIMONIALS ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">04 — Ils ont activé la garantie</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            «{" "}
            <em className="italic text-terracotta">Réglé</em> sans discussion. »
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => {
              const isFeatured = i === 1;
              return (
                <div
                  key={t.name}
                  className={
                    isFeatured
                      ? "bg-zellige text-cream rounded-2xl p-5"
                      : "bg-white border border-paper-border rounded-2xl p-5"
                  }
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-saffron text-saffron" />
                    ))}
                  </div>
                  <p className={isFeatured ? "font-display italic text-lg leading-snug mb-4" : "text-sm leading-relaxed italic mb-4"}>
                    « {t.text} »
                  </p>
                  <p className={`text-xs font-semibold ${isFeatured ? "text-cream" : "text-ink"}`}>
                    {t.name} · {t.city}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========= FAQ ========= */}
        <section className="mb-16">
          <p className="eyebrow mb-2">05 — Questions fréquentes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Questions sur la garantie.
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

        {/* ========= CTA ========= */}
        <section className="bg-cream border-t border-paper-border pt-14 text-center">
          <p className="eyebrow mb-2">06 — Réservez</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-3">
            Réservez <em className="italic text-terracotta">en toute confiance.</em>
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Notre garantie s&apos;applique automatiquement à chaque prestation. Vous n&apos;avez rien à faire en plus.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>
      </div>
    </>
  );
}
