import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialite | allo-maison.ma",
  description:
    "Politique de confidentialite d'Allo-Maison. Collecte de donnees, utilisation, cookies, droits des utilisateurs. Conformite loi 09-08 marocaine.",
  alternates: { canonical: "https://allo-maison.ma/confidentialite" },
  openGraph: {
    title: "Politique de confidentialite | allo-maison.ma",
    description: "Politique de confidentialite d'Allo-Maison.",
    url: "https://allo-maison.ma/confidentialite",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
  },
};

export default function ConfidentialitePage() {
  const breadcrumbItems = [
    { name: "Confidentialite", url: "https://allo-maison.ma/confidentialite" },
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
              Allo-Maison (&quot;nous&quot;, &quot;notre&quot;) s&apos;engage a proteger votre vie privee
              conformement a la loi marocaine n° 09-08 relative a la protection des personnes
              physiques a l&apos;egard des traitements de donnees a caractere personnel.
            </p>
            <p>
              Cette politique de confidentialite explique comment nous collectons, utilisons
              et protecons vos donnees lorsque vous utilisez notre site allo-maison.ma.
            </p>
          </section>

          <section>
            <h2>2. Donnees collectees</h2>
            <p>Nous collectons les categories de donnees suivantes :</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-ink">Donnees de contact :</strong> nom, numero de
                telephone, email lorsque vous soumettez une demande via notre formulaire
                ou WhatsApp.
              </li>
              <li>
                <strong className="text-ink">Donnees de navigation :</strong> adresse IP,
                type de navigateur, pages visitees, via Google Analytics (donnees
                anonymisees).
              </li>
              <li>
                <strong className="text-ink">Donnees de service :</strong> type de service
                demande, ville, description du besoin, pour vous mettre en relation avec
                un artisan.
              </li>
              <li>
                <strong className="text-ink">Cookies :</strong> voir la section Cookies
                ci-dessous.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Utilisation des donnees</h2>
            <p>Vos donnees sont utilisees exclusivement pour :</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Vous mettre en relation avec un artisan verifie</li>
              <li>Traiter vos demandes et reclamations</li>
              <li>Ameliorer notre plateforme (via donnees anonymisees)</li>
              <li>Vous envoyer des communications si vous y avez consenti</li>
              <li>Respecter nos obligations legales</li>
            </ul>
            <p className="mt-3">
              Nous ne vendons pas et ne partageons pas vos donnees personnelles avec des
              tiers a des fins commerciales. Vos donnees sont partagees uniquement avec
              les artisans concernes pour realiser votre demande.
            </p>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>Nous utilisons les types de cookies suivants :</p>
            <div className="mt-3 space-y-3">
              <div className="bg-cream border border-paper-border rounded-lg p-3">
                <strong className="text-ink">Cookies essentiels :</strong>{" "}
                Indispensables au fonctionnement du site. Ne peuvent pas etre refuses.
              </div>
              <div className="bg-cream border border-paper-border rounded-lg p-3">
                <strong className="text-ink">Cookies analytiques (Google Analytics) :</strong>{" "}
                Collectent des donnees anonymes sur la navigation pour ameliorer
                l&apos;experience utilisateur. Peuvent etre refuses.
              </div>
            </div>
            <p className="mt-3">
              Vous pouvez gerer vos preferences de cookies via les parametres de votre navigateur.
            </p>
          </section>

          <section>
            <h2>5. Conservation des donnees</h2>
            <p>
              Vos donnees personnelles sont conservees pendant la duree necessaire
              a la realisation des finalites pour lesquelles elles ont ete collectees :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Donnees de contact : 3 ans apres votre derniere interaction</li>
              <li>Donnees de navigation : 26 mois (conformement aux recommandations CNDP)</li>
              <li>Donnees de facturation : 10 ans (obligation legale)</li>
            </ul>
          </section>

          <section>
            <h2>6. Vos droits (Loi 09-08)</h2>
            <p>
              Conformement a la loi marocaine 09-08, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-ink">Droit d&apos;acces :</strong> obtenir une copie
                de vos donnees personnelles que nous detenons.
              </li>
              <li>
                <strong className="text-ink">Droit de rectification :</strong> corriger
                des donnees inexactes ou incompletes.
              </li>
              <li>
                <strong className="text-ink">Droit d&apos;opposition :</strong> vous opposer
                au traitement de vos donnees pour des raisons legitimes.
              </li>
              <li>
                <strong className="text-ink">Droit de suppression :</strong> demander la
                suppression de vos donnees dans certains cas.
              </li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous a{" "}
              <a href="mailto:contact@allo-maison.ma" className="text-terracotta hover:underline">
                contact@allo-maison.ma
              </a>{" "}
              avec la mention &quot;Droits CNDP&quot; dans l&apos;objet.
            </p>
          </section>

          <section>
            <h2>7. Securite des donnees</h2>
            <p>
              Nous mettons en place des mesures techniques et organisationnelles
              appropriees pour proteger vos donnees contre tout acces non autorise,
              toute divulgation ou destruction. Notre site est protege par un certificat
              SSL (HTTPS).
            </p>
          </section>

          <section>
            <h2>8. Contact et reclamations</h2>
            <p>
              Pour toute question relative a cette politique ou pour exercer vos droits :
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
              Vous avez egalement le droit de deposer une plainte aupres de la Commission
              Nationale de Controle de la Protection des Donnees a Caractere Personnel
              (CNDP) : www.cndp.ma
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
