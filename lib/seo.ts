import type { Metadata } from "next";
import { SERVICES } from "@/lib/data/services";

export function generateServiceCityMetadata(
  serviceName: string,
  serviceSlug: string,
  cityName: string,
  citySlug: string,
  priceMin: number
): Metadata {
  const title = `${serviceName} a ${cityName} | Pros verifies | Allo-Maison`;
  const description = `Trouvez un ${serviceName.toLowerCase()} verifie a ${cityName} a partir de ${priceMin} DH. Pros verifies et encadres. Disponible 7j/7. Devis gratuit via WhatsApp.`;
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

export function generateUrgenceMetadata(
  serviceName: string,
  cityName: string,
  serviceSlug: string,
  citySlug: string
): Metadata {
  const title = `${serviceName} Urgence ${cityName} | Intervention 30 min | Allo-Maison`;
  const description = `Besoin d'un ${serviceName.toLowerCase()} en urgence a ${cityName} ? Intervention en moins de 30 minutes. Professionnels verifies disponibles 24h/24 et 7j/7.`;
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
      "La plateforme marocaine de confiance pour tous vos services a domicile. Des professionnels verifies, disponibles 7j/7.",
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
  rating: number,
  reviewCount: number,
  serviceSlug?: string,
  citySlug?: string
): Record<string, unknown> {
  // AggregateRating a recalculer depuis vrais Reviews quand stockage avis pret
  const url =
    serviceSlug && citySlug
      ? `https://allo-maison.ma/${serviceSlug}-${citySlug}`
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} a ${cityName}`,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: Math.min(50, reviewCount),
      bestRating: 5,
      worstRating: 1,
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

  if (typeof pro.rating === "number") {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: pro.rating,
      reviewCount: Math.min(50, pro.reviewCount || 1),
      bestRating: 5,
      worstRating: 1,
    };
  }

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
