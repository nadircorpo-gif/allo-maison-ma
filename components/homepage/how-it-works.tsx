import { Shield, Clock, Lock, BadgeCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Décrivez",
    description: "Dites-nous le besoin en 30 secondes. Gratuit, sans engagement. Notre équipe humaine vous lit.",
  },
  {
    number: "02",
    title: "Comparez",
    description: "3 artisans qualifiés vous contactent sous 1h. Profils, avis, photos de chantier, tarif clair.",
  },
  {
    number: "03",
    title: "Payez après",
    description: "L'artisan intervient, vous validez. Satisfaction garantie, sinon on intervient à nos frais.",
  },
];

const BADGES = [
  { icon: Shield, title: "Satisfaction garantie", subtitle: "Pros vérifiés et certifiés" },
  { icon: Clock, title: "Intervention 24h", subtitle: "Urgence 24/7" },
  { icon: Lock, title: "Paiement sécurisé", subtitle: "Après satisfaction" },
  { icon: BadgeCheck, title: "Artisans certifiés", subtitle: "CIN + assurance RC" },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-white zellige-bg py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-3">02 — Comment ça marche</p>
          <h2 className="font-display text-4xl sm:text-5xl font-[550] tracking-[-0.02em] text-ink">
            Trois gestes. <em className="italic text-terracotta">Zéro stress.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.number}>
              <p className="font-display text-6xl font-[500] tab-nums text-zellige mb-4">{step.number}</p>
              <h3 className="font-display text-2xl font-medium text-ink mb-2">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-paper-border pt-10">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center bg-clay">
                  <Icon className="w-5 h-5 text-zellige" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{b.title}</p>
                  <p className="text-xs text-muted">{b.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
