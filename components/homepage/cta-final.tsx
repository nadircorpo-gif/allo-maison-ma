import Link from "next/link";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CtaFinal() {
  const whatsappUrl = buildWhatsAppUrl("Bonjour, je souhaite trouver un professionnel verifie via Allo-Maison.");

  return (
    <section className="py-20" style={{ backgroundColor: "#0F172A" }}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Votre prochain pro est a quelques clics
        </h2>
        <p className="text-white/60 text-lg mb-8">
          Decrivez votre besoin, comparez les profils verifies, et reservez en toute securite.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-deep text-white font-semibold rounded-btn transition-colors text-base"
          >
            Trouver mon pro
          </Link>
          <WhatsAppButton url={whatsappUrl} label="WhatsApp" size="lg" />
        </div>
      </div>
    </section>
  );
}
