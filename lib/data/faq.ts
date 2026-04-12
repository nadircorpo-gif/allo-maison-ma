export type FaqItem = {
  question: string;
  answer: string;
};

export function getServiceCityFAQ(serviceName: string, cityName: string): FaqItem[] {
  return [
    {
      question: `Combien coute un ${serviceName.toLowerCase()} a ${cityName} ?`,
      answer: `Le tarif d'un ${serviceName.toLowerCase()} a ${cityName} varie selon la nature de l'intervention. Sur Allo-Maison, le prix est toujours communique avant la confirmation. Pas de mauvaise surprise.`,
    },
    {
      question: `Comment trouver un bon ${serviceName.toLowerCase()} a ${cityName} ?`,
      answer: `Sur Allo-Maison, chaque professionnel de ${cityName} est verifie par notre equipe : identite, competences et references controlees. Vous pouvez consulter les avis clients avant de choisir.`,
    },
    {
      question: `Les ${serviceName.toLowerCase()}s de ${cityName} sont-ils disponibles le week-end ?`,
      answer: `Oui, la majorite de nos professionnels a ${cityName} interviennent 7j/7, y compris le samedi et le dimanche, selon disponibilite.`,
    },
    {
      question: `Quel delai d'intervention pour un ${serviceName.toLowerCase()} a ${cityName} ?`,
      answer: `En moyenne, un ${serviceName.toLowerCase()} verifie peut intervenir a ${cityName} sous 1 a 3 heures pour les demandes standard, et en moins de 30 minutes pour les urgences.`,
    },
    {
      question: `Comment reserver un ${serviceName.toLowerCase()} a ${cityName} via Allo-Maison ?`,
      answer: `C'est simple : choisissez votre service, indiquez votre quartier a ${cityName}, decrivez votre besoin et envoyez votre demande via WhatsApp. Un professionnel verifie vous contacte rapidement.`,
    },
  ];
}

export function getUrgenceFAQ(serviceName: string, cityName: string): FaqItem[] {
  return [
    {
      question: `Y a-t-il un ${serviceName.toLowerCase()} disponible en urgence a ${cityName} ?`,
      answer: `Oui. Allo-Maison dispose d'un reseau de ${serviceName.toLowerCase()}s disponibles 24h/24 et 7j/7 a ${cityName} pour les interventions urgentes.`,
    },
    {
      question: `Quel est le delai d'intervention d'urgence a ${cityName} ?`,
      answer: `Pour les urgences a ${cityName}, notre objectif est une intervention en moins de 30 minutes. Le professionnel vous contacte immediatement apres votre demande.`,
    },
    {
      question: `Le prix d'urgence est-il plus eleve a ${cityName} ?`,
      answer: `Un supplement urgence peut s'appliquer la nuit ou le week-end a ${cityName}. Le tarif est toujours annonce avant l'intervention, sans aucune surprise.`,
    },
  ];
}
