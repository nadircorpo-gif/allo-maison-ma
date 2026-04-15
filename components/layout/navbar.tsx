"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, ShieldCheck, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/garantie", label: "Garantie" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
];

const WHATSAPP_NUMBER = "+212 661 40 91 90";
const WHATSAPP_HREF = "https://wa.me/212661409190";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ========= Top strip — trust + phone ========= */}
      <div className="hidden md:block bg-zellige text-cream text-[11px] font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4 tab-nums">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-saffron font-semibold tracking-wider uppercase text-[10px]">En ligne</span>
            </span>
            <span className="text-white/25">·</span>
            <span>Depuis 2017</span>
            <span className="text-white/25">·</span>
            <span>1 017 artisans vérifiés</span>
            <span className="text-white/25">·</span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-saffron" />
              Professionnels vérifiés et certifiés
            </span>
          </div>
          <a
            href={WHATSAPP_HREF}
            className="inline-flex items-center gap-1.5 font-semibold tab-nums hover:text-saffron transition-colors"
          >
            <Phone className="w-3 h-3" />
            {WHATSAPP_NUMBER}
          </a>
        </div>
      </div>

      {/* ========= Main nav ========= */}
      <div className="bg-cream/90 backdrop-blur-md border-b border-paper-border shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo lockup */}
            <Link
              href="/"
              className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:ring-offset-2 focus:ring-offset-cream rounded-md"
              aria-label="Allo Maison — retour à l'accueil"
            >
              <Image
                src="/brand/logo-lockup.svg"
                alt="Allo Maison — Depuis 2017, vérifié et certifié"
                width={440}
                height={100}
                priority
                className="h-11 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[13px] font-semibold text-ink hover:text-terracotta transition-colors py-6 group"
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 right-0 bottom-4 h-[2px] bg-terracotta transition-all duration-300 origin-left ${
                        active
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone icon — mobile only */}
              <a
                href={WHATSAPP_HREF}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zellige text-cream hover:bg-[#163f4d] transition-colors"
                aria-label="Appeler Allo Maison"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* FR · AR language */}
              <button
                type="button"
                className="hidden lg:inline-flex items-center text-[11px] font-bold tracking-[0.18em] text-muted hover:text-ink transition-colors uppercase"
                aria-label="Changer de langue"
              >
                FR <span className="text-paper-border mx-1">·</span> AR
              </button>

              {/* Espace Pro — ghost */}
              <Link
                href="/espace-pro"
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-[13px] font-semibold text-ink border border-paper-border hover:border-ink rounded-lg transition-colors"
              >
                Espace Pro
              </Link>

              {/* Primary CTA */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[13px] font-bold text-white bg-terracotta hover:bg-primary-deep rounded-lg shadow-terracotta transition-all active:scale-[0.98]"
              >
                Demander un devis
                <span aria-hidden>→</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-paper-border text-ink hover:bg-white/60 transition-colors"
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ========= Mobile drawer ========= */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-paper-border bg-cream">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-3.5 border-b border-paper-border font-display text-xl font-[500] transition-colors ${
                      active ? "text-terracotta" : "text-ink hover:text-terracotta"
                    }`}
                  >
                    {link.label}
                    <span className="font-display italic text-muted">→</span>
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-5">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-terracotta text-white font-bold py-3 rounded-lg text-center text-sm shadow-terracotta"
                >
                  Demander un devis →
                </Link>
                <Link
                  href="/espace-pro"
                  onClick={() => setMobileOpen(false)}
                  className="border border-ink text-ink font-semibold py-3 rounded-lg text-center text-sm"
                >
                  Espace Pro
                </Link>
              </div>
              <div className="mt-6 pt-5 border-t border-paper-border flex items-center justify-between text-xs text-muted">
                <span className="tab-nums">1 017 artisans vérifiés</span>
                <a href={WHATSAPP_HREF} className="inline-flex items-center gap-1.5 font-semibold text-zellige tab-nums">
                  <Phone className="w-3 h-3" />
                  {WHATSAPP_NUMBER}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
