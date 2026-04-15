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

/**
 * Service-specific FAQ, keyed by service slug.
 * Use {CITY} placeholder; it will be interpolated by getEnrichedServiceCityFAQ.
 */
export const FAQ_BY_SERVICE: Record<string, FaqItem[]> = {
  plombier: [
    {
      question: "Combien coute un debouchage de canalisation a {CITY} ?",
      answer:
        "Le debouchage standard a {CITY} varie entre 200 et 600 DH selon la complexite (evier, WC, colonne). Les plombiers Allo-Maison annoncent le tarif avant l'intervention.",
    },
    {
      question: "Un plombier peut-il intervenir la nuit a {CITY} ?",
      answer:
        "Oui. A {CITY}, plusieurs plombiers du reseau interviennent 24h/24, y compris la nuit. Un supplement urgence s'applique, toujours communique avant le deplacement.",
    },
    {
      question: "Que faire en cas de fuite sur un mitigeur a {CITY} ?",
      answer:
        "Fermez le robinet d'arrivee d'eau sous le lavabo, puis demandez un plombier via WhatsApp. A {CITY}, l'intervention demarre generalement sous 1 heure.",
    },
    {
      question: "Combien coute la reparation d'un chauffe-eau a {CITY} ?",
      answer:
        "Un diagnostic chauffe-eau coute entre 150 et 300 DH a {CITY}. La reparation depend de la piece (thermostat, resistance, groupe de securite) : devis systematique avant travaux.",
    },
    {
      question: "Les plombiers Allo-Maison a {CITY} offrent-ils une garantie sur leurs travaux ?",
      answer:
        "Oui. Chaque intervention de plomberie realisee via Allo-Maison a {CITY} est couverte par notre garantie satisfait ou refait pendant 7 jours.",
    },
    {
      question: "Un plombier peut-il vidanger une fosse septique a {CITY} ?",
      answer:
        "Certains plombiers partenaires a {CITY} proposent la vidange de fosse septique ou peuvent mobiliser un camion hydrocureur. Precisez-le lors de votre demande.",
    },
    {
      question: "Quel plombier choisir pour installer une nouvelle salle de bain a {CITY} ?",
      answer:
        "Pour une installation complete a {CITY}, privilegiez un plombier avec au moins 5 ans d'experience et des photos de chantiers anterieurs. Nos filtres vous permettent de trier les profils par notes et specialites.",
    },
    {
      question: "Le deplacement du plombier est-il facture a {CITY} ?",
      answer:
        "Le deplacement intra-muros a {CITY} est generalement offert ou inclus dans le forfait. Pour les quartiers peripheriques, un petit supplement peut s'appliquer, toujours annonce avant.",
    },
  ],
  electricien: [
    {
      question: "Combien coute la remise aux normes d'un tableau electrique a {CITY} ?",
      answer:
        "A {CITY}, une remise aux normes complete d'un tableau electrique coute entre 1 500 et 4 500 DH selon le nombre de circuits. Devis detaille systematique avant les travaux.",
    },
    {
      question: "Que faire en cas de court-circuit a {CITY} ?",
      answer:
        "Coupez le disjoncteur general et demandez un electricien d'urgence via Allo-Maison a {CITY}. L'intervention demarre generalement en moins de 45 minutes.",
    },
    {
      question: "Un electricien peut-il installer une prise supplementaire a {CITY} ?",
      answer:
        "Oui. Une prise supplementaire a {CITY} coute entre 180 et 450 DH selon la distance au tableau et le type de mur. Intervention en 1 a 2 heures.",
    },
    {
      question: "Pourquoi mon disjoncteur saute-t-il regulierement a {CITY} ?",
      answer:
        "Un disjoncteur qui saute signale une surcharge, un court-circuit ou un appareil defectueux. Un electricien Allo-Maison a {CITY} etablit un diagnostic sous 30 min pour environ 150 DH.",
    },
    {
      question: "Les electriciens Allo-Maison a {CITY} sont-ils assures ?",
      answer:
        "Oui. Tous les electriciens verifies du reseau a {CITY} disposent d'une attestation d'assurance responsabilite civile professionnelle a jour, controlee lors de leur certification.",
    },
    {
      question: "Peut-on obtenir un devis electrique gratuit a {CITY} ?",
      answer:
        "Pour les chantiers importants (renovation, tableau complet), le devis sur place est gratuit a {CITY}. Pour un simple diagnostic, le deplacement peut etre factures 100 a 200 DH.",
    },
    {
      question: "Quel delai pour une panne generale d'electricite a {CITY} ?",
      answer:
        "En urgence, un electricien intervient sous 30 a 60 minutes a {CITY}. Verifiez aussi aupres de Lydec/Redal que la panne n'est pas collective avant de reserver.",
    },
    {
      question: "Les electriciens Allo-Maison a {CITY} installent-ils des points lumineux LED ?",
      answer:
        "Oui, pose de spots LED, plafonniers, rubans LED et variateurs. Comptez 100 a 300 DH par point lumineux a {CITY}, selon le support et l'acces.",
    },
  ],
  "femme-de-menage": [
    {
      question: "Quel est le tarif horaire d'une femme de menage a {CITY} ?",
      answer:
        "A {CITY}, le tarif horaire varie entre 40 et 80 DH selon l'experience et le type de prestation. Allo-Maison propose aussi des forfaits menage fixes, souvent plus avantageux.",
    },
    {
      question: "Forfait ou tarif horaire : que choisir a {CITY} ?",
      answer:
        "Pour un menage regulier (hebdomadaire) a {CITY}, le forfait est plus interessant. Pour un grand menage ponctuel, le tarif horaire offre plus de flexibilite.",
    },
    {
      question: "Les femmes de menage Allo-Maison sont-elles declarees a la CNSS ?",
      answer:
        "Oui, nous encourageons systematiquement la declaration CNSS. A {CITY}, notre equipe vous accompagne dans la demarche administrative lors de la mise en relation reguliere.",
    },
    {
      question: "Que se passe-t-il en cas de degat materiel a {CITY} ?",
      answer:
        "Signalez le probleme immediatement via WhatsApp. La plateforme Allo-Maison a {CITY} facilite la resolution, et les dommages accidentels sont couverts par la garantie intervention.",
    },
    {
      question: "Y a-t-il une periode d'essai avec une femme de menage a {CITY} ?",
      answer:
        "Oui. La premiere intervention a {CITY} fait office d'essai. Si le courant ne passe pas, nous vous proposons une autre candidate sans frais supplementaires.",
    },
    {
      question: "Les femmes de menage travaillent-elles les jours feries a {CITY} ?",
      answer:
        "Certaines acceptent les jours feries a {CITY}, souvent avec une majoration de 25 a 50 %. Precisez la date des l'envoi de votre demande WhatsApp.",
    },
    {
      question: "Combien d'heures prevoir pour un grand menage a {CITY} ?",
      answer:
        "Pour un appartement de 80 m2 a {CITY}, comptez 4 a 6 heures a deux personnes. Pour une villa, 6 a 10 heures. Nos forfaits grand menage sont detailles avant reservation.",
    },
    {
      question: "La femme de menage apporte-t-elle son materiel a {CITY} ?",
      answer:
        "Generalement non. A {CITY}, le client fournit produits et materiel (aspirateur, serpilliere). Precisez si vous souhaitez un forfait avec produits inclus, disponible sur demande.",
    },
  ],
  peintre: [
    {
      question: "Quel est le prix de la peinture au m2 a {CITY} ?",
      answer:
        "A {CITY}, comptez 40 a 90 DH/m2 pour une peinture interieure standard (2 couches, fournitures comprises). Les finitions premium (satin, lessivable) peuvent monter a 120 DH/m2.",
    },
    {
      question: "Peinture interieure ou exterieure : quelles differences de prix a {CITY} ?",
      answer:
        "La peinture exterieure a {CITY} coute 20 a 30 % de plus : echafaudage, peintures specifiques anti-UV et exposition aux intemperies. Demandez un devis exterieur dedie.",
    },
    {
      question: "Combien de temps faut-il pour secher apres peinture a {CITY} ?",
      answer:
        "A {CITY}, comptez 2 a 4 heures entre deux couches et 24 heures avant de remeubler. L'humidite cotiere (Casa, Tanger) peut rallonger le sechage de quelques heures.",
    },
    {
      question: "Quelles marques de peinture les peintres Allo-Maison utilisent-ils a {CITY} ?",
      answer:
        "Nos peintres a {CITY} travaillent principalement avec Astral, Colorado, Tollens ou Levis selon le budget. Vous pouvez demander une marque precise lors du devis.",
    },
    {
      question: "Y a-t-il une garantie apres travaux de peinture a {CITY} ?",
      answer:
        "Oui, nos peintres verifies a {CITY} offrent une garantie de 6 a 12 mois sur les defauts de pose (cloques, ecaillage), en plus de la garantie Allo-Maison de 7 jours.",
    },
    {
      question: "Un peintre peut-il aussi poser de la tapisserie a {CITY} ?",
      answer:
        "Plusieurs peintres du reseau Allo-Maison a {CITY} proposent aussi la pose de tapisserie et papier peint. Indiquez-le dans votre demande WhatsApp pour filtrer les profils.",
    },
    {
      question: "Faut-il vider la piece avant l'arrivee du peintre a {CITY} ?",
      answer:
        "Ideal : vider ou centraliser les meubles. Sinon, precisez-le a {CITY} : nos peintres proposent un forfait protection (baches, deplacement meubles) pour 150 a 300 DH.",
    },
    {
      question: "Comment obtenir un devis peinture gratuit a {CITY} ?",
      answer:
        "Envoyez les surfaces approximatives et photos via WhatsApp. Un peintre Allo-Maison a {CITY} vous propose un devis ecrit en moins de 24 heures, sans engagement.",
    },
  ],
  climatisation: [
    {
      question: "Quel est le prix d'un entretien annuel de climatisation a {CITY} ?",
      answer:
        "A {CITY}, l'entretien annuel d'un split coute entre 250 et 450 DH (nettoyage filtres, verification gaz, controle general). Forfait multi-unites disponible.",
    },
    {
      question: "Combien coute la recharge de gaz d'une clim a {CITY} ?",
      answer:
        "La recharge de gaz R410A ou R32 a {CITY} varie entre 400 et 900 DH selon la quantite et le modele. Un diagnostic fuite est souvent necessaire en amont.",
    },
    {
      question: "Quelle puissance BTU choisir pour mon salon a {CITY} ?",
      answer:
        "Regle simple a {CITY} : 100 BTU par m2. Un salon de 25 m2 = 2 500 BTU mini, soit un split de 9 000 BTU. Ajustez selon l'orientation et l'isolation.",
    },
    {
      question: "Combien coute l'installation d'un split a {CITY} ?",
      answer:
        "A {CITY}, l'installation d'un split 9 000 a 12 000 BTU (hors fourniture) coute entre 600 et 1 200 DH, selon la distance entre unite interieure et exterieure.",
    },
    {
      question: "Pourquoi ma clim ne refroidit-elle plus assez a {CITY} ?",
      answer:
        "Causes frequentes a {CITY} : filtres encrasses, manque de gaz, sonde defectueuse, condenseur poussiereux. Un diagnostic a 150-250 DH permet d'identifier le probleme.",
    },
    {
      question: "Les techniciens clim Allo-Maison sont-ils certifies a {CITY} ?",
      answer:
        "Oui. A {CITY}, tous nos techniciens frigoristes detiennent une attestation d'aptitude a la manipulation des fluides frigorigenes, controlee lors de leur verification.",
    },
    {
      question: "Quelle est la meilleure saison pour installer une clim a {CITY} ?",
      answer:
        "Idealement mars-avril a {CITY}, avant la hausse de demande estivale. Les tarifs sont plus stables et les delais d'installation plus courts qu'en plein ete.",
    },
    {
      question: "Allo-Maison propose-t-il des contrats d'entretien annuels a {CITY} ?",
      answer:
        "Oui, nos techniciens clim a {CITY} proposent des contrats annuels avec 2 visites (avant ete, avant hiver) a partir de 650 DH pour un split standard.",
    },
  ],
  serrurier: [
    {
      question: "Combien coute l'ouverture d'une porte claquee a {CITY} ?",
      answer:
        "A {CITY}, l'ouverture d'une porte claquee sans degats varie entre 150 et 350 DH en journee, 250 a 500 DH de nuit ou le dimanche.",
    },
    {
      question: "Combien coute le changement d'un cylindre a {CITY} ?",
      answer:
        "Le changement d'un cylindre standard a {CITY} coute 200 a 500 DH pose incluse. Pour un cylindre de haute securite (type Mul-T-Lock), comptez 700 a 1 500 DH.",
    },
    {
      question: "Un serrurier peut-il intervenir la nuit a {CITY} ?",
      answer:
        "Oui. Le reseau Allo-Maison a {CITY} inclut des serruriers disponibles 24h/24. Delai moyen : 20 a 45 minutes, avec majoration nuit/ferie annoncee avant deplacement.",
    },
    {
      question: "Porte blindee ou porte simple : quelle difference a {CITY} ?",
      answer:
        "A {CITY}, une porte blindee resiste a l'effraction 5 a 15 min contre 30 sec pour une porte standard. Comptez 4 500 a 12 000 DH pose comprise pour du blindage.",
    },
    {
      question: "Le serrurier demande-t-il un devis avant intervention a {CITY} ?",
      answer:
        "Oui. A {CITY}, nos serruriers Allo-Maison annoncent le prix avant toute intervention. Aucune majoration surprise une fois sur place, c'est un engagement de la plateforme.",
    },
    {
      question: "Comment eviter les arnaques de serrurier a {CITY} ?",
      answer:
        "A {CITY}, passez toujours par une plateforme qui verifie les pros. Allo-Maison controle identite, attestation et avis clients pour chaque serrurier du reseau.",
    },
    {
      question: "Un serrurier peut-il installer un verrou supplementaire a {CITY} ?",
      answer:
        "Oui. Installation d'un verrou 3 points a {CITY} : 400 a 900 DH fourniture comprise. Un serrurier Allo-Maison peut conseiller selon votre porte et son niveau de securite actuel.",
    },
    {
      question: "Que faire si je perds mes cles a {CITY} ?",
      answer:
        "A {CITY}, demandez un serrurier en urgence via WhatsApp. Selon la serrure, il ouvre sans degat ou remplace le cylindre sur place. Gardez toujours un double chez un proche.",
    },
  ],
};

/**
 * Returns a service-specific FAQ when available, otherwise falls back to the
 * generic getServiceCityFAQ template. City name is interpolated into {CITY}.
 */
export function getEnrichedServiceCityFAQ(
  serviceSlug: string,
  serviceName: string,
  cityName: string
): FaqItem[] {
  const specific = FAQ_BY_SERVICE[serviceSlug];
  if (specific && specific.length > 0) {
    return specific.map((item) => ({
      question: item.question.replace(/\{CITY\}/g, cityName),
      answer: item.answer.replace(/\{CITY\}/g, cityName),
    }));
  }
  return getServiceCityFAQ(serviceName, cityName);
}
