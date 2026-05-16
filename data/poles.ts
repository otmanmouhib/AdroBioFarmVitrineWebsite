export type Pole = {
  slug: string;
  label: string;
  shortDescription: string;
  icon: string;
};

export const poles: Pole[] = [
  {
    slug: 'ferme',
    label: 'Ferme',
    shortDescription: 'Produits fermiers et circuits courts, de la production à la vente locale.',
    icon: '🐔',
  },
  {
    slug: 'vegetal',
    label: 'Végétal',
    shortDescription: 'Légumes, fruits et herbes aromatiques cultivés avec respect de l’écosystème.',
    icon: '🌱',
  },
  {
    slug: 'pepiniere',
    label: 'Pépinière',
    shortDescription: 'Plants, semis et conseils horticoles pour un jardin durable.',
    icon: '🌿',
  },
  {
    slug: 'formation',
    label: 'Formation',
    shortDescription: 'Ateliers et stages pour apprendre l’agriculture durable et l’écologie.',
    icon: '📚',
  },
  {
    slug: 'hebergement',
    label: 'Hébergement',
    shortDescription: 'Séjours immersifs, accueil de groupes et résidences artistiques à la ferme.',
    icon: '🏡',
  },
  {
    slug: 'evenementiel',
    label: 'Événementiel',
    shortDescription: 'Événements responsables, séminaires nature et animations pédagogiques.',
    icon: '🎪',
  },
  {
    slug: 'ecologie',
    label: 'Écologie',
    shortDescription: 'Offres durables pour compostage, agroforesterie et projets zéro déchet.',
    icon: '🌎',
  },
];
