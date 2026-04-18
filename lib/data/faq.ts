export type FaqItem = {
  question: string;
  answer: string;
};

export function getServiceCityFAQ(serviceName: string, cityName: string): FaqItem[] {
  return [
    {
      question: `Combien coûte un ${serviceName.toLowerCase()} à ${cityName} ?`,
      answer: `Le tarif d'un ${serviceName.toLowerCase()} à ${cityName} varie selon la nature de l'intervention. Sur Allo-Maison, le prix est toujours communiqué avant la confirmation. Pas de mauvaise surprise.`,
    },
    {
      question: `Comment trouver un bon ${serviceName.toLowerCase()} à ${cityName} ?`,
      answer: `Sur Allo-Maison, chaque professionnel de ${cityName} est vérifié par notre équipe : identité, compétences et références contrôlées. Vous pouvez consulter les avis clients avant de choisir.`,
    },
    {
      question: `Les ${serviceName.toLowerCase()}s de ${cityName} sont-ils disponibles le week-end ?`,
      answer: `Oui, la majorité de nos professionnels à ${cityName} interviennent 7j/7, y compris le samedi et le dimanche, selon disponibilité.`,
    },
    {
      question: `Quel délai d'intervention pour un ${serviceName.toLowerCase()} à ${cityName} ?`,
      answer: `En moyenne, un ${serviceName.toLowerCase()} vérifié peut intervenir à ${cityName} sous 1 à 3 heures pour les demandes standard, et en moins de 30 minutes pour les urgences.`,
    },
    {
      question: `Comment réserver un ${serviceName.toLowerCase()} à ${cityName} via Allo-Maison ?`,
      answer: `C'est simple : choisissez votre service, indiquez votre quartier à ${cityName}, décrivez votre besoin et envoyez votre demande via WhatsApp. Un professionnel vérifié vous contacte rapidement.`,
    },
  ];
}

export function getUrgenceFAQ(serviceName: string, cityName: string): FaqItem[] {
  // serviceName est attendu sous la forme metier ("Plombier", "Électricien",
  // "Serrurier") — on normalise au cas ou un appelant passe encore le nom de
  // domaine ("Plomberie", "Electricite", "Serrurerie") pour eviter
  // "un plomberie" KO dans la FAQ.
  const rawLower = serviceName.toLowerCase();
  const normalized =
    rawLower === "plomberie"
      ? "plombier"
      : rawLower === "electricite" || rawLower === "électricité"
        ? "électricien"
        : rawLower === "serrurerie"
          ? "serrurier"
          : rawLower;
  const lower = normalized;
  const plural =
    lower === "plombier"
      ? "plombiers"
      : lower === "électricien"
        ? "électriciens"
        : lower === "serrurier"
          ? "serruriers"
          : `${lower}s`;
  const base: FaqItem[] = [
    {
      question: `Y a-t-il un ${lower} disponible en urgence à ${cityName} ?`,
      answer: `Oui. Allo-Maison dispose d'un réseau de ${plural} disponibles 24h/24 et 7j/7 à ${cityName} pour les interventions urgentes.`,
    },
    {
      question: `Quel est le délai d'intervention d'urgence à ${cityName} ?`,
      answer: `Pour les urgences à ${cityName}, notre objectif est une intervention en moins de 30 minutes. Le professionnel vous contacte immédiatement après votre demande.`,
    },
    {
      question: `Le prix d'urgence est-il plus élevé à ${cityName} ?`,
      answer: `Un supplément urgence peut s'appliquer la nuit ou le week-end à ${cityName}. Le tarif est toujours annoncé avant l'intervention, sans aucune surprise.`,
    },
    {
      question: `Combien coûte une intervention ${lower} de nuit à ${cityName} ?`,
      answer: `La majoration nuit (22h – 6h) ou jour férié à ${cityName} se situe généralement entre 30 % et 50 % du tarif de base. Le montant exact est toujours confirmé par WhatsApp avant le déplacement du ${lower}.`,
    },
    {
      question: `Les ${plural} sont-ils disponibles pendant le Ramadan à ${cityName} ?`,
      answer: `Oui, le réseau Allo-Maison à ${cityName} reste opérationnel pendant le Ramadan avec des horaires adaptés (interventions accentuées en soirée après f'tour et de nuit). Le service d'urgence 24h/24 est maintenu sans interruption.`,
    },
  ];

  const serviceSpecific: Record<string, FaqItem[]> = {
    plombier: [
      {
        question: `Un plombier doit-il être déclaré au Maroc ?`,
        answer: `Oui. Les plombiers professionnels au Maroc sont soumis à la déclaration CNSS et à la Loi 19-12 sur les travailleurs de l'artisanat. Allo-Maison vérifie ces documents avant l'intégration d'un pro au réseau ${cityName}.`,
      },
      {
        question: `Faut-il couper l'eau au compteur avant l'arrivée du plombier à ${cityName} ?`,
        answer: `Oui, coupez l'arrivée d'eau principale (généralement près du compteur Lydec / Redal / RADEEF selon ${cityName}) pour limiter les dégâts. Le plombier rouvre le circuit une fois la réparation effectuée.`,
      },
    ],
    électricien: [
      {
        question: `Quelles normes électriques s'appliquent au Maroc ?`,
        answer: `Les installations électriques au Maroc suivent la norme NM 06.3.900 (équivalent NF C 15-100) et les prescriptions de l'ONEE. Un électricien Allo-Maison vérifie la conformité du tableau et de la mise à la terre lors de chaque intervention à ${cityName}.`,
      },
      {
        question: `Un électricien doit-il être déclaré à la CNSS à ${cityName} ?`,
        answer: `Oui. Les électriciens du réseau Allo-Maison à ${cityName} sont déclarés CNSS et disposent d'une attestation d'assurance RC Pro, conformément à la Loi 19-12 sur l'auto-entrepreneur et l'artisanat.`,
      },
    ],
    serrurier: [
      {
        question: `Le serrurier demande-t-il une pièce d'identité à ${cityName} ?`,
        answer: `Oui, pour une ouverture de porte à ${cityName}, le serrurier est tenu de vérifier que vous êtes bien le propriétaire ou le locataire (CIN, facture, bail). C'est une protection réglementaire pour éviter les effractions frauduleuses.`,
      },
      {
        question: `Un serrurier doit-il être déclaré au Maroc ?`,
        answer: `Oui. Les serruriers professionnels à ${cityName} sont déclarés CNSS et inscrits au registre des artisans (Loi 19-12). Allo-Maison contrôle ces documents avant l'intégration au réseau.`,
      },
    ],
  };

  const extra = serviceSpecific[lower] ?? [];

  return [...base, ...extra];
}

/**
 * Service-specific FAQ, keyed by service slug.
 * Use {CITY} placeholder; it will be interpolated by getEnrichedServiceCityFAQ.
 */
export const FAQ_BY_SERVICE: Record<string, FaqItem[]> = {
  plombier: [
    {
      question: "Combien coûte un débouchage de canalisation à {CITY} ?",
      answer:
        "Le débouchage standard à {CITY} varie entre 200 et 600 DH selon la complexité (évier, WC, colonne). Les plombiers Allo-Maison annoncent le tarif avant l'intervention.",
    },
    {
      question: "Un plombier peut-il intervenir la nuit à {CITY} ?",
      answer:
        "Oui. À {CITY}, plusieurs plombiers du réseau interviennent 24h/24, y compris la nuit. Un supplément urgence s'applique, toujours communiqué avant le déplacement.",
    },
    {
      question: "Que faire en cas de fuite sur un mitigeur à {CITY} ?",
      answer:
        "Fermez le robinet d'arrivée d'eau sous le lavabo, puis demandez un plombier via WhatsApp. À {CITY}, l'intervention démarre généralement sous 1 heure.",
    },
    {
      question: "Combien coûte la réparation d'un chauffe-eau à {CITY} ?",
      answer:
        "Un diagnostic chauffe-eau coûte entre 150 et 300 DH à {CITY}. La réparation dépend de la pièce (thermostat, résistance, groupe de sécurité) : devis systématique avant travaux.",
    },
    {
      question: "Les plombiers Allo-Maison à {CITY} offrent-ils une garantie sur leurs travaux ?",
      answer:
        "Oui. Chaque intervention de plomberie réalisée via Allo-Maison à {CITY} est couverte par notre garantie satisfait ou refait pendant 7 jours.",
    },
    {
      question: "Un plombier peut-il vidanger une fosse septique à {CITY} ?",
      answer:
        "Certains plombiers partenaires à {CITY} proposent la vidange de fosse septique ou peuvent mobiliser un camion hydrocureur. Précisez-le lors de votre demande.",
    },
    {
      question: "Quel plombier choisir pour installer une nouvelle salle de bain à {CITY} ?",
      answer:
        "Pour une installation complète à {CITY}, privilégiez un plombier avec au moins 5 ans d'expérience et des photos de chantiers antérieurs. Nos filtres vous permettent de trier les profils par notes et spécialités.",
    },
    {
      question: "Le déplacement du plombier est-il facturé à {CITY} ?",
      answer:
        "Le déplacement intra-muros à {CITY} est généralement offert ou inclus dans le forfait. Pour les quartiers périphériques, un petit supplément peut s'appliquer, toujours annoncé avant.",
    },
  ],
  electricien: [
    {
      question: "Combien coûte la remise aux normes d'un tableau électrique à {CITY} ?",
      answer:
        "À {CITY}, une remise aux normes complète d'un tableau électrique coûte entre 1 500 et 4 500 DH selon le nombre de circuits. Devis détaillé systématique avant les travaux.",
    },
    {
      question: "Que faire en cas de court-circuit à {CITY} ?",
      answer:
        "Coupez le disjoncteur général et demandez un électricien d'urgence via Allo-Maison à {CITY}. L'intervention démarre généralement en moins de 45 minutes.",
    },
    {
      question: "Un électricien peut-il installer une prise supplémentaire à {CITY} ?",
      answer:
        "Oui. Une prise supplémentaire à {CITY} coûte entre 180 et 450 DH selon la distance au tableau et le type de mur. Intervention en 1 à 2 heures.",
    },
    {
      question: "Pourquoi mon disjoncteur saute-t-il régulièrement à {CITY} ?",
      answer:
        "Un disjoncteur qui saute signale une surcharge, un court-circuit ou un appareil défectueux. Un électricien Allo-Maison à {CITY} établit un diagnostic sous 30 min pour environ 150 DH.",
    },
    {
      question: "Les électriciens Allo-Maison à {CITY} sont-ils assurés ?",
      answer:
        "Oui. Tous les électriciens vérifiés du réseau à {CITY} disposent d'une attestation d'assurance responsabilité civile professionnelle à jour, contrôlée lors de leur certification.",
    },
    {
      question: "Peut-on obtenir un devis électrique gratuit à {CITY} ?",
      answer:
        "Pour les chantiers importants (rénovation, tableau complet), le devis sur place est gratuit à {CITY}. Pour un simple diagnostic, le déplacement peut être facturé 100 à 200 DH.",
    },
    {
      question: "Quel délai pour une panne générale d'électricité à {CITY} ?",
      answer:
        "En urgence, un électricien intervient sous 30 à 60 minutes à {CITY}. Vérifiez aussi auprès de Lydec/Redal que la panne n'est pas collective avant de réserver.",
    },
    {
      question: "Les électriciens Allo-Maison à {CITY} installent-ils des points lumineux LED ?",
      answer:
        "Oui, pose de spots LED, plafonniers, rubans LED et variateurs. Comptez 100 à 300 DH par point lumineux à {CITY}, selon le support et l'accès.",
    },
  ],
  "femme-de-menage": [
    {
      question: "Quel est le tarif horaire d'une femme de ménage à {CITY} ?",
      answer:
        "À {CITY}, le tarif horaire varie entre 40 et 80 DH selon l'expérience et le type de prestation. Allo-Maison propose aussi des forfaits ménage fixes, souvent plus avantageux.",
    },
    {
      question: "Forfait ou tarif horaire : que choisir à {CITY} ?",
      answer:
        "Pour un ménage régulier (hebdomadaire) à {CITY}, le forfait est plus intéressant. Pour un grand ménage ponctuel, le tarif horaire offre plus de flexibilité.",
    },
    {
      question: "Les femmes de ménage Allo-Maison sont-elles déclarées à la CNSS ?",
      answer:
        "Oui, nous encourageons systématiquement la déclaration CNSS. À {CITY}, notre équipe vous accompagne dans la démarche administrative lors de la mise en relation régulière.",
    },
    {
      question: "Que se passe-t-il en cas de dégât matériel à {CITY} ?",
      answer:
        "Signalez le problème immédiatement via WhatsApp. La plateforme Allo-Maison à {CITY} facilite la résolution, et les dommages accidentels sont couverts par la garantie intervention.",
    },
    {
      question: "Y a-t-il une période d'essai avec une femme de ménage à {CITY} ?",
      answer:
        "Oui. La première intervention à {CITY} fait office d'essai. Si le courant ne passe pas, nous vous proposons une autre candidate sans frais supplémentaires.",
    },
    {
      question: "Les femmes de ménage travaillent-elles les jours fériés à {CITY} ?",
      answer:
        "Certaines acceptent les jours fériés à {CITY}, souvent avec une majoration de 25 à 50 %. Précisez la date dès l'envoi de votre demande WhatsApp.",
    },
    {
      question: "Combien d'heures prévoir pour un grand ménage à {CITY} ?",
      answer:
        "Pour un appartement de 80 m2 à {CITY}, comptez 4 à 6 heures à deux personnes. Pour une villa, 6 à 10 heures. Nos forfaits grand ménage sont détaillés avant réservation.",
    },
    {
      question: "La femme de ménage apporte-t-elle son matériel à {CITY} ?",
      answer:
        "Généralement non. À {CITY}, le client fournit produits et matériel (aspirateur, serpillière). Précisez si vous souhaitez un forfait avec produits inclus, disponible sur demande.",
    },
  ],
  peintre: [
    {
      question: "Quel est le prix de la peinture au m2 à {CITY} ?",
      answer:
        "À {CITY}, comptez 40 à 90 DH/m2 pour une peinture intérieure standard (2 couches, fournitures comprises). Les finitions premium (satin, lessivable) peuvent monter à 120 DH/m2.",
    },
    {
      question: "Peinture intérieure ou extérieure : quelles différences de prix à {CITY} ?",
      answer:
        "La peinture extérieure à {CITY} coûte 20 à 30 % de plus : échafaudage, peintures spécifiques anti-UV et exposition aux intempéries. Demandez un devis extérieur dédié.",
    },
    {
      question: "Combien de temps faut-il pour sécher après peinture à {CITY} ?",
      answer:
        "À {CITY}, comptez 2 à 4 heures entre deux couches et 24 heures avant de remeubler. L'humidité côtière (Casa, Tanger) peut rallonger le séchage de quelques heures.",
    },
    {
      question: "Quelles marques de peinture les peintres Allo-Maison utilisent-ils à {CITY} ?",
      answer:
        "Nos peintres à {CITY} travaillent principalement avec Astral, Colorado, Tollens ou Levis selon le budget. Vous pouvez demander une marque précise lors du devis.",
    },
    {
      question: "Y a-t-il une garantie après travaux de peinture à {CITY} ?",
      answer:
        "Oui, nos peintres vérifiés à {CITY} offrent une garantie de 6 à 12 mois sur les défauts de pose (cloques, écaillage), en plus de la garantie Allo-Maison de 7 jours.",
    },
    {
      question: "Un peintre peut-il aussi poser de la tapisserie à {CITY} ?",
      answer:
        "Plusieurs peintres du réseau Allo-Maison à {CITY} proposent aussi la pose de tapisserie et papier peint. Indiquez-le dans votre demande WhatsApp pour filtrer les profils.",
    },
    {
      question: "Faut-il vider la pièce avant l'arrivée du peintre à {CITY} ?",
      answer:
        "Idéal : vider ou centraliser les meubles. Sinon, précisez-le à {CITY} : nos peintres proposent un forfait protection (bâches, déplacement meubles) pour 150 à 300 DH.",
    },
    {
      question: "Comment obtenir un devis peinture gratuit à {CITY} ?",
      answer:
        "Envoyez les surfaces approximatives et photos via WhatsApp. Un peintre Allo-Maison à {CITY} vous propose un devis écrit en moins de 24 heures, sans engagement.",
    },
  ],
  climatisation: [
    {
      question: "Quel est le prix d'un entretien annuel de climatisation à {CITY} ?",
      answer:
        "À {CITY}, l'entretien annuel d'un split coûte entre 250 et 450 DH (nettoyage filtres, vérification gaz, contrôle général). Forfait multi-unités disponible.",
    },
    {
      question: "Combien coûte la recharge de gaz d'une clim à {CITY} ?",
      answer:
        "La recharge de gaz R410A ou R32 à {CITY} varie entre 400 et 900 DH selon la quantité et le modèle. Un diagnostic fuite est souvent nécessaire en amont.",
    },
    {
      question: "Quelle puissance BTU choisir pour mon salon à {CITY} ?",
      answer:
        "Règle simple à {CITY} : 100 BTU par m2. Un salon de 25 m2 = 2 500 BTU mini, soit un split de 9 000 BTU. Ajustez selon l'orientation et l'isolation.",
    },
    {
      question: "Combien coûte l'installation d'un split à {CITY} ?",
      answer:
        "À {CITY}, l'installation d'un split 9 000 à 12 000 BTU (hors fourniture) coûte entre 600 et 1 200 DH, selon la distance entre unité intérieure et extérieure.",
    },
    {
      question: "Pourquoi ma clim ne refroidit-elle plus assez à {CITY} ?",
      answer:
        "Causes fréquentes à {CITY} : filtres encrassés, manque de gaz, sonde défectueuse, condenseur poussiéreux. Un diagnostic à 150-250 DH permet d'identifier le problème.",
    },
    {
      question: "Les techniciens clim Allo-Maison sont-ils certifiés à {CITY} ?",
      answer:
        "Oui. À {CITY}, tous nos techniciens frigoristes détiennent une attestation d'aptitude à la manipulation des fluides frigorigènes, contrôlée lors de leur vérification.",
    },
    {
      question: "Quelle est la meilleure saison pour installer une clim à {CITY} ?",
      answer:
        "Idéalement mars-avril à {CITY}, avant la hausse de demande estivale. Les tarifs sont plus stables et les délais d'installation plus courts qu'en plein été.",
    },
    {
      question: "Allo-Maison propose-t-il des contrats d'entretien annuels à {CITY} ?",
      answer:
        "Oui, nos techniciens clim à {CITY} proposent des contrats annuels avec 2 visites (avant été, avant hiver) à partir de 650 DH pour un split standard.",
    },
  ],
  serrurier: [
    {
      question: "Combien coûte l'ouverture d'une porte claquée à {CITY} ?",
      answer:
        "À {CITY}, l'ouverture d'une porte claquée sans dégâts varie entre 150 et 350 DH en journée, 250 à 500 DH de nuit ou le dimanche.",
    },
    {
      question: "Combien coûte le changement d'un cylindre à {CITY} ?",
      answer:
        "Le changement d'un cylindre standard à {CITY} coûte 200 à 500 DH pose incluse. Pour un cylindre de haute sécurité (type Mul-T-Lock), comptez 700 à 1 500 DH.",
    },
    {
      question: "Un serrurier peut-il intervenir la nuit à {CITY} ?",
      answer:
        "Oui. Le réseau Allo-Maison à {CITY} inclut des serruriers disponibles 24h/24. Délai moyen : 20 à 45 minutes, avec majoration nuit/férié annoncée avant déplacement.",
    },
    {
      question: "Porte blindée ou porte simple : quelle différence à {CITY} ?",
      answer:
        "À {CITY}, une porte blindée résiste à l'effraction 5 à 15 min contre 30 sec pour une porte standard. Comptez 4 500 à 12 000 DH pose comprise pour du blindage.",
    },
    {
      question: "Le serrurier demande-t-il un devis avant intervention à {CITY} ?",
      answer:
        "Oui. À {CITY}, nos serruriers Allo-Maison annoncent le prix avant toute intervention. Aucune majoration surprise une fois sur place, c'est un engagement de la plateforme.",
    },
    {
      question: "Comment éviter les arnaques de serrurier à {CITY} ?",
      answer:
        "À {CITY}, passez toujours par une plateforme qui vérifie les pros. Allo-Maison contrôle identité, attestation et avis clients pour chaque serrurier du réseau.",
    },
    {
      question: "Un serrurier peut-il installer un verrou supplémentaire à {CITY} ?",
      answer:
        "Oui. Installation d'un verrou 3 points à {CITY} : 400 à 900 DH fourniture comprise. Un serrurier Allo-Maison peut conseiller selon votre porte et son niveau de sécurité actuel.",
    },
    {
      question: "Que faire si je perds mes clés à {CITY} ?",
      answer:
        "À {CITY}, demandez un serrurier en urgence via WhatsApp. Selon la serrure, il ouvre sans dégât ou remplace le cylindre sur place. Gardez toujours un double chez un proche.",
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
