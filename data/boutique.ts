export type BoutiqueCategory = {
  slug: string;
  label: string;
  description: string;
  icon: string;
};

export type BoutiqueProduct = {
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  excerpt: string;
  description: string;
  detail: string[];
  price?: number;
  stock: 'in-stock' | 'rupture' | 'sur-demande';
  image: string;
  tags: string[];
};

export const boutiqueCategories: BoutiqueCategory[] = [
  {
    slug: 'pompes',
    label: 'Pompes & irrigation',
    description: 'Équipements de pompage, arrosage et circulation d’eau pour ferme durable.',
    icon: '💧',
  },
  {
    slug: 'alimentation',
    label: 'Alimentation animale',
    description: 'Solutions d’alimentation pour volailles, petits animaux et élevage local.',
    icon: '🐓',
  },
  {
    slug: 'oeufs',
    label: 'Œufs & paniers de ferme',
    description: 'Offres de paniers d’œufs frais et collections de produits fermiers.',
    icon: '🥚',
  },
  {
    slug: 'accessoires',
    label: 'Accessoires',
    description: 'Accessoires pratiques pour le nourrissage, l’élevage et les installations agricoles.',
    icon: '🛠️',
  },
];

export const boutiqueProducts: BoutiqueProduct[] = [
  {
    slug: 'pompe-hydroponique-compacte',
    title: 'Pompe hydroponique compacte',
    category: 'pompes',
    subcategory: 'Hydroponie',
    excerpt: 'Pompe compacte pour circuler l’eau dans les bassins et systèmes hydroponiques.',
    description: 'Une pompe fiable pour les installations végétales et aquatiques, idéale pour les serres et les petites cultures en circulation continue.',
    detail: [
      'Débit : 450 L/h',
      'Consommation : 12 W',
      'Adaptée aux circuits fermés et aux prototypes de serre.',
    ],
    price: 420,
    stock: 'in-stock',
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Pompe+hydroponique',
    tags: ['hydroponie', 'pompe', 'serre'],
  },
  {
    slug: 'pompe-submersible-petit-debit',
    title: 'Pompe submersible petit débit',
    category: 'pompes',
    subcategory: 'Irrigation',
    excerpt: 'Pompe submersible pour réservoirs, récupérateurs d’eau et circuits de micro-irrigation.',
    description: 'Conçue pour les petits points d’eau de ferme, cette pompe offre un fonctionnement silencieux et fiable.',
    detail: [
      'Débit : 280 L/h',
      'Installation simple',
      'Résistance aux environnements humides.',
    ],
    price: 340,
    stock: 'rupture',
    image: 'https://placehold.co/900x620/f0faf5/3b4f35?text=Pompe+submersible',
    tags: ['pompe', 'irrigation', 'eau'],
  },
  {
    slug: 'abreuvoir-automatic-poules',
    title: 'Abreuvoir automatique pour poules',
    category: 'alimentation',
    subcategory: 'Aviculture',
    excerpt: 'Système d’abreuvement propre et sans gaspillage pour volailles.',
    description: 'Idéal pour maintenir des points d’eau frais et accessibles aux poules, avec distribution régulière et facile à remplir.',
    detail: [
      'Capacité : 2 L',
      'Facile à nettoyer',
      'Montage rapide sur enclos.',
    ],
    price: 95,
    stock: 'in-stock',
    image: 'https://placehold.co/900x620/f8fbf5/3b4f35?text=Abreuvoir+automatique',
    tags: ['poules', 'eau', 'aviculture'],
  },
  {
    slug: 'distributeur-de-grains-poulet',
    title: 'Distributeur de grains pour poulets',
    category: 'alimentation',
    subcategory: 'Alimentation',
    excerpt: 'Distributeur de nourriture qui protège le grain et limite le gaspillage.',
    description: 'Un support de distribution stable conçu pour volailles, avec remplissage facile et dosage régulier.',
    detail: [
      'Capacité : 5 kg',
      'Matériau robuste',
      'Montage sur cage ou support.',
    ],
    price: 129,
    stock: 'in-stock',
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Distributeur+de+grains',
    tags: ['alimentation', 'poulets', 'grains'],
  },
  {
    slug: 'mangeoire-automatic-poulet',
    title: 'Mangeoire automatique pour poulets',
    category: 'alimentation',
    subcategory: 'Alimentation',
    excerpt: 'Mangeoire moderne avec ouverture modulable, adaptée aux parcours extérieurs.',
    description: 'Permet de gérer l’accès au grain en limitant les déversements et en gardant l’espace propre.',
    detail: [
      'Couvercle anti-pluie',
      'Réglage de portion',
      'Convient aux grands et petits enclos.',
    ],
    stock: 'rupture',
    image: 'https://placehold.co/900x620/f0faf5/3b4f35?text=Mangeoire+automatique',
    tags: ['mangeoire', 'poulets', 'accessoire'],
  },
  {
    slug: 'panier-oeufs-frais-ferme',
    title: 'Panier d’œufs frais de la ferme',
    category: 'oeufs',
    subcategory: 'Œufs frais',
    excerpt: 'Panier de 12 œufs fermiers, produit local et de saison.',
    description: 'Œufs issus de volailles élevées en liberté, livrés dans un emballage écologique.',
    detail: [
      '12 œufs fermiers',
      'Conditionnement recyclable',
      'Disponible chaque semaine selon la récolte.',
    ],
    price: 48,
    stock: 'in-stock',
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Panier+d%27oeufs',
    tags: ['œufs', 'ferme', 'produit local'],
  },
  {
    slug: 'seau-de-transport-oeufs',
    title: 'Seau de transport pour œufs',
    category: 'oeufs',
    subcategory: 'Accessoires',
    excerpt: 'Seau protecteur pour transporter les œufs sans casse.',
    description: 'Une solution simple et pratique pour ramasser et transporter les œufs en toute sécurité.',
    detail: [
      'Compartiments renforcés',
      'Poignée confortable',
      'Matériau lavable.',
    ],
    price: 32,
    stock: 'sur-demande',
    image: 'https://placehold.co/900x620/f8fbf5/3b4f35?text=Seau+oeufs',
    tags: ['œufs', 'transport', 'accessoire'],
  },
  {
    slug: 'alimenteur-manuel-animaux',
    title: 'Alimenteur manuel pour petits animaux',
    category: 'accessoires',
    subcategory: 'Élevage',
    excerpt: 'Alimenteur durable pour rations de granulés ou céréales.',
    description: 'Un accessoire simple pour distribuer la nourriture sans en assurer le service mechanique.',
    detail: [
      'Capacité : 4 L',
      'Base anti-renversement',
      'Convient pour lapins, poules ou autres petits animaux.',
    ],
    price: 78,
    stock: 'in-stock',
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Alimenteur+manuel',
    tags: ['alimentation', 'accessoire', 'animaux'],
  },
  {
    slug: 'kit-de-raccord-irrigation',
    title: 'Kit de raccord irrigation',
    category: 'accessoires',
    subcategory: 'Irrigation',
    excerpt: 'Kit d’adaptation pour tuyaux, buses et pompes en petite ferme.',
    description: 'Permet de connecter rapidement une pompe à un système d’arrosage simple ou à une table hydroponique.',
    detail: [
      'Raccords standards',
      'Flexibles et colliers inclus',
      'Prêt à l’usage.',
    ],
    price: 56,
    stock: 'in-stock',
    image: 'https://placehold.co/900x620/f0faf5/3b4f35?text=Kit+irrigation',
    tags: ['irrigation', 'accessoire', 'pompe'],
  },
];
