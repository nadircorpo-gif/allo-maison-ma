import Link from "next/link";
import SearchBar from "@/components/shared/search-bar";

export default function NotFound() {
  return (
    <div className="px-6 py-20 text-center max-w-xl mx-auto">
      <h1 className="text-ink mb-4">Page introuvable</h1>
      <p className="text-muted text-lg mb-8">
        Cette page n&apos;existe pas ou a ete deplacee. Cherchez un service ci-dessous.
      </p>
      <SearchBar />
      <Link href="/" className="inline-block mt-6 text-primary font-semibold hover:underline">
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
