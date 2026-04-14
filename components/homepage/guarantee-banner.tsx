import Image from "next/image";
import Link from "next/link";

export default function GuaranteeBanner() {
  return (
    <section className="bg-zellige py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Shield (V1) as the main visual */}
          <div className="shrink-0 w-48 lg:w-56">
            <Image
              src="/brand/logo-shield-dark.svg"
              alt="Garantie Allo Maison — artisans vérifiés et certifiés"
              width={320}
              height={400}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <p className="text-saffron text-xs font-semibold tracking-[0.22em] uppercase mb-3">
              Garantie Allo Maison
            </p>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-[550] text-cream mb-4 tracking-tight leading-[1.05]">
              Pas satisfait ?<br />
              <em className="italic text-saffron">On règle le problème.</em>
            </h3>
            <p className="text-cream/75 text-base leading-relaxed max-w-xl mb-6">
              Chaque artisan passe par notre process de <span className="font-semibold text-cream">certification en 7 étapes</span>. Si quelque chose ne va pas, un autre pro intervient à nos frais — zéro risque pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/garantie"
                className="inline-block bg-saffron text-ink font-bold px-6 py-3 rounded-lg hover:bg-[#E0B55C] transition-colors text-sm"
              >
                Voir la garantie complète →
              </Link>
              <Link
                href="/comment-ca-marche"
                className="inline-block border border-white/20 text-cream font-semibold px-6 py-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
              >
                Comment ça marche
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
