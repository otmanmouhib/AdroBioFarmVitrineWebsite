export type Product = {
  slug: string;
  title: string;
  pole: string;
  domain: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  image?: string;
};

export const products: Product[] = [
  {
    slug: 'panier-vegetal-bio',
    title: 'Panier végétal bio de saison',
    pole: 'boutique',
    domain: 'paniers',
    category: 'Paniers fermiers',
    shortDescription: 'Panier de légumes et aromatiques cueillis à la ferme.',
    description: 'Un panier bio composé de légumes de saison, aromatiques et produits de la ferme, livré ou retiré à la ferme.',
    features: ['Circuit court', 'Produits locaux', 'Récolte à maturité'],
  },
  {
    slug: 'confiture-abricot-ferme',
    title: 'Confiture artisanale d’abricot',
    pole: 'boutique',
    domain: 'epicerie',
    category: 'Conserves',
    shortDescription: 'Confiture maison cuite doucement au fruit.',
    description: 'Confiture préparée à partir d’abricots locaux et de sucre de canne bio, sans additifs.',
    features: ['Maison', 'Sans additif', 'Fruits locaux'],
  },
  {
    slug: 'huile-de-tournesol-bio',
    title: 'Huile de tournesol pressée à froid',
    pole: 'boutique',
    domain: 'epicerie',
    category: 'Épicerie',
    shortDescription: 'Huile locale pour assaisonner et cuisiner.',
    description: 'Huile de tournesol biologique issue de nos cultures, pressée à froid pour préserver les arômes.',
    features: ['Pressée à froid', 'Locale', 'Bio'],
  },
  {
    slug: 'savon-lavande-naturel',
    title: 'Savon naturel à la lavande',
    pole: 'boutique',
    domain: 'cosmetiques',
    category: 'Soins naturels',
    shortDescription: 'Savon doux fabriqué à partir d’huiles végétales.',
    description: 'Savon artisanal enrichi en lavande de la ferme, idéal pour une toilette douce et respectueuse de la peau.',
    features: ['Naturel', 'Lavande', 'Artisanal'],
  },
  {
    slug: 'plant-tomate-bio',
    title: 'Plant de tomate bio',
    pole: 'production',
    domain: 'legumes',
    category: 'Plants maraîchers',
    shortDescription: 'Plant de tomate écologique prêt à être repiqué.',
    description: 'Plant de tomate bio élevé en pépinière sur la ferme, idéal pour votre potager de saison.',
    features: ['Bio', 'Pérenne', 'Maturité garantie'],
  },
  {
    slug: 'panier-fruits-locaux',
    title: 'Panier de fruits locaux',
    pole: 'production',
    domain: 'fruits',
    category: 'Fruits frais',
    shortDescription: 'Sélection de fruits cueillis sur la ferme et chez nos producteurs partenaires.',
    description: 'Panier de saison comprenant pommes, poires et petits fruits selon les récoltes.',
    features: ['Local', 'De saison', 'Cueillis frais'],
  },
  {
    slug: 'kit-semences-libres',
    title: 'Kit de semences libres',
    pole: 'production',
    domain: 'circuits-courts',
    category: 'Semences et jardin',
    shortDescription: 'Assortiment de semences paysannes pour le potager.',
    description: 'Kit de semences issues de variétés libres, adapté aux cultures de la ferme et à votre jardin.',
    features: ['Variétés libres', 'Réutilisable', 'Adapté localement'],
  },
  {
    slug: 'panier-miel-village',
    title: 'Panier découverte miel et gourmandises',
    pole: 'boutique',
    domain: 'epicerie',
    category: 'Box découverte',
    shortDescription: 'Coffret de miels, sirops et douceurs locales.',
    description: 'Box gourmande composée de miel, sirop artisanal et biscuiterie locale pour un cadeau engagé.',
    features: ['Box locale', 'Cadeau', 'Engagé'],
  },
  {
    slug: 'plantes-aromatiques-en-pot',
    title: 'Plantes aromatiques en pot',
    pole: 'production',
    domain: 'legumes',
    category: 'Plantes',
    shortDescription: 'Basilic, menthe et thym cultivés à la ferme.',
    description: 'Sélection de plantes aromatiques biologiques, cultivées sans pesticides pour vos recettes et tisanes.',
    features: ['Bio', 'Prêtes à l’usage', 'Aromatiques'],
  },
  {
    slug: 'confiture-poire-romarin',
    title: 'Confiture poire & romarin',
    pole: 'boutique',
    domain: 'epicerie',
    category: 'Confitures',
    shortDescription: 'Confiture originale à base de poires locales et romarin.',
    description: 'Confiture artisanale fabriquée à la ferme pour une saveur douce et herbacée.',
    features: ['Artisanal', 'Saveur locale', 'Sans conservateur'],
  },
  {
    slug: 'pain-campagne-sur-commande',
    title: 'Pain de campagne sur commande',
    pole: 'production',
    domain: 'conserves',
    category: 'Boulangerie',
    shortDescription: 'Pain rustique cuit à la ferme, disponible sur commande.',
    description: 'Pain traditionnel à la farine locale, cuit par nos boulangers partenaires pour une saveur artisanale.',
    features: ['Traditionnel', 'Local', 'Sur commande'],
  },
];
