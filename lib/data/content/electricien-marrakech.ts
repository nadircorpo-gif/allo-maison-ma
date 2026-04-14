import { registerRichContent, type RichPageContent } from "./types";

const content: RichPageContent = {
  slug: "electricien-marrakech",
  metaTitle: "Électricien Marrakech – Riads, Villas & Urgences | Allo Maison",
  metaDescription:
    "Électricien à Marrakech spécialisé riads, villas et hôtels. Mise aux normes, climatisation, piscines, éclairage extérieur. Tarifs 2026, intervention rapide.",
  h1: "Électricien à Marrakech : dépannage rapide, tarifs clairs, pros vérifiés",
  heroText:
    "Besoin d'un électricien de confiance à Marrakech ? Panne, mise aux normes, installation ou dépannage urgent, nos électriciens vérifiés interviennent rapidement dans tous les quartiers.",

  sections: [
    {
      title: "L'électricité dans les riads de Marrakech : un défi unique au monde",
      content: `<p>Un riad traditionnel de la Médina de Marrakech n'a pas été conçu pour l'électricité. Ces bâtiments vieux parfois de 200 à 400 ans ont des murs en pisé (terre compressée) de 60 à 100 cm d'épaisseur, des charpentes en cèdre de l'Atlas, et des circulations intérieures labyrinthiques qui rendent le passage de gaines absolument non conventionnel.</p>
<p>Quand l'électricité a été introduite dans ces maisons au milieu du XXe siècle, c'était souvent en surface, le long des murs, dans des goulottes apparentes ou simplement plaquées avec du plâtre. Le résultat, 70 ans plus tard : des fils perdus dans la masse des murs, impossibles à localiser sans risquer d'endommager le plâtre tadelakt ou les boiseries sculptées.</p>
<p>Les propriétaires étrangers qui achètent des riads pour les rénover en gîtes ou en maisons d'hôtes se retrouvent devant un dilemme réel : <strong>refaire l'installation électrique entièrement en ouvrant les murs</strong> (ce qui peut abîmer un patrimoine irremplaçable) ou <strong>trouver des solutions de passage discrètes</strong>, gaines dans les plafonds, chemins sous les carreaux, passages par la toiture terrasse.</p>
<p>Un bon électricien spécialisé en riads à Marrakech connaît ces solutions. Il peut passer des gaines dans les faux-plafonds en bois des salons, suivre les rails des arcs décoratifs pour y glisser des câbles, utiliser la toiture en terrasse comme espace de distribution principal. Ces solutions préservent l'esthétique et permettent une installation aux normes modernes.</p>`,
    },
    {
      title: "Moderniser un riad sans dénaturer le patrimoine : les techniques des pros",
      content: `<p>La règle d'or des meilleurs électriciens spécialisés en riads à Marrakech : <strong>les câbles ne passent jamais là où ils peuvent abîmer quelque chose d'irremplaçable</strong>. Concrètement, ça veut dire :</p>
<ul>
<li><strong>Distribution par la terrasse :</strong> Le point de distribution principal est sur la toiture. Des colonnes descendantes passent dans des gaines encastrées dans les angles des pièces, là où il n'y a jamais de décoration. Cette technique est largement utilisée dans la Médina.</li>
<li><strong>Faux-plafonds en cèdre :</strong> Les maisons traditionnelles ont souvent des faux-plafonds en bois de cèdre. L'espace entre le faux-plafond et la structure est parfait pour faire passer des gaines et installer des spots encastrés. Cela donne un éclairage moderne sans aucun visible apparent.</li>
<li><strong>Chemins de câbles dans les menuiseries :</strong> Les encadrements de portes et les boiseries des fenêtres offrent des espaces naturels pour glisser des fils. Cela demande plus de travail mais le résultat est invisible.</li>
<li><strong>Tableau électrique dans un placard discret :</strong> Jamais en façade. Un tableau bien intégré dans un bûcher ou un placard de service préserve l'esthétique des salons.</li>
</ul>
<p>Pour un riad de taille moyenne (5-8 chambres), une installation électrique complète aux normes NM 06.1.100 représente un budget de <strong>25 000 à 55 000 DH</strong>, selon la complexité architecturale et le niveau d'équipement souhaité (climatisation, piscine, éclairage de jardin).</p>`,
    },
    {
      title: "Climatisation et électricité à Marrakech : la surcharge estivale",
      content: `<p>Marrakech l'été, c'est 42°C à l'ombre, parfois plus. La climatisation n'est pas un luxe, c'est une nécessité vitale, particulièrement pour les maisons d'hôtes et riads qui reçoivent des visiteurs du monde entier. Et c'est là que les problèmes électriques s'accumulent.</p>
<p>Un riad de 8 chambres climatisées consomme, en pointe estivale, entre 12 et 20 kW d'électricité rien que pour la climatisation. Ajoutez l'éclairage (si LED, c'est raisonnable), la cuisine, la pompe de piscine, le chauffe-eau, on arrive facilement à 25-30 kW en simultané. Pour référence, un appartement standard est raccordé à 6-10 kW chez l'ONEE.</p>
<p>Pour les riads et grandes villas de Marrakech, un <strong>raccordement spécifique avec puissance souscrite élevée</strong> est souvent nécessaire. L'ONEE Marrakech propose des raccordements basse tension jusqu'à 63A (environ 14 kW) pour les particuliers, et au-delà il faut passer en raccordement puissance spéciale ou moyenne tension. Un électricien agréé ONEE est indispensable pour ce type de raccordement.</p>
<p>Pour les climatiseurs, l'erreur la plus fréquente dans les riads est d'installer des unités murales sur des circuits non dédiés. Chaque groupe de climatisation doit avoir son propre circuit avec un disjoncteur calibré. À Marrakech, les électriciens sérieux recommandent aussi des <strong>onduleurs de protection</strong> sur les climatiseurs, les coupures et baisses de tension sont fréquentes en été, et les compresseurs de climatisation y sont très sensibles.</p>`,
    },
    {
      title: "Gueliz, Hivernage, Médina : trois mondes électriques différents",
      content: `<p><strong>La Médina :</strong> On l'a évoqué, c'est le territoire de l'artisanat électrique de haute volée. Les défis sont nombreux mais les solutions existent. Le réseau public de distribution électrique dans la Médina est géré par REDAL (anciennement Marrakech Energie), et les coupures sont plus fréquentes que dans les quartiers modernes, une raison supplémentaire de prévoir des protections (parafoudres, onduleurs pour les équipements sensibles).</p>
<p><strong>Gueliz :</strong> Le quartier moderne central de Marrakech a été construit principalement dans les années 60-90. Les immeubles ont généralement une installation plus accessible que les riads, mais souvent sous-dimensionnée pour la consommation moderne. Les appartements des années 80 à Gueliz présentent les mêmes problèmes qu'à Casablanca : tableaux insuffisants, pas de différentiel 30mA, prises sans terre. Les prix sont légèrement inférieurs à Casablanca pour les mêmes travaux.</p>
<p><strong>Hivernage et Palmeraie :</strong> Les villas de ces quartiers résidentiels huppés ont généralement une installation correcte mais souvent ancienne (les premières villas de l'Hivernage datent des années 60-70). Les piscines, l'éclairage paysager, les portails automatiques et les systèmes de sécurité créent des besoins spécifiques que peu d'électriciens généralistes maîtrisent vraiment. Pour ce type de villa, cherchez un électricien avec une expérience en installations de luxe, il comprendra les enjeux esthétiques en plus des enjeux techniques.</p>
<p><strong>M'Hamid, Daoudiate, Massira :</strong> Les quartiers populaires et intermédiaires de Marrakech ont une infrastructure électrique des années 90-2000. Les tarifs des électriciens y sont généralement 10-20% moins chers que dans les quartiers touristiques, et la plupart des problèmes sont des dépannages standard.</p>`,
    },
    {
      title: "Piscines et éclairage extérieur : les normes à absolument respecter",
      content: `<p>À Marrakech, avec le tourisme et les villas de luxe, les installations autour des piscines et dans les jardins sont monnaie courante. Et c'est peut-être le domaine où les erreurs peuvent être les plus graves, l'eau et l'électricité sont une combinaison mortelle.</p>
<p>La norme marocaine pour les installations électriques autour des piscines (basée sur la NM 06.1.100 qui reprend les principes de la norme IEC 60364-7-702) définit des <strong>zones de protection</strong> autour du plan d'eau :</p>
<ul>
<li><strong>Zone 0 (dans l'eau) :</strong> Uniquement les luminaires 12V très basse tension (TBTS) conçus pour être immergés. Aucun autre équipement.</li>
<li><strong>Zone 1 (0 à 2m du bord, hauteur 2,5m) :</strong> Équipements étanches IP67 minimum, protégés par disjoncteur différentiel 30mA, très basse tension recommandée.</li>
<li><strong>Zone 2 (2 à 3,5m du bord) :</strong> Équipements étanches IP55 minimum.</li>
</ul>
<p>En pratique à Marrakech, on voit régulièrement des prises standard (IP20) à moins d'1m des piscines, des projecteurs subaquatiques raccordés directement en 220V sans transformateur d'isolation, des installations qui peuvent tuer. Ne faites jamais appel à un électricien qui n'évoque pas ces zones de protection avant d'intervenir autour d'une piscine.</p>
<p>Pour l'<strong>éclairage extérieur et paysager</strong>, les luminaires LED 12V alimentés par transformateurs étanches en coffret sont devenus le standard. Un jardin de villa marrakchie bien éclairé représente 8 000 à 25 000 DH d'installation selon la superficie et le nombre de points lumineux, mais c'est une installation qui dure 10-15 ans sans maintenance majeure.</p>`,
    },
    {
      title: "Trouver le bon électricien à Marrakech : les questions à poser",
      content: `<p>Marrakech a un marché du travail artisanal particulier. La ville attire depuis 20 ans des projets de rénovation haut de gamme, ce qui a créé une classe d'artisans spécialisés dans les installations de riads et villas. Mais la demande a aussi attiré des personnes moins qualifiées qui se présentent comme des "spécialistes riads" sans l'expérience réelle.</p>
<p>Les questions qui permettent de trier les vrais pros :</p>
<ul>
<li>"Avez-vous travaillé sur des riads dans la Médina ?", Un pro peut citer des projets précis, des rues, des types de bâtiment. Un vague "oui j'ai l'habitude" sans détails est suspect.</li>
<li>"Comment passez-vous les gaines sans abîmer le tadelakt ?", La réponse devrait mentionner les faux-plafonds, les passages en terrasse, les chemins de câbles dans les menuiseries.</li>
<li>"Quel type de tableau utilisez-vous et quelle est la marque des disjoncteurs ?", La réponse devrait mentionner Legrand ou Schneider, pas "du matériel standard".</li>
<li>"Êtes-vous inscrit à REDAL / ONEE pour les raccordements ?", Pour les travaux nécessitant une déclaration à l'opérateur, c'est indispensable.</li>
</ul>
<p>Pour les petits dépannages (prise, interrupteur, ampoule), un électricien de quartier fait très bien l'affaire. Pour une installation complète de riad ou villa, il faut vraiment quelqu'un de spécialisé, même si ça coûte 20-30% de plus.</p>`,
    },
    {
      title: "Scénario type : derrière le tadelakt, des fils tressés des années 50",
      content: `<p>Vous venez d'acheter un riad dans la Médina de Marrakech. La rénovation avance bien, carrelage zellige posé, tadelakt dans la salle de bain. Et puis l'électricien ouvre les murs et là, silence. Des fils en tissu tressé datant probablement des années 50, des boîtiers de dérivation plombés dans les murs en pisé sans aucun accès, un compteur qui alimente tout le riad sur 2 disjoncteurs. Bienvenue dans la réalité électrique de la Médina de Marrakech, où l'histoire architecturale et les standards de sécurité modernes coexistent dans une tension permanente que seul un électricien vraiment expérimenté sait gérer.</p>`,
    },
  ],

  priceTable: [
    {
      intervention: "Dépannage / diagnostic",
      prixMin: 180,
      prixMoyen: 280,
      prixMax: 420,
    },
    {
      intervention: "Remplacement prise ou interrupteur",
      prixMin: 120,
      prixMoyen: 200,
      prixMax: 320,
    },
    {
      intervention: "Installation point lumineux",
      prixMin: 250,
      prixMoyen: 380,
      prixMax: 550,
    },
    {
      intervention: "Installation tableau électrique (10 circuits)",
      prixMin: 2800,
      prixMoyen: 4000,
      prixMax: 6000,
    },
    {
      intervention: "Installation électrique riad complet",
      prixMin: 25000,
      prixMoyen: 40000,
      prixMax: 60000,
    },
    {
      intervention: "Raccordement climatisation (par unité)",
      prixMin: 400,
      prixMoyen: 650,
      prixMax: 1000,
    },
    {
      intervention: "Installation éclairage piscine (projecteur immergé)",
      prixMin: 1200,
      prixMoyen: 2000,
      prixMax: 3500,
    },
    {
      intervention: "Éclairage extérieur jardin (par point)",
      prixMin: 400,
      prixMoyen: 700,
      prixMax: 1200,
    },
    {
      intervention: "Installation panneau solaire + onduleur",
      prixMin: 8000,
      prixMoyen: 15000,
      prixMax: 28000,
    },
    {
      intervention: "Mise aux normes installation complète villa",
      prixMin: 12000,
      prixMoyen: 22000,
      prixMax: 40000,
    },
  ],


  externalLinks: [
    {
      label: "ONEE Marrakech – Raccordements et coupures",
      url: "https://www.one.org.ma",
      description:
        "L'ONEE gère la distribution électrique à Marrakech, signalement de coupures et demandes de raccordement.",
    },
    {
      label: "IMANOR – Normes NM électricité bâtiment",
      url: "https://www.imanor.gov.ma",
      description: "Normes nationales marocaines pour les installations électriques en bâtiment.",
    },
    {
      label: "Fondation Nationale des Musées – Patrimoine médinas",
      url: "https://www.fnm.ma",
      description:
        "Pour les riads classés ou dans des zones protégées, vérifiez les contraintes patrimoniales avant travaux.",
    },
    {
      label: "OFPPT – Qualifications électriciens Maroc",
      url: "https://www.ofppt.ma",
      description: "Vérifiez les qualifications OFPPT des électriciens professionnels au Maroc.",
    },
  ],

  testimonials: [
    {
      name: "Pierre L.",
      quarter: "Médina",
      city: "Marrakech",
      rating: 5,
      text: "Rénovation électrique complète de notre riad (7 chambres, piscine, jardin). L'équipe a su passer tous les câbles sans toucher au tadelakt ni aux boiseries. Travail remarquable, installation propre, tout aux normes. On a maintenant la climatisation dans toutes les chambres et l'éclairage de la piscine fonctionne parfaitement.",
      date: "Février 2026",
      service: "Installation complète riad",
    },
    {
      name: "Aicha K.",
      quarter: "Gueliz",
      city: "Marrakech",
      rating: 5,
      text: "Tableau électrique cramé un samedi soir à cause d'un court-circuit. L'électricien est arrivé en 1h30 malgré le week-end. Diagnostic précis, tableau de remplacement posé le soir même. Vraiment professionnel.",
      date: "Mars 2026",
      service: "Remplacement tableau électrique urgent",
    },
    {
      name: "Sophie M.",
      quarter: "Hivernage",
      city: "Marrakech",
      rating: 4,
      text: "Installation éclairage jardin et piscine sur notre villa. Prix conforme au devis, résultat esthétique vraiment beau. Quelques petits retards mais le travail final est très bien.",
      date: "Janvier 2026",
      service: "Éclairage extérieur villa",
    },
  ],

  faqs: [
    {
      question: "Pourquoi l'électricité dans un riad de Marrakech est-elle si complexe à rénover ?",
      answer:
        "Les riads sont des bâtiments construits bien avant l'ère électrique, avec des murs épais en pisé, des structures en bois de cèdre et des finitions artisanales (tadelakt, zellige, boiseries sculptées) qu'il est quasiment impossible de recréer à l'identique. Passer des gaines nécessite de trouver des chemins qui préservent ces éléments. Les techniques professionnelles incluent le passage par les terrasses, dans les faux-plafonds, et le long des menuiseries, mais cela demande beaucoup plus de travail et d'expérience qu'une installation standard.",
    },
    {
      question: "Combien coûte l'installation électrique complète d'un riad à Marrakech ?",
      answer:
        "Pour un riad de taille moyenne (5-8 chambres avec piscine et jardin), le budget installation électrique complète varie entre 25 000 et 60 000 DH selon la complexité architecturale, le niveau d'équipement (nombre de climatiseurs, éclairage piscine, système domotique), et l'état de l'installation existante. Ce budget inclut le tableau électrique, tous les circuits, les prises, l'éclairage et les raccordements des équipements. Ne pas oublier que l'ONEE peut facturer une mise à niveau du raccordement si la puissance souscrite doit augmenter.",
    },
    {
      question: "Quelles sont les coupures électriques fréquentes à Marrakech en été ?",
      answer:
        "En juillet-août, Marrakech connaît des pointes de consommation importantes liées à la climatisation généralisée. Les coupures ou baisses de tension sont plus fréquentes que dans le reste de l'année, particulièrement dans la Médina et les quartiers périphériques. Pour les riads et hôtels, un groupe électrogène de secours ou un système de batteries de secours pour les équipements critiques (éclairage de sécurité, pompe de piscine) est fortement recommandé.",
    },
    {
      question: "Doit-on mettre des protections spéciales pour une piscine à Marrakech ?",
      answer:
        "Absolument. Les normes définissent des zones de protection autour des bassins : dans l'eau, seul du matériel 12V très basse tension est autorisé pour les luminaires immergés. Dans les 2 premiers mètres autour du bassin, tout équipement doit être étanche IP67 et protégé par un disjoncteur différentiel 30mA. Ne jamais accepter une installation de projecteur de piscine directement en 220V sans transformateur d'isolation, c'est dangereux et potentiellement mortel.",
    },
    {
      question: "Peut-on installer des panneaux solaires sur un riad de la Médina de Marrakech ?",
      answer:
        "Techniquement oui, mais il y a des contraintes patrimoniales dans certaines zones protégées de la Médina. L'installation de panneaux sur une toiture-terrasse est généralement possible sans visibilité depuis la rue, ce qui est souvent accepté. Il est conseillé de vérifier auprès de la Commune de Marrakech si votre riad est dans un périmètre soumis à des restrictions d'aspect extérieur. Les panneaux solaires sont particulièrement pertinents à Marrakech : 300 jours de soleil par an, un retour sur investissement typique de 5-7 ans.",
    },
    {
      question: "Quelle puissance électrique prévoir pour un riad avec climatisation ?",
      answer:
        "Chaque unité de climatisation consomme entre 1 et 2,5 kW selon sa puissance. Pour un riad de 8 chambres avec une clim par chambre plus les parties communes, prévoyez 15-20 kW rien que pour la climatisation. En ajoutant la cuisine, la piscine, l'éclairage et les autres usages, un riad hôtel doit souvent souscrire à une puissance de 30-45 kW. Votre électricien et l'ONEE travailleront ensemble pour déterminer le bon dimensionnement du raccordement.",
    },
    {
      question: "Y a-t-il des électriciens spécialisés en riads à Marrakech ?",
      answer:
        "Oui, plusieurs électriciens à Marrakech ont développé une véritable expertise en rénovation de riads. Ils connaissent les matériaux traditionnels, les techniques de passage de câbles non destructives, et les contraintes esthétiques de ces bâtiments. Via Allo Maison, vous pouvez préciser ce type de besoin et être mis en relation avec des artisans ayant cette expérience spécifique.",
    },
    {
      question: "Comment éviter les arnaques avec les électriciens à Marrakech ?",
      answer:
        "Les mêmes règles qu'ailleurs : devis écrit avant toute intervention, deux devis comparatifs pour les gros travaux, vérification que l'artisan utilise du matériel de marque reconnue. À Marrakech spécifiquement, méfiez-vous des artisans qui se présentent aux abords des souks comme 'spécialistes riads', certains sont excellents, d'autres profitent de la méconnaissance des propriétaires étrangers. Les recommandations de bouche à oreille au sein des associations de propriétaires de riads sont souvent la meilleure source.",
    },
    {
      question: "L'électricien peut-il aussi s'occuper de la domotique et des systèmes de sécurité ?",
      answer:
        "Certains électriciens à Marrakech se sont formés à la domotique (contrôle des lumières, volets, température, alarme via smartphone). C'est un marché en croissance dans les villas et riads haut de gamme. Les systèmes KNX ou les solutions plus abordables comme Legrand Céliane avec Netatmo sont installés par des électriciens avec une formation spécifique. Pour un riad hôtel, un système de gestion technique peut générer des économies d'énergie significatives.",
    },
    {
      question: "Que faire en cas de panne électrique totale dans mon riad la nuit ?",
      answer:
        "Vérifiez d'abord le tableau électrique, un disjoncteur sauté se repère facilement. Si tout est en position ON et qu'il n'y a toujours pas de courant, vérifiez si vos voisins ont de l'électricité (panne générale de quartier) ou si c'est spécifique à votre adresse (problème de compteur ou de branchement). En cas de panne générale ONEE, signalez sur le 080 100 07 07 (numéro ONEE Marrakech). Pour une panne interne urgente, Allo Maison vous met en relation avec un électricien d'astreinte.",
    },
    {
      question: "Les normes électriques sont-elles les mêmes dans un riad hôtel que dans une résidence privée ?",
      answer:
        "Non. Un riad transformé en maison d'hôtes ou hôtel est un ERP (Établissement Recevant du Public) et soumis à des réglementations plus strictes. L'installation électrique doit respecter les normes ERP : éclairage de sécurité, systèmes de détection incendie couplés à l'électricité, protection renforcée dans toutes les zones. Un passage en commission de sécurité peut être requis avant l'ouverture. Ces travaux sont nettement plus coûteux mais indispensables pour opérer légalement.",
    },
  ],

  tips: [
    "Avant d'acheter un riad à Marrakech, faites inspecter l'installation électrique par un électricien indépendant (pas celui recommandé par le vendeur). Le budget de réfection électrique peut aller de 15 000 à 60 000 DH, une information cruciale pour la négociation du prix.",
    "Pour les riads avec piscine, installez toujours un coffret de sécurité piscine avec disjoncteur différentiel dédié, accessible et clairement identifié. En cas d'incident dans l'eau, quelques secondes pour couper l'alimentation peuvent être décisives.",
    "À Marrakech, les coupures de courant en été peuvent faire redémarrer vos climatiseurs automatiquement après le rétablissement. Si votre réseau est sous-dimensionné, le redémarrage simultané de plusieurs clims peut refaire sauter le disjoncteur. Installez des minuteries de démarrage décalé sur chaque climatisation.",
    "Pour l'éclairage des jardins de riads et villas, privilégiez le LED 12V avec transformateurs étanches. En cas de fuite d'eau dans le jardin (arrosage, piscine), un système 12V ne présente aucun danger d'électrocution. La durée de vie des LED de bonne qualité est de 15-20 ans.",
    "Les fils tressés tissus que vous trouvez dans les vieux riads contiennent souvent du cuivre de bonne qualité, mais la gaine isolante est morte depuis longtemps. Ces fils peuvent conduire l'électricité jusqu'au jour où ils touchent quelque chose de conducteur ou d'humide. Ne prolongez jamais ce type de câblage, remplacez.",
    "Si vous gérez un riad hôtel, faites vérifier votre installation électrique chaque année avant la saison estivale (mai). Les 3-4 mois d'intensité touristique en été sollicitent l'installation bien au-delà de ce qu'elle supporte le reste de l'année.",
  ],

  localKnowledge: `<p>L'électricité à Marrakech se comprend par quartiers. Dans la <strong>Médina</strong>, le réseau de distribution ONEE est vieux et les coupures estivales sont une réalité, prévoir un onduleur pour les équipements sensibles est sage. À <strong>Gueliz</strong>, le quartier commercial central, les immeubles des années 60-80 ont une installation vieillissante mais le réseau public est plus stable. <strong>L'Hivernage</strong> et la <strong>Palmeraie</strong> concentrent les villas et riads de luxe où les installations les plus sophistiquées sont réalisées, domotique, éclairage architectural, pompes de piscine intelligentes. Dans ces zones, les électriciens travaillent souvent avec des architectes d'intérieur sur des projets complets. Les nouvelles zones résidentielles de <strong>M'Hamid, Targa</strong> et <strong>Massira</strong> ont une infrastructure plus récente et des appartements mieux dimensionnés. Pour les fournitures électriques, <strong>la rue de Yougoslavie à Gueliz</strong> concentre les boutiques de matériel électrique, c'est là que les pros marrakchis font leurs achats. Pour des projets de villas haut de gamme, <strong>Electro Marrakech sur le boulevard Mohammed VI</strong> propose les grandes marques.</p>`,

  lastUpdated: "Avril 2026",
};

registerRichContent(content);
export default content;
