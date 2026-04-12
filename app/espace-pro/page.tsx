import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { CheckCircle, Users, Star, Briefcase, ClipboardList, UserCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Espace PRO | Rejoignez Allo-Maison en tant que professionnel",
  description:
    "Rejoignez notre reseau de plus de 500 artisans verifies. Recevez des clients qualifies, utilisez nos outils CRM gratuits et developpez votre activite.",
  alternates: { canonical: "https://allo-maison.ma/espace-pro" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Espace PRO | Rejoignez Allo-Maison",
    description:
      "Rejoignez notre reseau d'artisans verifies. Clients qualifies, outils gratuits, zero abonnement.",
    url: "https://allo-maison.ma/espace-pro",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const BENEFITS = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Clients verifies et qualifies",
    description:
      "Recevez uniquement des demandes de clients serieux ayant precise leur besoin, leur ville et leur budget. Fini les demandes vagues ou les faux contacts.",
    highlight: "Zero prospection",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-trust" />,
    title: "Outils CRM et facturation gratuits",
    description:
      "Acces gratuit a notre espace pro : gestion des demandes, historique clients, modeles de devis et facturation simple. Tout ce dont vous avez besoin pour gerer votre activite.",
    highlight: "100% gratuit",
  },
  {
    icon: <Star className="w-8 h-8 text-amber" />,
    title: "Visibilite locale maximale",
    description:
      "Votre profil verifie apparait en tete des resultats dans votre ville et votre specialite. Plus vous avez d'avis positifs, plus vous montez dans les resultats.",
    highlight: "Plus de visibilite",
  },
];

const REGISTRATION_STEPS = [
  {
    step: "01",
    icon: <ClipboardList className="w-6 h-6 text-primary" />,
    title: "Inscription",
    description: "Envoyez-nous vos informations de base via WhatsApp : nom, specialite, ville et telephone. L'inscription prend moins de 2 minutes.",
  },
  {
    step: "02",
    icon: <UserCheck className="w-6 h-6 text-trust" />,
    title: "Verification",
    description: "Notre equipe verifie votre CIN, casier judiciaire et vos certifications professionnelles. Processus completement en 48 a 72 heures.",
  },
  {
    step: "03",
    icon: <Users className="w-6 h-6 text-amber" />,
    title: "Creation de profil",
    description: "Completez votre profil avec vos specialites, vos tarifs et vos photos de travaux precedents. Un profil complet attire plus de clients.",
  },
  {
    step: "04",
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Premiere mission",
    description: "Commencez a recevoir des demandes de clients dans votre zone. Notre equipe vous accompagne pour votre premiere mission.",
  },
];

const WHATSAPP_PRO_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}?text=${encodeURIComponent("Bonjour, je suis artisan et je souhaite rejoindre Allo-Maison. Pouvez-vous m'expliquer le processus d'inscription ?")}`;

export default function EspaceProPage() {
  const breadcrumbItems = [
    { name: "Espace PRO", url: "https://allo-maison.ma/espace-pro" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-deep rounded-card p-10 text-white text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-badge mb-4">
          <CheckCircle className="w-3.5 h-3.5" />
          500+ artisans nous font confiance depuis 2017
        </div>
        <h1 className="text-4xl font-extrabold mb-4">
          Rejoignez Allo-Maison en tant que professionnel
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">
          Developpez votre activite avec des clients verifies, des outils gratuits
          et une visibilite locale maximale. Zero abonnement, zero commission.
        </p>
        <WhatsAppButton
          url={WHATSAPP_PRO_URL}
          label="Je veux rejoindre la plateforme"
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
        />
      </div>

      {/* Benefits */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-ink mb-2 text-center">
          Pourquoi rejoindre Allo-Maison ?
        </h2>
        <p className="text-muted text-center mb-8 max-w-xl mx-auto">
          Des centaines d&apos;artisans ont fait confiance a notre plateforme.
          Voici ce qu&apos;ils y gagnent.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-card shadow-card border border-gray-100 p-6"
            >
              <div className="mb-3">{benefit.icon}</div>
              <div className="inline-block text-xs font-semibold bg-primary-light text-primary px-2.5 py-1 rounded-badge mb-3">
                {benefit.highlight}
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-14 bg-surface rounded-card border border-gray-100 p-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Artisans actifs" },
            { value: "2000+", label: "Clients satisfaits" },
            { value: "6", label: "Villes couvertes" },
            { value: "4.8/5", label: "Note moyenne artisans" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration steps */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-ink mb-2 text-center">
          Comment devenir artisan Allo-Maison
        </h2>
        <p className="text-muted text-center mb-8">
          Processus simple, rapide et entierement gratuit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGISTRATION_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-card border border-gray-100 p-5 text-center"
            >
              <div className="text-3xl font-extrabold text-primary/20 mb-2">{step.step}</div>
              <div className="flex justify-center mb-3">{step.icon}</div>
              <h3 className="font-bold text-ink mb-2">{step.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-ink mb-6">
          Ce que vous obtenez gratuitement
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Profil professionnel verifie avec badge de confiance",
            "Acces aux demandes clients dans votre ville",
            "Outils de gestion des devis et factures",
            "Systeme de gestion des avis clients",
            "Visibilite sur Google via notre SEO",
            "Formation et conseils pour developper votre profil",
            "Support de notre equipe 6j/7",
            "Aucune commission sur vos transactions",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white rounded-card border border-gray-100 p-3">
              <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
              <span className="text-sm text-ink">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-deep rounded-card p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          Pret a rejoindre la plateforme ?
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Contactez-nous via WhatsApp pour demarrer votre inscription.
          Notre equipe vous accompagne a chaque etape.
        </p>
        <WhatsAppButton
          url={WHATSAPP_PRO_URL}
          label="Contactez-nous pour rejoindre la plateforme"
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
        />
        <p className="text-white/60 text-xs mt-4">
          Inscription gratuite — Reponse en moins de 24 heures
        </p>
      </section>
    </div>
  );
}
