import Image from "next/image";
import { BadgeCheck, ShieldCheck, Star } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: BadgeCheck,
    title: "Identité vérifiée",
    description: "CIN, casier judiciaire et assurance RC contrôlés avant chaque acceptation.",
  },
  {
    icon: Star,
    title: "Compétences certifiées",
    description: "Diplômes OFPPT, références clients et test pratique obligatoires.",
  },
  {
    icon: ShieldCheck,
    title: "Suivi continu",
    description: "Avis vérifiés par SMS après chaque mission. Les pros mal notés sont retirés.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Shield as primary visual (V1) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <Image
            src="/brand/logo-shield.svg"
            alt="Allo Maison — bouclier de certification depuis 2017"
            width={320}
            height={400}
            className="w-full max-w-xs h-auto drop-shadow-md"
          />
          <div className="absolute -right-2 -bottom-2 bg-cream border border-paper-border rounded-lg p-3 text-xs tab-nums w-44 shadow-card">
            <p className="text-muted">Intervention du 3 avril</p>
            <p className="font-semibold text-ink">Fuite chauffe-eau</p>
            <p className="text-mint font-semibold">✓ Résolu en 47 min</p>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">03 — Depuis 2017</p>
          <h2 className="font-display text-4xl sm:text-5xl font-[550] tracking-[-0.02em] text-ink mb-6">
            Qui entre chez vous ?<br />
            <em className="italic text-terracotta">On a vérifié.</em>
          </h2>
          <p className="text-lg text-muted mb-10 max-w-lg">
            Depuis 2017, chaque artisan passe par un process de certification complet avant d&apos;entrer sur la plateforme. Identité, compétences, assurance. Tout est contrôlé.
          </p>

          <div className="space-y-6 mb-10">
            {TRUST_POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-4">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center bg-clay shrink-0">
                    <Icon className="w-5 h-5 text-zellige" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink mb-1">{p.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-paper-border pt-8 tab-nums">
            <div>
              <p className="font-display text-4xl font-[500] text-ink">
                4.8<span className="text-lg text-muted">/5</span>
              </p>
              <p className="text-xs text-muted">12 847 avis vérifiés</p>
            </div>
            <div>
              <p className="font-display text-4xl font-[500] text-ink">
                47<span className="text-lg text-muted">min</span>
              </p>
              <p className="text-xs text-muted">temps moyen réponse</p>
            </div>
            <div>
              <p className="font-display text-4xl font-[500] text-ink">
                93<span className="text-lg text-muted">%</span>
              </p>
              <p className="text-xs text-muted">clients qui reviennent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
