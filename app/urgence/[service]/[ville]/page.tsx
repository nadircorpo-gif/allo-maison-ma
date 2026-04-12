import { notFound } from "next/navigation";
import type { Metadata } from "next";

import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";

import { getServiceBySlug } from "@/lib/data/services";
import { getCityBySlug } from "@/lib/data/cities";
import { getUrgenceFAQ } from "@/lib/data/faq";
import { generateUrgenceMetadata, faqJsonLd } from "@/lib/seo";
import { buildUrgenceWhatsAppUrl } from "@/lib/whatsapp";
import { Phone, Shield, CheckCircle } from "lucide-react";

// --- Static params: 3 services × 6 cities = 18 pages ---
const URGENCE_SERVICE_SLUGS = ["plombier", "electricien", "serrurier"];
const CITY_SLUGS = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];

export function generateStaticParams() {
  const params: { service: string; ville: string }[] = [];
  for (const service of URGENCE_SERVICE_SLUGS) {
    for (const ville of CITY_SLUGS) {
      params.push({ service, ville });
    }
  }
  return params;
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; ville: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, ville: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return generateUrgenceMetadata(service.name, city.name, service.slug, city.slug);
}

// --- Emergency steps by service ---
const EMERGENCY_STEPS: Record<string, { icon: string; label: string }[]> = {
  plombier: [
    { icon: "1", label: "Coupez l'arrivee d'eau principale" },
    { icon: "2", label: "Coupez l'electricite dans la zone inondee" },
    { icon: "3", label: "Posez des serpillieres pour limiter les degats" },
    { icon: "4", label: "Appelez un plombier d'urgence Allo-Maison" },
  ],
  electricien: [
    { icon: "1", label: "Coupez le disjoncteur general immediatement" },
    { icon: "2", label: "Ne touchez pas les fils ou appareils sous tension" },
    { icon: "3", label: "Evacuez si vous sentez une odeur de brule" },
    { icon: "4", label: "Appelez un electricien d'urgence Allo-Maison" },
  ],
  serrurier: [
    { icon: "1", label: "Verifiez si vous avez un double de la cle" },
    { icon: "2", label: "Ne forcez pas la serrure, vous risquez de la casser" },
    { icon: "3", label: "Restez pres de la porte en attendant le pro" },
    { icon: "4", label: "Appelez un serrurier d'urgence Allo-Maison" },
  ],
};

// --- Page ---
export default async function UrgencePage({
  params,
}: {
  params: Promise<{ service: string; ville: string }>;
}) {
  const { service: serviceSlug, ville: citySlug } = await params;

  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city || !service.urgenceAvailable) notFound();

  const faqs = getUrgenceFAQ(service.name, city.name);
  const whatsappUrl = buildUrgenceWhatsAppUrl(service.name, city.name);
  const phoneHref = "tel:+212600000000";
  const steps = EMERGENCY_STEPS[serviceSlug] ?? EMERGENCY_STEPS.plombier;

  const breadcrumbItems = [
    { name: "Urgence", url: "https://allo-maison.ma/urgence" },
    { name: service.name, url: `https://allo-maison.ma/urgence/${serviceSlug}` },
    { name: city.name, url: `https://allo-maison.ma/urgence/${serviceSlug}/${citySlug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Sticky amber urgency banner */}
      <div className="sticky top-0 z-50 bg-amber border-b border-amber/60 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          <p className="font-bold text-ink text-sm sm:text-base flex-1 text-center sm:text-left">
            SOS {service.name} {city.name} : Intervention en 30 min
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white font-semibold rounded-btn text-sm hover:bg-ink/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              APPELER
            </a>
            <WhatsAppButton url={whatsappUrl} label="WHATSAPP" size="sm" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Page title */}
        <h1 className="text-3xl font-extrabold text-ink mb-2">
          {service.name} Urgence {city.name}
        </h1>
        <p className="text-muted text-lg mb-8">
          Intervention garantie en moins de 30 minutes. Professionnels verifies disponibles 24h/24 et 7j/7.
        </p>

        {/* Emergency steps checklist */}
        <div className="bg-amber/10 border border-amber/40 rounded-card p-6 mb-8">
          <h2 className="font-bold text-ink text-lg mb-4">
            Que faire en attendant le professionnel ?
          </h2>
          <ol className="space-y-3">
            {steps.map((step) => (
              <li key={step.icon} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">{step.icon}</span>
                </div>
                <span className="text-ink text-sm leading-relaxed font-medium">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Large CTA block */}
        <div className="bg-primary-light border border-primary/20 rounded-card p-8 text-center mb-8">
          <h2 className="text-xl font-bold text-ink mb-2">
            Besoin d&apos;un {service.name} maintenant a {city.name} ?
          </h2>
          <p className="text-muted text-sm mb-6">
            Un professionnel verifie vous rappelle en moins de 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ink text-white font-semibold rounded-btn hover:bg-ink/80 transition-colors text-base"
            >
              <Phone className="w-5 h-5" />
              Appeler maintenant
            </a>
            <WhatsAppButton url={whatsappUrl} label="WhatsApp urgence" size="lg" />
          </div>
        </div>

        {/* Dark guarantee bar */}
        <div className="bg-ink rounded-card p-5 flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-card bg-white/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Pas satisfait ? On regle le probleme.</p>
            <p className="text-white/60 text-xs mt-0.5">
              Remboursement jusqu&apos;a 2000 DH ou un autre pro intervient a nos frais.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div>
          <h2 className="text-xl font-bold text-ink mb-4">Questions frequentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-card overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-ink text-sm list-none hover:bg-surface transition-colors">
                  {faq.question}
                  <span className="text-muted ml-4 flex-shrink-0 text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-4 text-muted text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
