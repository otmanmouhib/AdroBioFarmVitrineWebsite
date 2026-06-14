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
    shortDescription: 'Produits fermiers, paniers et conserves issus de nos cultures durables.',
    icon: '🌾',
    color: '#6b8e23',
    domains: [
      { slug: 'legumes', label: 'Légumes', description: 'Légumes de saison cultivés sur la ferme.' },
      { slug: 'fruits', label: 'Fruits', description: 'Fruits locaux, cueillis à maturité.' },
      { slug: 'conserves', label: 'Conserves', description: 'Produits transformés maison et conserves artisanales.' },
      { slug: 'circuits-courts', label: 'Circuits courts', description: 'Paniers, ventes directes et commandes locales.' },
    ],
  },
  {
    slug: 'boutique',
    label: 'Boutique & Comptoir',
    shortDescription: 'Épicerie, cosmétiques et créations locales de la ferme.',
    icon: '🛒',
    color: '#d2691e',
    domains: [
      { slug: 'paniers', label: 'Paniers', description: 'Paniers végétaux et produits fermiers préparés.' },
      { slug: 'epicerie', label: 'Épicerie', description: 'Produits transformés, confitures et condiments.' },
      { slug: 'cosmetiques', label: 'Cosmétiques', description: 'Soins naturels à base de plantes et huiles locales.' },
      { slug: 'artisanat', label: 'Artisanat', description: 'Objets faits main par des artisans du territoire.' },
    ],
  },
  {
    slug: 'formation',
    label: 'Formation & Transmission',
    shortDescription: 'Ateliers et stages pour apprendre l’agroécologie et le savoir-faire rural.',
    icon: '📚',
    color: '#2f6f4e',
    domains: [
      { slug: 'permaculture', label: 'Permaculture', description: 'Formations à la conception écologique du jardin.' },
      { slug: 'agroecologie', label: 'Agroécologie', description: 'Pratiques durables de culture et gestion des sols.' },
      { slug: 'cuisine', label: 'Cuisine', description: 'Ateliers de préparation et conservation des récoltes.' },
      { slug: 'bien-etre', label: 'Bien-être', description: 'Stages liés à la nature, aux plantes et à la santé.' },
    ],
  },
  {
    slug: 'accueil',
    label: 'Accueil & Séjours',
    shortDescription: 'Visites, hébergements et résidences immersives à la ferme.',
    icon: '🏡',
    color: '#8b4513',
    domains: [
      { slug: 'gites', label: 'Gîtes', description: 'Hébergement écoresponsable pour vos séjours.' },
      { slug: 'visites', label: 'Visites', description: 'Découverte pédagogique du site et des cultures.' },
      { slug: 'residences', label: 'Résidences', description: 'Accueil de créatifs et de porteurs de projets.' },
      { slug: 'evenements', label: 'Événements', description: 'Rencontres et temps collectifs en plein air.' },
    ],
  },
  {
    slug: 'ecologie',
    label: 'Écologie & Terrain',
    shortDescription: 'Projets de compostage, gestion de l’eau et biodiversité.',
    icon: '🌿',
    color: '#4b8c30',
    domains: [
      { slug: 'compost', label: 'Compostage', description: 'Solutions de gestion des déchets organiques.' },
      { slug: 'biodiversite', label: 'Biodiversité', description: 'Actions pour la faune, la flore et les habitats.' },
      { slug: 'eau', label: 'Eau', description: 'Gestion durable des ressources hydriques.' },
      { slug: 'paysage', label: 'Paysage', description: 'Aménagement paysager écologique et design vert.' },
    ],
  },
  {
    slug: 'cooperation',
    label: 'Coopération & Projets',
    shortDescription: 'Projets collectifs, partenariats locaux et engagement citoyen.',
    icon: '🤝',
    color: '#467d8c',
    domains: [
      { slug: 'partenariat', label: 'Partenariat', description: 'Coopérations avec associations et acteurs du territoire.' },
      { slug: 'volontariat', label: 'Volontariat', description: 'Chantiers participatifs et actions bénévoles.' },
      { slug: 'gouvernance', label: 'Gouvernance', description: 'Démarche coopérative et gestion collective.' },
    ],
  },
];
