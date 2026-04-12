import { Shield } from "lucide-react";
import Link from "next/link";

export default function GuaranteeBanner() {
  return (
    <section
      className="py-12"
      style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Shield icon */}
          <div
            className="w-18 h-18 rounded-card flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", width: 72, height: 72 }}
          >
            <Shield className="w-9 h-9 text-white" />
          </div>

          {/* Text block */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-2">
              Pas satisfait ? On regle le probleme.
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Si le travail ne correspond pas a ce qui etait convenu : remboursement jusqu&apos;a 2000 DH ou un autre pro intervient a nos frais. Zero risque pour vous.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="#comment-ca-marche"
            className="flex-shrink-0 inline-block bg-white text-primary font-semibold px-6 py-3 rounded-btn hover:bg-gray-50 transition-colors text-sm"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
}
