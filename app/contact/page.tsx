import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import ContactForm from "@/components/shared/contact-form";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contactez Allo Maison | WhatsApp, Email, Téléphone",
  description:
    "Contactez Allo Maison via WhatsApp, email ou téléphone. Lun–Sam 8 h 30 — 17 h 00. 98 Rue Abou Ishak Al Marouni, Maârif, Casablanca.",
  alternates: { canonical: "https://allo-maison.ma/contact" },
  openGraph: {
    title: "Contactez Allo Maison",
    description: "WhatsApp, email ou téléphone. Équipe disponible Lun–Sam 8 h 30 — 17 h 00.",
    url: "https://allo-maison.ma/contact",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Allo-Maison",
  url: "https://allo-maison.ma",
  logo: "https://allo-maison.ma/brand/logo-mark.svg",
  description: "Plateforme marocaine de services à domicile. Professionnels vérifiés, disponibles 7 j/7.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "98 Rue Abou Ishak Al Marouni",
    addressLocality: "Casablanca",
    addressRegion: "Grand Casablanca",
    postalCode: "20100",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 33.5731, longitude: -7.5898 },
  telephone: "+212661409190",
  email: "contact@allo-maison.ma",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
};

const FAQ_ITEMS = [
  {
    question: "Quel est le meilleur moyen de contacter Allo Maison ?",
    answer:
      "Le plus rapide est WhatsApp. Réponse sous 5 minutes pendant nos heures d'ouverture (Lun–Sam 8 h 30 — 17 h 00). Pour les urgences hors horaires, envoyez un message WhatsApp et nous revenons vers vous dès l'ouverture.",
  },
  {
    question: "Puis-je appeler directement pour une urgence ?",
    answer:
      "Oui, notre ligne WhatsApp accepte aussi les appels. Pour les urgences plomberie, électricité ou serrurerie, envoyez un message avec « URGENCE » et votre ville — nous vous mettons en relation immédiatement.",
  },
  {
    question: "Combien de temps pour recevoir une réponse par email ?",
    answer:
      "Les emails sont traités sous 24 h ouvrables. Pour les demandes urgentes, préférez WhatsApp pour une réponse immédiate.",
  },
];

export default function ContactPage() {
  const breadcrumbItems = [{ name: "Contact", url: "https://allo-maison.ma/contact" }];
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190"}?text=${encodeURIComponent("Bonjour, je souhaite contacter Allo Maison.")}`;

  return (
    <>
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />

      {/* HERO */}
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-paper-border" />
                <span className="eyebrow text-[10px]">Contact · Lun—Sam 8h30 — 17h</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] font-[550] leading-[0.96] tracking-[-0.028em] text-ink mb-5" style={{ textWrap: "balance" }}>
                On vous répond<br />
                <em className="italic text-terracotta">en moins de 5 minutes.</em>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl">
                Notre équipe humaine est disponible du lundi au samedi de 8 h 30 à 17 h. Pour les urgences, WhatsApp reste le moyen le plus rapide.
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-12 gap-10">
        {/* LEFT: contact details */}
        <div className="lg:col-span-7 space-y-6">
          {/* WhatsApp primary */}
          <div className="bg-zellige text-cream rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-saffron" />
              <p className="eyebrow" style={{ color: "#D4A24C" }}>Recommandé</p>
            </div>
            <h2 className="font-display text-2xl font-[550] mb-2">
              WhatsApp : <em className="italic text-saffron">le plus rapide.</em>
            </h2>
            <p className="text-cream/75 text-sm mb-5">
              Réponse humaine sous 5 minutes. Le moyen le plus rapide pour parler à notre équipe ou trouver un artisan.
            </p>
            <WhatsAppButton url={whatsappUrl} label="Ouvrir WhatsApp" size="lg" />
          </div>

          {/* Contact details grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-paper-border rounded-xl p-5">
              <Mail className="w-5 h-5 text-terracotta mb-3" />
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Email</p>
              <a href="mailto:contact@allo-maison.ma" className="font-display text-lg font-medium text-ink hover:text-terracotta transition-colors">
                contact@allo-maison.ma
              </a>
              <p className="text-xs text-muted mt-1">Réponse sous 24 h</p>
            </div>

            <div className="bg-white border border-paper-border rounded-xl p-5">
              <Phone className="w-5 h-5 text-terracotta mb-3" />
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Téléphone</p>
              <a href="tel:+212661409190" className="font-display text-lg font-medium text-ink hover:text-terracotta transition-colors tab-nums">
                +212 6 61 40 91 90
              </a>
              <p className="text-xs text-muted mt-1">Lun — Sam · 8 h 30 — 17 h</p>
            </div>

            <div className="bg-white border border-paper-border rounded-xl p-5">
              <MapPin className="w-5 h-5 text-terracotta mb-3" />
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Adresse</p>
              <address className="font-display text-sm text-ink not-italic leading-snug">
                98 Rue Abou Ishak Al Marouni<br />
                Maârif, Casablanca 20100
              </address>
            </div>

            <div className="bg-white border border-paper-border rounded-xl p-5">
              <Clock className="w-5 h-5 text-terracotta mb-3" />
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Horaires</p>
              <div className="text-sm text-ink leading-snug tab-nums">
                Lun — Sam<br />
                8 h 30 — 17 h 00
              </div>
              <p className="text-[11px] text-mint font-semibold mt-2">● WhatsApp urgence 7 j/7</p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <p className="eyebrow mb-2">Questions fréquentes</p>
            <h2 className="font-display text-2xl sm:text-3xl font-[550] tracking-[-0.02em] text-ink mb-5">
              Avant de nous écrire.
            </h2>
            <div className="border-t border-ink">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="border-b border-paper-border group py-5">
                  <summary className="font-display font-medium text-base text-ink cursor-pointer list-none flex justify-between items-start gap-4">
                    <span>{faq.question}</span>
                    <span className="font-display italic text-2xl text-muted group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: contact form */}
        <aside className="lg:col-span-5">
          <div className="sticky top-28 bg-white border border-paper-border rounded-2xl p-6 shadow-card-hover">
            <p className="eyebrow mb-2">Formulaire</p>
            <h2 className="font-display text-2xl font-[550] text-ink mb-1">
              Un message, <em className="italic text-terracotta">une réponse.</em>
            </h2>
            <p className="text-sm text-muted mb-5">
              Remplissez le formulaire, nous vous répondons via WhatsApp.
            </p>
            <ContactForm />
          </div>
        </aside>
      </div>
    </>
  );
}
