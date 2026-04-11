import Link from "next/link";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/comment-ca-marche", label: "Comment ca marche" },
  { href: "/tarifs", label: "Tarifs" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-btn bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-base leading-none">A</span>
            </div>
            <span className="text-base font-bold">
              <span className="text-primary">allo-maison</span>
              <span className="text-amber">.ma</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              type="button"
              className="hidden md:inline-flex text-sm font-medium text-muted hover:text-ink transition-colors"
              aria-label="Changer de langue"
            >
              FR | AR
            </button>

            {/* CTA */}
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-btn hover:bg-primary-deep transition-colors"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
