import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import SearchBar from "@/components/shared/search-bar";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comment trouver un artisan de confiance au Maroc | allo-maison.ma",
  description:
    "Découvrez comment trouver un artisan de confiance au Maroc en 3 étapes simples. Artisans vérifiés et encadrés. Garantie satisfaction.",
  alternates: { canonical: "https://allo-maison.ma/comment-ca-marche" },
  openGraph: {
    title: "Comment trouver un artisan de confiance au Maroc | allo-maison.ma",
    description:
      "Découvrez comment trouver un artisan de confiance au Maroc en 3 étapes simples. Garantie satisfaction incluse.",
    url: "https://allo-maison.ma/comment-ca-marche",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Comment vérifier qu'un artisan est bien certifié sur Allo-Maison ?",
    answer:
      "Chaque profil affiche un badge 'Vérifié' vert. Ce badge signifie que l'artisan a passé notre processus de vérification en 7 étapes. Vous pouvez cliquer sur le badge pour voir les détails.",
  },
  {
    question: "Combien de temps prend la mise en relation ?",
    answer:
      "En moyenne, nous confirmons un artisan disponible en moins de 5 minutes via WhatsApp. Pour les urgences (plomberie, électricité, serrurerie), l'intervention peut démarrer dans les 30 minutes suivant votre demande.",
  },
  {
    question: "Puis-je choisir mon artisan ou c'est vous qui assignez ?",
    answer:
      "Vous choisissez. Nous vous présentons les profils des artisans disponibles avec leurs avis, tarifs et spécialités. Vous décidez ensuite avec qui vous souhaitez travailler.",
  },
  {
    question: "Que se passe-t-il si l'artisan ne se présente pas ?",
    answer:
      "En cas d'absence injustifiée de l'artisan, nous vous proposons immédiatement un remplaçant gratuitement. Votre temps est précieux et nous nous engageons à honorer chaque rendez-vous confirmé.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer:
      "Le paiement se fait directement avec l'artisan après la réalisation du travail. Pas d'avance requise. Vous pouvez payer en espèces, par virement ou via mobile money selon ce qui vous convient. Allo-Maison ne prend aucune commission.",
  },
];

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment trouver un artisan de confiance au Maroc avec Allo Maison",
  totalTime: "PT5M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Décrivez votre besoin", text: "Sélectionnez le service et votre ville." },
    { "@type": "HowToStep", position: 2, name: "Choisissez votre pro", text: "Comparez les profils vérifiés et choisissez celui qui vous convient." },
    { "@type": "HowToStep", position: 3, name: "Payez après satisfaction", text: "L'artisan intervient, vous validez, vous payez directement." },
  ],
};

const STEPS = [
  {
    number: "01",
    title: "Décrivez votre besoin",
    description:
      "Sélectionnez le service parmi nos 19 catégories et indiquez votre ville. Ajoutez une description précise : type de panne, surface à peindre, nombre de pièces.",
    points: ["19 catégories de services", "6 villes couvertes", "Formulaire en 30 secondes", "Via WhatsApp ou site web"],
  },
  {
    number: "02",
    title: "Choisissez votre pro",
    description:
      "Nous vous présentons les artisans vérifiés disponibles. Chaque profil contient avis clients, certifications, photos de chantier et tarif indicatif.",
    points: ["Profils 100 % vérifiés", "Avis clients authentiques", "Tarifs transparents", "Disponibilités en temps réel"],
  },
  {
    number: "03",
    title: "Payez après satisfaction",
    description:
      "Aucune avance demandée. L'artisan intervient, vous vérifiez le travail, vous payez directement. Notre garantie de 7 jours vous protège si besoin.",
    points: ["Zéro avance requise", "Paiement direct à l'artisan", "Garantie 7 jours", "Pros vérifiés et certifiés"],
  },
];

const VERIFICATION_STEPS = [
  { title: "Identité", description: "CIN et casier judiciaire contrôlés physiquement en agence." },
  { title: "Assurance RC", description: "Attestation d'assurance responsabilité civile à jour exigée." },
  { title: "Compétences", description: "Diplômes OFPPT ou équivalent, ou 5+ années d'expérience vérifiées." },
  { title: "Références clients", description: "3 anciens clients minimum appelés par notre équipe." },
  { title: "Test pratique", description: "Visite d'un chantier en cours ou test technique en conditions réelles." },
  { title: "Briefing qualité", description: "Formation aux standards et méthodes Allo Maison avant acceptation." },
  { title: "Contrôle continu", description: "Avis SMS après chaque mission. Note moyenne < 4,5/5 = retrait." },
];

export default function CommentCaMarchePage() {
  const breadcrumbItems = [{ name: "Comment ça marche", url: "https://allo-maison.ma/comment-ca-marche" }];

  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <JsonLd data={HOWTO_SCHEMA} />

      {/* ========= HERO ========= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Simple, rapide, sécurisé · Depuis 2017</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                Trois gestes. <em className="italic text-terracotta">Zéro stress.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Allo Maison simplifie la recherche d&apos;artisans vérifiés depuis 2017. Voici comment ça marche, de la demande à la facture.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Allo Maison — depuis 2017"
                width={320}
                height={400}
                className="w-36 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* 3 Steps */}
        <section className="mb-20">
          <p className="eyebrow mb-2">01 — Les 3 étapes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Simple comme <em className="italic text-terracotta">bonjour.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <article key={step.number} className="bg-white border border-paper-border rounded-2xl p-6">
                <p className="font-display text-5xl font-[500] text-terracotta tab-nums mb-4">{step.number}</p>
                <h3 className="font-display text-2xl font-medium text-ink mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{step.description}</p>
                <ul className="space-y-2">
                  {step.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-muted">
                      <span className="w-1 h-1 rounded-full bg-terracotta mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Verification 7 steps */}
        <section className="mb-20">
          <p className="eyebrow mb-2">02 — Notre process de certification</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-3">
            Sept étapes <em className="italic">avant d&apos;être accepté.</em>
          </h2>
          <p className="text-muted max-w-xl mb-8">
            Seul 1 candidat sur 3 passe notre vérification. Voici ce qu&apos;ils traversent avant d&apos;apparaître sur la plateforme.
          </p>
          <div className="border-t border-ink">
            {VERIFICATION_STEPS.map((step, i) => (
              <div key={step.title} className="grid grid-cols-12 gap-4 py-5 border-b border-paper-border">
                <span className="col-span-2 sm:col-span-1 font-display text-2xl font-[500] text-terracotta tab-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display text-lg font-medium text-ink">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee section */}
        <section className="mb-20 bg-zellige text-cream rounded-2xl p-10 sm:p-14">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <Image src="/brand/logo-shield-dark.svg" alt="" width={320} height={400} className="w-32 h-auto" />
            </div>
            <div className="lg:col-span-9">
              <p className="eyebrow mb-2" style={{ color: "#D4A24C" }}>03 — La garantie</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-3">
                Pas satisfait ? <em className="italic text-saffron">On règle.</em>
              </h2>
              <p className="text-cream/75 mb-6 max-w-2xl">
                Chaque prestation est couverte par notre garantie. Si vous n&apos;êtes pas satisfait dans les 7 jours, on envoie un autre artisan gratuitement, sans discussion.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-saffron text-[10px] uppercase tracking-widest mb-1">Remplacement</p>
                  <p className="text-cream/90">Artisan de remplacement gratuit</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-saffron text-[10px] uppercase tracking-widest mb-1">Certifiés</p>
                  <p className="text-cream/90">Pros vérifiés et encadrés</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-saffron text-[10px] uppercase tracking-widest mb-1">Support</p>
                  <p className="text-cream/90">7 j/7, 8 h 30 — 22 h</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <p className="eyebrow mb-2">04 — Questions fréquentes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Tout ce que vous vous demandez.
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
        <section className="bg-cream border-t border-paper-border pt-14 text-center">
          <p className="eyebrow mb-2">Prêt ?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-3">
            Trouvez votre artisan <em className="italic text-terracotta">maintenant.</em>
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Démarrez en 30 secondes. Réponse humaine sous 47 min en moyenne.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>
      </div>
    </>
  );
}
