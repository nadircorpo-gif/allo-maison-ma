import { registerRichContent, type RichPageContent } from "./types";

const content: RichPageContent = {
  slug: "bricoleur-marrakech",
  metaTitle: "Bricoleur Marrakech – Montage Meubles, Réparations & Prix 2026 | Allo Maison",
  metaDescription:
    "Bricoleur à Marrakech : montage meubles riad, petites réparations, pose d'étagères. Prix en DH, intervention rapide Médina, Guéliz, Targa. Artisans vérifiés.",
  h1: "Bricoleur à Marrakech : petits travaux et montage meubles au meilleur prix",
  heroText:
    "Besoin d'un bricoleur de confiance à Marrakech ? Montage de meubles, petits travaux, réparations ou installations, nos bricoleurs vérifiés interviennent dans tous les quartiers.",

  sections: [
    {
      title: "Bricolage à Marrakech : entre tradition et modernité",
      content: `<p>Marrakech est une ville à double visage : d'un côté la Médina millénaire avec ses riads, ses artisans traditionnels et ses ruelles enchevêtrées, de l'autre Guéliz et les nouveaux quartiers avec leurs appartements modernes, leurs résidences fermées et leurs villas contemporaines. Ces deux mondes coexistent et le bricoleur à Marrakech doit maîtriser les deux registres.</p>
<p>Dans la <strong>Médina</strong>, intervenir nécessite une vraie connaissance des matériaux traditionnels : le tadelakt (enduit à la chaux poli), le bejmat (carrelage en terre cuite), le gébs (plâtre sculpté), le bois cèdre des menuiseries. Un clou planté sans précaution dans un mur de pisé peut fissurer toute une paroi. Une perceuse utilisée sans précaution sur un mur en briques anciennes peut créer une cavité inattendue.</p>
<p>Dans <strong>Guéliz</strong> et les immeubles modernes, on retrouve des matériaux plus standardisés, béton, carreaux céramique, cloisons en briques creuses, qui répondent aux techniques de bricolage habituelles. Mais les particularités locales subsistent : le béton marocain a souvent une texture différente du béton français, et les chevilles standard européennes ne tiennent pas toujours aussi bien.</p>
<p>La <strong>chaleur extrême de Marrakech</strong> a aussi un impact sur le bricolage : les colles et mastics ont besoin d'être adaptés à des températures pouvant dépasser 45°C en été (certaines colles standard ramollissent et perdent leur adhérence). Les bois se dilatent et se rétractent selon les saisons plus fortement qu'en Europe. Un bricoleur expérimenté à Marrakech le sait et choisit ses matériaux en conséquence.</p>`,
    },
    {
      title: "Montage de meubles dans les riads : le défi des escaliers et des portes",
      content: `<p>Le montage de meubles dans un riad de la Médina est une discipline à part entière. Ce qui paraît simple, monter une armoire, installer une bibliothèque, devient un exercice de calcul spatial et d'ingéniosité dans un riad aux couloirs étroits et aux escaliers impossibles.</p>
<h3>Le problème des escaliers en colimaçon</h3>
<p>Les escaliers des riads anciens ont souvent une largeur de 60 à 75 cm et un rayon de courbure très serré. Un meuble de 80 cm de large (une armoire standard IKEA) ne peut tout simplement pas passer dans ces conditions. Les solutions :</p>
<ul>
<li><strong>Démontage maximal</strong> : toutes les parties démontables doivent l'être. Les tablettes, tiroirs, portes, pieds, tout monte séparément.</li>
<li><strong>Passage par la terrasse</strong> : pour les étages supérieurs, certains meubles montent par la terrasse avec des cordes et des sangles, en les hissant depuis l'extérieur. Technique courante dans la Médina, mais qui nécessite au minimum 3 personnes et du matériel adapté.</li>
<li><strong>Les meubles sur mesure</strong> : pour les riads en location ou les maisons d'hôtes, de nombreux propriétaires font fabriquer des meubles sur mesure par des menuisiers locaux, dimensionnés précisément pour les espaces du riad. Souvent la solution la plus élégante et la plus pratique.</li>
</ul>
<h3>Les portes anciennes</h3>
<p>Les portes des riads anciens ont des dimensions non standardisées. Une porte qui fait 85 cm de large en façade peut avoir un embrasure qui réduit le passage effectif à 75 cm. Toujours mesurer le passage le plus étroit (souvent le bord inférieur de la porte si le sol a été surélevé lors de rénovations successives).</p>
<h3>Les meubles plats : avantage IKEA</h3>
<p>Pour les riads, les meubles en kit de type IKEA ont un avantage paradoxal : les pièces séparées passent dans les escaliers les plus étroits, et le résultat final peut être assemblé sur place. Un bon bricoleur peut monter une armoire PAX complète dans une chambre de riad en 3-4 heures, même avec un escalier impossible à l'entrée.</p>`,
    },
    {
      title: "Les artisans de la Médina : un réseau unique",
      content: `<p>La Médina de Marrakech abrite l'un des plus grands concentrations d'artisans spécialisés au monde. Cette richesse artisanale est une ressource incomparable pour quiconque rénove ou entretient un riad, à condition de savoir comment y accéder et comment travailler avec ce réseau.</p>
<h3>Les souks d'artisans spécialisés</h3>
<p>La Médina est organisée par corps de métier, une organisation héritée de la tradition millénaire des villes arabo-berbères :</p>
<ul>
<li><strong>Le souk des teinturiers (Souk Sebbaghine)</strong> : les artisans du textile et des matières colorées, près de Bab Fteuh</li>
<li><strong>La Kissaria</strong> : les tissus et vêtements, au coeur de la Médina</li>
<li><strong>Le souk des Ferronniers (Souk Haddadine)</strong> : fers forgés, grilles, ferronnerie décorative</li>
<li><strong>Le souk des Menuisiers (Souk Chouari)</strong> : bois sculpté, mobilier traditionnel, réparations menuiserie</li>
<li><strong>Bab Doukkala et Rahba Kedima</strong> : matériaux de construction, plâtre, chaux, pigments naturels</li>
</ul>
<p>Ces artisans ont des tarifs généralement inférieurs aux prestataires modernes, mais la communication peut être plus complexe (certains ne parlent qu'arabe ou darija), les délais moins prévisibles et la qualité très variable d'un artisan à l'autre.</p>
<h3>Trouver un bon artisan en Médina</h3>
<p>Le meilleur moyen reste le bouche-à-oreille. Les autres propriétaires de riads dans votre quartier, les gérants de maisons d'hôtes voisines, ou votre "qaid" de quartier sont les meilleures sources de recommandations. Un artisan recommandé par un voisin satisfait vaut toutes les plateformes en ligne.</p>
<p>Via Allo Maison, les bricoleurs et artisans partenaires à Marrakech sont vérifiés et évalués par les clients précédents, un gage de confiance important dans une ville où les "faux guides" et les intermédiaires opportunistes existent aussi dans le secteur des services à domicile.</p>`,
    },
    {
      title: "Prix bricolage Marrakech 2026",
      content: `<p>Les tarifs des bricoleurs à Marrakech sont légèrement plus variables qu'ailleurs en raison du double marché : les prestataires "modernes" avec forfaits clairs et les artisans traditionnels qui fonctionnent plutôt au marchandage. Voici les prix du marché actuel pour les services standardisés :</p>
<p>Les <strong>suppléments spécifiques aux riads</strong> sont courants : passage par terrasse, démontage/remontage exceptionnel d'un meuble, travail dans un espace très contraint, comptez +50 à +100% sur le tarif standard pour ces cas particuliers.</p>
<p>Bonne nouvelle : pour le montage de meubles simples (tables, chaises, petites étagères), les tarifs à Marrakech sont généralement dans la moyenne nationale ou légèrement inférieurs. La concurrence entre artisans est forte.</p>`,
    },
    {
      title: "Rénovation de riad : quand faire appel à un bricoleur vs un architecte",
      content: `<p>C'est une question que se posent beaucoup de propriétaires de riads, surtout les étrangers qui découvrent la complexité des réglementations locales et la richesse des techniques artisanales. La réponse dépend de l'ampleur des travaux.</p>
<h3>Ce qu'un bricoleur ou artisan peut faire sans architecte</h3>
<ul>
<li>Montage et installation de mobilier</li>
<li>Pose de luminaires, interrupteurs, petite électricité</li>
<li>Réparations plomberie simples (joint, robinetterie)</li>
<li>Pose de carrelage ou bejmat dans une pièce</li>
<li>Peinture intérieure (murs lisses)</li>
<li>Pose d'étagères, fixation murale d'objets</li>
<li>Réparations menuiserie (portes qui grincent, serrures, volets)</li>
<li>Montage de structures simples en métal ou bois (pergola de terrasse)</li>
</ul>
<h3>Ce qui nécessite un architecte ou un maître d'oeuvre</h3>
<ul>
<li>Tout abattement de mur porteur</li>
<li>Modification de la structure du riad (escaliers, arches)</li>
<li>Extension ou surélévation</li>
<li>Réfection complète de la plomberie ou de l'électricité</li>
<li>Travaux touchant aux éléments patrimoniaux classés</li>
<li>Tout projet nécessitant un permis de construire (pour les biens en Médina, la commune peut être très stricte)</li>
</ul>
<h3>Le cas particulier des riads en Médina</h3>
<p>Les riads situés en Médina de Marrakech sont soumis à des règles de protection du patrimoine gérées par la commune de Marrakech et parfois par l'UNESCO (pour les zones classées). Avant tout travaux de transformation, il est recommandé de se renseigner auprès de l'arrondissement concerné. Les <strong>Agence Urbaine de Marrakech</strong> publient des guides sur les travaux autorisés en Médina.</p>`,
    },
    {
      title: "Les meilleurs magasins de bricolage à Guéliz et Marrakech",
      content: `<p>Trouver les bons matériaux à Marrakech est plus facile qu'il y a dix ans. La ville dispose maintenant d'une offre complète pour tous les besoins de bricolage et de rénovation.</p>
<h3>Les grandes surfaces de bricolage</h3>
<p><strong>Bricorama (Route de Casablanca, Marrakech)</strong> : la plus grande surface de bricolage de la ville, sur la route nationale vers Casablanca. Large choix d'outillage, quincaillerie, matériaux de construction, peinture, plomberie, électricité. Prix compétitifs, personnel généralement compétent.</p>
<p><strong>Brico Maroc (Boulevard Mohammed VI, Guéliz étendu)</strong> : bien approvisionné en matériaux de construction et en carrelages. Bonne sélection de produits pour la rénovation.</p>
<h3>Les spécialistes de la Médina et du marché traditionnel</h3>
<p><strong>Le Mellah (quartier juif historique)</strong> : autour du marché couvert du Mellah, on trouve des quincailleries traditionnelles avec visserie, serrurerie et petite quincaillerie à des prix très compétitifs.</p>
<p><strong>Bab Doukkala</strong> : aux abords de cette porte de la Médina, des dizaines de petits vendeurs proposent tout ce qu'il faut pour la construction et la rénovation traditionnelle, chaux, pigments, tadelakt, bejmat, briques.</p>
<h3>Les fournisseurs de matériaux spécifiques aux riads</h3>
<ul>
<li>Tadelakt et chaux hydraulique : cherchez les négociants en matériaux à Bab Doukkala et dans les faubourgs de la Médina</li>
<li>Zelliges artisanaux : les coopératives de Fès livrent à Marrakech, mais vous pouvez aussi trouver des zelligeurs locaux autour de Bab El Khemis</li>
<li>Bois cèdre sculpté : les menuisiers du Souk Chouari travaillent le cèdre de l'Atlas depuis des générations</li>
<li>Bejmat (carreaux terre cuite) : plusieurs fabriques artisanales existent autour de Marrakech</li>
</ul>`,
    },
    {
      title: "Petites réparations pour maisons d'hôtes et riads en location",
      content: `<p>Les maisons d'hôtes et riads en location à Marrakech ont un besoin particulier en matière de bricolage et de maintenance : une fréquence d'utilisation intense, des clients exigeants, et la nécessité d'intervenir rapidement pour éviter les mauvaises reviews.</p>
<h3>Le programme de maintenance préventive</h3>
<p>Les gestionnaires de maisons d'hôtes professionnels à Marrakech établissent un programme de maintenance récurrent :</p>
<ul>
<li><strong>Mensuel</strong> : vérification et resserrage des poignées de portes, serrures, robinetterie, huile sur les charnières</li>
<li><strong>Trimestriel</strong> : vérification des fixations murales (miroirs, tableaux, étagères), état des joints de douche et baignoire, état des moustiquaires</li>
<li><strong>Annuel</strong> : retouches peinture, révision des équipements (climatisation, chauffe-eau), état général de la fontaine du patio</li>
</ul>
<h3>Les réparations les plus fréquentes</h3>
<p>Après des années à intervenir dans les riads marrakchis, voici les interventions les plus demandées par les gestionnaires de maisons d'hôtes :</p>
<ul>
<li>Serrures et poignées défaillantes (usure rapide avec la rotation des locataires)</li>
<li>Joints de douche à remplacer (le tadelakt est beau mais les joints périphériques vieillissent)</li>
<li>Moustiquaires à réparer ou remplacer (indispensables à Marrakech en été)</li>
<li>Pose ou remplacement de téléviseurs muraux</li>
<li>Fixation de miroirs dans les salles de bain</li>
<li>Réparation ou remplacement de volets et persiennes</li>
</ul>
<h3>Le concept de "bricoleur attitré"</h3>
<p>Les meilleures maisons d'hôtes de Marrakech ont un artisan-bricoleur de confiance disponible rapidement, avec qui elles travaillent régulièrement. Cette relation de longue durée permet à l'artisan de connaître parfaitement les spécificités du riad, d'anticiper les problèmes, et d'intervenir plus efficacement. Certains proposent des abonnements de maintenance mensuelle tout inclus.</p>`,
    },
    {
      title: "Scénario type : 43 cartons IKEA à monter dans un riad à Kennaria",
      content: `<p>Karim et sa femme venaient de finaliser l'achat d'un petit riad dans le quartier Kennaria, à deux pas de la place Jamaa El Fna. Après deux années de restauration, les murs en tadelakt brillaient, les zelliges du patio étaient parfaits, et il restait maintenant à meubler. Quarante-trois cartons de chez Ikea stockés dans la future salle à manger, des escaliers en colimaçon de 60 cm de large, une porte d'entrée en bois sculpté qui fait à peine 80 cm... La question n'était pas juste de monter des meubles, c'était un défi logistique et artisanal que seul quelqu'un connaissant les riads de la Médina pouvait relever.</p>`,
    },
  ],

  priceTable: [
    {
      intervention: "Montage meuble simple (table, chaise, étagère)",
      prixMin: 80,
      prixMoyen: 150,
      prixMax: 250,
    },
    {
      intervention: "Montage armoire (PAX IKEA ou équivalent)",
      prixMin: 300,
      prixMoyen: 450,
      prixMax: 700,
    },
    {
      intervention: "Montage cuisine IKEA (meuble haut + bas, sans plan de travail)",
      prixMin: 800,
      prixMoyen: 1400,
      prixMax: 2500,
    },
    {
      intervention: "Montage meuble riad – passage difficile (supplément)",
      prixMin: 200,
      prixMoyen: 350,
      prixMax: 600,
    },
    {
      intervention: "Pose d'étagère murale (2 supports + fixation)",
      prixMin: 100,
      prixMoyen: 180,
      prixMax: 300,
    },
    {
      intervention: "Fixation miroir ou tableau lourd",
      prixMin: 80,
      prixMoyen: 150,
      prixMax: 250,
    },
    {
      intervention: "Pose TV murale (fixation + câblage simple)",
      prixMin: 200,
      prixMoyen: 350,
      prixMax: 500,
    },
    {
      intervention: "Remplacement serrure porte intérieure",
      prixMin: 150,
      prixMoyen: 280,
      prixMax: 450,
    },
    {
      intervention: "Réparation / remplacement moustiquaire",
      prixMin: 100,
      prixMoyen: 200,
      prixMax: 400,
    },
    {
      intervention: "Réfection joint de douche / baignoire",
      prixMin: 150,
      prixMoyen: 250,
      prixMax: 400,
    },
    {
      intervention: "Petite peinture retouche (surface < 5m²)",
      prixMin: 150,
      prixMoyen: 300,
      prixMax: 500,
    },
    {
      intervention: "Pose robinet cuisine / salle de bain (main d'oeuvre)",
      prixMin: 100,
      prixMoyen: 200,
      prixMax: 350,
    },
    {
      intervention: "Forfait maintenance mensuel maison d'hôtes",
      prixMin: 500,
      prixMoyen: 900,
      prixMax: 1800,
    },
    {
      intervention: "Réparation volet / persienne",
      prixMin: 100,
      prixMoyen: 200,
      prixMax: 350,
    },
  ],


  externalLinks: [
    {
      label: "Chambre d'Artisanat de Marrakech",
      url: "https://www.artisanat.ma/marrakech",
      description:
        "Répertoire officiel des artisans certifiés de la région Marrakech-Safi, avec spécialités et qualifications.",
    },
    {
      label: "Agence Urbaine de Marrakech – règles d'urbanisme en Médina",
      url: "https://www.au-marrakech.ma",
      description:
        "Informations sur les règles de construction et rénovation en Médina, permis de travaux, zones protégées.",
    },
    {
      label: "IKEA Maroc – livraison et montage à Marrakech",
      url: "https://www.ikea.com/ma",
      description:
        "Service de livraison et montage IKEA disponible à Marrakech, utile pour vérifier les délais et tarifs.",
    },
  ],

  testimonials: [
    {
      name: "Pierre D.",
      quarter: "Kennaria (Médina)",
      city: "Marrakech",
      rating: 5,
      text: "Montage de 8 meubles IKEA dans mon riad, escalier en colimaçon de 65cm, portes étroites. Le bricoleur connaissait parfaitement les riads de la Médina, il a tout monté pièce par pièce, sans rien abîmer. Un vrai professionnel de la logistique des espaces étroits.",
      date: "Janvier 2026",
      service: "Montage mobilier riad Médina",
    },
    {
      name: "Amina K.",
      quarter: "Guéliz",
      city: "Marrakech",
      rating: 5,
      text: "Pose d'une cuisine IKEA complète dans mon appartement de Guéliz. Travail soigné, raccordements électrique et plomberie bien gérés, plan de travail posé parfaitement droit. Le technicien est venu deux fois : une pour les mesures, une pour la pose. Résultat impeccable.",
      date: "Mars 2026",
      service: "Pose cuisine complète",
    },
    {
      name: "Hamid N.",
      quarter: "Palmeraie",
      city: "Marrakech",
      rating: 4,
      text: "Contrat de maintenance mensuelle pour ma maison d'hôtes. Le bricoleur passe une fois par mois, fait le tour de toutes les chambres, règle les petits problèmes avant qu'ils deviennent grands. Depuis qu'on a ce contrat, plus de mauvaise review à cause d'une porte bloquée ou d'un robinet qui goutte.",
      date: "Février 2026",
      service: "Maintenance mensuelle maison d'hôtes",
    },
    {
      name: "Julie M.",
      quarter: "Arset Ben Chebli (Médina)",
      city: "Marrakech",
      rating: 5,
      text: "Fixation de 12 tableaux et miroirs dans tout mon riad, plus pose d'étagères dans la bibliothèque du salon. Il a su utiliser des chevilles adaptées aux murs anciens en pisé, sans fissurer. Précis et soigneux avec les finitions tadelakt.",
      date: "Décembre 2025",
      service: "Fixations murales riad",
    },
  ],

  faqs: [
    {
      question: "Comment faire passer un grand meuble dans un escalier de riad ?",
      answer:
        "Trois techniques selon la configuration. D'abord le démontage maximal : tout ce qui peut se démonter doit se démonter, et les pièces montent séparément. Ensuite le passage par la terrasse : pour les étages supérieurs, les meubles peuvent être hissés de l'extérieur en passant par la terrasse avec des cordes (au minimum 3 personnes). Enfin, si rien ne passe, faire appel à un menuisier local pour fabriquer le meuble directement dans la pièce à partir de bois brut est souvent la solution la plus élégante dans un riad de standing.",
    },
    {
      question: "Peut-on fixer des étagères dans les murs en tadelakt ou en pisé d'un riad ?",
      answer:
        "Oui, mais avec des précautions. Le pisé (terre compressée) et le tadelakt (enduit chaux) sont des matériaux différents du béton et ne réagissent pas pareil aux chevilles standard. Il faut utiliser des chevilles spéciales pour matériaux friables (chevilles à molette, chevilles Molly), percer avec un diamètre précis, et ne pas trop serrer. Un bricoleur expérimenté en riads connaît ces subtilités, un amateur peut fissurer tout un pan de mur.",
    },
    {
      question: "Combien coûte un bricoleur à Marrakech pour le montage d'une cuisine IKEA ?",
      answer:
        "Pour une cuisine IKEA standard (6-8 éléments hauts et bas, sans plan de travail) dans un appartement de Guéliz ou Targa, comptez entre 800 et 1 400 DH pour la pose. Si vous êtes dans un riad en Médina avec contraintes d'accès, prévoyez un supplément de 300 à 600 DH. Le raccordement de l'évier à la plomberie et de l'électroménager est généralement en supplément.",
    },
    {
      question: "Faut-il demander un permis pour des travaux de bricolage dans un riad en Médina ?",
      answer:
        "Pour les petits travaux (montage meubles, pose d'étagères, peinture, remplacement de serrures), aucun permis n'est nécessaire. En revanche, dès que vous modifiez la structure (abattre une cloison, déplacer une porte, modifier le patio), vous êtes en territoire réglementé. La Médina de Marrakech étant classée UNESCO, les transformations significatives nécessitent une autorisation de la commune. En cas de doute, consultez l'Agence Urbaine de Marrakech avant de commencer.",
    },
    {
      question: "Où acheter des matériaux de bricolage à Marrakech ?",
      answer:
        "Pour la quincaillerie standard et l'outillage, Bricorama (Route de Casablanca) est la meilleure option en termes de choix. Pour les matériaux traditionnels spécifiques aux riads (tadelakt, chaux, bejmat, pigments naturels), les fournisseurs de Bab Doukkala et du marché du Mellah sont incontournables. Pour le bois et la menuiserie, les artisans du Souk Chouari en Médina travaillent à des tarifs très compétitifs.",
    },
    {
      question: "Quelle est la différence entre un bricoleur et un maâllem (maître artisan) ?",
      answer:
        "Un bricoleur professionnel est polyvalent, il monte des meubles, pose des étagères, fait des petites réparations diverses. Un maâllem est un artisan spécialisé avec des années de formation dans son métier : maâllem zouakri (décoration bois), maâllem tadelakt (enduits chaux), maâllem fakhkhari (céramique), maâllem haddad (ferronnerie). Pour des travaux courants dans un appartement moderne, le bricoleur suffit. Pour des travaux sur éléments patrimoniaux d'un riad authentique, le maâllem est irremplaçable.",
    },
    {
      question: "Le bricoleur peut-il aussi peindre les murs en tadelakt ?",
      answer:
        "Non, le tadelakt est une technique d'enduit à la chaux très spécifique qui se réalise en plusieurs couches et nécessite un lustrage au savon noir et à la pierre polie. C'est le domaine exclusif du maâllem tadelakt, formé pendant des années. Un bricoleur peut faire de la peinture ordinaire ou de la peinture à la chaux simple, mais la réfection du tadelakt d'un riad doit être confiée à un artisan spécialisé.",
    },
    {
      question: "Comment trouver un artisan de confiance en Médina de Marrakech ?",
      answer:
        "Le bouche-à-oreille reste la méthode la plus fiable. Demandez à vos voisins de riad, aux gérants de maisons d'hôtes du quartier, à votre agent immobilier. Évitez les artisans qui vous abordent spontanément dans la rue, les bons artisans n'ont pas besoin de démarcher. Allo Maison dispose d'un réseau de prestataires vérifiés à Marrakech, avec avis clients contrôlés.",
    },
    {
      question: "Quels travaux peut-on faire soi-même dans un riad ?",
      answer:
        "Montage de meubles en kit, pose d'étagères légères, remplacement d'ampoules et luminaires simples, retouches peinture sur murs lisses, remplacement de poignées et serrures standard, tout cela est faisable par un bricoleur amateur. En revanche, évitez de travailler sur les murs anciens (pisé, terre crue) sans conseils d'un professionnel, et ne touchez jamais aux éléments structurels ou aux finitions tadelakt sans expertise.",
    },
    {
      question: "Combien de temps prend le montage d'une armoire PAX dans un riad ?",
      answer:
        "Dans un appartement normal, une armoire PAX standard prend 1 à 2 heures. Dans un riad avec escalier étroit et portes basses, comptez 3 à 5 heures selon la taille, car tout doit être passé en pièces détachées et parfois il faut démonter des éléments de la porte pour accéder à la pièce. Un bricoleur expérimenté en riads anticipera ces contraintes dans son estimation.",
    },
    {
      question: "Y a-t-il des bricoleurs disponibles la nuit ou le week-end à Marrakech ?",
      answer:
        "Pour les urgences légères (serrure bloquée, fuite simple, problème qui empêche la location d'une chambre), certains prestataires d'Allo Maison à Marrakech sont disponibles 7j/7 et peuvent intervenir le soir. Comptez une majoration de 30 à 50% sur le tarif normal. Pour les non-urgences, planifier en semaine assure le meilleur rapport qualité/prix.",
    },
  ],

  tips: [
    "Mesurez toujours deux fois l'escalier le plus étroit de votre riad avant d'acheter un grand meuble, la largeur minimale et la hauteur du plafond aux paliers.",
    "Pour les murs en pisé ou tadelakt, n'utilisez jamais des chevilles standard expansibles, optez pour des chevilles Molly ou des systèmes de fixation à molette adaptés aux matériaux friables.",
    "Un contrat de maintenance mensuelle avec un bricoleur de confiance est le meilleur investissement pour une maison d'hôtes à Marrakech, les petits problèmes réglés avant l'arrivée des clients valent de l'or.",
    "Bricorama sur la Route de Casablanca est la meilleure grande surface pour le matériel standard, mais pour les matériaux traditionnels (chaux, tadelakt, bejmat), allez directement chez les fournisseurs de Bab Doukkala.",
    "En été (juin-août), certaines colles et mastics perdent leur adhérence avec la chaleur, assurez-vous que vos produits sont certifiés pour des températures jusqu'à 50°C.",
    "Le souk Chouari (souk des menuisiers en Médina) est une mine d'or pour tout ce qui touche au bois, réparations, fabrication sur mesure, bois cèdre brut, à des prix très compétitifs.",
    "Pour les maisons d'hôtes, photographiez chaque chambre en détail en début de saison, ça facilite l'identification des dégâts causés par les clients et les réclamations aux assurances.",
    "Quand vous faites appel à un artisan de la Médina, soyez précis dans votre commande et demandez un échantillon ou un croquis avant de valider, les malentendus de conception coûtent cher.",
  ],

  localKnowledge: `<p>Marrakech est une ville où le bricolage prend une dimension culturelle particulière. La <strong>Médina</strong>, classée au patrimoine mondial de l'UNESCO, concentre des milliers de riads dont beaucoup sont en location touristique, créant un marché de maintenance et de rénovation spécifique, avec des contraintes uniques (escaliers en colimaçon, portes étroites, matériaux traditionnels). Le <strong>Souk Chouari</strong> (menuisiers), le <strong>Souk Haddadine</strong> (ferronniers) et les artisans de <strong>Bab Doukkala</strong> constituent un réseau artisanal sans équivalent. <strong>Guéliz</strong>, le quartier moderne avec ses appartements et résidences, a des besoins plus standards, montage de meubles, petites réparations, pose de luminaires. La <strong>Palmeraie</strong> et les villas de luxe autour de Marrakech demandent des finitions haut de gamme et des artisans capables de travailler avec des matériaux nobles (marbre, bois précieux, ferronnerie forgée). La chaleur extrême de l'été marrakchi (45°C+) impose des matériaux adaptés et des colles haute température, une connaissance que les meilleurs bricoleurs locaux ont intégrée naturellement.</p>`,

  lastUpdated: "Avril 2026",
};

registerRichContent(content);
export default content;
