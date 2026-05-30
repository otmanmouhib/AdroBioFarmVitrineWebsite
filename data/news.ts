export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  summary: string;
  image: string;
  content: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: 'recolte-aid-al-adha-hydroponie',
    title: 'Récolte du jour de l’Aïd Al Adha depuis notre prototype hydroponique',
    date: '2026-06-17',
    category: 'Ferme circulaire',
    excerpt: 'Récolte du jour de l’Aïd Al Adha directement de notre prototype hydroponique : innovation et nature qui poussent ensemble.',
    summary: 'Première récolte test en hydroponie pour Adro Bio Farm, avec un regard sur la prochaine serre de démonstration.',
    image: '/news1.jpeg',
    content: [
      '🌿 Récolte du jour de l’Aïd Al Adha directement de notre prototype hydroponique ! Preuve que l’innovation et la nature peuvent pousser ensemble.',
      'Nous avons conçu ce prototype pour tester des méthodes de production circulaire, réduire l’empreinte eau et accélérer la croissance des plantes sans sol. Cet article montre comment la technologie règle les défis locaux tout en respectant des cycles agricoles plus doux.',
      'Prochaine étape : la serre de démonstration d’Adro Bio Farm, qui permettra d’étendre ces pratiques, d’accueillir des visiteurs et de montrer que l’hydroponie peut s’intégrer à une ferme durable et pédagogique.',
    ],
  },
  {
    slug: 'nouveau-potager-participatif',
    title: 'Un nouveau potager participatif ouvre ses portes',
    date: '2026-05-10',
    category: 'Vie de la ferme',
    excerpt: 'Découvrez notre potager collectif : semences libres, ateliers de jardinage et partage de savoir-faire pour tous les publics.',
    summary: 'Un espace dédié aux jardiniers en herbe et aux curieux, conçu pour apprendre ensemble et produire localement.',
    image: 'https://placehold.co/900x540/eaf1e1/3b4f35?text=Potager+participatif',
    content: [
      'Nous lançons un potager participatif au cœur d’ADRO BIO FARM pour faire grandir un collectif de jardiniers sensibles à l’agriculture durable. Le projet mêle semences libres, cultures de saison et journées d’atelier ouvertes à tous.',
      'Chaque semaine, nos animateurs proposent des sessions pratiques pour planter, arroser et comprendre les cycles de la nature. L’objectif est d’offrir un cadre accueillant où chacun peut contribuer au potager, apprendre les gestes essentiels et repartir avec des idées concrètes à appliquer chez soi.',
      'Ce nouveau potager s’inscrit dans notre démarche d’écologie participative et vise à renforcer les liens entre voisins, habitants et visiteurs. Nous avons prévu des espaces pour les familles, les écoles et les groupes qui souhaitent vivre une expérience simple et conviviale autour du sol et des plantes.',
    ],
  },
  {
    slug: 'programme-formation-2026',
    title: 'Programme de formation 2026 : agroécologie, relais et résilience',
    date: '2026-04-21',
    category: 'Formation',
    excerpt: 'Notre nouvelle saison de formations s’ouvre avec des modules pratiques sur l’agroécologie, la gestion de l’eau et le jardin vivant.',
    summary: 'Une offre pensée pour les porteurs de projets, les artisans du vivant et tous ceux qui veulent cultiver plus durablement.',
    image: 'https://placehold.co/900x540/f0faf5/3b4f35?text=Formation+2026',
    content: [
      'L’année 2026 est placée sous le signe du partage de savoir-faire. Nous proposons des formations pour apprendre à bâtir un potager résilient, à installer des systèmes de récupération d’eau et à intégrer des pratiques agroécologiques dans son quotidien.',
      'Les sessions sont adaptées aux débutants comme aux professionnels : ateliers de terrain, retours d’expérience et rencontres autour de projets locaux. Elles se déroulent sur plusieurs jours et permettent de repartir avec des ressources pratiques et des conseils personnalisés.',
      'Nous voulons rendre ces compétences accessibles à tous et favoriser une agriculture qui respecte les cycles naturels. Les inscriptions sont ouvertes dès maintenant, avec des places limitées pour garantir une expérience conviviale et engagée.',
    ],
  },
  {
    slug: 'paniers-de-saison-retour',
    title: 'Retour des paniers de saison : composition locale et durable',
    date: '2026-03-28',
    category: 'Produits',
    excerpt: 'Les paniers de légumes et d’herbes locales sont de retour, avec des compositions adaptées à la saison et aux cultures en plein champ.',
    summary: 'Une sélection fraîche, variée et responsable pour soutenir la production locale et encourager une consommation de qualité.',
    image: 'https://placehold.co/900x540/f8fbf5/3b4f35?text=Paniers+de+saison',
    content: [
      'Nous réactivons notre offre de paniers de saison, conçue pour valoriser les récoltes de la ferme et éviter le gaspillage. Chaque panier contient des légumes, des herbes et quelques surprises selon la période de l’année.',
      'Cette formule s’adresse aux familles, aux petits commerces et aux collectifs qui souhaitent recevoir une sélection locale, saine et savoureuse. Les contenus sont établis en fonction des récoltes du moment pour garantir de la fraîcheur et du goût.',
      'En choisissant un panier ADRO BIO FARM, vous soutenez directement une production à taille humaine et participez à une consommation plus durable. Les commandes sont à réserver en ligne ou par contact direct avec l’équipe.',
    ],
  },
  {
    slug: 'residences-artistiques-durable',
    title: 'Lancement des résidences artistiques et de recherche',
    date: '2026-02-14',
    category: 'Culture',
    excerpt: 'Nous ouvrons un programme de résidences pour artistes, chercheurs et créatifs engagés autour de la nature et des pratiques durables.',
    summary: 'Un espace de création au cœur de la ferme, pensé pour les projets qui mêlent art, écologie et partage.',
    image: 'https://placehold.co/900x540/f2f7ed/3b4f35?text=Résidences+artistiques',
    content: [
      'Ce nouveau programme de résidences invite des artistes et des porteurs de projets à vivre et créer sur le site d’ADRO BIO FARM. L’accent est mis sur les démarches sensibles à l’environnement, au paysage et aux cycles vivants.',
      'Les résidents bénéficient d’un accompagnement logistique, d’espaces de travail modulables et d’une immersion dans un écosystème agroécologique. L’idée est de favoriser des rencontres entre créations, pratiques agricoles et publics locaux.',
      'Nous souhaitons ouvrir des temps de réflexion, de performances et d’installations qui enrichissent notre territoire tout en valorisant une vision durable de l’art et du vivre ensemble.',
    ],
  },
];
