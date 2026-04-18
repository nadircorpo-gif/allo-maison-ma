import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import SearchBar from "@/components/shared/search-bar";
import { organizationJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Shield, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos d'Allo Maison | Notre mission, nos valeurs",
  description:
    "Allo Maison connecte les familles marocaines avec 1 000+ artisans vérifiés dans 6 villes. Notre mission, nos valeurs, notre équipe 100 % marocaine.",
  alternates: { canonical: "https://allo-maison.ma/a-propos" },
  openGraph: {
    title: "À propos d'Allo Maison — Notre mission et nos valeurs",
    description:
      "Plateforme jeune et exigeante : Allo Maison connecte les familles marocaines avec 1 000+ artisans vérifiés. Notre mission, nos valeurs, notre équipe.",
    url: "https://allo-maison.ma/a-propos",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const STATS = [
  { value: "1 017*", label: "artisans vérifiés" },
  { value: "6", label: "villes couvertes" },
  { value: "12 847*", label: "avis collectés" },
  { value: "4.8/5*", label: "note moyenne" },
];

const VALUES = [
  {
    icon: Shield,
    title: "Confiance",
    description:
      "Chaque artisan passe par un processus de vérification rigoureux en 7 étapes. 1 candidat sur 3 est accepté. La confiance n'est pas un slogan.",
  },
  {
    icon: Heart,
    title: "Accessibilité",
    description:
      "Trouver un bon artisan ne devrait pas être un luxe. Tarifs justes et transparents, aucune commission sur vos transactions, zéro frais caché.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description:
      "Notre équipe qualité suit chaque prestation. Avis vérifiés et publiés sans filtre. Les artisans mal notés sont retirés de la plateforme.",
  },
];

const DIFFERENCES = [
  {
    title: "Vérification totale, pas une simple inscription",
    description:
      "Contrairement aux plateformes qui acceptent tout le monde, nous vérifions chaque artisan manuellement : identité, compétences, références clients, entretien en personne.",
  },
  {
    title: "Pros vérifiés et certifiés",
    description:
      "Process de certification en 7 étapes : identité, casier, assurance RC, diplômes, références, test pratique, contrôle qualité continu. Pas une promesse marketing.",
  },
  {
    title: "WhatsApp-first, fait pour le Maroc",
    description:
      "Les Marocains préfèrent WhatsApp. Notre système est optimisé pour ça : demandez, recevez des profils, confirmez — tout via WhatsApp, sans app à installer.",
  },
  {
    title: "Ancrage local, 100 % marocain",
    description:
      "Pas une startup étrangère. Allo Maison est 100 % marocain, basé à Casablanca, avec une équipe qui comprend les besoins des familles marocaines.",
  },
];

export default function AProposPage() {
  const breadcrumbItems = [{ name: "À propos", url: "https://allo-maison.ma/a-propos" }];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      {/* ========= HERO ========= */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Notre histoire · Depuis le lancement, fin 2025</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                La confiance, <em className="italic text-terracotta">au service de votre maison.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Depuis le lancement, fin 2025, nous connectons les familles marocaines avec des professionnels de confiance pour tous leurs besoins à domicile. Notre mission : rendre l&apos;accès à un bon artisan simple, rapide et sécurisé.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt="Allo Maison — plateforme jeune et exigeante"
                width={320}
                height={400}
                className="w-36 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ========= STATS ========= */}
        <section className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-b border-paper-border py-10 tab-nums">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl sm:text-5xl font-[500] text-ink leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-muted mt-2 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-4 italic">
            * Données vérifiées en interne, mises à jour mensuellement.
          </p>
        </section>

        {/* ========= STORY ========= */}
        <section className="mb-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-2">01 — Notre histoire</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink">
              Plateforme jeune et <em className="italic text-terracotta">exigeante.</em>
            </h2>
          </div>
          <div className="lg:col-span-8 lg:col-start-6 space-y-5 text-muted text-[15px] leading-relaxed">
            <p>
              Allo Maison est né d&apos;un constat simple : trouver un artisan fiable au Maroc relevait du parcours du combattant. Le bouche-à-oreille ne suffisait plus, et les plateformes existantes ne garantissaient ni la qualité, ni la sécurité.
            </p>
            <p>
              Depuis le lancement, fin 2025, nous avons construit Allo Maison à Casablanca avec une idée claire : créer une plateforme où chaque artisan est vérifié, où chaque client est protégé, où la technologie sert la confiance humaine.
            </p>
            <p>
              Aujourd&apos;hui, nous sommes présents dans 6 grandes villes du Maroc avec <strong className="text-ink">1 017 artisans vérifiés</strong> et des milliers de familles satisfaites. Notre croissance est entièrement basée sur les recommandations de nos clients, le meilleur indicateur de confiance qui soit.
            </p>
          </div>
        </section>

        {/* ========= VALUES ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">02 — Nos valeurs</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Trois principes. <em className="italic">Aucun compromis.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="bg-white border border-paper-border rounded-2xl p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="w-12 h-12 rounded-full flex items-center justify-center bg-clay">
                      <Icon className="w-5 h-5 text-zellige" />
                    </span>
                    <p className="font-display text-3xl font-[500] text-terracotta tab-nums">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink mb-2">{value.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{value.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* ========= DIFFERENCES ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">03 — Ce qui nous rend différents</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-8">
            Pourquoi des milliers de familles <em className="italic text-terracotta">nous choisissent.</em>
          </h2>
          <div className="border-t border-ink">
            {DIFFERENCES.map((diff, i) => (
              <div key={diff.title} className="grid grid-cols-12 gap-4 py-6 border-b border-paper-border">
                <span className="col-span-2 sm:col-span-1 font-display text-3xl sm:text-4xl font-[500] text-terracotta tab-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display text-xl font-medium text-ink mb-1">{diff.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========= TEAM ========= */}
        <section className="mb-20">
          <p className="eyebrow mb-2">04 — Notre équipe</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-4">
            100 % humains, <em className="italic">100 % marocains.</em>
          </h2>
          <p className="text-muted max-w-2xl mb-8">
            Allo Maison est composé d&apos;une équipe passionnée de professionnels marocains dont la mission est de simplifier le quotidien des familles. Équipe en cours de présentation — voici les fonctions en place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { role: "Direction · poste à pourvoir publiquement", detail: "Stratégie, partenariats, vision long terme" },
              { role: "Vérification · équipe interne", detail: "Contrôle artisans, audit prestations" },
              { role: "Support · joignable 7 j/7 sur WhatsApp", detail: "WhatsApp 7 j/7, 8 h 30 — 22 h" },
            ].map((member) => (
              <article key={member.role} className="bg-white border border-paper-border rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full border border-paper-border flex items-center justify-center text-[10px] uppercase tracking-widest text-muted mb-4">
                  AM
                </div>
                <h3 className="font-display text-base font-medium text-ink leading-snug">{member.role}</h3>
                <p className="text-xs text-muted mt-1">{member.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ========= CTA ========= */}
        <section className="bg-cream border-t border-paper-border pt-14 text-center">
          <p className="eyebrow mb-2">05 — Rejoignez-nous</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-3">
            Votre artisan vérifié, <em className="italic text-terracotta">en 24 h.</em>
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Des milliers de familles marocaines nous font confiance. Trouvez votre artisan aujourd&apos;hui.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          <p className="text-[11px] text-muted mt-8">
            Informations officielles sur l&apos;éditeur :{" "}
            <Link href="/mentions-legales" className="text-terracotta hover:underline">
              mentions légales
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
