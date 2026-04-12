import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import SearchBar from "@/components/shared/search-bar";
import { organizationJsonLd } from "@/lib/seo";
import { CheckCircle, Users, Star, Shield, MapPin, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "A propos d'Allo-Maison | Services a domicile de confiance au Maroc",
  description:
    "Depuis 2017, Allo-Maison connecte les familles marocaines avec des professionnels verifies. 500+ artisans, 6 villes, 2000+ missions, 4.8/5 satisfaction. Notre histoire.",
  alternates: { canonical: "https://allo-maison.ma/a-propos" },
  openGraph: {
    title: "A propos d'Allo-Maison | Services a domicile de confiance au Maroc",
    description:
      "Depuis 2017, Allo-Maison connecte les familles marocaines avec des professionnels verifies. Notre mission, nos valeurs.",
    url: "https://allo-maison.ma/a-propos",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const STATS = [
  { value: "500+", label: "Artisans verifies", icon: <Users className="w-6 h-6" /> },
  { value: "6", label: "Villes couvertes", icon: <MapPin className="w-6 h-6" /> },
  { value: "2000+", label: "Missions realisees", icon: <CheckCircle className="w-6 h-6" /> },
  { value: "4.8/5", label: "Note de satisfaction", icon: <Star className="w-6 h-6" /> },
];

const VALUES = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Confiance",
    description:
      "Chaque artisan sur notre plateforme a passe un processus de verification rigoureux en 6 etapes : CIN, casier judiciaire, diplomes, references et entretien. Seul 1 candidat sur 3 est accepte. La confiance n'est pas un slogan, c'est notre promesse.",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Accessibilite",
    description:
      "Trouver un bon artisan ne devrait pas etre un luxe. Nous travaillons pour proposer des tarifs justes et transparents, accessibles a toutes les familles marocaines. Aucuns frais caches, aucune commission sur vos transactions.",
  },
  {
    icon: <Zap className="w-8 h-8 text-amber" />,
    title: "Excellence",
    description:
      "Nous ne nous contentons pas du minimum. Chaque artisan est suivi par notre equipe qualite, les avis clients sont verifies et publies sans filtre. Notre objectif : vous offrir la meilleure experience possible a chaque prestation.",
  },
];

const DIFFERENCES = [
  {
    title: "Verification totale, pas juste une inscription",
    description:
      "Contrairement a d'autres plateformes qui acceptent tout le monde, nous verifions chaque artisan manuellement : CIN, casier judiciaire, diplomes OFPPT, references clients et entretien en personne.",
  },
  {
    title: "Garantie financiere concrete",
    description:
      "Nous sommes l'une des rares plateformes au Maroc a offrir un remboursement reel jusqu'a 2000 DH en cas d'insatisfaction. Pas une simple promesse marketing.",
  },
  {
    title: "WhatsApp-first pour les Marocains",
    description:
      "Nous savons que les Marocains preferent WhatsApp. Notre systeme est optimise pour ca : demandez, recevez des profils et confirmez votre artisan directement via WhatsApp, sans application a installer.",
  },
  {
    title: "Ancrage local depuis 2017",
    description:
      "Nous ne sommes pas une startup etrangere. Allo-Maison est 100% marocain, base a Casablanca, avec une equipe qui comprend les besoins et les attentes des familles marocaines.",
  },
];

export default function AProposPage() {
  const breadcrumbItems = [
    { name: "A propos", url: "https://allo-maison.ma/a-propos" },
  ];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-3 py-1.5 rounded-badge mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            Depuis 2017
          </div>
          <h1 className="text-4xl font-extrabold text-ink mb-4">
            Allo-Maison : la confiance au service de votre maison
          </h1>
          <p className="text-lg text-muted max-w-3xl">
            Depuis 2017, nous connectons les familles marocaines avec des professionnels
            de confiance pour tous leurs besoins a domicile. Notre mission : rendre
            l&apos;acces a un bon artisan simple, rapide et securise pour tous.
          </p>
        </div>

        {/* Story */}
        <section className="mb-14 bg-surface rounded-card border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-ink mb-4">Notre histoire</h2>
          <div className="prose prose-sm text-muted max-w-none space-y-4">
            <p>
              Allo-Maison est ne d&apos;un constat simple : trouver un artisan fiable au Maroc
              relevait du parcours du combattant. Les recommandations du bouche-a-oreille ne
              suffisaient plus, et les plateformes existantes ne garantissaient ni la qualite,
              ni la securite.
            </p>
            <p>
              En 2017, nous avons lance Allo-Maison a Casablanca avec une idee claire :
              creer une plateforme ou chaque artisan est verifie, ou chaque client est
              protege, et ou la technologie sert la confiance humaine.
            </p>
            <p>
              Aujourd&apos;hui, nous sommes presents dans 6 grandes villes du Maroc avec plus
              de 500 artisans verifies et des milliers de familles satisfaites. Notre croissance
              est entierement basee sur les recommandations de nos clients — le meilleur
              indicateur de confiance qui soit.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6 bg-white rounded-card shadow-card border border-gray-100"
              >
                <div className="text-primary mb-2">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-ink">{stat.value}</div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-2 text-center">Nos valeurs</h2>
          <p className="text-muted text-center mb-8 max-w-xl mx-auto">
            Ces trois valeurs guident chacune de nos decisions, de la selection des artisans
            a la conception de notre plateforme.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-card shadow-card border border-gray-100 p-6"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-ink mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Differences */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-2">
            Ce qui nous rend differents
          </h2>
          <p className="text-muted mb-8">
            Il existe d&apos;autres facon de trouver un artisan. Voici pourquoi des milliers
            de familles choisissent Allo-Maison.
          </p>
          <div className="space-y-4">
            {DIFFERENCES.map((diff) => (
              <div
                key={diff.title}
                className="flex gap-4 bg-white rounded-card border border-gray-100 p-5"
              >
                <CheckCircle className="w-5 h-5 text-trust flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-ink mb-1">{diff.title}</h3>
                  <p className="text-sm text-muted">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team placeholder */}
        <section className="mb-14 bg-surface rounded-card border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-ink mb-4">Notre equipe</h2>
          <p className="text-muted mb-6">
            Allo-Maison est compose d&apos;une equipe passionnee de professionnels marocains
            dont la mission est de simplifier le quotidien des familles. Verification,
            support client, technologie, qualite — chaque membre s&apos;engage pour la confiance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { role: "Direction & Operations", emoji: "👔" },
              { role: "Verification & Qualite", emoji: "🔍" },
              { role: "Support Client", emoji: "💬" },
            ].map((member) => (
              <div
                key={member.role}
                className="bg-white rounded-card border border-gray-200 p-4 text-center"
              >
                <div className="text-4xl mb-3">{member.emoji}</div>
                <div className="text-sm font-medium text-ink">{member.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-ink mb-3">
            Rejoignez la communaute Allo-Maison
          </h2>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Des milliers de familles marocaines nous font confiance.
            Trouvez votre artisan verifie aujourd&apos;hui.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>
      </div>
    </>
  );
}
