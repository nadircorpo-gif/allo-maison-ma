import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";

export const metadata: Metadata = {
  title: "Espace Pro | Rejoignez Allo Maison en tant qu'artisan",
  description:
    "Rejoignez notre réseau de plus de 1 017 artisans vérifiés. Recevez des clients qualifiés, utilisez nos outils CRM gratuits et développez votre activité.",
  alternates: { canonical: "https://allo-maison.ma/espace-pro" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Espace Pro | Rejoignez Allo Maison",
    description:
      "Rejoignez notre réseau d'artisans vérifiés. Clients qualifiés, outils gratuits, zéro abonnement.",
    url: "https://allo-maison.ma/espace-pro",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const BENEFITS = [
  {
    title: "Clients vérifiés et qualifiés",
    description:
      "Recevez uniquement des demandes de clients sérieux ayant précisé leur besoin, leur ville et leur budget. Fini les demandes vagues.",
    highlight: "Zéro prospection",
  },
  {
    title: "Outils CRM et facturation gratuits",
    description:
      "Accès gratuit à notre espace pro : gestion des demandes, historique clients, modèles de devis et facturation simple.",
    highlight: "100 % gratuit",
  },
  {
    title: "Visibilité locale maximale",
    description:
      "Votre profil vérifié apparaît en tête des résultats dans votre ville et votre spécialité. Plus d'avis positifs = plus de visibilité.",
    highlight: "Plus de clients",
  },
];

const REGISTRATION_STEPS = [
  {
    title: "Inscription",
    description: "Envoyez-nous vos informations de base via WhatsApp : nom, spécialité, ville et téléphone. Moins de 2 minutes.",
  },
  {
    title: "Vérification",
    description: "Notre équipe vérifie votre identité, vos compétences et vos références. Processus complété en 48 à 72 heures.",
  },
  {
    title: "Création de profil",
    description: "Complétez votre profil avec vos spécialités, tarifs et photos de chantier. Un profil complet attire plus de clients.",
  },
  {
    title: "Première mission",
    description: "Commencez à recevoir des demandes de clients dans votre zone. Notre équipe vous accompagne.",
  },
];

const INCLUDED = [
  "Profil professionnel vérifié avec badge de confiance",
  "Accès aux demandes clients dans votre ville",
  "Outils de gestion des devis et factures",
  "Système de gestion des avis clients",
  "Visibilité sur Google via notre SEO",
  "Formation et conseils pour développer votre profil",
  "Support de notre équipe 6 j/7",
  "Aucune commission sur vos transactions",
];

const WHATSAPP_PRO_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}?text=${encodeURIComponent("Bonjour, je suis artisan et je souhaite rejoindre Allo Maison. Pouvez-vous m'expliquer le processus d'inscription ?")}`;

export default function EspaceProPage() {
  const breadcrumbItems = [{ name: "Espace Pro", url: "https://allo-maison.ma/espace-pro" }];

  return (
    <>
      {/* HERO */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Espace Pro · Pour les artisans</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                Développez votre activité,<br />
                <em className="italic text-terracotta">sans prospecter.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl mb-6" style={{ textWrap: "pretty" }}>
                1 017 artisans nous font confiance depuis 2017. Des clients qualifiés, des outils gratuits, zéro abonnement, zéro commission.
              </p>
              <WhatsAppButton url={WHATSAPP_PRO_URL} label="Je veux rejoindre la plateforme" size="lg" />
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Allo Maison — rejoignez nos artisans"
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
            <div><p className="font-display text-4xl sm:text-5xl font-[500] text-ink leading-none">1 017</p><p className="text-xs text-muted mt-2 uppercase tracking-wider">artisans actifs</p></div>
            <div><p className="font-display text-4xl sm:text-5xl font-[500] text-ink leading-none">12 847</p><p className="text-xs text-muted mt-2 uppercase tracking-wider">clients satisfaits</p></div>
            <div><p className="font-display text-4xl sm:text-5xl font-[500] text-ink leading-none">6</p><p className="text-xs text-muted mt-2 uppercase tracking-wider">villes couvertes</p></div>
            <div><p className="font-display text-4xl sm:text-5xl font-[500] text-ink leading-none">4.8/5</p><p className="text-xs text-muted mt-2 uppercase tracking-wider">note moyenne</p></div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <p className="eyebrow mb-2">01 — Pourquoi nous rejoindre</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Trois bonnes raisons. <em className="italic text-terracotta">Sans contrepartie.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <article key={b.title} className="bg-white border border-paper-border rounded-2xl p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <p className="font-display text-3xl font-[500] text-terracotta tab-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-zellige bg-clay px-2 py-1 rounded-full">
                    {b.highlight}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Registration steps */}
        <section className="mb-20">
          <p className="eyebrow mb-2">02 — Comment rejoindre</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Quatre étapes. <em className="italic">48 h de vérification.</em>
          </h2>
          <div className="border-t border-ink">
            {REGISTRATION_STEPS.map((step, i) => (
              <div key={step.title} className="grid grid-cols-12 gap-4 py-6 border-b border-paper-border">
                <span className="col-span-2 sm:col-span-1 font-display text-3xl sm:text-4xl font-[500] text-terracotta tab-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display text-xl font-medium text-ink">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's included */}
        <section className="mb-20">
          <p className="eyebrow mb-2">03 — Ce que vous obtenez</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Huit outils, <em className="italic">tous gratuits.</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INCLUDED.map((item, i) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl border border-paper-border p-4">
                <span className="font-display text-lg font-[500] text-terracotta tab-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zellige text-cream rounded-2xl p-10 sm:p-14 text-center">
          <p className="eyebrow mb-2" style={{ color: "#D4A24C" }}>04 — Prêt à rejoindre ?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-3">
            Rejoignez les <em className="italic text-saffron">1 017 pros</em> qui nous font confiance.
          </h2>
          <p className="text-cream/75 mb-8 max-w-xl mx-auto">
            Contactez-nous via WhatsApp pour démarrer votre inscription. Notre équipe vous accompagne à chaque étape.
          </p>
          <WhatsAppButton url={WHATSAPP_PRO_URL} label="Contactez-nous maintenant" size="lg" />
          <p className="text-cream/50 text-[11px] mt-4 tab-nums">Inscription gratuite · Réponse sous 24 h</p>
        </section>
      </div>
    </>
  );
}
