import { registerRichContent, type RichPageContent } from "./types";

const content: RichPageContent = {
  slug: "electricien-casablanca",
  metaTitle: "Électricien Casablanca – Dépannage & Installation 24h/24 | Allo Maison",
  metaDescription:
    "Électricien à Casablanca disponible rapidement. Panne, mise aux normes, tableau électrique, installation. Tarifs 2026 transparents, artisans vérifiés.",
  h1: "Électricien à Casablanca : Dépannage Rapide et Installation Aux Normes",
  heroText:
    "Juillet, 14h. La canicule bat son plein à Casablanca et d'un coup — toute l'électricité de votre appartement coupe. La clim, le frigo, tout. Vous avez beau réarmer le disjoncteur, il saute à nouveau. Cinq minutes plus tard, il fait déjà 38°C chez vous. Ce scénario, des centaines de Casablancais le vivent chaque été, surtout dans les quartiers à vieux immeubles où les installations électriques n'ont jamais été dimensionnées pour 3 climatiseurs et un lave-linge à la fois. Un bon électricien ne se contente pas de réarmer votre disjoncteur — il comprend pourquoi ça a sauté.",

  sections: [
    {
      title: "Les pannes électriques les plus courantes à Casablanca",
      content: `<p>La panne la plus fréquente à Casablanca, de loin, c'est la <strong>surcharge du tableau électrique</strong>. Un appartement des années 80 avait été dimensionné pour 2-3 kW de consommation maximum. Aujourd'hui, entre la climatisation (1,5 kW par unité), le chauffe-eau électrique (2 kW), la machine à laver (2 kW), le four (2,5 kW) et tous les appareils du quotidien, on arrive facilement à 8-10 kW en simultané. Le résultat : un disjoncteur principal qui saute en boucle.</p>
<p>Le deuxième problème chronique, ce sont les <strong>prises qui ne fonctionnent plus</strong>. Dans les vieux appartements, les prises sont souvent de type 2P sans terre (deux broches, pas de borne de mise à la terre). Ce type de prise vieillit mal : les contacts s'oxydent, les cosses se desserrent, et un beau matin votre téléphone ne charge plus alors que la prise "semble" fonctionner. Parfois c'est juste une connexion desserrée au tableau — 20 minutes de travail à 200-250 DH.</p>
<p>Les <strong>court-circuits</strong> arrivent généralement après des travaux de peinture, de plomberie, ou quand de l'eau s'est infiltrée dans une gaine électrique. À Casablanca, les fuites de plomberie sont fréquentes (cf. nos pages plomberie) et l'eau et l'électricité cohabitent malheureusement souvent dans les vieux immeubles.</p>
<p>Enfin, les <strong>pannes sur l'éclairage</strong> sont souvent négligées car "ça marche encore un peu". Une ampoule qui clignote avant de mourir n'est pas toujours à remplacer — c'est peut-être un problème de variateur incompatible avec les LED, un contact oxydé dans le bornier, ou une tension trop basse sur une ligne partagée avec trop d'appareils.</p>`,
    },
    {
      title: "Normes électriques au Maroc : ce que dit la NM 06.1.100",
      content: `<p>Le Maroc dispose depuis 2009 d'une norme nationale d'installation électrique basse tension : la <strong>NM 06.1.100</strong>, largement inspirée de la norme française NF C 15-100 mais adaptée au contexte marocain. Cette norme définit les règles de base pour toute installation électrique dans les bâtiments d'habitation et tertiaires.</p>
<p>Les points essentiels de cette norme que tout propriétaire devrait connaître :</p>
<ul>
<li><strong>Disjoncteur différentiel 30mA obligatoire</strong> — Tout circuit alimentant des appareils dans une pièce humide (salle de bain, cuisine) doit être protégé par un disjoncteur différentiel à haute sensibilité (30 milliampères). Ce dispositif coupe le courant en moins de 30 millisecondes si une fuite vers la terre est détectée — il sauve des vies.</li>
<li><strong>Mise à la terre</strong> — Toute nouvelle installation doit inclure une prise de terre correctement dimensionnée. Dans les appartements anciens à Casablanca, la mise à la terre est souvent absente ou mal réalisée.</li>
<li><strong>Séparation des circuits</strong> — La cuisine et la salle de bain doivent avoir leurs propres circuits dédiés.</li>
<li><strong>Gaines et câbles adaptés</strong> — Les sections de câbles doivent correspondre à la charge prévue. Mettre un câble 1,5mm² sur un circuit four est une erreur classique et dangereuse.</li>
</ul>
<p>En pratique, la grande majorité des appartements construits avant 1995 à Casablanca ne respectent pas ces normes. Ce n'est pas illégal en soi de vivre dans un appartement non aux normes (la loi n'impose pas de mise en conformité systématique des logements existants), mais c'est une question de sécurité personnelle.</p>`,
    },
    {
      title: "Combien coûte un électricien à Casablanca en 2026 ?",
      content: `<p>Soyons directs sur les tarifs, parce que c'est la question que tout le monde pose et personne ne répond clairement.</p>
<p><strong>Déplacement :</strong> La plupart des électriciens à Casablanca facturent un forfait de déplacement entre 80 et 150 DH, parfois inclus dans le prix si le travail dépasse 300 DH. Ce forfait est normal — un technicien qui traverse Casablanca pour votre dépannage prend 30 minutes dans les embouteillages.</p>
<p><strong>Tarif horaire :</strong> Entre 180 et 280 DH/heure selon l'expérience et la spécialité. Un électricien senior avec 10 ans d'expérience en rénovation de tableaux électriques facturera plus qu'un apprenti pour un remplacement de prise.</p>
<p>Pour avoir une idée, comparez ces prix à la réalité du marché casablancais :</p>
<ul>
<li>Remplacement d'une prise standard : 150-250 DH main d'œuvre + prise</li>
<li>Remplacement d'un interrupteur : 120-200 DH</li>
<li>Mise en place d'un disjoncteur différentiel 30mA : 350-500 DH</li>
<li>Remplacement complet d'un tableau 10 circuits : 2 500 à 4 500 DH matériel inclus</li>
<li>Installation d'un point lumineux (plafond) : 300-450 DH</li>
</ul>
<p>Méfiez-vous des devis trop bas sur les tableaux électriques. Un tableau bien fait avec du matériel Legrand ou Schneider (les marques de référence au Maroc) coûte son prix. Un tableau fait avec du matériel d'imitation acheté à Derb Ghallef peut coûter deux fois moins cher à l'installation et vous coûter votre appartement.</p>`,
    },
    {
      title: "Casablanca : les quartiers où l'installation électrique est la plus vieille",
      content: `<p>Ce n'est pas une surprise pour qui connaît la ville : les quartiers construits avant 1975 concentrent l'essentiel des problèmes électriques chroniques à Casablanca.</p>
<p><strong>Gauthier et Bourgogne :</strong> Les immeubles art déco et néo-mauresque de ces quartiers ont une architecture magnifique et une électricité d'époque. Beaucoup d'appartements ont conservé leurs fils en aluminium d'origine (l'aluminium conducteur a été abandonné pour le résidentiel dans les années 80 à cause de son vieillissement et des risques d'incendie). Si vous habitez dans un immeuble des années 60 à Gauthier et que vos fils électriques ont une gaine en tissu tissé, il est temps de tout refaire.</p>
<p><strong>Maarif ancien et Beausejour :</strong> Les immeubles R+4 et R+5 des années 70-80 dans ces quartiers ont généralement du câble section 1,5mm² partout, y compris sur des circuits qui alimentent aujourd'hui des climatiseurs. Un câble 1,5mm² supporte légalement 16A — une seule clim en tire 8-10A, et si la cuisine est sur le même circuit, vous êtes à la limite.</p>
<p><strong>Hay Mohammadi et Ain Sebaa :</strong> Les quartiers industriels et populaires ont souvent des installations bricolées au fil des années. Des rallonges permanentes, des prises rajoutées en dérivation, des tableaux avec des fusibles au lieu de disjoncteurs différentiels. Ce n'est pas forcément dangereux si c'est correctement fait, mais ça l'est souvent.</p>
<p><strong>Résidences récentes (après 2005) :</strong> Les nouveaux quartiers comme Bouskoura, Anfa Place, ou les résidences de Sidi Maarouf ont généralement une installation correcte au départ, mais le problème vient souvent des aménagements rajoutés par les résidents eux-mêmes — climatiseurs mal installés, prises ajoutées sans contrôle de charge.</p>`,
    },
    {
      title: "Quand faut-il refaire toute l'installation électrique ?",
      content: `<p>La rénovation électrique complète, c'est la décision que beaucoup de propriétaires repoussent parce qu'elle fait peur — en termes de coût, de travaux, de poussière. Mais il y a des signaux d'alarme qu'on ne peut pas ignorer.</p>
<p><strong>Refaites tout si :</strong> vos disjoncteurs sautent plus d'une fois par mois sans surcharge évidente ; vous avez des fils apparents dans les gaines dont la gaine plastique est jaunie, craquelée ou collante (signe de vieillissement du PVC) ; votre tableau électrique n'a pas de disjoncteur différentiel 30mA du tout ; vos prises sont de l'ancien modèle 2P sans terre et vous vivez dans un logement construit avant 1990 ; ou si vous sentez une odeur de brûlé près d'une prise ou d'un tableau.</p>
<p>Le coût d'une installation électrique complète pour un appartement de 80m² à Casablanca varie entre <strong>15 000 et 30 000 DH</strong> selon l'état existant, le nombre de circuits, et si vous gardez les mêmes chemins de câbles ou ouvrez les murs. C'est un budget conséquent, mais à mettre en perspective avec la valeur d'un appartement et surtout avec le coût humain et financier d'un incendie électrique.</p>
<p>Une mise aux normes partielle (juste le tableau + les circuits cuisine et salle de bain) peut se faire entre 4 000 et 8 000 DH et couvre les risques les plus graves.</p>`,
    },
    {
      title: "Sécurité électrique : ce que dit la loi marocaine",
      content: `<p>La loi marocaine sur la sécurité des installations électriques s'appuie principalement sur le <strong>Dahir du 21 mai 1948</strong> sur les distributions d'énergie électrique et ses décrets d'application, ainsi que sur les règlements de l'ONEE (Office National de l'Electricité et de l'Eau Potable) qui réglementent les raccordements au réseau.</p>
<p>Ce que vous devez savoir en pratique :</p>
<ul>
<li>L'ONEE peut refuser ou couper un raccordement si l'installation intérieure présente des risques manifestes. Un électricien agréé ONEE est requis pour les nouveaux raccordements.</li>
<li>En cas d'incendie d'origine électrique dans votre appartement, votre assurance habitation peut refuser d'indemniser si elle prouve que l'installation était manifestement défectueuse et que vous en aviez été informé.</li>
<li>Pour les ERP (Établissements Recevant du Public) comme les restaurants, boutiques, et hôtels, des contrôles périodiques de conformité électrique sont obligatoires — ces contrôles sont réalisés par des bureaux de contrôle agréés.</li>
</ul>
<p>La sécurité électrique au Maroc est encore un sujet en développement réglementaire. Contrairement à la France où un certificat de conformité (CONSUEL) est obligatoire pour tout raccordement, le Maroc n'a pas encore rendu ce contrôle systématique pour les particuliers. Ce qui rend d'autant plus importante la vigilance personnelle des propriétaires.</p>`,
    },
  ],

  priceTable: [
    {
      intervention: "Dépannage / diagnostic (déplacement inclus)",
      prixMin: 200,
      prixMoyen: 300,
      prixMax: 450,
    },
    {
      intervention: "Remplacement prise de courant",
      prixMin: 150,
      prixMoyen: 220,
      prixMax: 350,
    },
    {
      intervention: "Remplacement interrupteur",
      prixMin: 120,
      prixMoyen: 180,
      prixMax: 280,
    },
    {
      intervention: "Installation point lumineux (plafond)",
      prixMin: 280,
      prixMoyen: 380,
      prixMax: 500,
    },
    {
      intervention: "Installation disjoncteur différentiel 30mA",
      prixMin: 350,
      prixMoyen: 500,
      prixMax: 700,
    },
    {
      intervention: "Remplacement tableau électrique (10 circuits)",
      prixMin: 2500,
      prixMoyen: 3500,
      prixMax: 5000,
    },
    {
      intervention: "Mise aux normes installation complète (80m²)",
      prixMin: 15000,
      prixMoyen: 22000,
      prixMax: 32000,
    },
    {
      intervention: "Installation interphone / visiophone",
      prixMin: 500,
      prixMoyen: 800,
      prixMax: 1500,
    },
    {
      intervention: "Installation climatiseur (raccordement électrique)",
      prixMin: 400,
      prixMoyen: 600,
      prixMax: 900,
    },
    {
      intervention: "Passage de câble dans gaine (par mètre)",
      prixMin: 80,
      prixMoyen: 120,
      prixMax: 200,
    },
  ],

  youtubeVideoId: "qHdCBSDcMCg",
  youtubeVideoTitle: "Comprendre son tableau électrique et les disjoncteurs",

  externalLinks: [
    {
      label: "ONEE – Office National de l'Electricité et de l'Eau",
      url: "https://www.one.org.ma",
      description:
        "L'ONEE régule les raccordements électriques au Maroc et gère les normes de distribution.",
    },
    {
      label: "IMANOR – Norme NM 06.1.100",
      url: "https://www.imanor.gov.ma",
      description:
        "Institut Marocain de Normalisation — consulter les normes électriques marocaines officielles.",
    },
    {
      label: "CNSS – Déclaration des artisans électriciens",
      url: "https://www.cnss.ma",
      description: "Vérifiez qu'un électricien est bien déclaré et couvert avant toute intervention.",
    },
    {
      label: "OFPPT – Formations électricité bâtiment",
      url: "https://www.ofppt.ma",
      description:
        "Référence des formations professionnelles en électricité au Maroc — pour vérifier les qualifications.",
    },
  ],

  testimonials: [
    {
      name: "Youssef M.",
      quarter: "Gauthier",
      city: "Casablanca",
      rating: 5,
      text: "Tableau électrique complet refait dans mon appartement des années 70. L'électricien a pris le temps d'expliquer chaque circuit, m'a montré où étaient les problèmes. Travail soigné, propre. Je recommande à tous les habitants de vieux immeubles de faire vérifier leur installation.",
      date: "Mars 2026",
      service: "Remplacement tableau électrique",
    },
    {
      name: "Fatima Z.",
      quarter: "Maarif",
      city: "Casablanca",
      rating: 5,
      text: "Panne électrique complète un soir de ramadan. Arrivée en 1h, problème identifié rapidement (court-circuit dans la cuisine), réparé en 45 minutes. Tarif annoncé avant intervention, facture remise. Exactement ce qu'on attend.",
      date: "Mars 2026",
      service: "Dépannage panne électrique",
    },
    {
      name: "Omar B.",
      quarter: "Ain Diab",
      city: "Casablanca",
      rating: 4,
      text: "Installation de 3 climatiseurs + mise aux normes des circuits concernés. Bon travail, aurait pu être plus rapide mais le résultat est nickel. Aucune panne depuis 6 mois.",
      date: "Janvier 2026",
      service: "Installation climatisation",
    },
  ],

  faqs: [
    {
      question: "Pourquoi mon disjoncteur saute-t-il sans cesse ?",
      answer:
        "Trois raisons principales : surcharge (trop d'appareils sur le même circuit), court-circuit (fil dénudé touchant un autre conducteur ou la terre), ou défaut d'isolement (eau dans une gaine, câble vieilli qui perd son isolation). Si votre disjoncteur différentiel saute immédiatement au réarmement, c'est généralement un défaut d'isolement — coupez le circuit concerné et appelez un électricien. Ne forcez JAMAIS un disjoncteur à rester en position ON.",
    },
    {
      question: "Qu'est-ce qu'un disjoncteur différentiel 30mA et est-ce obligatoire ?",
      answer:
        "Le disjoncteur différentiel 30mA (aussi appelé différentiel haute sensibilité) détecte les fuites de courant vers la terre d'une valeur supérieure à 30 milliampères — le seuil à partir duquel un contact électrique peut être mortel. Il coupe le courant en moins de 30ms, soit avant qu'une électrocution soit fatale. Selon la norme NM 06.1.100, il est obligatoire dans toute nouvelle installation, notamment sur les circuits de cuisine et salle de bain. Pour les installations existantes, rien ne vous y oblige légalement, mais c'est fortement recommandé — le coût est de 350-500 DH posé.",
    },
    {
      question: "Peut-on rajouter des prises électriques soi-même ?",
      answer:
        "Techniquement, c'est faisable si vous savez ce que vous faites. Légalement, les travaux électriques au Maroc ne sont pas réglementés de la même façon qu'en France — il n'y a pas de certification CONSUEL obligatoire pour les particuliers. En pratique, les erreurs les plus fréquentes des bricoleurs sont : sectionner un câble sur un circuit en charge (électrocution), faire des connexions avec des dominos pas assez serrés (arc électrique, incendie), et ne pas respecter les sections de câble. Pour une prise dans un espace humide ou pour toute dérivation sur un circuit existant, faites appel à un professionnel.",
    },
    {
      question: "Combien coûte une mise aux normes électrique complète à Casablanca ?",
      answer:
        "Pour un appartement de 80m², comptez entre 15 000 et 30 000 DH tout compris (matériel + main d'œuvre). Le prix varie selon l'état de l'installation existante, le nombre de circuits à créer, et si les murs doivent être ouverts pour passer de nouveaux câbles. Une mise aux normes partielle — juste le tableau et les circuits à risque — est possible entre 4 000 et 8 000 DH et couvre les risques les plus graves.",
    },
    {
      question: "Quelle est la différence entre un électricien et un installateur agréé ONEE ?",
      answer:
        "Un électricien peut réaliser des travaux internes à votre logement sans agrément particulier. Un installateur agréé ONEE est habilité à travailler sur les branchements au réseau public d'électricité (coffret de comptage, câble de raccordement). Pour les travaux à l'intérieur de votre appartement, un bon électricien suffit. Pour un nouveau raccordement ou la modification d'un compteur, il faut un installateur agréé ONEE.",
    },
    {
      question: "Mon appartement est en location. Qui est responsable des travaux électriques ?",
      answer:
        "En droit marocain, le propriétaire est responsable de maintenir le logement en état d'habitabilité, ce qui inclut une installation électrique fonctionnelle et sûre. Les petites réparations (ampoule, interrupteur defectueux) sont à la charge du locataire par usage et convention. Les travaux importants (tableau électrique défectueux, câblage en mauvais état) sont à la charge du propriétaire. En cas de litige, l'état des lieux d'entrée est le document de référence.",
    },
    {
      question: "Est-il dangereux d'utiliser des multiprises à rallonge en permanence ?",
      answer:
        "Oui, dans certaines conditions. Le danger principal est la surcharge : brancher plusieurs appareils gourmands (four, bouilloire, machine à café) sur la même multiprise crée un risque d'échauffement et d'incendie. Choisissez des multiprises avec parasurtenseur et disjoncteur thermique intégré (les bonnes coûtent 80-150 DH, pas 20 DH). Et surtout, ne cachez jamais une multiprise sous un tapis ou derrière des meubles — l'échauffement ne peut pas se dissiper.",
    },
    {
      question: "Peut-on faire des travaux électriques la nuit ou le week-end à Casablanca ?",
      answer:
        "Les électriciens sur Allo Maison sont disponibles 24h/24 pour les urgences. Pour les travaux planifiés, la plupart travaillent en semaine en heures de bureau, avec certains disponibles le samedi matin. Attendez-vous à une majoration de 25-50% pour les interventions nocturnes (après 21h) ou les jours fériés — c'est standard et justifié.",
    },
    {
      question: "Comment savoir si mes fils électriques sont dangereux ?",
      answer:
        "Quelques signes à surveiller : gaine du câble jaunie, craquelée ou collante au toucher (vieillissement du PVC, risque d'arc électrique) ; odeur de brûlé ou de plastique chaud au niveau d'une prise ou d'un interrupteur ; fils apparents de couleur rouge-brun sans gaine (câble en aluminium des années 60-70, à remplacer) ; prises qui chauffent après utilisation. Si vous observez l'un de ces signes, faites inspecter par un électricien avant tout.",
    },
    {
      question: "L'électricien doit-il couper l'électricité de tout l'immeuble pour travailler ?",
      answer:
        "Non, dans la grande majorité des cas. Un bon électricien travaille sur votre tableau privatif, coupant uniquement le circuit concerné. La coupure générale de l'immeuble n'est nécessaire que si les travaux concernent une partie commune (montée principale, compteur collectif) — dans ce cas, il faut l'accord du syndic et une information préalable aux autres résidents.",
    },
    {
      question: "Quelle marque de matériel électrique choisir au Maroc ?",
      answer:
        "Les références reconnues et disponibles à Casablanca sont Legrand et Schneider Electric pour les tableaux et disjoncteurs — ces marques proposent des gammes adaptées au marché marocain avec service après-vente local. Pour la robinetterie et les prises murales, Legrand Mosaic ou Céliane sont les standards du marché. Évitez les matériels sans marque visible vendus en vrac à Derb Ghallef pour les tableaux et disjoncteurs — c'est là où les économies peuvent coûter cher.",
    },
  ],

  tips: [
    "Testez votre disjoncteur différentiel tous les 6 mois en appuyant sur le bouton TEST (petit bouton rouge ou vert sur le boîtier). S'il ne coupe pas le courant, il est défectueux et ne vous protège plus — remplacez-le immédiatement.",
    "Si un disjoncteur saute, attendez 2 minutes avant de le réarmer. Ce délai permet à d'éventuels composants surchauffés de se refroidir et évite d'aggraver un court-circuit naissant.",
    "Photographiez votre tableau électrique avant toute intervention — cela permet à un électricien de diagnostiquer à distance et de préparer le matériel adéquat, ce qui accélère et réduit le coût de l'intervention.",
    "En été à Casablanca, si vous allumez plusieurs climatiseurs simultanément, faites-le progressivement (une clim, attendez 30 secondes, puis la suivante). Le démarrage simultané crée un appel de courant qui peut faire sauter les disjoncteurs même si la charge totale est dans les normes.",
    "Pour vérifier si une prise est alimentée sans risque : utilisez un testeur de prise à 20 DH chez n'importe quel électricien de Derb Ghallef. Ne jamais toucher l'intérieur d'une prise même avec le disjoncteur coupé — le conducteur de neutre reste potentiellement dangereux.",
    "Si vous rénovez votre cuisine ou salle de bain, profitez-en pour refaire les circuits électriques de ces pièces aux normes (disjoncteur 30mA, prises avec terre). Le coût marginal est faible quand les murs sont déjà ouverts — c'est la même réparation qui coûterait 3x plus cher à réaliser séparément.",
    "Les câbles extensibles (rallonges) ne doivent jamais être laissés enroulés en usage intensif — la chaleur ne peut pas se dissiper et provoque un échauffement localisé. Déroulez toujours complètement une rallonge avant usage.",
  ],

  localKnowledge: `<p>Casablanca présente un profil électrique très contrasté selon les quartiers. <strong>Gauthier, Bourgogne, et Racine</strong> concentrent des immeubles des années 60-70 dont l'installation électrique n'a souvent jamais été refaite — fils en aluminium, tableaux à fusibles, pas de mise à la terre. Si vous habitez dans ces quartiers, une inspection électrique préventive à 400-600 DH peut vous éviter bien des surprises. À <strong>Maarif</strong> et <strong>Beausejour</strong>, les immeubles des années 80 ont généralement du câble cuivre mais des tableaux sous-dimensionnés pour la consommation moderne. Les nouvelles résidences de <strong>Bouskoura, Californie</strong> et <strong>Casa Nearshore</strong> sont aux normes, mais les occupants rajoutent souvent des circuits de climatisation non prévus dans le dimensionnement d'origine. L'adresse de référence pour le matériel électrique à Casablanca reste le <strong>quartier Derb Ghallef</strong> — des dizaines de boutiques proposent du matériel Legrand, Schneider et équivalents. Pour les marques premium et l'outillage professionnel, <strong>Atlas Electrique et Sonasid Elec</strong> sur l'avenue des FAR sont les fournisseurs préférés des électriciens de métier.</p>`,

  lastUpdated: "Avril 2026",
};

registerRichContent(content);
export default content;
