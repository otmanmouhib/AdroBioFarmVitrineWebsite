export type Domain = {
  slug: string;
  label: string;
  description: string;
};

export type Pole = {
  slug: string;
  label: string;
  shortDescription: string;
  icon: string;
  color: string;
  domains: Domain[];
};

export const poles: Pole[] = [
  {
    slug: 'production',
    label: 'Production & Marché',
    shortDescription: 'Cultures et produits alimentaires pensés pour la vente directe, la transformation artisanale et les circuits courts.',
    icon: '🌾',
    color: '#6b8e23',
    domains: [
      { slug: 'legumes', label: 'Légumes de saison', description: 'Légumes cultivés en pleine terre et sous serre, livrés ou vendus sur place.' },
      { slug: 'fruits', label: 'Fruits locaux', description: 'Fruits de vergers, cueillis à maturité et proposés en paniers ou à la vente.' },
      { slug: 'conserves', label: 'Produits transformés', description: 'Confitures, conserves et préparations maison à base de nos récoltes.' },
      { slug: 'circuits-courts', label: 'Circuits courts', description: 'Paniers, marchés et ventes directes pour réduire les distances et soutenir le local.' },
    ],
  },
  {
    slug: 'boutique',
    label: 'Boutique & Comptoir',
    shortDescription: 'Produits locaux, objets artisanaux et paniers de la ferme à emporter ou à offrir.',
    icon: '🛒',
    color: '#d2691e',
    domains: [
      { slug: 'paniers', label: 'Paniers fermiers', description: 'Paniers composés de produits frais, bio et de saison pour un approvisionnement simple et engagé.' },
      { slug: 'epicerie', label: 'Épicerie', description: 'Épicerie fine locale, confitures et produits de la ferme prêts à consommer.' },
      { slug: 'cosmetiques', label: 'Cosmétiques naturels', description: 'Soins et cosmétiques à base de plantes cultivées sur la ferme.' },
      { slug: 'artisanat', label: 'Artisanat local', description: 'Objets et créations du territoire, fabriqués par des artisans partenaires.' },
    ],
  },
  {
    slug: 'formation',
    label: 'Formation & Transmission',
    shortDescription: 'Ateliers, stages et programmes pratiques pour apprendre l’agroécologie et les techniques durables.',
    icon: '📚',
    color: '#2f6f4e',
    domains: [
      { slug: 'permaculture', label: 'Permaculture', description: 'Formations à la conception écologique de jardins et de systèmes nourriciers.' },
      { slug: 'agroecologie', label: 'Agroécologie', description: 'Pratiques culturales respectueuses du sol, de l’eau et de la biodiversité.' },
      { slug: 'cuisine', label: 'Cuisine de saison', description: 'Ateliers de préparation, conservation et dégustation des produits de la ferme.' },
      { slug: 'bien-etre', label: 'Bien-être nature', description: 'Stages de reconnexion au vivant, à la respiration et aux plantes utiles.' },
    ],
  },
  {
    slug: 'accueil',
    label: 'Accueil & Séjours',
    shortDescription: 'Séjours immersifs, visites pédagogiques et résidences pour vivre la ferme au quotidien.',
    icon: '🏡',
    color: '#8b4513',
    domains: [
      { slug: 'gites', label: 'Gîtes écoresponsables', description: 'Hébergements simples et confortables intégrés à la dynamique de la ferme.' },
      { slug: 'visites', label: 'Visites guidées', description: 'Découverte du site, des cultures et des pratiques agroécologiques.' },
      { slug: 'residences', label: 'Résidences créatives', description: 'Accueil de porteurs de projets artistiques et pédagogiques en immersion.' },
      { slug: 'evenements', label: 'Événements', description: 'Rencontres, séminaires et animations organisés dans un cadre naturel.' },
    ],
  },
  {
    slug: 'ecologie',
    label: 'Écologie & Territoire',
    shortDescription: 'Projets environnementaux et accompagnement pour plus de biodiversité et de résilience locale.',
    icon: '🌿',
    color: '#4b8c30',
    domains: [
      { slug: 'compostage', label: 'Compostage', description: 'Solutions locales de valorisation des déchets organiques et fertilisation naturelle.' },
      { slug: 'biodiversite', label: 'Biodiversité', description: 'Actions pour préserver la faune, les insectes et les habitats sur le site.' },
      { slug: 'eau', label: 'Gestion de l’eau', description: 'Gestion durable des eaux de pluie, récupération et irrigation responsable.' },
      { slug: 'paysage', label: 'Aménagement paysager', description: 'Design de prairies, bosquets et espaces naturels propices aux usages et aux écosystèmes.' },
    ],
  },
  {
    slug: 'cooperation',
    label: 'Coopération & Projets',
    shortDescription: 'Projets collectifs, partenariats locaux et gouvernance partagée au service du territoire.',
    icon: '🤝',
    color: '#467d8c',
    domains: [
      { slug: 'partenariat', label: 'Partenariats locaux', description: 'Collaborations avec associations, écoles et acteurs du territoire.' },
      { slug: 'volontariat', label: 'Volontariat', description: 'Chantiers participatifs et accueil de bénévoles pour faire évoluer la ferme.' },
      { slug: 'gouvernance', label: 'Gouvernance', description: 'Accompagnement des démarches coopératives et des modes de décision partagés.' },
    ],
  },
];
