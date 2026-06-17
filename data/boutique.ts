const now = new Date().toISOString();

export type BoutiqueSubcategory = {
  slug: string;
  label: string;
  description?: string;
};

export type BoutiqueCategory = {
  _id: string;
  slug: string;
  label: string;
  description: string;
  icon?: string;
  subcategories: BoutiqueSubcategory[];
  createdAt: string;
  updatedAt: string;
};

export type BoutiqueProduct = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  details: string[];
  specs: string[];
  price: number;
  currency: string;
  availability: 'in-stock' | 'out-of-stock' | 'on-demand';
  inStock: boolean;
  inventoryCount: number;
  sku: string;
  featured: boolean;
  status: 'active' | 'inactive';
  tags: string[];
  image: string;
  gallery?: string[];
  boutiqueCategoryId: string;
  boutiqueSubcategoryId: string;
  createdAt: string;
  updatedAt: string;
};

export const boutiqueCategories: BoutiqueCategory[] = [
  {
    _id: 'cat-pompes',
    slug: 'pompes',
    label: 'Pompes & irrigation',
    description: 'Équipements de pompage, arrosage et circulation d’eau pour ferme durable.',
    icon: '💧',
    subcategories: [
      { slug: 'hydroponie', label: 'Hydroponie' },
      { slug: 'irrigation', label: 'Irrigation' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'cat-alimentation',
    slug: 'alimentation',
    label: 'Alimentation animale',
    description: 'Solutions d’alimentation pour volailles, petits animaux et élevage local.',
    icon: '🐓',
    subcategories: [
      { slug: 'aviculture', label: 'Aviculture' },
      { slug: 'alimentation', label: 'Alimentation' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'cat-oeufs',
    slug: 'oeufs',
    label: 'Œufs & paniers de ferme',
    description: 'Offres de paniers d’œufs frais et collections de produits fermiers.',
    icon: '🥚',
    subcategories: [
      { slug: 'oeufs-frais', label: 'Œufs frais' },
      { slug: 'accessoires', label: 'Accessoires' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'cat-accessoires',
    slug: 'accessoires',
    label: 'Accessoires',
    description: 'Accessoires pratiques pour le nourrissage, l’élevage et les installations agricoles.',
    icon: '🛠️',
    subcategories: [
      { slug: 'elevage', label: 'Élevage' },
      { slug: 'irrigation', label: 'Irrigation' },
    ],
    createdAt: now,
    updatedAt: now,
  },
];

function normalizeAvailability(stock: 'in-stock' | 'rupture' | 'sur-demande' | 'on-demand') {
  if (stock === 'in-stock') return { availability: 'in-stock' as const, inStock: true, inventoryCount: 10 };
  if (stock === 'rupture') return { availability: 'out-of-stock' as const, inStock: false, inventoryCount: 0 };
  return { availability: 'on-demand' as const, inStock: false, inventoryCount: 0 };
}

function buildSku(slug: string) {
  return `BOUT-${slug.toUpperCase().replace(/-/g, '_')}`;
}

export const boutiqueProducts: BoutiqueProduct[] = [
  {
    slug: 'pompe-hydroponique-compacte',
    title: 'Pompe hydroponique compacte',
    shortDescription: 'Pompe compacte pour circuler l’eau dans les bassins et systèmes hydroponiques.',
    description: 'Une pompe fiable pour les installations végétales et aquatiques, idéale pour les serres et les petites cultures en circulation continue.',
    details: [
      'Débit : 450 L/h',
      'Consommation : 12 W',
      'Adaptée aux circuits fermés et aux prototypes de serre.',
    ],
    specs: ['Hydroponie', 'Pompe', 'Serre'],
    price: 420,
    currency: 'MAD',
    ...normalizeAvailability('in-stock'),
    sku: buildSku('pompe-hydroponique-compacte'),
    featured: false,
    status: 'active',
    tags: ['hydroponie', 'pompe', 'serre'],
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Pompe+hydroponique',
    gallery: ['https://placehold.co/900x620/eaf1e1/3b4f35?text=Pompe+hydroponique'],
    boutiqueCategoryId: 'pompes',
    boutiqueSubcategoryId: 'hydroponie',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'pompe-submersible-petit-debit',
    title: 'Pompe submersible petit débit',
    shortDescription: 'Pompe submersible pour réservoirs, récupérateurs d’eau et circuits de micro-irrigation.',
    description: 'Conçue pour les petits points d’eau de ferme, cette pompe offre un fonctionnement silencieux et fiable.',
    details: [
      'Débit : 280 L/h',
      'Installation simple',
      'Résistance aux environnements humides.',
    ],
    specs: ['Pompe', 'Irrigation', 'Eau'],
    price: 340,
    currency: 'MAD',
    ...normalizeAvailability('rupture'),
    sku: buildSku('pompe-submersible-petit-debit'),
    featured: false,
    status: 'active',
    tags: ['pompe', 'irrigation', 'eau'],
    image: 'https://placehold.co/900x620/f0faf5/3b4f35?text=Pompe+submersible',
    gallery: ['https://placehold.co/900x620/f0faf5/3b4f35?text=Pompe+submersible'],
    boutiqueCategoryId: 'pompes',
    boutiqueSubcategoryId: 'irrigation',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'abreuvoir-automatic-poules',
    title: 'Abreuvoir automatique pour poules',
    shortDescription: 'Système d’abreuvement propre et sans gaspillage pour volailles.',
    description: 'Idéal pour maintenir des points d’eau frais et accessibles aux poules, avec distribution régulière et facile à remplir.',
    details: [
      'Capacité : 2 L',
      'Facile à nettoyer',
      'Montage rapide sur enclos.',
    ],
    specs: ['Poules', 'Eau', 'Aviculture'],
    price: 95,
    currency: 'MAD',
    ...normalizeAvailability('in-stock'),
    sku: buildSku('abreuvoir-automatic-poules'),
    featured: false,
    status: 'active',
    tags: ['poules', 'eau', 'aviculture'],
    image: 'https://placehold.co/900x620/f8fbf5/3b4f35?text=Abreuvoir+automatique',
    gallery: ['https://placehold.co/900x620/f8fbf5/3b4f35?text=Abreuvoir+automatique'],
    boutiqueCategoryId: 'alimentation',
    boutiqueSubcategoryId: 'aviculture',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'distributeur-de-grains-poulet',
    title: 'Distributeur de grains pour poulets',
    shortDescription: 'Distributeur de nourriture qui protège le grain et limite le gaspillage.',
    description: 'Un support de distribution stable conçu pour volailles, avec remplissage facile et dosage régulier.',
    details: [
      'Capacité : 5 kg',
      'Matériau robuste',
      'Montage sur cage ou support.',
    ],
    specs: ['Alimentation', 'Poulets', 'Grains'],
    price: 129,
    currency: 'MAD',
    ...normalizeAvailability('in-stock'),
    sku: buildSku('distributeur-de-grains-poulet'),
    featured: false,
    status: 'active',
    tags: ['alimentation', 'poulets', 'grains'],
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Distributeur+de+grains',
    gallery: ['https://placehold.co/900x620/eaf1e1/3b4f35?text=Distributeur+de+grains'],
    boutiqueCategoryId: 'alimentation',
    boutiqueSubcategoryId: 'alimentation',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'mangeoire-automatic-poulet',
    title: 'Mangeoire automatique pour poulets',
    shortDescription: 'Mangeoire moderne avec ouverture modulable, adaptée aux parcours extérieurs.',
    description: 'Permet de gérer l’accès au grain en limitant les déversements et en gardant l’espace propre.',
    details: [
      'Couvercle anti-pluie',
      'Réglage de portion',
      'Convient aux grands et petits enclos.',
    ],
    specs: ['Mangeoire', 'Poulets', 'Accessoire'],
    price: 0,
    currency: 'MAD',
    ...normalizeAvailability('rupture'),
    sku: buildSku('mangeoire-automatic-poulet'),
    featured: false,
    status: 'active',
    tags: ['mangeoire', 'poulets', 'accessoire'],
    image: 'https://placehold.co/900x620/f0faf5/3b4f35?text=Mangeoire+automatique',
    gallery: ['https://placehold.co/900x620/f0faf5/3b4f35?text=Mangeoire+automatique'],
    boutiqueCategoryId: 'alimentation',
    boutiqueSubcategoryId: 'alimentation',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'panier-oeufs-frais-ferme',
    title: 'Panier d’œufs frais de la ferme',
    shortDescription: 'Panier de 12 œufs fermiers, produit local et de saison.',
    description: 'Œufs issus de volailles élevées en liberté, livrés dans un emballage écologique.',
    details: [
      '12 œufs fermiers',
      'Conditionnement recyclable',
      'Disponible chaque semaine selon la récolte.',
    ],
    specs: ['Œufs', 'Ferme', 'Produits locaux'],
    price: 48,
    currency: 'MAD',
    ...normalizeAvailability('in-stock'),
    sku: buildSku('panier-oeufs-frais-ferme'),
    featured: false,
    status: 'active',
    tags: ['œufs', 'ferme', 'produit local'],
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Panier+d%27oeufs',
    gallery: ['https://placehold.co/900x620/eaf1e1/3b4f35?text=Panier+d%27oeufs'],
    boutiqueCategoryId: 'oeufs',
    boutiqueSubcategoryId: 'oeufs-frais',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'seau-de-transport-oeufs',
    title: 'Seau de transport pour œufs',
    shortDescription: 'Seau protecteur pour transporter les œufs sans casse.',
    description: 'Une solution simple et pratique pour ramasser et transporter les œufs en toute sécurité.',
    details: [
      'Compartiments renforcés',
      'Poignée confortable',
      'Matériau lavable.',
    ],
    specs: ['Œufs', 'Transport', 'Accessoire'],
    price: 32,
    currency: 'MAD',
    ...normalizeAvailability('on-demand'),
    sku: buildSku('seau-de-transport-oeufs'),
    featured: false,
    status: 'active',
    tags: ['œufs', 'transport', 'accessoire'],
    image: 'https://placehold.co/900x620/f8fbf5/3b4f35?text=Seau+oeufs',
    gallery: ['https://placehold.co/900x620/f8fbf5/3b4f35?text=Seau+oeufs'],
    boutiqueCategoryId: 'oeufs',
    boutiqueSubcategoryId: 'accessoires',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'alimenteur-manuel-animaux',
    title: 'Alimenteur manuel pour petits animaux',
    shortDescription: 'Alimenteur durable pour rations de granulés ou céréales.',
    description: 'Un accessoire simple pour distribuer la nourriture sans en assurer le service mecanique.',
    details: [
      'Capacité : 4 L',
      'Base anti-renversement',
      'Convient pour lapins, poules ou autres petits animaux.',
    ],
    specs: ['Alimentation', 'Accessoire', 'Animaux'],
    price: 78,
    currency: 'MAD',
    ...normalizeAvailability('in-stock'),
    sku: buildSku('alimenteur-manuel-animaux'),
    featured: false,
    status: 'active',
    tags: ['alimentation', 'accessoire', 'animaux'],
    image: 'https://placehold.co/900x620/eaf1e1/3b4f35?text=Alimenteur+manuel',
    gallery: ['https://placehold.co/900x620/eaf1e1/3b4f35?text=Alimenteur+manuel'],
    boutiqueCategoryId: 'accessoires',
    boutiqueSubcategoryId: 'elevage',
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: 'kit-de-raccord-irrigation',
    title: 'Kit de raccord irrigation',
    shortDescription: 'Kit d’adaptation pour tuyaux, buses et pompes en petite ferme.',
    description: 'Permet de connecter rapidement une pompe à un système d’arrosage simple ou à une table hydroponique.',
    details: [
      'Raccords standards',
      'Flexibles et colliers inclus',
      'Prêt à l’usage.',
    ],
    specs: ['Irrigation', 'Accessoire', 'Pompe'],
    price: 56,
    currency: 'MAD',
    ...normalizeAvailability('in-stock'),
    sku: buildSku('kit-de-raccord-irrigation'),
    featured: false,
    status: 'active',
    tags: ['irrigation', 'accessoire', 'pompe'],
    image: 'https://placehold.co/900x620/f0faf5/3b4f35?text=Kit+irrigation',
    gallery: ['https://placehold.co/900x620/f0faf5/3b4f35?text=Kit+irrigation'],
    boutiqueCategoryId: 'accessoires',
    boutiqueSubcategoryId: 'irrigation',
    createdAt: now,
    updatedAt: now,
  },
];
