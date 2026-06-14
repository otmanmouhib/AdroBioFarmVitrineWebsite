from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

poles = '''export type Domain = {
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
'''

products = '''export type Product = {
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
'''

services = '''export type Service = {
  slug: string;
  title: string;
  pole: string;
  domain: string;
  category: string;
  description: string;
  methodology: string[];
  deliverables: string[];
  duration?: string;
  audience?: string;
  image?: string;
};

export const services: Service[] = [
  {
    slug: 'stage-permaculture',
    title: 'Stage permaculture',
    pole: 'formation',
    domain: 'permaculture',
    category: 'Formation',
    description: 'Apprenez à concevoir un jardin nourricier et durable.',
    methodology: ['Théorie', 'Pratique', 'Design collectif'],
    deliverables: ['Guide permaculture', 'Plan de jardin', 'Supports de stage'],
  },
  {
    slug: 'atelier-agroecologie',
    title: 'Atelier agroécologie',
    pole: 'formation',
    domain: 'agroecologie',
    category: 'Atelier',
    description: 'Expérimentez des pratiques culturales respectueuses du sol.',
    methodology: ['Visite terrain', 'Ateliers mains dans la terre', 'Analyse sol'],
    deliverables: ['Plan d’actions', 'Fiche pratiques', 'Recommandations'],
  },
  {
    slug: 'atelier-cuisine-de-saison',
    title: 'Atelier cuisine de saison',
    pole: 'formation',
    domain: 'cuisine',
    category: 'Atelier cuisine',
    description: 'Cuisinez et transformez nos récoltes en recettes savoureuses.',
    methodology: ['Démonstration', 'Recettes', 'Dégustation'],
    deliverables: ['Recettes', 'Fiches de conservation', 'Menu saisonnier'],
  },
  {
    slug: 'stage-bien-etre-nature',
    title: 'Stage bien-être nature',
    pole: 'formation',
    domain: 'bien-etre',
    category: 'Stage',
    description: 'Retraite courte pour renouer avec la nature et ses rythmes.',
    methodology: ['Marche sensorielle', 'Atelier plantes', 'Relaxation'],
    deliverables: ['Programme stage', 'Fiches plantes', 'Séance pratique'],
  },
  {
    slug: 'visite-guidee-ferme',
    title: 'Visite guidée de la ferme',
    pole: 'accueil',
    domain: 'visites',
    category: 'Visite',
    description: 'Tour découverte de la ferme, de ses cultures et de ses pratiques.',
    methodology: ['Visite des parcelles', 'Rencontre des équipes', 'Démo terrain'],
    deliverables: ['Guide visite', 'Fiche pédagogie', 'Cadeau de bienvenue'],
  },
  {
    slug: 'weekend-gite-ferme',
    title: 'Week-end au gîte de la ferme',
    pole: 'accueil',
    domain: 'gites',
    category: 'Séjour',
    description: 'Séjour immersif dans un hébergement bucolique et écoresponsable.',
    methodology: ['Accueil', 'Repas locaux', 'Programme nature'],
    deliverables: ['Nuit en gîte', 'Petit-déjeuner bio', 'Visite offerte'],
    duration: '2 jours',
  },
  {
    slug: 'residence-creative-ferme',
    title: 'Résidence créative à la ferme',
    pole: 'accueil',
    domain: 'residences',
    category: 'Résidence',
    description: 'Accueil de porteurs de projets artistiques et pédagogiques.',
    methodology: ['Hébergement projet', 'Accompagnement', 'Espace créatif'],
    deliverables: ['Séjour projet', 'Visibilité', 'Accompagnement'],
  },
  {
    slug: 'evenement-nature',
    title: 'Événement nature sur site',
    pole: 'accueil',
    domain: 'evenements',
    category: 'Événement',
    description: 'Organisation d’un événement convivial en plein air.',
    methodology: ['Organisation', 'Logistique', 'Accueil invités'],
    deliverables: ['Programme événement', 'Mise en place', 'Bilan'],
  },
  {
    slug: 'atelier-jardinage-participatif',
    title: 'Atelier jardinage participatif',
    pole: 'evenementiel',
    domain: 'atelier',
    category: 'Atelier collectif',
    description: 'Session collective de jardinage et d’apprentissage des cultures.',
    methodology: ['Travail pratique', 'Explications', 'Échanges'],
    deliverables: ['Fiche technique', 'Matériel fourni', 'Temps collectif'],
  },
  {
    slug: 'seminaire-equipe-nature',
    title: 'Séminaire d’équipe en nature',
    pole: 'evenementiel',
    domain: 'seminaire',
    category: 'Séminaire',
    description: 'Journée d’équipe mêlant cohésion et immersion écologique.',
    methodology: ['Ateliers', 'Temps de réflexion', 'Balade guidée'],
    deliverables: ['Programme sur mesure', 'Animation', 'Restitution'],
  },
  {
    slug: 'chantier-compost-participatif',
    title: 'Chantier compost participatif',
    pole: 'ecologie',
    domain: 'compost',
    category: 'Participation',
    description: 'Atelier pratique pour apprendre le compostage en collectif.',
    methodology: ['Tri déchets', 'Montage tas', 'Suivi compost'],
    deliverables: ['Guide compost', 'Fiche pratique', 'Réunion bilan'],
  },
  {
    slug: 'diagnostic-biodiversite-site',
    title: 'Diagnostic biodiversité du site',
    pole: 'ecologie',
    domain: 'biodiversite',
    category: 'Diagnostic',
    description: 'Évaluation de la faune, de la flore et des habitats locaux.',
    methodology: ['Inventaire', 'Analyse', 'Préconisations'],
    deliverables: ['Rapport biodiversité', 'Carte espèces', 'Plan d’actions'],
  },
  {
    slug: 'gestion-eau-pluviale',
    title: 'Gestion des eaux et pluie',
    pole: 'ecologie',
    domain: 'eau',
    category: 'Accompagnement écologique',
    description: 'Conception d’une gestion durable des eaux de pluie et de l’irrigation.',
    methodology: ['Audit', 'Planification', 'Suivi'],
    deliverables: ['Schéma eau', 'Propositions', 'Plan suivi'],
  },
  {
    slug: 'masterplan-paysager',
    title: 'Masterplan de paysage écologique',
    pole: 'ecologie',
    domain: 'paysage',
    category: 'Aménagement',
    description: 'Projet pour valoriser le site par des aménagements naturels.',
    methodology: ['Diagnostic', 'Design', 'Suivi réalisation'],
    deliverables: ['Schéma paysager', 'Fiches plantes', 'Plan d’entretien'],
  },
  {
    slug: 'partenariat-territoire',
    title: 'Partenariat territorial',
    pole: 'cooperation',
    domain: 'partenariat',
    category: 'Partenariat',
    description: 'Coopération avec une structure locale autour d’un projet commun.',
    methodology: ['Réunion', 'Co-construction', 'Lancement'],
    deliverables: ['Cahier des charges', 'Plan commun', 'Suivi partenariat'],
  },
  {
    slug: 'chantier-volontaire',
    title: 'Chantier volontaire solidaire',
    pole: 'cooperation',
    domain: 'volontariat',
    category: 'Volontariat',
    description: 'Projet bénévole pour soutenir les activités de la ferme.',
    methodology: ['Mobilisation', 'Organisation', 'Encadrement'],
    deliverables: ['Programme chantier', 'Encadrement', 'Bilan solidaire'],
  },
  {
    slug: 'gouvernance-cooperative',
    title: 'Accompagnement gouvernance coopérative',
    pole: 'cooperation',
    domain: 'gouvernance',
    category: 'Conseil',
    description: 'Soutien à la mise en place d’une gouvernance participative.',
    methodology: ['Atelier', 'Animation', 'Synthèse'],
    deliverables: ['Trame de gouvernance', 'Supports de réunion', 'Feuille de route'],
  },
];
'''

for path, content in [
    (BASE / 'data' / 'poles.ts', poles),
    (BASE / 'data' / 'products.ts', products),
    (BASE / 'data' / 'services.ts', services),
]:
    path.write_text(content, encoding='utf-8')
    print(f'Wrote {path.relative_to(BASE)}')
