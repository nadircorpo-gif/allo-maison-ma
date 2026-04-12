import Link from "next/link";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";

const FOOTER_SERVICES = SERVICES.slice(0, 6);
const FOOTER_CITIES = CITIES;

const ABOUT_LINKS = [
  { href: "/a-propos", label: "A propos" },
  { href: "/comment-ca-marche", label: "Comment ca marche" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/confidentialite", label: "Confidentialite" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-btn bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-base leading-none">A</span>
              </div>
              <span className="text-base font-bold">
                <span className="text-primary-light">allo-maison</span>
                <span className="text-amber">.ma</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              La plateforme marocaine de confiance pour tous vos services a domicile. Des professionnels verifies, disponibles 7j/7.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}-casablanca`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Villes
            </h3>
            <ul className="space-y-2">
              {FOOTER_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/plombier-${city.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* A propos */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              A propos
            </h3>
            <ul className="space-y-2">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-gray-500">
            &copy; 2017-2026 allo-maison.ma. Tous droits reserves
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-white/5 border border-white/10 text-xs text-gray-400">
              <span>🇲🇦</span> Made in Morocco
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-white/5 border border-white/10 text-xs text-gray-400">
              <span>🔒</span> SSL Securise
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
