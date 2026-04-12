import { Lock, Star, Shield } from "lucide-react";

const TRUST_CARDS = [
  {
    icon: Lock,
    iconBg: "bg-trust-light",
    iconColor: "text-trust",
    title: "Identite verifiee",
    description: "Chaque pro est verifie par notre equipe. Pas de mauvaise surprise.",
  },
  {
    icon: Star,
    iconBg: "bg-trust-light",
    iconColor: "text-trust",
    title: "Competences prouvees",
    description: "Diplomes OFPPT, references clients et test pratique avant acceptation.",
  },
  {
    icon: Shield,
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
    title: "Suivi en continu",
    description: "Avis verifies par SMS apres chaque mission. Les pros mal notes sont retires.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-ink mb-3">
            Qui entre chez vous ? On a verifie.
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Depuis 2017, avant d&apos;accepter un pro sur la plateforme, on verifie son identite, son casier et ses competences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRUST_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-card shadow-card p-6">
                <div className={`w-11 h-11 rounded-card ${card.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <h3 className="font-semibold text-ink mb-2">{card.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
