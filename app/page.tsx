import JsonLd from "@/components/seo/json-ld";
import { organizationJsonLd } from "@/lib/seo";

import Hero from "@/components/homepage/hero";
import Categories from "@/components/homepage/categories";
import HowItWorks from "@/components/homepage/how-it-works";
import TrustSection from "@/components/homepage/trust-section";
import GuaranteeBanner from "@/components/homepage/guarantee-banner";
import ServicesGrid from "@/components/homepage/services-grid";
import CitiesGrid from "@/components/homepage/cities-grid";
import Testimonials from "@/components/homepage/testimonials";
import CtaFinal from "@/components/homepage/cta-final";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
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
