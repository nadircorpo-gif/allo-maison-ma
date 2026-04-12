import { registerRichContent, type RichPageContent } from "./types";

const content: RichPageContent = {
  slug: "plombier-casablanca",
  metaTitle: "Plombier Casablanca – Urgence & Dépannage 24h/24 | Allo Maison",
  metaDescription:
    "Trouvez un plombier à Casablanca rapidement. Tarifs transparents 2026, intervention en 1h, devis gratuit. Fuite, débouchage, chauffe-eau, WC — on gère tout.",
  h1: "Plombier à Casablanca : Intervention Rapide, Tarifs Clairs",
  heroText:
    "Il est 23h un samedi soir. Vous rentrez d'un dîner au Maarif et là — l'eau ruisselle sous la porte de votre cuisine. Le joint sous l'évier a lâché. Le premier réflexe de la plupart des Casablancais ? Appeler n'importe qui depuis une pub Facebook et payer le double. On est là pour que ça ne vous arrive plus. Allo Maison connecte les Casablancais avec des plombiers vérifiés, disponibles maintenant, aux tarifs du marché.",

  sections: [
    {
      title: "Pourquoi les fuites sont si fréquentes à Casablanca",
      content: `<p>Casablanca a un problème avec ses canalisations que peu de villes méditerranéennes connaissent à cette échelle. La combinaison est redoutable : <strong>une humidité marine permanente</strong> qui ronge les joints et les raccords métalliques, des immeubles construits dans les années 60-70 avec des tuyaux en acier galvanisé qui ont aujourd'hui 50 à 60 ans, et une pression d'eau qui varie parfois violemment selon les quartiers.</p>
<p>Les immeubles de Bourgogne, de l'Hermitage, de Gauthier — certains n'ont jamais eu leurs colonnes montantes refaites. Quand un joint lâche au 5ème étage, c'est souvent l'appartement du 4ème qui se retrouve inondé. Ce n'est pas rare, c'est presque prévisible.</p>
<p>À Ain Diab, la proximité de l'océan fait que les raccords en cuivre s'oxydent deux fois plus vite qu'à Hay Mohammadi, plus à l'intérieur des terres. Un plombier qui connaît ces nuances ne travaille pas de la même façon. Il utilisera des raccords laiton chromé plutôt qu'un simple PVC quand il sait que la corrosion est agressive.</p>
<p>La pression d'eau à Casablanca est aussi un sujet. Dans certains immeubles hauts de Palmier ou de Sbata, la pression monte à 6-7 bars, bien au-delà de la norme de 3 bars. Ce surdosage en pression détruit les robinets, fatigue les flexibles et fait claquer les ballons chauffe-eau en quelques années seulement.</p>`,
    },
    {
      title: "Comment choisir un plombier à Casablanca sans se faire avoir",
      content: `<p>La règle numéro un : <strong>un vrai plombier donne un devis avant de commencer.</strong> Pas après avoir démonté le siphon, pas après avoir "jeté un coup d'œil". Avant. Si quelqu'un refuse de vous donner une fourchette de prix en amont, raccrochez.</p>
<p>Demandez toujours si le technicien est inscrit à la CNSS. Ce n'est pas qu'une formalité administrative — ça signifie qu'il existe officiellement, qu'il a une adresse, qu'on peut le retrouver en cas de problème. Un artisan non déclaré, c'est zéro recours si le travail est mal fait.</p>
<p>Méfiez-vous aussi des tarifs qui semblent trop bas. Un débouchage de colonne collective à 100 DH, c'est soit quelqu'un qui fait semblant de déboucher, soit quelqu'un qui va ajouter 5 lignes de "frais cachés" sur la facture finale. Le prix moyen honnête pour un débouchage mécanique à Casablanca est entre 300 et 450 DH, matériel et déplacement inclus.</p>
<p>Une astuce simple : appelez deux artisans différents, décrivez le même problème, et comparez les réponses. Pas seulement le prix — la façon dont ils posent les questions. Un bon plombier va vous demander depuis combien de temps ça fuit, si l'eau est chaude ou froide, si c'est sous pression ou un suintement. Celui qui annonce un prix sans chercher à comprendre le problème est rarement celui qui va le résoudre correctement.</p>`,
    },
    {
      title: "Les quartiers de Casablanca et leurs problèmes de plomberie spécifiques",
      content: `<p><strong>Maarif et Beauséjour</strong> — Les appartements haussmanniens du Maarif ont souvent une plomberie d'origine des années 70-80. Les siphons de douche sont petits et se bouchent facilement avec les cheveux et le calcaire. Les chauffe-eau au gaz, souvent mal ventilés dans les salles de bain exiguës, ont besoin d'une révision tous les 2-3 ans. On voit beaucoup de colonnes d'évacuation partagées entre 4-5 appartements qui se colmatent progressivement.</p>
<p><strong>Ain Diab et Anfa</strong> — Le sel marin est l'ennemi numéro un ici. Les villas et appartements proches de la corniche subissent une corrosion accélérée sur tous les raccords apparents. On conseille systématiquement l'inox 316L pour toute installation extérieure. Les piscines privées dans ce quartier nécessitent aussi une plomberie spécialisée — les pompes de filtration et les raccords doivent être traités spécifiquement pour la chimie du chlore.</p>
<p><strong>Hay Hassani et Hay Mohammadi</strong> — Ce sont des quartiers à fort densité avec beaucoup d'immeubles collectifs des années 80. Les problèmes les plus fréquents : débouchages de colonnes communes, fuites sur les compteurs d'eau partagés, robinets de coupure générale bloqués par le calcaire. La dureté de l'eau à Casablanca (autour de 30°f) laisse des dépôts impressionnants en quelques années.</p>
<p><strong>Bourgogne et Gauthier</strong> — Les immeubles art déco de ces quartiers sont magnifiques mais cachent une plomberie souvent mixte : des sections neuves ajoutées au fil des années sur des colonnes d'époque. Ces montages hétérogènes sont des nids à fuites. Un plombier expérimenté saura identifier les sections à risque avant qu'elles ne posent problème.</p>
<p><strong>Médina et anciens quartiers</strong> — La plomberie dans la Médina de Casablanca est dans un état que seul un plombier habitué à ce type de bâtiment peut vraiment gérer. Des conduites en plomb pour certaines installations d'avant 1970, des passages dans des murs de 60 cm d'épaisseur, des canalisations non cartographiées. Il faut quelqu'un qui connaît ces constructions.</p>`,
    },
    {
      title: "Urgences plomberie : les gestes qui sauvent (et qui vous économisent de l'argent)",
      content: `<p><strong>Le robinet d'arrêt général.</strong> Vous connaissez l'emplacement du robinet d'arrêt général de votre appartement ? Non ? Allez le chercher maintenant, avant d'avoir une fuite. Il est généralement sous l'évier de cuisine, près du compteur d'eau, ou dans un placard technique. Fermer ce robinet en moins de 2 minutes peut transformer une catastrophe à 3 000 DH en réparation à 300 DH.</p>
<p>En attendant le plombier, <strong>ne pas utiliser les WC ni les robinets</strong> si vous avez une fuite sur l'évacuation. Chaque litre d'eau supplémentaire aggrave les dégâts. Si la fuite vient d'un tuyau d'alimentation sous pression, coupez l'eau générale et attendez.</p>
<p>Pour les <strong>débouchages d'urgence</strong>, la ventouse fonctionne sur les WC et les lavabos. Pour les douches, un fil de débouchage à 20 DH chez n'importe quel quincaillier de Derb Ghallef fait souvent le travail en 5 minutes. Si vous avez du vinaigre blanc et du bicarbonate sous la main, versez 250 ml de chaque dans le siphon et attendez 30 minutes — ça dissout les dépôts de savon et de calcaire sans abîmer les tuyaux.</p>
<p>Si un joint de robinet fuit lentement, vous pouvez <strong>acheter du fil téflon</strong> (15 DH chez tout quincaillier) et le serrer sur le raccord pour gagner du temps. Ce n'est pas une solution définitive, mais ça peut arrêter une fuite mineure quelques jours le temps d'organiser une vraie réparation.</p>`,
    },
    {
      title: "Plomberie anciens riads et médinas vs immeubles modernes : deux métiers différents",
      content: `<p>Un plombier habitué aux immeubles modernes de Bouskoura ou de Casa Nearshore va se retrouver complètement perdu dans un riad de l'ancienne Médina de Casablanca. Les passages, les matériaux, les techniques — tout est différent.</p>
<p>Dans les immeubles modernes (post-2000), tout est documenté ou presque. Les plans de plomberie sont souvent disponibles chez le syndic. Les matériaux sont standardisés : PER multicouche, PVC évacuation, cuivre pour l'alimentation dans les constructions de qualité. Un problème se diagnostique en 15 minutes et la réparation suit.</p>
<p>Dans les immeubles anciens ou les maisons traditionnelles, c'est une autre histoire. On trouve des tuyaux en plomb (interdit depuis les années 90 mais encore présent dans certaines installations jamais rénovées), des montages artisanaux avec des raccords introuvables dans le commerce moderne, des passages dans les murs impossibles à suivre sans inspection caméra.</p>
<p>Si vous habitez dans un bâtiment construit avant 1980, demandez spécifiquement un plombier avec de l'expérience en rénovation de bâtiments anciens. C'est un profil plus rare et un peu plus cher (compter 15-20% de plus), mais il saura vraiment ce qu'il fait.</p>`,
    },
    {
      title: "Comment éviter les arnaques les plus courantes",
      content: `<p><strong>La fuite inventée.</strong> Un classique : vous appelez pour un robinet qui goutte, le plombier arrive, "découvre" une fuite catastrophique dans la canalisation principale et annonce 2 000 DH de travaux. Contremesure : demandez à voir le problème. Prenez une photo avant et après. Si vous ne comprenez pas ce qui est montré, appelez quelqu'un de confiance pour confirmer.</p>
<p><strong>Le supplément nocturne abusif.</strong> Une majoration de nuit ou de week-end est normale — en France ça va de 25% à 50%. À Casablanca, certains triplent le tarif passé 20h. Demandez toujours le tarif nocturne au moment de l'appel, pas à l'arrivée du technicien.</p>
<p><strong>La pièce "introuvable" qui coûte cher.</strong> Parfois le technicien dit qu'il faut commander une pièce spéciale, facturée 10x son prix réel. Prenez le nom de la pièce, cherchez son prix vous-même sur Jumia Maroc ou chez un fournisseur comme Atlas Sanitaire à Casablanca. Si l'écart est trop grand, changez d'artisan.</p>
<p><strong>Le devis verbal.</strong> Insistez toujours pour un devis écrit, même sur WhatsApp ou SMS. Un message écrit avec le montant et la description du travail suffit. En cas de litige, c'est votre seule protection.</p>`,
    },
  ],

  priceTable: [
    {
      intervention: "Fuite robinet / remplacement joint",
      prixMin: 150,
      prixMoyen: 220,
      prixMax: 350,
    },
    {
      intervention: "Débouchage évier ou lavabo",
      prixMin: 200,
      prixMoyen: 300,
      prixMax: 450,
    },
    {
      intervention: "Débouchage WC",
      prixMin: 250,
      prixMoyen: 350,
      prixMax: 500,
    },
    {
      intervention: "Remplacement chauffe-eau (hors matériel)",
      prixMin: 350,
      prixMoyen: 500,
      prixMax: 700,
    },
    {
      intervention: "Recherche de fuite (inspection)",
      prixMin: 300,
      prixMoyen: 450,
      prixMax: 600,
    },
    {
      intervention: "Remplacement robinet mitigeur",
      prixMin: 200,
      prixMoyen: 300,
      prixMax: 500,
    },
    {
      intervention: "Débouchage colonne principale",
      prixMin: 500,
      prixMoyen: 800,
      prixMax: 1400,
    },
    {
      intervention: "Remplacement WC complet (hors matériel)",
      prixMin: 400,
      prixMoyen: 600,
      prixMax: 900,
    },
    {
      intervention: "Installation salle de bain complète",
      prixMin: 3000,
      prixMoyen: 5000,
      prixMax: 9000,
    },
    {
      intervention: "Remplacement canalisation (par mètre)",
      prixMin: 200,
      prixMoyen: 350,
      prixMax: 600,
    },
  ],

  youtubeVideoId: "dP6XGGf0bLs",
  youtubeVideoTitle: "Comment réparer une fuite de robinet soi-même",

  externalLinks: [
    {
      label: "CNSS – Vérifier l'affiliation d'un artisan",
      url: "https://www.cnss.ma",
      description: "Caisse Nationale de Sécurité Sociale — vérifiez qu'un artisan est bien déclaré.",
    },
    {
      label: "OFPPT – Formation plomberie au Maroc",
      url: "https://www.ofppt.ma",
      description:
        "L'Office de la Formation Professionnelle forme les plombiers marocains — la référence pour les qualifications.",
    },
    {
      label: "Norme marocaine NM plomberie sanitaire",
      url: "https://www.imanor.gov.ma",
      description: "IMANOR publie les normes NM applicables aux installations de plomberie au Maroc.",
    },
    {
      label: "LYDEC – Signaler une fuite sur le réseau public",
      url: "https://www.lydec.ma",
      description:
        "Si la fuite est sur le réseau public (avant compteur), c'est LYDEC qui intervient, pas un plombier privé.",
    },
  ],

  testimonials: [
    {
      name: "Salma B.",
      quarter: "Maarif",
      city: "Casablanca",
      rating: 5,
      text: "Fuite sous l'évier un vendredi soir, je pensais passer un week-end catastrophique. Le plombier est arrivé en 45 minutes, a réglé le problème en 20 minutes pour 280 DH. Honnête, rapide, propre. Je recommande sans hésiter.",
      date: "Mars 2026",
      service: "Fuite robinet",
    },
    {
      name: "Karim A.",
      quarter: "Ain Diab",
      city: "Casablanca",
      rating: 5,
      text: "WC bouché depuis 3 jours. J'avais essayé plusieurs produits, rien à faire. Le technicien a utilisé un furet électrique, réglé en 15 minutes. 350 DH, facture remise, tout parfait.",
      date: "Février 2026",
      service: "Débouchage WC",
    },
    {
      name: "Nadia E.",
      quarter: "Bourgogne",
      city: "Casablanca",
      rating: 4,
      text: "Immeuble des années 70, fuite dans la colonne commune. Le plombier a su immédiatement de quoi il s'agissait, a expliqué le problème clairement au syndic. Intervention sérieuse.",
      date: "Janvier 2026",
      service: "Fuite canalisation",
    },
  ],

  faqs: [
    {
      question: "Quel est le prix moyen d'un plombier à Casablanca en 2026 ?",
      answer:
        "Le tarif horaire d'un plombier à Casablanca oscille entre 150 et 250 DH de l'heure, déplacement souvent compris dans les 30 DH. Pour un débouchage simple, comptez 250-400 DH. Pour une fuite de robinet, 150-300 DH. Les gros travaux comme l'installation d'une salle de bain complète peuvent aller de 3 000 à 9 000 DH selon la surface et les matériaux.",
    },
    {
      question: "Faut-il couper l'eau avant l'arrivée du plombier ?",
      answer:
        "Oui, si vous avez une fuite active sur un tuyau d'alimentation sous pression, fermez immédiatement le robinet d'arrêt le plus proche (sous l'évier, au compteur, etc.). Cela limite les dégâts et peut réduire significativement le coût de l'intervention. Pour une fuite sur l'évacuation (évier qui fuit vers le bas), il suffit de ne pas utiliser l'eau.",
    },
    {
      question: "Y a-t-il des plombiers disponibles la nuit à Casablanca ?",
      answer:
        "Oui, via Allo Maison vous pouvez obtenir un plombier d'urgence 24h/24 à Casablanca. Attendez-vous à une majoration nocturne de 30 à 50% après 21h et les week-ends. Pour une urgence réelle (inondation, canalisation éclatée), ce supplément est largement justifié.",
    },
    {
      question: "Mon chauffe-eau fait du bruit. Dois-je appeler un plombier ?",
      answer:
        "Des claquements ou sifflements sur un chauffe-eau à gaz ou électrique signalent généralement un dépôt de calcaire sur la résistance (électrique) ou des problèmes de pression (gaz). À Casablanca, la dureté de l'eau est élevée (autour de 30°f), ce qui entartre les chauffe-eau en 3-5 ans. Un détartrage préventif coûte environ 300-400 DH et prolonge la vie de l'appareil de plusieurs années.",
    },
    {
      question: "Comment savoir si ma canalisation est bouchée ou cassée ?",
      answer:
        "Bouchée : l'eau s'écoule lentement ou remonte. Cassée : l'eau sort par un endroit inattendu, il y a des traces d'humidité dans les murs, ou votre consommation d'eau a mystérieusement augmenté. Une fuite non visible se détecte facilement : relevez votre compteur le soir, n'utilisez aucun robinet la nuit, relevez le matin. Si le compteur a tourné, vous avez une fuite cachée.",
    },
    {
      question: "Dois-je fournir les pièces ou c'est le plombier qui les apporte ?",
      answer:
        "Les deux options existent. Un artisan sérieux a généralement en stock les pièces courantes (joints, flexibles, siphons, robinets d'arrêt). Pour les pièces spécifiques (chauffe-eau d'une marque particulière, robinetterie haut de gamme), il peut soit vous les commander soit vous donner la référence pour les acheter vous-même. En general, si vous fournissez les pièces, vous économisez 20-30% sur le total.",
    },
    {
      question: "Un plombier peut-il travailler dans un immeuble en copropriété sans autorisation ?",
      answer:
        "Pour une intervention dans votre appartement uniquement (robinet, siphon, WC), aucune autorisation n'est nécessaire. Pour toucher aux parties communes (colonne principale, vanne générale), il faut l'accord du syndic. Si vous ignorez cette règle et que l'intervention cause des dégâts aux parties communes, vous êtes responsable.",
    },
    {
      question: "Comment fonctionne la garantie sur les travaux de plomberie ?",
      answer:
        "Légalement, les travaux de plomberie sont couverts par une garantie biennale (2 ans) au Maroc pour les défauts compromettant la solidité ou la fonctionnalité de l'installation. En pratique, les artisans indépendants offrent rarement une garantie formelle. Insistez pour un devis écrit mentionnant une période de garantie — même 3 mois sur les joints et raccords. Les entreprises de plomberie structurées proposent généralement 6 mois à 1 an.",
    },
    {
      question: "Quelle est la différence entre un plombier et un installateur sanitaire ?",
      answer:
        "En pratique à Casablanca, les deux termes sont souvent utilisés de façon interchangeable. Techniquement, l'installateur sanitaire a reçu une formation OFPPT spécifique incluant les normes et les schémas d'installation. Un plombier peut être plus généraliste (réparations, débouchages). Pour des travaux importants (salle de bain complète, installation chauffe-eau solaire), préférez un installateur sanitaire certifié.",
    },
    {
      question: "L'eau de Casablanca est-elle vraiment responsable de mes problèmes de plomberie ?",
      answer:
        "En grande partie, oui. La dureté de l'eau à Casablanca (mesurée entre 25 et 35°f selon les secteurs) est considérée comme très calcaire. Ce calcaire se dépose dans les canalisations, bouche les crépines, détruit les résistances de chauffe-eau et fait gonfler les joints. Un adoucisseur d'eau ou simplement du vinaigre blanc régulier sur les crépines de robinets peut réduire ces problèmes de 50%.",
    },
    {
      question: "Mon voisin du dessus a inondé mon appartement. Qui paye ?",
      answer:
        "En droit marocain, si la fuite vient de l'appartement de votre voisin (tuyau chez lui, chauffe-eau chez lui), sa responsabilité est engagée. Il doit déclarer à son assurance habitation qui indemnise les dégâts chez vous. Si l'origine est une partie commune (colonne principale), c'est le syndic de copropriété qui est responsable. Faites toujours constater les dégâts par un professionnel et gardez les photos avant tout nettoyage.",
    },
  ],

  tips: [
    "Fermez le robinet d'arrêt général AVANT d'appeler le plombier — ça vous économise souvent 200 DH de dégâts supplémentaires et le plombier peut intervenir plus sereinement.",
    "Photographiez toujours le problème avant l'intervention. En cas de désaccord sur le travail effectué, vous avez un avant/après qui parle pour vous.",
    "À Casablanca, la pression d'eau peut monter à 7 bars dans certains immeubles hauts. Si vos robinets s'usent vite ou si votre ballon chauffe-eau a moins de 8 ans et fuit déjà, faites vérifier la pression — un réducteur de pression à 400 DH peut vous économiser 3 000 DH de remplacement.",
    "Pour les dépôts de calcaire sur les pommeaux de douche : démontez et trempez dans du vinaigre blanc chaud 2 heures. Aussi efficace que n'importe quel produit détartrant à 50 DH.",
    "Avant un grand travaux de plomberie, demandez toujours 2 devis minimum. Pas pour choisir le moins cher — pour comprendre pourquoi les prix diffèrent et ce que chaque artisan propose vraiment.",
    "Si vous achetez un appartement dans un immeuble ancien à Casablanca, faites inspecter la plomberie AVANT la signature. Une caméra d'inspection dans les canalisations coûte 400-600 DH et peut vous révéler 10 000 DH de travaux à prévoir.",
    "Le calcaire dans les canalisations de Casablanca se forme plus vite en hiver quand l'eau est plus froide et les chauffe-eau en mode constant. Un entretien annuel des crépines et têtes de robinets évite beaucoup de remplacements prématurés.",
    "Ne jamais verser de l'huile de cuisine ou de la friture dans l'évier. À Casablanca, les canalisations d'évacuation sont souvent de petit diamètre dans les anciens immeubles — une frite par semaine, et vous boucherez votre canalisation en 6 mois.",
  ],

  localKnowledge: `<p>À Casablanca, la plomberie n'est pas homogène selon les quartiers. Les immeubles bourgeois de <strong>Gauthier et Bourgogne</strong> ont souvent conservé leurs colonnes montantes d'époque — belles façades art déco, tuyauterie des années 60. Les appartements de <strong>Maarif</strong> (surtout autour du boulevard d'Anfa et de la rue Soumaya) ont un parc immobilier des années 70-80 où les chauffe-eau au gaz sont souvent mal ventilés et les siphons sous-dimensionnés. À <strong>Hay Hassani</strong> et <strong>Sidi Bernoussi</strong>, les immeubles collectifs des années 90 ont une plomberie standardisée mais une pression d'eau parfois chaotique — les habitants du dernier étage vivent souvent avec une douche au filet d'eau en été. La zone neuve de <strong>Bouskoura, Californie</strong> et <strong>Anfa Supérieur</strong> présente une plomberie moderne mais souffre d'une eau très calcaire due à sa position géographique. Enfin, <strong>Derb Ghallef</strong> reste la référence pour trouver toutes les pièces de plomberie à Casablanca — robinetterie, tuyaux, raccords, chauffe-eau — souvent moins chers que chez les grandes quincailleries. Si votre plombier doit commander une pièce, demandez-lui d'abord s'il a regardé à Derb Ghallef.</p>`,

  lastUpdated: "Avril 2026",
};

registerRichContent(content);
export default content;
