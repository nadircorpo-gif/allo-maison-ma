import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";

const FOOTER_SERVICES = SERVICES.slice(0, 6);
const FOOTER_CITIES = CITIES;

const ABOUT_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-4">Services</h3>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}-casablanca`}
                    className="text-sm text-white/65 hover:text-cream transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h3 className="text-[11px] font-semibold text-saffron uppercase tracking-[0.18em] mb-4">Villes</h3>
            <ul className="space-y-2.5">
              {FOOTER_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/plombier-${city.slug}`}
                    className="text-sm text-white/65 hover:text-cream transition-colors"
                  >
                    {city.name}
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
