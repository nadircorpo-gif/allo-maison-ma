import type { Metadata } from "next";

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const url = `https://allo-maison.ma/urgence/${serviceSlug}-${citySlug}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Allo-Maison",
    url: "https://allo-maison.ma",
    logo: "https://allo-maison.ma/logo.png",
    foundingDate: "2017",
    description:
      "La plateforme marocaine de confiance pour tous vos services a domicile. Des professionnels verifies, disponibles 7j/7.",
    areaServed: "MA",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "Arabic"],
    },
  };
}

export function serviceCityJsonLd(
  serviceName: string,
  cityName: string,
  priceMin: number,
  rating: number,
  reviewCount: number
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} a ${cityName}`,
    provider: {
      "@type": "Organization",
      name: "Allo-Maison",
      url: "https://allo-maison.ma",
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
      reviewCount: reviewCount,
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
