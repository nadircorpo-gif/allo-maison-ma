import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité | allo-maison.ma",
  description:
    "Politique de confidentialité d'Allo-Maison. Collecte de données, utilisation, cookies, droits des utilisateurs. Conformité loi 09-08 marocaine.",
  alternates: { canonical: "https://allo-maison.ma/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité | allo-maison.ma",
    description: "Politique de confidentialité d'Allo-Maison.",
    url: "https://allo-maison.ma/confidentialite",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function ConfidentialitePage() {
  const breadcrumbItems = [
    { name: "Confidentialité", url: "https://allo-maison.ma/confidentialite" },
  ];

  return (
    <>
      <section className="bg-cream border-b border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <Breadcrumb items={breadcrumbItems} className="mb-6 text-[11px]" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-paper-border" />
            <span className="eyebrow text-[10px]">Politique de confidentialité · Avril 2026</span>
          </div>
          <h1 className="font-display text-[40px] sm:text-5xl font-[550] leading-[0.96] tracking-[-0.025em] text-ink mb-4" style={{ textWrap: "balance" }}>
            Vos données, <em className="italic text-terracotta">vos droits.</em>
          </h1>
          <p className="text-sm text-muted max-w-xl">
            Conformité à la loi marocaine 09-08 relative à la protection des personnes physiques à l&apos;égard des traitements de données à caractère personnel.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="prose prose-sm text-muted max-w-none space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-[550] [&_h2]:text-ink [&_h2]:mb-3 [&_h2]:tracking-tight [&_strong]:text-ink">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Allo-Maison (&quot;nous&quot;, &quot;notre&quot;) s&apos;engage à protéger votre vie privée
              conformément à la loi marocaine n° 09-08 relative à la protection des personnes
              physiques à l&apos;égard des traitements de données à caractère personnel.
            </p>
            <p>
              Cette politique de confidentialité explique comment nous collectons, utilisons
              et protégeons vos données lorsque vous utilisez notre site allo-maison.ma.
            </p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Nous collectons les catégories de données suivantes :</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-ink">Données de contact :</strong> nom, numéro de
                téléphone, email lorsque vous soumettez une demande via notre formulaire
                ou WhatsApp.
              </li>
              <li>
                <strong className="text-ink">Données de navigation :</strong> adresse IP,
                type de navigateur, pages visitées, via Google Analytics (données
                anonymisées).
              </li>
              <li>
                <strong className="text-ink">Données de service :</strong> type de service
                demandé, ville, description du besoin, pour vous mettre en relation avec
                un artisan.
              </li>
              <li>
                <strong className="text-ink">Cookies :</strong> voir la section Cookies
                ci-dessous.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Utilisation des données</h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Vous mettre en relation avec un artisan vérifié</li>
              <li>Traiter vos demandes et réclamations</li>
              <li>Améliorer notre plateforme (via données anonymisées)</li>
              <li>Vous envoyer des communications si vous y avez consenti</li>
              <li>Respecter nos obligations légales</li>
            </ul>
            <p className="mt-3">
              Nous ne vendons pas et ne partageons pas vos données personnelles avec des
              tiers à des fins commerciales. Vos données sont partagées uniquement avec
              les artisans concernés pour réaliser votre demande.
            </p>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>Nous utilisons les types de cookies suivants :</p>
            <div className="mt-3 space-y-3">
              <div className="bg-cream border border-paper-border rounded-lg p-3">
                <strong className="text-ink">Cookies essentiels :</strong>{" "}
                Indispensables au fonctionnement du site. Ne peuvent pas être refusés.
              </div>
              <div className="bg-cream border border-paper-border rounded-lg p-3">
                <strong className="text-ink">Cookies analytiques (Google Analytics) :</strong>{" "}
                Collectent des données anonymes sur la navigation pour améliorer
                l&apos;expérience utilisateur. Peuvent être refusés.
              </div>
            </div>
            <p className="mt-3">
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2>5. Conservation des données</h2>
            <p>
              Vos données personnelles sont conservées pendant la durée nécessaire
              à la réalisation des finalités pour lesquelles elles ont été collectées :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Données de contact : 3 ans après votre dernière interaction</li>
              <li>Données de navigation : 26 mois (conformément aux recommandations CNDP)</li>
              <li>Données de facturation : 10 ans (obligation légale)</li>
            </ul>
          </section>

          <section>
            <h2>6. Vos droits (Loi 09-08)</h2>
            <p>
              Conformément à la loi marocaine 09-08, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-ink">Droit d&apos;accès :</strong> obtenir une copie
                de vos données personnelles que nous détenons.
              </li>
              <li>
                <strong className="text-ink">Droit de rectification :</strong> corriger
                des données inexactes ou incomplètes.
              </li>
              <li>
                <strong className="text-ink">Droit d&apos;opposition :</strong> vous opposer
                au traitement de vos données pour des raisons légitimes.
              </li>
              <li>
                <strong className="text-ink">Droit de suppression :</strong> demander la
                suppression de vos données dans certains cas.
              </li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:contact@allo-maison.ma" className="text-terracotta hover:underline">
                contact@allo-maison.ma
              </a>{" "}
              avec la mention &quot;Droits CNDP&quot; dans l&apos;objet.
            </p>
          </section>

          <section>
            <h2>7. Sécurité des données</h2>
            <p>
              Nous mettons en place des mesures techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non autorisé,
              toute divulgation ou destruction. Notre site est protégé par un certificat
              SSL (HTTPS).
            </p>
          </section>

          <section>
            <h2>8. Contact et réclamations</h2>
            <p>
              Pour toute question relative à cette politique ou pour exercer vos droits :
            </p>
            <div className="mt-3 bg-cream border border-paper-border rounded-lg p-4 space-y-2">
              <div>
                <strong className="text-ink">Email :</strong>{" "}
                <a href="mailto:contact@allo-maison.ma" className="text-terracotta hover:underline">
                  contact@allo-maison.ma
                </a>
              </div>
              <div>
                <strong className="text-ink">Adresse :</strong> 98 Rue Abou Ishak Al Marouni,
                Maarif, Casablanca 20100, Maroc
              </div>
            </div>
            <p className="mt-3">
              Vous avez également le droit de déposer une plainte auprès de la Commission
              Nationale de Contrôle de la Protection des Données à Caractère Personnel
              (CNDP) : www.cndp.ma
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
