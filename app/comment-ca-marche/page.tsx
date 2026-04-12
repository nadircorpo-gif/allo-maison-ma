import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import SearchBar from "@/components/shared/search-bar";
import { faqJsonLd } from "@/lib/seo";
import { CheckCircle, Search, UserCheck, CreditCard, Shield, Star, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Comment trouver un artisan de confiance au Maroc | allo-maison.ma",
  description:
    "Decouvrez comment trouver un artisan de confiance au Maroc en 3 etapes simples. Verification CIN, casier judiciaire, certificats OFPPT. Garantie satisfaction ou remboursement.",
  alternates: { canonical: "https://allo-maison.ma/comment-ca-marche" },
  openGraph: {
    title: "Comment trouver un artisan de confiance au Maroc | allo-maison.ma",
    description:
      "Decouvrez comment trouver un artisan de confiance au Maroc en 3 etapes simples. Garantie satisfaction incluse.",
    url: "https://allo-maison.ma/comment-ca-marche",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Comment verifier qu'un artisan est bien certifie sur Allo-Maison ?",
    answer:
      "Chaque profil affiche un badge 'Verifie' vert. Ce badge signifie que l'artisan a passe les 6 etapes de notre processus : CIN, casier judiciaire, diplomes OFPPT, references clients, entretien et photo. Vous pouvez cliquer sur le badge pour voir les details de la verification.",
  },
  {
    question: "Combien de temps prend la mise en relation ?",
    answer:
      "En moyenne, nous confirmons un artisan disponible en moins de 5 minutes via WhatsApp. Pour les urgences (plomberie, electricite, serrurerie), l'intervention peut demarrer dans les 30 minutes suivant votre demande.",
  },
  {
    question: "Puis-je choisir mon artisan ou c'est vous qui assignez ?",
    answer:
      "Vous choisissez ! Nous vous presentons les profils des artisans disponibles avec leurs avis, tarifs et specialites. Vous decidez ensuite avec qui vous souhaitez travailler. Nous ne forcez jamais une mise en relation.",
  },
  {
    question: "Que se passe-t-il si l'artisan ne se presente pas ?",
    answer:
      "En cas d'absence injustifiee de l'artisan, nous vous proposons immediatement un remplacant gratuitement. Votre temps est precieux et nous nous engageons a honorer chaque rendez-vous confirme.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer:
      "Le paiement se fait directement avec l'artisan apres la realisation du travail. Pas d'avance requise. Vous pouvez payer en especes, par virement ou via mobile money selon ce qui vous convient. Allo-Maison ne prend aucune commission sur la transaction.",
  },
];

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment trouver un artisan de confiance au Maroc avec Allo-Maison",
  description:
    "Trouvez un artisan verifie et de confiance au Maroc en 3 etapes simples avec Allo-Maison.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Decrivez votre besoin",
      text: "Selectionnez le service dont vous avez besoin (plomberie, electricite, menage, etc.) et indiquez votre ville. Plus votre description est precise, plus nous pouvons vous trouver le bon profil.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choisissez votre pro",
      text: "Consultez les profils des artisans verifies disponibles. Lisez les avis clients, comparez les tarifs et choisissez celui qui vous inspire confiance.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Payez apres satisfaction",
      text: "L'artisan intervient a la date convenue. Vous evaluez son travail et payez directement apres satisfaction. Notre garantie couvre 7 jours si un probleme survient.",
    },
  ],
};

const VERIFICATION_STEPS = [
  {
    number: "01",
    title: "Verification de la CIN",
    description:
      "Nous verifions l'authenticite de la Carte d'Identite Nationale de chaque artisan aupres des autorites competentes. Aucun profil anonyme n'est accepte.",
  },
  {
    number: "02",
    title: "Extrait de casier judiciaire",
    description:
      "Chaque artisan doit fournir un extrait de casier judiciaire datant de moins de 3 mois. Les artisans avec des antecedents sont automatiquement refuses.",
  },
  {
    number: "03",
    title: "Certificats OFPPT",
    description:
      "Nous verifions les diplomes et certifications professionnelles (OFPPT, CAP, BTP) pour s'assurer que l'artisan dispose des competences requises pour son metier.",
  },
  {
    number: "04",
    title: "References clients",
    description:
      "Nous contactons au minimum 3 anciens clients pour verifier la qualite du travail, le respect des engagements et le comportement professionnel de l'artisan.",
  },
  {
    number: "05",
    title: "Entretien individuel",
    description:
      "Un entretien en personne ou en video est realise par notre equipe pour evaluer le professionnalisme, les competences techniques et les valeurs de l'artisan.",
  },
  {
    number: "06",
    title: "Photo professionnelle",
    description:
      "Une photo recente et professionnelle est exigee pour chaque profil. Cela permet aux clients de reconnaitre l'artisan a son arrivee et renforce la confiance.",
  },
];

export default function CommentCaMarchePage() {
  const breadcrumbItems = [
    { name: "Comment ca marche", url: "https://allo-maison.ma/comment-ca-marche" },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <JsonLd data={HOWTO_SCHEMA} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-3 py-1.5 rounded-badge mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            Simple, rapide et securise
          </div>
          <h1 className="text-4xl font-extrabold text-ink mb-4">
            Comment trouver un artisan de confiance au Maroc
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Allo-Maison simplifie la recherche d&apos;artisans verifies depuis 2017.
            Voici comment ca marche en 3 etapes.
          </p>
        </div>

        {/* 3 Steps */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-extrabold text-primary/20 mb-2">01</div>
              <h2 className="text-xl font-bold text-ink mb-3">Decrivez votre besoin</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Selectionnez le service dont vous avez besoin parmi nos 16 categories et
                indiquez votre ville. Vous pouvez aussi ajouter une description detaillee :
                type de panne, surface a peindre, nombre de pieces a nettoyer...
              </p>
              <ul className="space-y-2">
                {[
                  "16 categories de services",
                  "6 villes couvertes",
                  "Formulaire en 30 secondes",
                  "Via WhatsApp ou site web",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ink">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-extrabold text-primary/20 mb-2">02</div>
              <h2 className="text-xl font-bold text-ink mb-3">Choisissez votre pro</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Nous vous presentons les artisans verifies disponibles. Chaque profil
                contient les avis clients reels, les certifications, les photos des
                travaux precedents et les tarifs indicatifs.
              </p>
              <ul className="space-y-2">
                {[
                  "Profils 100% verifies",
                  "Avis clients authentiques",
                  "Tarifs transparents",
                  "Disponibilites en temps reel",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ink">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-extrabold text-primary/20 mb-2">03</div>
              <h2 className="text-xl font-bold text-ink mb-3">Payez apres satisfaction</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Aucune avance n&apos;est demandee. L&apos;artisan intervient a la date convenue,
                realise le travail et vous payez directement apres avoir verifie la qualite.
                Notre garantie de 7 jours vous protege en cas de probleme.
              </p>
              <ul className="space-y-2">
                {[
                  "Zero avance requise",
                  "Paiement direct a l'artisan",
                  "Garantie 7 jours",
                  "Remboursement jusqu'a 2000 DH",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ink">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Verification process */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-ink mb-3">
              Notre processus de verification en 6 etapes
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Seuls les meilleurs artisans passent notre verification. 1 candidat sur 3
              est accepte sur notre plateforme.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFICATION_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-surface rounded-card border border-gray-100 p-5"
              >
                <div className="text-3xl font-extrabold text-primary/30 mb-2">{step.number}</div>
                <h3 className="font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee section */}
        <section className="mb-16 bg-gradient-to-r from-primary to-primary-deep rounded-card p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <Shield className="w-16 h-16 text-white/80" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">La Garantie Allo-Maison</h2>
              <p className="text-white/80 mb-4">
                Chaque prestation est couverte par notre garantie satisfaction. Si vous
                n&apos;etes pas satisfait dans les 7 jours suivant l&apos;intervention :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <Star className="w-5 h-5" />, text: "Remplacement gratuit d'artisan" },
                  { icon: <CreditCard className="w-5 h-5" />, text: "Remboursement jusqu'a 2000 DH" },
                  { icon: <Clock className="w-5 h-5" />, text: "Support disponible 7j/7" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 bg-white/10 rounded-btn p-3">
                    <span className="text-amber">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            Questions frequentes
          </h2>
          <div className="space-y-3">
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
          <h2 className="text-2xl font-bold text-ink mb-3">Pret a trouver votre artisan ?</h2>
          <p className="text-muted mb-6">
            Demarrez en 30 secondes. Reponse garantie en moins de 5 minutes.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>
      </div>
    </>
  );
}
