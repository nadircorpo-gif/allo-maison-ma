import JsonLd from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { getArtisanCount } from "@/lib/data/professionals";

import Hero from "@/components/homepage/hero";
import Categories from "@/components/homepage/categories";
import HowItWorks from "@/components/homepage/how-it-works";
import TrustSection from "@/components/homepage/trust-section";
import GuaranteeBanner from "@/components/homepage/guarantee-banner";
import ServicesGrid from "@/components/homepage/services-grid";
import CitiesGrid from "@/components/homepage/cities-grid";
import Testimonials from "@/components/homepage/testimonials";
import CtaFinal from "@/components/homepage/cta-final";

export const revalidate = 3600; // ISR: revalidate count every hour

export default async function HomePage() {
  const totalArtisans = await getArtisanCount();

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Hero totalArtisans={totalArtisans} />
      <Categories />
      <HowItWorks />
      <TrustSection />
      <GuaranteeBanner />
      <ServicesGrid />
      <CitiesGrid />
      <Testimonials />
      <CtaFinal />
    </>
  );
}
