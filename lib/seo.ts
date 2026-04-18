import type { Metadata } from "next";
import { SERVICES } from "@/lib/data/services";

// Metier name per slug + gender article, so fallback copy reads naturally in French.
// services.ts uses the domain form ("Plomberie", "Electricite") which breaks
// "Trouvez un plomberie..." - here we use the metier form ("un plombier", "une femme de menage").
type MetierMapping = { label: string; article: "un" | "une"; participle: string };
const METIER_BY_SLUG: Record<string, MetierMapping> = {
  plombier: { label: "plombier", article: "un", participle: "vérifié" },
  electricien: { label: "électricien", article: "un", participle: "vérifié" },
  serrurier: { label: "serrurier", article: "un", participle: "vérifié" },
  "femme-de-menage": { label: "femme de ménage", article: "une", participle: "vérifiée" },
  peintre: { label: "peintre", article: "un", participle: "vérifié" },
  climatisation: { label: "climaticien", article: "un", participle: "vérifié" },
  bricoleur: { label: "bricoleur", article: "un", participle: "vérifié" },
  renovation: { label: "artisan rénovation", article: "un", participle: "vérifié" },
  jardinier: { label: "jardinier", article: "un", participle: "vérifié" },
  "technicien-informatique": { label: "technicien informatique", article: "un", participle: "vérifié" },
  demenagement: { label: "déménageur", article: "un", participle: "vérifié" },
  carreleur: { label: "carreleur", article: "un", participle: "vérifié" },
  menuisier: { label: "menuisier", article: "un", participle: "vérifié" },
  etancheite: { label: "pro étanchéité", article: "un", participle: "vérifié" },
  desinsectisation: { label: "pro désinsectisation", article: "un", participle: "vérifié" },
  vitrier: { label: "vitrier", article: "un", participle: "vérifié" },
  cuisiniere: { label: "cuisinière", article: "une", participle: "vérifiée" },
  concierge: { label: "concierge", article: "un", participle: "vérifié" },
  nounou: { label: "nounou", article: "une", participle: "vérifiée" },
};

export function generateServiceCityMetadata(
  serviceName: string,
  serviceSlug: string,
  cityName: string,
  citySlug: string,
  priceMin: number
): Metadata {
  const metier = METIER_BY_SLUG[serviceSlug];
  const title = metier
    ? `${serviceName} à ${cityName} · Pros vérifiés · Dès ${priceMin} DH | Allo Maison`
    : `${serviceName} à ${cityName} · Pros vérifiés | Allo Maison`;
  const description = metier
    ? `Trouvez ${metier.article} ${metier.label} ${metier.participle} à ${cityName} à partir de ${priceMin} DH. Pros encadrés, disponibles 7j/7. Devis gratuit via WhatsApp.`
    : `Trouvez un pro vérifié pour ${serviceName.toLowerCase()} à ${cityName} à partir de ${priceMin} DH. Pros encadrés, disponibles 7j/7. Devis gratuit via WhatsApp.`;
  const url = `https://allo-maison.ma/${serviceSlug}-${citySlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Allo-Maison",
      locale: "fr_MA",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

// Mapping slug urgence -> nom du metier (genre masculin) pour grammaire correcte
// "Besoin d'un plombier" / "d'un électricien" / "d'un serrurier" vs "d'un plomberie" KO
const URGENCE_METIER_BY_SLUG: Record<string, string> = {
  plombier: "Plombier",
  electricien: "Électricien",
  serrurier: "Serrurier",
};

// Plurals for "nos plombiers couvrent...", "3 électriciens disponibles..."
const URGENCE_METIER_PLURAL_BY_SLUG: Record<string, string> = {
  plombier: "plombiers",
  electricien: "électriciens",
  serrurier: "serruriers",
};

/**
 * Retourne le nom du metier pour un slug d'urgence, avec les formes capitalisee,
 * minuscule et plurielle. Resout le probleme de grammaire cause par SERVICES qui
 * expose le nom de domaine ("Plomberie", "Electricite", "Serrurerie") au lieu du
 * nom du metier (personne) necessaire pour "un plombier", "un electricien", etc.
 */
export function getUrgenceMetier(
  serviceSlug: string,
  fallbackName?: string
): { label: string; lowerLabel: string; pluralLabel: string } {
  const label = URGENCE_METIER_BY_SLUG[serviceSlug] ?? fallbackName ?? serviceSlug;
  const pluralLabel =
    URGENCE_METIER_PLURAL_BY_SLUG[serviceSlug] ?? `${label.toLowerCase()}s`;
  return {
    label,
    lowerLabel: label.toLowerCase(),
    pluralLabel,
  };
}

export function generateUrgenceMetadata(
  serviceName: string,
  cityName: string,
  serviceSlug: string,
  citySlug: string
): Metadata {
  // Les services.ts exposent "Plomberie" / "Electricite" / "Serrurerie" (noms de domaine).
  // Pour les pages urgence on utilise le nom du metier ("Plombier", etc.) pour une grammaire correcte.
  const metier = URGENCE_METIER_BY_SLUG[serviceSlug] ?? serviceName;
  const title = `${metier} d'urgence ${cityName} · Intervention 30 min · 24/7 | Allo Maison`;
  const description = `Besoin d'un ${metier.toLowerCase()} en urgence à ${cityName} ? Intervention en moins de 30 minutes. Professionnels vérifiés disponibles 24h/24 et 7j/7. Devis clair, sans surprise.`;
  const url = `https://allo-maison.ma/urgence/${serviceSlug}/${citySlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Allo-Maison",
      locale: "fr_MA",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://allo-maison.ma/#organization",
    name: "Allo-Maison",
    // TODO: updater legalName quand mentions legales pretes
    legalName: "Allo-Maison SARL",
    url: "https://allo-maison.ma",
    logo: "https://allo-maison.ma/brand/logo-mark.svg",
    image: "https://allo-maison.ma/opengraph-image",
    description:
      "La plateforme marocaine de confiance pour tous vos services à domicile. Des professionnels vérifiés, disponibles 7j/7.",
    foundingDate: "2026",
    telephone: "+212661409190",
    email: "contact@allo-maison.ma",
    priceRange: "MAD 50-5000",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    sameAs: [
      "https://www.facebook.com/allomaison.ma",
      "https://www.instagram.com/allomaison.ma",
      "https://www.linkedin.com/company/allo-maison-ma",
    ],
    knowsAbout: SERVICES.map((s) => s.name),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French"],
    },
  };
}

export function serviceCityJsonLd(
  serviceName: string,
  cityName: string,
  priceMin: number,
  // rating/reviewCount gardes dans la signature pour compat avec les appelants existants,
  // mais non utilises : aucun aggregateRating emis tant qu'on n'a pas de vrais Reviews visibles
  // sur la page (Google Structured Data Guidelines = risque de Manual Action).
  _rating: number,
  _reviewCount: number,
  serviceSlug?: string,
  citySlug?: string
): Record<string, unknown> {
  const url =
    serviceSlug && citySlug
      ? `https://allo-maison.ma/${serviceSlug}-${citySlug}`
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} à ${cityName}`,
    serviceType: serviceName,
    ...(url ? { url } : {}),
    priceRange: "MAD 50-5000",
    provider: {
      "@id": "https://allo-maison.ma/#organization",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      addressCountry: "MA",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: priceMin,
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function videoObjectJsonLd(
  videoId: string,
  title: string,
  description: string,
  uploadDate: string = new Date().toISOString().split("T")[0]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Allo-Maison",
    url: "https://allo-maison.ma",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://allo-maison.ma/services?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

export function professionalServiceJsonLd(pro: {
  id: string | number;
  name: string;
  serviceName: string;
  cityName: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  yearsExperience?: number;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://allo-maison.ma/#pro-${pro.id}`,
    name: pro.name,
    serviceType: pro.serviceName,
    areaServed: {
      "@type": "City",
      name: pro.cityName,
    },
    provider: {
      "@id": "https://allo-maison.ma/#organization",
    },
  };

  if (pro.phone) {
    schema.telephone = pro.phone;
  }

  // Pas d'aggregateRating sans avis visibles sur la page (Google Structured Data Guidelines).
  // Les champs pro.rating / pro.reviewCount restent disponibles dans la signature pour
  // compat avec les appelants existants, mais ne sont plus emis dans le schema.

  return schema;
}

export function howToJsonLd(
  name: string,
  description: string,
  steps: string[],
  totalTime?: string
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Étape ${i + 1}`,
      text: s,
    })),
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  return schema;
}

/**
 * Schema Service + EmergencyService pour les pages /urgence/[service]/[ville].
 * Signale a Google un service d'urgence 24/7 avec zone desservie, telephone et horaires.
 * A inclure en plus de FAQPage + BreadcrumbList + HowTo sur les pages urgence.
 */
export function urgenceServiceJsonLd(
  serviceName: string,
  cityName: string,
  serviceSlug: string,
  citySlug: string,
  priceFrom?: number
): Record<string, unknown> {
  const url = `https://allo-maison.ma/urgence/${serviceSlug}/${citySlug}`;
  const metier = URGENCE_METIER_BY_SLUG[serviceSlug] ?? serviceName;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Service", "EmergencyService"],
    "@id": `${url}#service`,
    name: `${metier} d'urgence à ${cityName}`,
    serviceType: `${metier} urgence 24/7`,
    url,
    provider: {
      "@id": "https://allo-maison.ma/#organization",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      addressCountry: "MA",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: "+212661409190",
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  if (typeof priceFrom === "number") {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: priceFrom,
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
}

export function reviewJsonLd(review: {
  author: string;
  rating: number;
  text: string;
  datePublished: string;
  itemReviewedName: string;
  itemReviewedType?: "Service" | "ProfessionalService" | "LocalBusiness";
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.text,
    datePublished: review.datePublished,
    itemReviewed: {
      "@type": review.itemReviewedType || "Service",
      name: review.itemReviewedName,
    },
  };
}
