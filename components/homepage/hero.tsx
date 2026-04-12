import { CheckCircle, Star, Lock } from "lucide-react";
import SearchBar from "@/components/shared/search-bar";

export default function Hero() {
  return (
    <section className="bg-white py-14 pb-8">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Trust badge pill */}
        <div className="inline-flex items-center gap-2 bg-trust-light border border-trust-border text-trust-text text-xs font-medium px-4 py-2 rounded-badge mb-6">
          <span className="w-2 h-2 rounded-full bg-trust animate-pulse flex-shrink-0" />
          Depuis 2017, chaque pro est verifie et encadre par notre equipe
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-ink leading-tight mb-4">
          Confiez votre maison a des Pros{" "}
          <span className="text-primary">Certifies</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
          Plombier, electricien, femme de menage : trouvez le bon pro en quelques clics et payez uniquement apres satisfaction.
        </p>

        {/* Search bar */}
        <SearchBar className="max-w-xl mx-auto mb-8" />

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-ink font-medium">
            <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
            500+ artisans depuis 2017
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2 text-ink font-medium">
            <Star className="w-5 h-5 text-primary fill-primary flex-shrink-0" />
            4.8/5 satisfaction client
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2 text-ink font-medium">
            <Lock className="w-5 h-5 text-trust flex-shrink-0" />
            Garantie jusqu&apos;a 2000 DH
          </div>
        </div>
      </div>
    </section>
  );
}
