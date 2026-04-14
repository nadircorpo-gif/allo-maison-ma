import { registerRichContent, type RichPageContent } from "./types";

const content: RichPageContent = {
  slug: "peintre-casablanca",
  metaTitle: "Peintre Casablanca, Prix au m², Marques & Tendances 2026",
  metaDescription:
    "Trouver un peintre professionnel à Casablanca. Prix peinture au m², marques Colorado, Seigneurie, Astral, préparation des murs, tadelakt, tendances couleurs 2026. Guide complet.",
  h1: "Peintre à Casablanca : prix au m² honnête, finitions propres, pros vérifiés",
  heroText:
    "Besoin d'un peintre de confiance à Casablanca ? Peinture intérieure, extérieure, rénovation ou finitions, nos peintres vérifiés interviennent dans tous les quartiers.",

  sections: [
    {
      title: "Types de peinture disponibles au Maroc, ne vous perdez pas",
      content: `<p>Chez Colorado (le vendeur numéro 1 au Maroc), chez Bricorama ou chez votre marchand de peinture local à Ain Sebaa, vous allez trouver des dizaines de références. Voici comment vous y retrouver :</p>
<p><strong>Peinture vinylique / acrylique</strong>, le standard pour les murs intérieurs. Base aqueuse, séchage rapide, faible odeur. Les gammes "mat" donnent un résultat sans reflet, les gammes "satin" ont un léger brillant qui facilite le nettoyage. C'est ce que vous utilisez dans les chambres, séjours, couloirs.</p>
<p><strong>Peinture lessivable</strong>, pour les pièces qui prennent des coups : cuisine, couloir, chambres d'enfants. Plus résistante à l'humidité et au frottement. Légèrement plus brillante que le mat standard.</p>
<p><strong>Peinture alkyde / glycéro</strong>, à base de solvant, très durable, brillant élevé. Utilisée pour les boiseries, fenêtres, volets, et partout où il faut une surface dure et lavable. Sèche plus lentement, odeur forte pendant 24-48h. À Casablanca, privilégiez une bonne ventilation en peignant au glycéro.</p>
<p><strong>Sous-couche</strong>, souvent négligée, toujours indispensable sur un mur neuf, un mur très absorbant, ou un changement radical de couleur (passer du bordeaux au blanc sans sous-couche, c'est 3 ou 4 couches au lieu de 2). Ne pas sauter cette étape.</p>
<p><strong>Peinture façade</strong>, formulée pour résister aux UV, à la pluie, aux variations thermiques. Ne jamais utiliser une peinture intérieure sur une facade, elle n'est pas conçue pour ça et décollera en quelques mois.</p>`,
    },
    {
      title: "Peinture intérieure vs extérieure : pas du tout la même chose",
      content: `<p>L'erreur classique du bricoleur casablancais du dimanche : acheter la même peinture pour tout. C'est une fausse économie qui coûte cher.</p>
<p>La <strong>peinture extérieure</strong> doit résister à la pluie de l'Atlantique (à Casablanca, il peut pleuvoir fort d'octobre à mars), aux UV intenses du soleil marocain en été, aux variations thermiques importantes entre jour et nuit, et à la pollution urbaine. Elle contient des résines spéciales et des additifs fongicides et algaecides. Son prix est justifié, comptez 80 à 150 DH/L pour une bonne peinture facade.</p>
<p>La <strong>peinture intérieure</strong> n'a pas ces contraintes. Elle est formulée pour être plus opaque, sécher plus vite, et dégager moins de COV (composés organiques volatils) dans un espace fermé.</p>
<p>Utiliser de la peinture intérieure sur une facade ? Dans 6 à 18 mois, vous avez des écaillures, des moisissures, et un refait complet à financer. Le surcoût d'une bonne peinture facade est toujours rentable.</p>
<p>Autre cas particulier : les <strong>pièces humides</strong> (salle de bain, cuisine). Utilisez des peintures spéciales "pièces humides" ou des peintures avec traitement anti-moisissures. Casablanca, avec son humidité maritime, est propice aux moisissures dans les salles de bain mal ventilées.</p>`,
    },
    {
      title: "Colorado, Seigneurie, Astral, Tollens : quelle marque choisir au Maroc ?",
      content: `<p><strong>Colorado</strong>, c'est la marque marocaine numéro 1, produite localement, disponible partout au Maroc. Rapport qualité/prix excellent, gamme complète (intérieur, extérieur, décoratif, bois). Les pots de 5L et 15L sont les formats les plus courants. Pour 90% des chantiers résidentiels à Casablanca, Colorado fait parfaitement l'affaire. Leurs showrooms à Ain Sebaa et dans plusieurs points de vente en ville proposent aussi un service de teinte personnalisée.</p>
<p><strong>Seigneurie</strong> (groupe AkzoNobel), marque professionnelle française très présente au Maroc via les négoces de matériaux. Légèrement au-dessus de Colorado en termes de qualité sur les produits spéciaux (résines, peintures déco), mais plus chère et moins disponible en grande surface.</p>
<p><strong>Astral</strong> (groupe AkzoNobel aussi), le milieu de gamme accessible, très utilisé par les artisans peintres casablancais pour les chantiers locatifs et les rénovations standards. Bon rapport qualité/prix.</p>
<p><strong>Tollens</strong>, haut de gamme français, présent dans certains Points de vente spécialisés à Casablanca. Pour les projets premium où la qualité de finition et la richesse de la gamme de teintes comptent.</p>
<p><strong>Valentine</strong> (Espagne), disponible dans certains magasins, gamme correcte.</p>
<p>Pour un appartement standard à Casablanca : Colorado ou Astral en intérieur, Colorado Facade pour l'extérieur. Pour un projet haut de gamme avec des teintes personnalisées et des finitions particulières, Seigneurie ou Tollens valent l'investissement supplémentaire.</p>`,
    },
    {
      title: "La préparation des murs : l'étape que tout le monde néglige",
      content: `<p>On le répète à tous les peintres en formation : <strong>70% d'un bon résultat vient de la préparation</strong>. La peinture la plus chère du monde, posée sur un mur fissuré, humide ou mal enduit, donnera un résultat décevant en quelques mois.</p>
<p>Ce que comprend une bonne préparation :</p>
<ul>
  <li><strong>Dépose de l'ancienne peinture</strong> si elle est cloquée, écaillée ou au plomb (dans les très vieux appartements). Ne pas peindre par-dessus une peinture qui se détache.</li>
  <li><strong>Rebouchage des fissures et trous</strong> avec du mastic ou de l'enduit de rebouchage. Les fissures fines (cheveux) se rebouchent facilement. Les fissures larges ou actives peuvent indiquer un problème structural, à signaler avant de peindre.</li>
  <li><strong>Ponçage</strong> pour uniformiser la surface et faciliter l'adhérence de la nouvelle peinture.</li>
  <li><strong>Traitement des moisissures</strong>, si vous voyez des taches noires, il faut traiter avec un fongicide avant toute chose. Peindre par-dessus ne fait que masquer le problème temporairement.</li>
  <li><strong>Application d'une sous-couche</strong> sur les murs neufs ou très poreux.</li>
</ul>
<p>Un peintre sérieux vous dira toujours le temps qu'il prévoit pour la préparation dans son devis. Si quelqu'un vous dit "deux jours pour tout peindre" sans mentionner la préparation, posez la question directement.</p>`,
    },
    {
      title: "Combien de temps pour peindre un appartement à Casablanca ?",
      content: `<p>Estimation réaliste pour un artisan peintre professionnel travaillant seul :</p>
<ul>
  <li><strong>Studio (30-40 m²)</strong> : 2 à 3 jours (préparation + 2 couches)</li>
  <li><strong>2 pièces (50-70 m²)</strong> : 3 à 5 jours</li>
  <li><strong>3 pièces (80-100 m²)</strong> : 5 à 7 jours</li>
  <li><strong>4 pièces + (120 m² et plus)</strong> : 8 à 12 jours</li>
</ul>
<p>Ces délais comprennent : protection des sols et meubles (si meublé), préparation des murs, sous-couche si nécessaire, deux couches de finition, nettoyage. Les délais doublent environ si le logement est meublé et que les meubles doivent être protégés ou déplacés.</p>
<p>Méfiance avec les artisans qui vous promettent de tout faire en une journée pour un 3 pièces, c'est soit une couche unique (résultat médiocre), soit du travail bâclé.</p>
<p>Autre facteur : le temps de séchage entre les couches. En été à Casablanca (chaud et ventilé), 4 à 6 heures entre couches. En hiver (humide et frais), comptez 12 à 24 heures. Un artisan qui applique la deuxième couche trop tôt obtient un résultat irrégulier.</p>`,
    },
    {
      title: "Les tendances couleurs 2026 pour les intérieurs marocains",
      content: `<p>Les tendances mondiales filtrent au Maroc, mais avec une identité locale qui persiste. Ce qu'on voit le plus dans les nouvelles décorations casablancaises en 2026 :</p>
<p><strong>Le terracotta et les ocres chauds</strong>, un retour aux racines marocaines. Ces tons rappellent les pisé et les médinas, et fonctionnent bien avec les meubles en bois naturel et le zellige. Pas dans toutes les pièces, une chambre en terracotta peut être étouffante. Idéal pour un salon ou un couloir.</p>
<p><strong>Le vert sauge et les verts sourds</strong>, très tendance depuis 2023, toujours présents. Ces verts doux se marient bien avec la lumière atlantique de Casablanca (qui est différente de la lumière méditerranéenne).</p>
<p><strong>Le blanc cassé / blanc chaud</strong>, reste la valeur sure pour les petites surfaces et les pièces sombres. À Casablanca, les appartements avec peu de lumière naturelle (rez-de-chaussée, orientés nord) gagnent vraiment à avoir des murs clairs.</p>
<p><strong>Les décors géométriques discrets</strong>, un mur d'accent avec un motif géométrique simple (inspiré des zelliges), le reste uni. Ça donne du caractère sans surcharger.</p>
<p>Ce qui disparaît : les murs uniformément blancs cassé dans chaque pièce, les peintures à l'aspect vieilli artificiel, les couleurs flashy isolées sans cohérence globale.</p>`,
    },
    {
      title: "Peinture décorative et tadelakt, le savoir-faire marocain",
      content: `<p>Le <strong>tadelakt</strong> est un enduit traditionnel marocain à base de chaux hydraulique de Marrakech, poli à la pierre noire puis traité au savon. Imperméable naturellement, résistant, et d'une beauté incomparable. On le trouve partout dans les hammams, les riads, et de plus en plus dans les salles de bain contemporaines des appartements haut de gamme de Casablanca.</p>
<p>Le tadelakt, ce n'est pas un produit qu'on pose en 2 heures. C'est une technique artisanale qui demande minimum 2 à 3 jours de travail par pièce, une maîtrise spécifique, et les bons matériaux. Un vrai tadelakt de qualité coûte entre 350 et 700 DH/m² posé. Méfiez-vous des "tadelakt" à 80 DH/m², c'est soit de l'enduit teinté, soit du travail bâclé qui se craquèlera en quelques mois.</p>
<p>D'autres techniques décoratives populaires à Casablanca :</p>
<ul>
  <li><strong>Stucco Veneziano</strong>, enduit à la chaux vive avec effet marbré. Élégant dans les entrées et salons. 300 à 600 DH/m².</li>
  <li><strong>Béton ciré</strong>, sur sols et murs, très tendance dans les intérieurs contemporains. 400 à 800 DH/m² selon l'application.</li>
  <li><strong>Peinture à l'éponge ou chiffonnée</strong>, moins tendance qu'avant mais encore demandée dans certains projets de décoration.</li>
</ul>
<p>Pour ces techniques décoratives, assurez-vous que l'artisan a des <strong>références photographiques</strong> de ses chantiers précédents. C'est un domaine où la différence entre un bon et un mauvais artisan est immédiatement visible.</p>`,
    },
    {
      title: "Où acheter sa peinture à Casablanca, les bonnes adresses",
      content: `<p>Pour les particuliers :</p>
<p><strong>Colorado</strong> a plusieurs points de vente dont un grand showroom à Ain Sebaa. Avantage : service de teinte personnalisée sur place, conseils techniques. Les prix sont fixes, transparents, et la qualité est constante.</p>
<p><strong>Bricorama et Mr Bricolage</strong> (Ain Sebaa, Hay Riad, etc.), bonne sélection de marques, personnel généralement formé pour conseiller. Pratique pour acheter peinture + accessoires (rouleaux, bâches, masques) en une seule fois.</p>
<p><strong>Les négoces de matériaux de construction</strong> (Bricoma, El Hassane...), là où s'approvisionnent les artisans. Prix souvent légèrement inférieurs aux grandes surfaces, mais les conseils sont moins standardisés. Utile si vous savez exactement ce que vous voulez.</p>
<p><strong>Les marchands de peinture locaux</strong> dans chaque quartier, souvent des petites boutiques qui connaissent bien les produits locaux. Pratiques pour les petites quantités et les dépannages rapides.</p>
<p>Pour les artisans professionnels : beaucoup passent par des grossistes à Derb Omar ou dans la zone industrielle de Ain Sebaa où les prix de gros sont nettement moins chers. Quand vous demandez un devis, clarifiez si la peinture est incluse (fournie par l'artisan) ou si vous l'achetez vous-même.</p>`,
    },
    {
      title: "Scénario type : nouveau bail à Sidi Maarouf, murs bordeaux à effacer",
      content: `<p>Vous venez de signer le bail d'un appartement à Sidi Maarouf. L'ancien locataire avait des goûts particuliers, murs bordeaux, plafond gris foncé, et une salle de bain peinte en orange. Avant de poser un seul meuble, il faut tout repeindre. Mais par où commencer ? Quelle peinture ? Quel artisan ? Combien ça va coûter ? Ce guide vous accompagne de A à Z pour un chantier de peinture réussi à Casablanca.</p>`,
    },
  ],

  priceTable: [
    { intervention: "Peinture simple 1 couche (main-d'oeuvre seule)", prixMin: 15, prixMoyen: 20, prixMax: 30 },
    { intervention: "Peinture 2 couches + sous-couche (m.d.o.)", prixMin: 35, prixMoyen: 50, prixMax: 70 },
    { intervention: "Peinture plafond (2 couches)", prixMin: 40, prixMoyen: 55, prixMax: 80 },
    { intervention: "Peinture façade extérieure (m.d.o.)", prixMin: 50, prixMoyen: 70, prixMax: 100 },
    { intervention: "Tadelakt (fourniture + pose)", prixMin: 350, prixMoyen: 500, prixMax: 700 },
    { intervention: "Stucco Veneziano (fourniture + pose)", prixMin: 300, prixMoyen: 450, prixMax: 600 },
    { intervention: "Sous-couche (fourniture + pose)", prixMin: 20, prixMoyen: 30, prixMax: 45 },
    { intervention: "Dépose ancienne peinture / ponçage", prixMin: 25, prixMoyen: 35, prixMax: 55 },
    { intervention: "Rebouchage fissures + préparation mur", prixMin: 20, prixMoyen: 30, prixMax: 50 },
  ],


  externalLinks: [
    {
      label: "Colorado Maroc, peinture numéro 1 au Maroc",
      url: "https://www.colorado.ma",
      description: "Site officiel Colorado avec gammes, teintes et points de vente à Casablanca",
    },
    {
      label: "Seigneurie Maroc",
      url: "https://www.seigneurie.com",
      description: "Produits professionnels de peinture AkzoNobel disponibles au Maroc",
    },
    {
      label: "Bricorama Maroc",
      url: "https://www.bricorama.ma",
      description: "Achat peinture et accessoires dans les magasins Bricorama de Casablanca",
    },
  ],

  testimonials: [
    {
      name: "Samira L.",
      quarter: "Sidi Maarouf",
      city: "Casablanca",
      rating: 5,
      text: "Appartement de 90 m² entièrement repeint après déménagement. L'artisan a passé une journée à préparer les murs (rebouchage, sous-couche) avant de commencer. Résultat impeccable, pas une seule coulure, les angles sont parfaits. 4 500 DH pour tout, main-d'oeuvre incluse. Je suis ravie.",
      date: "Janvier 2026",
      service: "Peinture appartement complet",
    },
    {
      name: "Hassan R.",
      quarter: "Anfa",
      city: "Casablanca",
      rating: 5,
      text: "Tadelakt dans la salle de bain principale. L'artisan avait des photos de ses chantiers précédents, c'était rassurant. Travail sur 3 jours, très soigné. La salle de bain est maintenant magnifique, on a l'impression d'être dans un riad. Prix 480 DH/m² tout compris, équitable pour la qualité.",
      date: "Mars 2026",
      service: "Tadelakt salle de bain",
    },
    {
      name: "Leila M.",
      quarter: "Val d'Anfa",
      city: "Casablanca",
      rating: 4,
      text: "Peinture de la villa complète, intérieur et facade. Long chantier (10 jours) mais bien géré. J'ai fourni la peinture moi-même (Colorado facade + Seigneurie intérieur) et l'artisan a fait la main-d'oeuvre. Légèrement dépassé sur le délai à cause de pluies mi-chantier, mais compréhensible.",
      date: "Octobre 2025",
      service: "Peinture villa complète",
    },
  ],

  faqs: [
    {
      question: "Quel est le prix moyen pour peindre un appartement de 3 pièces à Casablanca ?",
      answer:
        "Pour un appartement de 3 pièces (environ 80-100 m² de surface au sol), la peinture complète intérieure en 2 couches avec préparation coûte entre 4 000 et 8 000 DH main-d'oeuvre incluse (sans la fourniture peinture) ou 7 000 à 14 000 DH fourniture et pose. L'écart dépend de l'état initial des murs, du nombre de pièces à colorer différemment, et du niveau de finition souhaité.",
    },
    {
      question: "Vaut-il mieux acheter la peinture soi-même ou laisser l'artisan s'en charger ?",
      answer:
        "Les deux ont des avantages. Si vous achetez vous-même, vous contrôlez la marque et la qualité exacte. Si l'artisan fournit, il se charge des quantités et des allers-retours, mais sa marge est incluse dans le prix. Pour les grands chantiers, acheter soi-même après devis sur quantité est souvent 20-30% moins cher en matériaux.",
    },
    {
      question: "Combien de litres de peinture pour un appartement de 80 m² ?",
      answer:
        "Pour les murs intérieurs d'un 80 m² (surface à peindre environ 200-250 m² avec murs et plafonds), comptez 25 à 35 litres pour une couche. Pour 2 couches : 50 à 70 litres. Un pot de 15L Colorado coûte environ 200-280 DH. Prévoyez toujours 10% de surplus pour les retouches.",
    },
    {
      question: "Peut-on peindre sur du tadelakt existant ?",
      answer:
        "Techniquement oui, mais c'est dommage d'un point de vue esthétique et pratique, la peinture n'adhère pas parfaitement sur une surface polie. Mieux vaut soit rénover le tadelakt (repolissage + savon noir), soit le déposer si l'état est vraiment mauvais. Un spécialiste peut évaluer l'état en quelques minutes.",
    },
    {
      question: "Comment choisir la couleur sans se tromper ?",
      answer:
        "Testez toujours sur le mur avant de vous lancer. Achetez un petit pot de teinte (ou demandez un échantillon) et peignez une surface de 50x50 cm. Regardez la couleur à différents moments de la journée (matin, midi, soir), la lumière change beaucoup à Casablanca. Une couleur qui plaît sur un nuancier peut surprendre une fois sur un mur entier.",
    },
    {
      question: "Quelle peinture pour une salle de bain à Casablanca ?",
      answer:
        "Il faut absolument une peinture spéciale pièces humides avec traitement anti-moisissures intégré. Les marques Colorado, Seigneurie et Astral proposent toutes des gammes spécifiques. Alternativement, le tadelakt est la solution traditionnelle marocaine : naturellement imperméable et esthétiquement irremplaçable.",
    },
    {
      question: "Combien de couches de peinture sont nécessaires en général ?",
      answer:
        "Standard : 1 sous-couche + 2 couches de finition, soit 3 couches au total. Si les murs sont en très bon état et que vous changez peu la couleur, 2 couches peuvent suffire. Si le mur est très poreux, très sombre, ou neuf, la sous-couche est indispensable. Les artisans qui vont vite font souvent 1 couche, le résultat se voit après 6 mois.",
    },
    {
      question: "Peut-on peindre en hiver à Casablanca ?",
      answer:
        "Oui, mais avec des précautions. L'humidité casablancaise en hiver (décembre-février) ralentit le séchage et peut créer des problèmes de film de peinture. Il faut bien ventiler, ne pas peindre par temps de pluie ou si l'humidité dépasse 80%, et laisser plus de temps entre les couches (24h minimum). Les professionnels préfèrent travailler d'avril à octobre.",
    },
    {
      question: "Comment éliminer les moisissures avant de peindre ?",
      answer:
        "Nettoyez d'abord avec une solution d'eau de Javel diluée (1 volume de Javel pour 9 volumes d'eau), laissez agir 20 minutes, puis rincez. Séchez complètement. Appliquez ensuite un primaire anti-moisissures avant la peinture. Si les moisissures réapparaissent rapidement après peinture, c'est un problème d'humidité structurel (infiltration, condensation) à traiter à la source.",
    },
    {
      question: "Le tadelakt est-il adapté au sol de douche ?",
      answer:
        "Oui, mais il faut une pose parfaite et un traitement au savon noir régulier. Le tadelakt de sol en douche est magnifique mais exigeant : il faut que la pente vers le siphon soit correcte, que le tadelakt soit posé sur un support parfaitement sain et stable, et qu'il soit traité 2-3 fois par an. Un tadelakt de sol mal posé ou non entretenu se craquèle et absorbe l'eau.",
    },
  ],

  tips: [
    "Testez toujours la couleur sur 50x50 cm de mur et observez-la à différentes heures, la lumière atlantique de Casablanca change beaucoup entre matin et soir.",
    "Ne peignez jamais par-dessus une peinture qui s'écaille, grattez et préparez correctement, sinon la nouvelle peinture tombera en même temps.",
    "La sous-couche n'est pas optionnelle sur un mur neuf ou après un grand changement de couleur, c'est elle qui garantit l'adhérence et l'uniformité du résultat.",
    "Pour les moisissures en salle de bain, traitez toujours à la source (ventilation, étanchéité) avant de repeindre, sinon elles reviennent en quelques mois.",
    "Si vous gérez vous-même l'achat de peinture, demandez toujours un devis sur quantité précis à l'artisan, surestimer ou sous-estimer coûte cher.",
    "Pour une villa ou un appartement avec des plafonds hauts, l'artisan a besoin d'échafaudage ou d'escabeau adapté, vérifiez qu'il vient avec le matériel nécessaire.",
    "Protégez toujours les sols avec une bâche plastique et du scotch de masquage sur les plinthes, un peintre professionnel le fait systématiquement. Si quelqu'un ne protège pas, c'est un signal.",
  ],

  localKnowledge: `<p>À Casablanca, le marché de la peinture a ses spécificités locales bien marquées. <strong>Colorado</strong> est omniprésent et son showroom d'<strong>Ain Sebaa</strong> est une référence pour tout le secteur, c'est là que les artisans s'approvisionnent pour les grandes quantités. Les immeubles anciens de <strong>Bourgogne et Gauthier</strong> ont souvent des murs avec plusieurs couches de peinture calcaire ou à la chaux, la préparation est plus longue et complexe que dans les constructions modernes. Dans les nouveaux quartiers comme <strong>Sidi Maarouf, CIL, Bouskoura</strong>, les appartements récents ont parfois des murs en staff (placoplâtre léger) qui nécessitent un traitement différent des murs en béton ou parpaing. Les <strong>villas de Californie et d'Anfa</strong> sont souvent des chantiers premium où les propriétaires n'hésitent pas à investir dans des finitions tadelakt ou béton ciré, le bassin de peintres spécialisés dans ces techniques à Casa est assez limité, donc les délais peuvent être longs pour les bons artisans.</p>`,

  lastUpdated: "Avril 2026",
};

registerRichContent(content);
export default content;
