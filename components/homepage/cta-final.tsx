import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CtaFinal() {
  const whatsappUrl = buildWhatsAppUrl(
    "Bonjour, je souhaite trouver un professionnel verifie via Allo-Maison."
  );

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Image
          src="/brand/logo-mark.svg"
          alt="Allo Maison"
          width={320}
          height={400}
          className="w-16 h-20 mx-auto mb-6"
        />
        <h2 className="font-display text-5xl sm:text-6xl font-[550] tracking-[-0.03em] leading-[0.95] text-ink mb-6">
          Votre maison mérite<br />
          <em className="italic text-terracotta">un vrai pro.</em>
        </h2>
        <p className="text-lg text-muted mb-8 max-w-lg mx-auto">
          Intervention en 24h, pros vérifiés et certifiés, paiement après satisfaction. Sans bullshit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#"
            className="inline-flex items-center justify-center px-8 py-4 bg-terracotta hover:bg-primary-deep text-white font-semibold rounded-lg shadow-terracotta transition-colors"
          >
            Décrire mon besoin
          </Link>
          <WhatsAppButton url={whatsappUrl} label="WhatsApp" size="lg" />
        </div>
      </div>
    </section>
  );
}
