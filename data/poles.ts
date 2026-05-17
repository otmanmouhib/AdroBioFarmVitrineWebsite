export type Pole = {
  slug: string;
  label: string;
  shortDescription: string;
  icon: string;
  color: string;
};

export const poles: Pole[] = [
  {
    slug: 'ferme',
    label: 'Ferme',
    shortDescription: 'Produits fermiers et circuits courts, de la production à la vente locale.',
    icon: '🐔',
    color: '#7f9a4a',
  },
  {
    slug: 'vegetal',
    label: 'Végétal',
    shortDescription: 'Légumes, fruits et herbes aromatiques cultivés avec respect de l’écosystème.',
    icon: '🌱',
    color: '#4f8b3f',
  },
  {
    slug: 'pepiniere',
    label: 'Pépinière',
    shortDescription: 'Plants, semis et conseils horticoles pour un jardin durable.',
    icon: '🌿',
    color: '#5a7d44',
  },
  {
    slug: 'formation',
    label: 'Formation',
    shortDescription: 'Ateliers et stages pour apprendre l’agriculture durable et l’écologie.',
    icon: '📚',
    color: '#7c6642',
  },
  {
    slug: 'hebergement',
    label: 'Hébergement',
    shortDescription: 'Séjours immersifs, accueil de groupes et résidences artistiques à la ferme.',
    icon: '🏡',
    color: '#6e6b4f',
  },
  {
    slug: 'evenementiel',
    label: 'Événementiel',
    shortDescription: 'Événements responsables, séminaires nature et animations pédagogiques.',
    icon: '🎪',
    color: '#a26f3c',
  },
  {
    slug: 'ecologie',
    label: 'Écologie',
    shortDescription: 'Offres durables pour compostage, agroforesterie et projets zéro déchet.',
    icon: '🌎',
    color: '#3b7f5f',
  },
];
