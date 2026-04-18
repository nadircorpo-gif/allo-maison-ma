import Image from "next/image";
import Link from "next/link";
import { SERVICES, URGENCE_SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";

const FOOTER_SERVICES = SERVICES.slice(0, 6);
const FOOTER_CITIES = CITIES;

const ABOUT_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/garantie", label: "Garantie" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/espace-pro", label: "Espace Pro" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand + ribbon badge */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Allo Maison — Artisans vérifiés et certifiés depuis 2017" className="block mb-5">
              <Image
                src="/brand/logo-ribbon.svg"
                alt="Allo Maison — Artisans vérifiés et certifiés depuis 2017"
                width={560}
                height={220}
                className="w-full max-w-sm h-auto"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              La plateforme marocaine de confiance pour tous vos services à domicile. Artisans vérifiés, encadrés, garantis.
            </p>
          </div>

          {/* Services à Casablanca */}
          <div>
            <h3 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-4">Services à Casablanca</h3>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}-casablanca`}
                    className="text-sm text-white/65 hover:text-cream transition-colors"
                  >
                    {service.name} à Casablanca
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plombiers par ville */}
          <div>
            <h3 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-4">Plombiers par ville</h3>
            <ul className="space-y-2.5">
              {FOOTER_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/plombier-${city.slug}`}
                    className="text-sm text-white/65 hover:text-cream transition-colors"
                  >
                    Plombier à {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Urgence 24/7 */}
          <div>
            <h3 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-4">Urgence 24/7</h3>
            <ul className="space-y-2.5">
              {FOOTER_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/urgence/plombier/${city.slug}`}
                    className="text-sm text-white/65 hover:text-cream transition-colors"
                  >
                    SOS Plombier {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-4">À propos</h3>
            <ul className="space-y-2.5">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MEGA-MENU — every service × every city, SSR, crawlable */}
        {/* ======================================================= */}
        <nav
          aria-label="Plan du site — services par ville"
          className="border-t border-white/10 mt-12 pt-10"
        >
          <details className="group" open>
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-1">
                  Plan du site
                </h2>
                <p className="text-lg sm:text-xl font-fraunces text-cream">
                  Tous nos services à domicile dans chaque ville du Maroc
                </p>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 group-open:rotate-180 transition-transform"
              >
                ▾
              </span>
            </summary>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
              {CITIES.map((city) => (
                <div key={city.slug} className="min-w-0">
                  <h3 className="text-[10px] font-semibold text-saffron uppercase tracking-[0.18em] mb-3">
                    <Link
                      href={`/villes/${city.slug}`}
                      className="hover:text-cream transition-colors"
                    >
                      {city.name}
                    </Link>
                  </h3>
                  <ul className="space-y-1.5">
                    {SERVICES.map((service) => (
                      <li key={`${city.slug}-${service.slug}`}>
                        <Link
                          href={`/${service.slug}-${city.slug}`}
                          className="block text-[12px] leading-snug text-white/55 hover:text-cream transition-colors"
                        >
                          {service.name} {city.name}
                        </Link>
                      </li>
                    ))}
                    {URGENCE_SERVICES.map((service) => (
                      <li key={`urgence-${city.slug}-${service.slug}`}>
                        <Link
                          href={`/urgence/${service.slug}/${city.slug}`}
                          className="block text-[12px] leading-snug text-saffron/80 hover:text-saffron transition-colors"
                        >
                          Urgence {service.name} {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Hubs globaux : /services, /villes, /urgence/[service] */}
            <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="text-[10px] font-semibold text-saffron uppercase tracking-[0.18em] mb-3">
                  Pages services
                </h3>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/services" className="text-[12px] text-white/55 hover:text-cream transition-colors">
                      Tous les services
                    </Link>
                  </li>
                  <li>
                    <Link href="/villes" className="text-[12px] text-white/55 hover:text-cream transition-colors">
                      Toutes les villes
                    </Link>
                  </li>
                  <li>
                    <Link href="/urgence" className="text-[12px] text-white/55 hover:text-cream transition-colors">
                      Dépannage urgence 24/7
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-semibold text-saffron uppercase tracking-[0.18em] mb-3">
                  Hubs urgence
                </h3>
                <ul className="space-y-1.5">
                  {URGENCE_SERVICES.map((service) => (
                    <li key={`hub-${service.slug}`}>
                      <Link
                        href={`/urgence/${service.slug}`}
                        className="text-[12px] text-white/55 hover:text-cream transition-colors"
                      >
                        Urgence {service.name} — toutes villes
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-semibold text-saffron uppercase tracking-[0.18em] mb-3">
                  Informations
                </h3>
                <ul className="space-y-1.5">
                  {ABOUT_LINKS.map((link) => (
                    <li key={`mega-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-[12px] text-white/55 hover:text-cream transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </nav>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2017—2026 allo-maison.ma · Tous droits réservés
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
              <span>🇲🇦</span> Made in Morocco
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
              🔒 SSL Sécurisé
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
