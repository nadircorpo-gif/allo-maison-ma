import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumb from "@/components/shared/breadcrumb";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mentions légales | Allo-Maison",
  description:
    "Mentions légales d'Allo-Maison : raison sociale, siège, immatriculations, hébergement, contact DPO. Conformité loi 09-08.",
  alternates: { canonical: "https://allo-maison.ma/mentions-legales" },
  openGraph: {
    title: "Mentions légales | Allo-Maison",
    description: "Mentions légales officielles d'Allo-Maison.",
    url: "https://allo-maison.ma/mentions-legales",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  const breadcrumbItems = [
    { name: "Mentions légales", url: "https://allo-maison.ma/mentions-legales" },
  ];

  return (
    <>
      {/* TODO remplir avec données réelles (ICE, RC, IF, CNSS, capital, adresse exacte) */}
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-paper-border" />
            <span className="eyebrow text-[10px]">Mentions légales · Avril 2026</span>
          </div>
          <h1
            className="font-display text-[40px] sm:text-5xl font-[550] leading-[0.96] tracking-[-0.025em] text-ink mb-4"
            style={{ textWrap: "balance" }}
          >
            Informations <em className="italic text-terracotta">légales.</em>
          </h1>
          <p className="text-sm text-muted max-w-xl">
            Identité de l&apos;éditeur, hébergement, contact DPO. Conformément à la loi marocaine
            09-08 et aux usages du web.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="prose prose-sm text-muted max-w-none space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-[550] [&_h2]:text-ink [&_h2]:mb-3 [&_h2]:tracking-tight [&_strong]:text-ink">
          <section>
            <h2>1. Éditeur du site</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Raison sociale :</strong> Allo-Maison SARL (à confirmer)
              </li>
              <li>
                <strong>Forme juridique :</strong> SARL
              </li>
              <li>
                <strong>Capital social :</strong> à compléter
              </li>
              <li>
                <strong>Siège social :</strong> Casablanca, Maroc (quartier et adresse exacte à
                compléter)
              </li>
              <li>
                <strong>Représentant légal :</strong> à compléter
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Immatriculations</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>ICE :</strong> à compléter
              </li>
              <li>
                <strong>RC (Registre du Commerce) :</strong> à compléter
              </li>
              <li>
                <strong>IF (Identifiant Fiscal) :</strong> à compléter
              </li>
              <li>
                <strong>CNSS :</strong> à compléter
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Contact</h2>
            <div className="mt-3 bg-cream border border-paper-border rounded-lg p-4 space-y-2">
              <div>
                <strong>Email :</strong>{" "}
                <a
                  href="mailto:contact@allo-maison.ma"
                  className="text-terracotta hover:underline"
                >
                  contact@allo-maison.ma
                </a>
              </div>
              <div>
                <strong>Téléphone :</strong>{" "}
                <a href="tel:+212661409190" className="text-terracotta hover:underline">
                  +212 661 40 91 90
                </a>
              </div>
              <div>
                <strong>DPO / contact RGPD :</strong>{" "}
                <a
                  href="mailto:contact@allo-maison.ma"
                  className="text-terracotta hover:underline"
                >
                  contact@allo-maison.ma
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2>4. Hébergement</h2>
            <p>
              Le site allo-maison.ma est hébergé par <strong>Netlify, Inc.</strong>, 512 2nd
              Street, Suite 200, San Francisco, CA 94107, États-Unis.
            </p>
            <p className="mt-2">
              Site web :{" "}
              <a
                href="https://www.netlify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta hover:underline"
              >
                www.netlify.com
              </a>
            </p>
          </section>

          <section>
            <h2>5. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur allo-maison.ma (textes, images, logo,
              identité visuelle, code) est la propriété exclusive d&apos;Allo-Maison ou de ses
              partenaires. Toute reproduction, représentation ou exploitation, partielle ou
              totale, sans autorisation écrite préalable est interdite.
            </p>
          </section>

          <section>
            <h2>6. Protection des données personnelles</h2>
            <p>
              Le traitement des données personnelles est détaillé dans notre{" "}
              <Link href="/confidentialite" className="text-terracotta hover:underline">
                politique de confidentialité
              </Link>
              , conforme à la loi marocaine 09-08.
            </p>
          </section>

          <section>
            <h2>7. Loi applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit marocain. En cas de
              litige, compétence est donnée aux tribunaux de Casablanca.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
