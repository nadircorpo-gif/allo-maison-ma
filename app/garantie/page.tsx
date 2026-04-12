import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import SearchBar from "@/components/shared/search-bar";
import { faqJsonLd } from "@/lib/seo";
import { CheckCircle, Shield, RefreshCw, Clock, AlertTriangle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Garantie Allo-Maison : zero risque pour vous | allo-maison.ma",
  description:
    "Decouvrez la Garantie Allo-Maison : remboursement jusqu'a 2000 DH, remplacement gratuit d'artisan, support 7j/7. Aucun risque pour vos services a domicile au Maroc.",
  alternates: { canonical: "https://allo-maison.ma/garantie" },
  openGraph: {
    title: "Garantie Allo-Maison : zero risque pour vous | allo-maison.ma",
    description:
      "Remboursement jusqu'a 2000 DH, remplacement gratuit, support 7j/7. La garantie totale pour vos services a domicile au Maroc.",
    url: "https://allo-maison.ma/garantie",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Quand puis-je activer la garantie Allo-Maison ?",
    answer:
      "Vous pouvez activer la garantie dans les 7 jours suivant la realisation de la prestation. Au-dela de ce delai, la garantie expire. Contactez-nous via WhatsApp ou email avec votre reference de commande.",
  },
  {
    question: "Comment obtenir un remboursement ?",
    answer:
      "Contactez notre support via WhatsApp avec votre reference de prestation et une description du probleme. Notre equipe examine votre demande sous 24 heures. Si le probleme est couvert par la garantie, le remboursement est effectue sous 3-5 jours ouvrables.",
  },
  {
    question: "Le remplacement d'artisan est-il vraiment gratuit ?",
    answer:
      "Oui, completement gratuit. Si vous n'etes pas satisfait du travail realise, nous envoyons un autre artisan pour refaire la prestation sans frais supplementaires. Ce service est disponible une fois par prestation.",
  },
  {
    question: "Quels travaux ne sont pas couverts par la garantie ?",
    answer:
      "La garantie ne couvre pas : les dommages causes par une mauvaise utilisation apres la prestation, les materiaux fournis par le client, les pannes non liees a l'intervention de l'artisan, et les demandes deposees apres le delai de 7 jours.",
  },
  {
    question: "Est-ce que la garantie fonctionne pour tous les services ?",
    answer:
      "La garantie Allo-Maison s'applique a tous les services de notre plateforme : plomberie, electricite, menage, peinture, renovation, et les 16 autres categories. Elle couvre uniquement les prestations realisees via Allo-Maison.",
  },
];

const CLAIM_STEPS = [
  {
    step: "01",
    title: "Contactez-nous dans les 7 jours",
    description: "Signalez le probleme via WhatsApp ou email en indiquant votre reference de prestation et une description du probleme.",
  },
  {
    step: "02",
    title: "Envoyez des photos si possible",
    description: "Des photos du travail non satisfaisant accelerent le traitement de votre demande et nous aident a evaluer la situation.",
  },
  {
    step: "03",
    title: "Notre equipe examine votre demande",
    description: "Nous analysons votre dossier sous 24 heures et vous proposons une solution : remplacement ou remboursement.",
  },
  {
    step: "04",
    title: "Resolution rapide",
    description: "Un artisan de remplacement intervient sous 48h ou votre remboursement est effectue sous 3-5 jours ouvrables.",
  },
];

const TESTIMONIALS = [
  {
    name: "Karim B.",
    city: "Casablanca",
    text: "La plomberie avait une fuite residuelle apres l'intervention. J'ai contacte Allo-Maison le lendemain, un autre plombier est venu gratuitement et a tout regle. Excellent service !",
    rating: 5,
  },
  {
    name: "Fatima Z.",
    city: "Rabat",
    text: "La peinture de ma chambre n'etait pas uniforme. Apres avoir envoye des photos, Allo-Maison a envoye un autre peintre qui a tout refait. Je recommande vraiment cette plateforme.",
    rating: 5,
  },
  {
    name: "Ahmed M.",
    city: "Marrakech",
    text: "La garantie m'a sauve une fois. Le carreleur avait laisse des joints incomplets. En 2 jours, tout etait regle sans debourser un centime de plus. Bravo !",
    rating: 5,
  },
];

const COVERED = [
  "Travaux mal executes ou incomplets",
  "Absence de l'artisan apres confirmation",
  "Non-respect du devis convenu",
  "Dommages causes lors de l'intervention",
  "Materiel defectueux installe par l'artisan",
  "Prestation non conforme a la description",
];

const NOT_COVERED = [
  "Dommages causes apres la prestation par le client",
  "Materiaux fournis par le client qui sont defectueux",
  "Usure normale des equipements",
  "Pannes exterieures non liees a l'intervention",
  "Demandes au-dela de 7 jours apres la prestation",
  "Prestations non reservees via Allo-Maison",
];

export default function GarantiePage() {
  const breadcrumbItems = [
    { name: "Garantie", url: "https://allo-maison.ma/garantie" },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero gradient */}
        <div className="bg-gradient-to-r from-primary to-primary-deep rounded-card p-10 text-white text-center mb-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-white/80" />
          <h1 className="text-4xl font-extrabold mb-3">
            La Garantie Allo-Maison : zero risque pour vous
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Chaque prestation est protegee par notre garantie totale. Si vous n&apos;etes pas
            satisfait, nous reglons le probleme. Point final.
          </p>
        </div>

        {/* 3 Pillars */}
        <section className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <RefreshCw className="w-8 h-8 text-primary" />,
                title: "Remboursement jusqu'a 2000 DH",
                description:
                  "Si le probleme ne peut pas etre corrige, vous etes rembourse jusqu'a 2000 DH. Valable 7 jours apres la prestation.",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-trust" />,
                title: "Remplacement gratuit",
                description:
                  "Nous envoyons un nouvel artisan verifie pour refaire la prestation completement gratuitement. Sans delai, sans discussion.",
              },
              {
                icon: <Clock className="w-8 h-8 text-amber" />,
                title: "Support 7j/7",
                description:
                  "Notre equipe est disponible 7 jours sur 7 de 8h30 a 22h pour repondre a vos demandes et traiter les reclamations.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-card shadow-card border border-gray-100 p-6 text-center"
              >
                <div className="flex justify-center mb-4">{pillar.icon}</div>
                <h2 className="text-lg font-bold text-ink mb-2">{pillar.title}</h2>
                <p className="text-sm text-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to claim */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Comment activer la garantie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLAIM_STEPS.map((step) => (
              <div key={step.step} className="bg-surface rounded-card border border-gray-100 p-5">
                <div className="text-3xl font-extrabold text-primary/30 mb-2">{step.step}</div>
                <h3 className="font-bold text-ink text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Covered / Not covered */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Conditions de la garantie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Covered */}
            <div className="bg-trust-light border border-trust-border rounded-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-trust" />
                <h3 className="font-bold text-trust-text">Ce qui est couvert</h3>
              </div>
              <ul className="space-y-2">
                {COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-trust-text">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not covered */}
            <div className="bg-red-50 border border-red-200 rounded-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-red-700">Ce qui n&apos;est pas couvert</h3>
              </div>
              <ul className="space-y-2">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Allo-Maison vs artisan trouve autrement
          </h2>
          <div className="overflow-x-auto rounded-card border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-ink">Critere</th>
                  <th className="text-center px-4 py-3 font-semibold text-primary">
                    Avec Allo-Maison
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted">
                    Sans plateforme
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Artisan verifie CIN + casier", true, false],
                  ["Avis clients authentiques", true, false],
                  ["Garantie satisfaction 7 jours", true, false],
                  ["Remboursement en cas de probleme", true, false],
                  ["Remplacement gratuit", true, false],
                  ["Support client 7j/7", true, false],
                  ["Tarifs transparents a l'avance", true, "partiel"],
                  ["Intervention garantie sous 30 min (urgence)", true, false],
                ].map(([critere, allo, sans]) => (
                  <tr key={String(critere)} className="hover:bg-surface/50">
                    <td className="px-4 py-3 font-medium text-ink">{critere}</td>
                    <td className="px-4 py-3 text-center">
                      {allo === true ? (
                        <CheckCircle className="w-5 h-5 text-trust mx-auto" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {sans === false ? (
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Ils ont utilise la garantie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-card shadow-card border border-gray-100 p-5">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-amber text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-muted italic mb-3">&quot;{t.text}&quot;</p>
                <div className="text-xs font-medium text-ink">
                  {t.name} — {t.city}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Questions sur la garantie
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

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-ink mb-3">
            Reservez en toute confiance
          </h2>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Notre garantie s&apos;applique automatiquement a chaque prestation.
            Vous n&apos;avez rien a faire en plus.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>
      </div>
    </>
  );
}
