import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";

export const metadata: Metadata = {
  title: "Blog Allo-Maison | Conseils services à domicile au Maroc",
  description:
    "Le blog Allo Maison : conseils pratiques sur les services à domicile au Maroc, tarifs, astuces et guides pour bien choisir votre artisan.",
  alternates: { canonical: "https://allo-maison.ma/blog" },
  openGraph: {
    title: "Blog Allo-Maison | Conseils services à domicile au Maroc",
    description: "Conseils pratiques, tarifs et guides pour vos services à domicile au Maroc.",
    url: "https://allo-maison.ma/blog",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const PLANNED_ARTICLES = [
  {
    category: "Tarifs & prix",
    articles: [
      "Combien coûte un plombier à Casablanca en 2026 ?",
      "Tarif femme de ménage à domicile au Maroc : guide complet",
      "Prix peinture intérieure au Maroc : tout ce que vous devez savoir",
      "Combien coûte l'installation d'une climatisation au Maroc ?",
    ],
  },
  {
    category: "Guides pratiques",
    articles: [
      "Comment trouver un artisan de confiance au Maroc : notre guide 2026",
      "Grand ménage de printemps : checklist complète pour votre maison",
      "Grand ménage Ramadan : comment préparer sa maison",
      "Entretien annuel de votre logement : que vérifier ?",
    ],
  },
  {
    category: "Conseils par service",
    articles: [
      "Fuite d'eau à la maison : que faire avant l'arrivée du plombier ?",
      "Panne électrique : les premiers réflexes à avoir",
      "Comment choisir son carreleur au Maroc : les critères importants",
      "Désinsectisation à domicile : quand et comment intervenir ?",
    ],
  },
  {
    category: "Ville par ville",
    articles: [
      "Trouver un plombier à Casablanca : nos conseils",
      "Meilleurs artisans à Rabat : comment les trouver ?",
      "Services à domicile à Marrakech : guide complet",
      "Femme de ménage à Tanger : combien ça coûte ?",
    ],
  },
];

const WHATSAPP_NOTIF_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}?text=${encodeURIComponent("Bonjour, je souhaite etre notifie des nouveaux articles du blog Allo Maison.")}`;

export default function BlogPage() {
  const breadcrumbItems = [{ name: "Blog", url: "https://allo-maison.ma/blog" }];
  const totalArticles = PLANNED_ARTICLES.reduce((acc, c) => acc + c.articles.length, 0);

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
                <span className="eyebrow text-[10px]">Journal Allo Maison</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                Conseils et guides,<br />
                <em className="italic text-terracotta">par ceux qui savent.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl" style={{ textWrap: "pretty" }}>
                Guides pratiques, tarifs vérifiés et astuces pour tout ce qui touche les services à domicile au Maroc. <span className="tab-nums">{totalArticles}</span> articles en préparation.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Image
                src="/brand/logo-shield.svg"
                alt=""
                width={320}
                height={400}
                className="w-36 h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Coming soon banner */}
        <div className="bg-cream border border-paper-border rounded-2xl p-8 text-center mb-14">
          <p className="eyebrow mb-2">En cours de rédaction</p>
          <h2 className="font-display text-2xl sm:text-3xl font-[550] tracking-[-0.02em] text-ink mb-3">
            Notre équipe <em className="italic">rédige en ce moment.</em>
          </h2>
          <p className="text-muted mb-5 max-w-xl mx-auto text-sm">
            Des guides complets sur les services à domicile au Maroc. Soyez le premier à être notifié à la publication.
          </p>
          <WhatsAppButton url={WHATSAPP_NOTIF_URL} label="Recevoir les alertes" size="md" />
        </div>

        {/* Planned articles by category */}
        <div className="space-y-16">
          {PLANNED_ARTICLES.map((cat, catIdx) => (
            <section key={cat.category}>
              <p className="eyebrow mb-2">{String(catIdx + 1).padStart(2, "0")} — {cat.category}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-6">
                {cat.category}
              </h2>
              <div className="border-t border-ink">
                {cat.articles.map((article, i) => (
                  <div key={article} className="grid grid-cols-12 gap-4 py-5 border-b border-paper-border">
                    <span className="col-span-2 sm:col-span-1 font-display text-2xl font-[500] text-terracotta/60 tab-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="col-span-8 sm:col-span-9 font-display text-lg font-medium text-ink/80 leading-snug">
                      {article}
                    </p>
                    <span className="col-span-2 text-right text-[10px] uppercase tracking-widest text-muted font-bold">
                      À venir
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Subscribe CTA */}
        <section className="mt-20 bg-zellige text-cream rounded-2xl p-10 sm:p-14 text-center">
          <p className="eyebrow mb-2" style={{ color: "#D4A24C" }}>Notifications WhatsApp</p>
          <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] mb-3">
            Ne ratez <em className="italic text-saffron">aucun article.</em>
          </h2>
          <p className="text-cream/75 mb-8 max-w-xl mx-auto">
            Recevez une notification WhatsApp à chaque nouvel article. Conseils pratiques directement dans votre messagerie.
          </p>
          <WhatsAppButton url={WHATSAPP_NOTIF_URL} label="M'abonner aux notifications" size="lg" />
        </section>
      </div>
    </>
  );
}
