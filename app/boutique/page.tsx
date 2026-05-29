import ComingSoonPage from '../components/ComingSoonPage';

export const metadata = {
  title: 'Boutique - ADRO BIO FARM',
  description: 'Page Boutique en construction : un espace élégant, mobile-first et professionnel sera disponible bientôt.',
};

export default function BoutiquePage() {
  return (
    <ComingSoonPage
      pageLabel="Boutique"
      title="Page en construction"
      intro="Cette page est actuellement en construction. Nous préparons une version élégante, professionnelle et mobile-first pour bientôt vous la présenter."
      badges={['Coming soon', 'En construction', 'Mobile first']}
      panelLabel="Travail en cours"
      panelHeading="Un espace élégant et professionnel prend forme."
      panelText="Nous finalisons une page cohérente avec la qualité globale d’ADRO BIO FARM, pensé pour le mobile et pour une lecture claire."
      panelItems={[
        'Design élégant et responsable',
        'Structure mobile-first et fluide',
        'Contenu simple, clair et professionnel',
      ]}
      features={[
        {
          title: 'Branding de confiance',
          description: 'Un style cohérent et rassurant qui reflète la qualité de l’entreprise.',
        },
        {
          title: 'Mobile-first',
          description: 'Une interface fluide et lisible, même sur les petits écrans.',
        },
        {
          title: 'Qualité professionnelle',
          description: 'Une présentation sobre, raffinée et facile à parcourir.',
        },
      ]}
      footerLabel="Bientôt disponible"
      footerHeading="Merci pour votre patience"
      footerText="Nous travaillons à finaliser cette page pour offrir une expérience de qualité, moderne et fiable."
      primaryCta={{ href: '/contact', label: 'Nous contacter' }}
      secondaryCta={{ href: '/who-we-are', label: 'En savoir plus' }}
    />
  );
}
