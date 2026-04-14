export type RichSection = {
  title: string;
  content: string; // HTML string with paragraphs, lists, etc.
};

export type PriceTableRow = {
  intervention: string;
  prixMin: number;
  prixMoyen: number;
  prixMax: number;
};

export type ExternalLink = {
  label: string;
  url: string;
  description: string;
};

export type RichTestimonial = {
  name: string;
  quarter: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  service: string;
};

export type RichFAQ = {
  question: string;
  answer: string;
};

export type RichPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroText: string; // intro paragraph, 2-3 sentences, human tone
  sections: RichSection[];
  priceTable: PriceTableRow[];
  youtubeVideoId?: string | null;
  youtubeVideoTitle?: string | null;
  externalLinks: ExternalLink[];
  testimonials: RichTestimonial[];
  faqs: RichFAQ[];
  tips: string[]; // expert tips, 5-8 items
  localKnowledge: string; // HTML paragraph about quartiers, specificites locales
  lastUpdated: string; // "Avril 2026"
};

export function getRichContent(slug: string): RichPageContent | null {
  try {
    // Dynamic import would be ideal but for static builds we use a registry
    const content = RICH_CONTENT_REGISTRY[slug];
    return content || null;
  } catch {
    return null;
  }
}

// Registry populated by individual content files
export const RICH_CONTENT_REGISTRY: Record<string, RichPageContent> = {};

export function registerRichContent(content: RichPageContent) {
  RICH_CONTENT_REGISTRY[content.slug] = content;
}
