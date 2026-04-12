import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { BookOpen, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Allo-Maison | Conseils services a domicile au Maroc",
  description:
    "Le blog Allo-Maison : conseils pratiques sur les services a domicile au Maroc, tarifs, astuces et guides pour bien choisir votre artisan.",
  alternates: { canonical: "https://allo-maison.ma/blog" },
  openGraph: {
    title: "Blog Allo-Maison | Conseils services a domicile au Maroc",
    description:
      "Conseils pratiques, tarifs et guides pour vos services a domicile au Maroc.",
    url: "https://allo-maison.ma/blog",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const PLANNED_ARTICLES = [
  {
    category: "Tarifs & Prix",
    articles: [
      { title: "Combien coute un plombier a Casablanca en 2026 ?", keyword: "prix plombier casablanca" },
      { title: "Tarif femme de menage a domicile au Maroc : guide complet", keyword: "tarif menage domicile maroc" },
      { title: "Prix peinture interieure au Maroc : tout ce que vous devez savoir", keyword: "prix peinture maroc" },
      { title: "Combien coute l'installation d'une climatisation au Maroc ?", keyword: "prix installation clim maroc" },
    ],
  },
  {
    category: "Guides pratiques",
    articles: [
      { title: "Comment trouver un artisan de confiance au Maroc : notre guide 2026", keyword: "trouver artisan confiance maroc" },
      { title: "Grand menage de printemps : checklist complete pour votre maison", keyword: "grand menage maison maroc" },
      { title: "Grand menage Ramadan : comment preparer sa maison", keyword: "menage ramadan casablanca" },
      { title: "Entretien annuel de votre logement : que verifier ?", keyword: "entretien maison maroc" },
    ],
  },
  {
    category: "Conseils par service",
    articles: [
      { title: "Fuite d'eau a la maison : que faire avant l'arrivee du plombier ?", keyword: "fuite eau maison maroc" },
      { title: "Panne electrique : les premiers reflexes a avoir", keyword: "panne electrique maison maroc" },
      { title: "Comment choisir son carreleur au Maroc : les criteres importants", keyword: "choisir carreleur maroc" },
      { title: "Desinsectisation a domicile : quand et comment intervenir ?", keyword: "desinsectisation maison maroc" },
    ],
  },
  {
    category: "Ville par ville",
    articles: [
      { title: "Trouver un plombier a Casablanca : nos conseils", keyword: "plombier casablanca" },
      { title: "Meilleurs artisans a Rabat : comment les trouver ?", keyword: "artisan rabat" },
      { title: "Services a domicile a Marrakech : guide complet", keyword: "services domicile marrakech" },
      { title: "Femme de menage a Tanger : combien ca coute ?", keyword: "menage tanger" },
    ],
  },
];

const WHATSAPP_NOTIF_URL = `https://wa.me/212600000000?text=${encodeURIComponent("Bonjour, je souhaite etre notifie des nouveaux articles du blog Allo-Maison.")}`;

export default function BlogPage() {
  const breadcrumbItems = [
    { name: "Blog", url: "https://allo-maison.ma/blog" },
  ];

  const totalArticles = PLANNED_ARTICLES.reduce((acc, cat) => acc + cat.articles.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-ink mb-4">Blog Allo-Maison</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Conseils pratiques, guides de prix et astuces pour tout ce qui concerne
          les services a domicile au Maroc. {totalArticles} articles en preparation.
        </p>
      </div>

      {/* Coming soon banner */}
      <div className="bg-amber/10 border border-amber/30 rounded-card p-6 text-center mb-12">
        <div className="text-2xl mb-2">✍️</div>
        <h2 className="text-xl font-bold text-ink mb-2">Articles en cours de redaction</h2>
        <p className="text-muted mb-4">
          Notre equipe redige des guides complets sur les services a domicile au Maroc.
          Soyez le premier a etre notifie de la publication.
        </p>
        <WhatsAppButton
          url={WHATSAPP_NOTIF_URL}
          label="Recevoir les alertes nouvels articles"
          size="md"
        />
      </div>

      {/* Planned articles by category */}
      <div className="space-y-10">
        {PLANNED_ARTICLES.map((cat) => (
          <section key={cat.category}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-ink">{cat.category}</h2>
              <span className="text-xs font-medium bg-surface border border-gray-200 text-muted px-2.5 py-1 rounded-badge">
                {cat.articles.length} articles
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.articles.map((article) => (
                <div
                  key={article.title}
                  className="flex items-start gap-3 bg-white rounded-card border border-gray-200 p-4 opacity-75"
                >
                  <div className="w-8 h-8 rounded-full bg-surface border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink leading-snug">{article.title}</p>
                    <span className="inline-block mt-1.5 text-xs font-medium bg-amber/10 text-amber px-2 py-0.5 rounded-badge">
                      A venir
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Subscribe CTA */}
      <section className="mt-14 bg-gradient-to-r from-primary to-primary-deep rounded-card p-8 text-white text-center">
        <Bell className="w-10 h-10 mx-auto mb-4 text-white/70" />
        <h2 className="text-2xl font-bold mb-3">
          Ne ratez aucun article
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Recevez une notification WhatsApp a chaque nouvel article.
          Des conseils pratiques directement dans votre messagerie.
        </p>
        <WhatsAppButton
          url={WHATSAPP_NOTIF_URL}
          label="M'abonner aux notifications"
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
        />
      </section>
    </div>
  );
}
