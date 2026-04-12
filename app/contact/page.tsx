import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import ContactForm from "@/components/shared/contact-form";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contactez Allo-Maison | WhatsApp, Email, Telephone",
  description:
    "Contactez Allo-Maison via WhatsApp, email ou telephone. Lun-Sam 8h30-17h00. Adresse : 98 Rue Abou Ishak Al Marouni, Maarif, Casablanca.",
  alternates: { canonical: "https://allo-maison.ma/contact" },
  openGraph: {
    title: "Contactez Allo-Maison | WhatsApp, Email, Telephone",
    description:
      "Contactez Allo-Maison via WhatsApp, email ou telephone. Equipe disponible Lun-Sam 8h30-17h00.",
    url: "https://allo-maison.ma/contact",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Allo-Maison",
  url: "https://allo-maison.ma",
  logo: "https://allo-maison.ma/logo.png",
  description:
    "La plateforme marocaine de confiance pour tous vos services a domicile. Des professionnels verifies, disponibles 7j/7.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "98 Rue Abou Ishak Al Marouni",
    addressLocality: "Casablanca",
    addressRegion: "Grand Casablanca",
    postalCode: "20100",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.5731,
    longitude: -7.5898,
  },
  telephone: "+212600000000",
  email: "contact@allo-maison.ma",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
  sameAs: [],
};

const FAQ_ITEMS = [
  {
    question: "Quel est le meilleur moyen de contacter Allo-Maison ?",
    answer:
      "Le moyen le plus rapide est WhatsApp. Vous recevez une reponse en moins de 5 minutes pendant nos heures d'ouverture (Lun-Sam 8h30-17h00). Pour les urgences en dehors de ces horaires, envoyez un message WhatsApp et nous revenons vers vous des l'ouverture.",
  },
  {
    question: "Puis-je appeler directement pour une urgence ?",
    answer:
      "Oui, notre ligne WhatsApp est aussi disponible pour les appels. Pour les urgences plomberie, electricite ou serrurerie, envoyez un message avec 'URGENCE' et votre ville et nous vous mettons en relation immediatement.",
  },
  {
    question: "Combien de temps pour recevoir une reponse par email ?",
    answer:
      "Les emails sont traites dans les 24 heures ouvrables. Pour les demandes urgentes, preferez WhatsApp pour une reponse immediate.",
  },
];

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Contact", url: "https://allo-maison.ma/contact" },
  ];

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}?text=${encodeURIComponent("Bonjour, je souhaite contacter Allo-Maison.")}`;

  return (
    <>
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-ink mb-4">Contactez Allo-Maison</h1>
          <p className="text-lg text-muted max-w-2xl">
            Notre equipe est disponible du lundi au samedi de 8h30 a 17h00.
            Pour les urgences, WhatsApp est le moyen le plus rapide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            {/* WhatsApp - primary CTA */}
            <div className="bg-gradient-to-r from-whatsapp to-green-500 rounded-card p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-7 h-7" />
                <h2 className="text-xl font-bold">WhatsApp (recommande)</h2>
              </div>
              <p className="text-white/90 mb-4 text-sm">
                Reponse en moins de 5 minutes. Le moyen le plus rapide pour parler
                a notre equipe ou trouver un artisan.
              </p>
              <WhatsAppButton
                url={whatsappUrl}
                label="Ouvrir WhatsApp"
                size="lg"
                className="bg-white text-whatsapp hover:bg-gray-100"
              />
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-ink mb-0.5">Email</div>
                  <a
                    href="mailto:contact@allo-maison.ma"
                    className="text-sm text-primary hover:underline"
                  >
                    contact@allo-maison.ma
                  </a>
                  <p className="text-xs text-muted mt-0.5">Reponse sous 24h ouvrables</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-ink mb-0.5">Telephone / WhatsApp</div>
                  <a
                    href="tel:+212600000000"
                    className="text-sm text-primary hover:underline"
                  >
                    +212 6 00 00 00 00
                  </a>
                  <p className="text-xs text-muted mt-0.5">Lun-Sam 8h30-17h00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-ink mb-0.5">Adresse</div>
                  <address className="text-sm text-muted not-italic leading-relaxed">
                    98 Rue Abou Ishak Al Marouni<br />
                    Maarif, Casablanca 20100<br />
                    Maroc
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-ink mb-0.5">Horaires</div>
                  <div className="text-sm text-muted space-y-0.5">
                    <div>Lundi – Samedi : 8h30 – 17h00</div>
                    <div>Dimanche : Ferme</div>
                    <div className="text-xs text-trust mt-1">
                      ● WhatsApp disponible pour les urgences 7j/7
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini FAQ */}
            <div>
              <h2 className="text-lg font-bold text-ink mb-3">Questions frequentes</h2>
              <div className="space-y-2">
                {FAQ_ITEMS.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-white border border-gray-200 rounded-card overflow-hidden group"
                  >
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-medium text-ink text-sm list-none hover:bg-surface transition-colors">
                      {faq.question}
                      <span className="text-muted ml-3 flex-shrink-0 text-base leading-none group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <div className="px-4 pb-3 text-muted text-sm leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-ink mb-1">Envoyer un message</h2>
              <p className="text-muted text-sm mb-5">
                Remplissez le formulaire et nous vous repondrons via WhatsApp.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
