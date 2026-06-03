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
    slug: 'ferme',
    label: 'Ferme',
    shortDescription: 'Produits fermiers et circuits courts, de la production à la vente locale.',
    icon: '🐔',
    color: '#7f9a4a',
    domains: [
      { slug: 'produits-fermiers', label: 'Produits fermiers', description: 'Œufs, volailles et paniers de la ferme.' },
      { slug: 'panier-saisonnier', label: 'Paniers saisonniers', description: 'Abonnements hebdomadaires et commandes directes.' },
      { slug: 'marches-local', label: 'Marchés locaux', description: 'Vente directe sur marché et boutique de la ferme.' },
    ],
  },
  {
    slug: 'vegetal',
    label: 'Végétal',
    shortDescription: 'Légumes, fruits et herbes aromatiques cultivés avec respect de l’écosystème.',
    icon: '🌱',
    color: '#4f8b3f',
    domains: [
      { slug: 'legumes-et-fruits', label: 'Légumes & fruits', description: 'Légumes, fruits et aromates de saison.' },
      { slug: 'transformations', label: 'Transformations', description: 'Conserves, sauces et recettes maison.' },
      { slug: 'conseil-jardin', label: 'Conseil jardin', description: 'Accompagnement potager et maraîchage écologique.' },
    ],
  },
  {
    slug: 'pepiniere',
    label: 'Pépinière',
    shortDescription: 'Plants, semis et conseils horticoles pour un jardin durable.',
    icon: '🌿',
    color: '#5a7d44',
    domains: [
      { slug: 'plants-potagers', label: 'Plants potagers', description: 'Plants de légumes et aromatiques pour potager.' },
      { slug: 'plants-vivaces', label: 'Plants vivaces', description: 'Plantes vivaces et couvre-sol pour jardins durables.' },
      { slug: 'kits-de-semis', label: 'Kits de semis', description: 'Kits et collections pour démarrer vos semis.' },
    ],
  },
  {
    slug: 'formation',
    label: 'Formation',
    shortDescription: 'Ateliers et stages pour apprendre l’agriculture durable et l’écologie.',
    icon: '📚',
    color: '#7c6642',
    domains: [
      { slug: 'ateliers-pratiques', label: 'Ateliers pratiques', description: 'Sessions pratiques sur le terrain et la permaculture.' },
      { slug: 'stages-scolaires', label: 'Stages scolaires', description: 'Programmes pédagogiques pour écoles et groupes.' },
      { slug: 'coaching-projet', label: 'Coaching projet', description: 'Accompagnement personnalisé de projet durable.' },
    ],
  },
  {
    slug: 'hebergement',
    label: 'Hébergement',
    shortDescription: 'Séjours immersifs, accueil de groupes et résidences artistiques à la ferme.',
    icon: '🏡',
    color: '#6e6b4f',
    domains: [
      { slug: 'sejours-immersion', label: 'Séjours immersion', description: 'Séjours nature et hébergement durable à la ferme.' },
      { slug: 'accueil-groupes', label: 'Accueil groupes', description: 'Accueil de familles, groupes et séminaires.' },
      { slug: 'residences', label: 'Résidences', description: 'Résidences artistiques et séjours créatifs.' },
    ],
  },
  {
    slug: 'evenementiel',
    label: 'Événementiel',
    shortDescription: 'Événements responsables, séminaires nature et animations pédagogiques.',
    icon: '🎪',
    color: '#a26f3c',
    domains: [
      { slug: 'team-building', label: 'Team-building', description: 'Activités de cohésion et formation collective.' },
      { slug: 'seminaires-nature', label: 'Séminaires nature', description: 'Séminaires et événements en milieu naturel.' },
      { slug: 'animations', label: 'Animations', description: 'Animations, décors et moments ludiques pour événements.' },
    ],
  },
  {
    slug: 'ecologie',
    label: 'Écologie',
    shortDescription: 'Offres durables pour compostage, agroforesterie et projets zéro déchet.',
    icon: '🌎',
    color: '#3b7f5f',
    domains: [
      { slug: 'compostage', label: 'Compostage', description: 'Solutions de compostage et gestion zéro déchet.' },
      { slug: 'biodiversite', label: 'Biodiversité', description: 'Projets de zones humides et agroforesterie.' },
      { slug: 'sensibilisation', label: 'Sensibilisation', description: 'Formations et accompagnements écologiques.' },
    ],
  },
];
