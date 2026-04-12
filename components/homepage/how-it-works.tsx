import { ChevronRight } from "lucide-react";

const STEPS = [
  {
    number: "1",
    title: "Decrivez votre besoin",
    description: "Dites-nous ce qu'il vous faut. C'est gratuit, sans engagement, en 30 secondes.",
  },
  {
    number: "2",
    title: "Choisissez votre pro",
    description: "Comparez les profils, les avis et les prix. Echangez par chat ou WhatsApp avant de choisir.",
  },
  {
    number: "3",
    title: "Payez apres satisfaction",
    description: "Le pro intervient, vous validez. Paiement securise uniquement apres votre accord.",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-ink mb-3">Simple comme 1, 2, 3</h2>
          <p className="text-muted text-lg">Trouvez un professionnel de confiance en quelques minutes</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-0 flex-1">
              {/* Step content */}
              <div className="flex flex-col sm:items-center">
                {/* Circle */}
                <div className="w-12 h-12 rounded-full border-2 border-primary bg-primary-light flex items-center justify-center flex-shrink-0 mb-0 sm:mb-4">
                  <span className="text-primary font-extrabold text-lg">{step.number}</span>
                </div>
              </div>
              <div className="sm:text-center">
                <h3 className="font-semibold text-ink text-base mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow between steps — desktop only */}
              {index < STEPS.length - 1 && (
                <ChevronRight className="hidden sm:block w-6 h-6 text-muted/40 flex-shrink-0 self-start mt-3 -mr-2 -ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
