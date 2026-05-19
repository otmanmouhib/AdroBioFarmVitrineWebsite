import Link from 'next/link';

export const metadata = {
  title: 'Références - ADRO BIO FARM',
  description: 'Découvrez nos réalisations, partenaires et actions auprès des clients et visiteurs d’ADRO BIO FARM.',
};

export default function ReferencesPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">Références</p>
            <h1>Page en construction</h1>
            <p className="intro">
              Nous préparons une page plus riche avec nos réalisations, projets et retours clients pour mieux vous inspirer.
            </p>
            <div className="heroBadges">
              <span className="heroBadge">Arrive bientôt</span>
              <span className="heroBadge">Travail en cours</span>
              <span className="heroBadge">Retours clients</span>
            </div>
          </div>

          <aside className="heroPanel">
            <p className="eyebrow">À venir</p>
            <h2>Réalisations, témoignages et partenariats</h2>
            <p className="heroPanelText">
              Cette page sortira bientôt avec un aperçu de nos projets fermiers, de nos formations et des collaborations locales.
            </p>
            <ul className="heroPanelList">
              <li>Projets réalisés sur la ferme</li>
              <li>Témoignages de visiteurs et clients</li>
              <li>Partenariats et actions durables</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <p className="eyebrow">Aperçu</p>
            <h2>Ce que vous retrouverez bientôt ici</h2>
            <p className="sectionLead">
              Un espace dédié à nos réalisations sur la ferme, aux témoignages de clients et aux projets menés avec nos partenaires.
            </p>
          </div>

          <div className="referencesGrid">
            <article className="featureCard">
              <h3>Projets concrets</h3>
              <p>Des cas pratiques de production, d’accueil et d’accompagnement durable présentés de manière claire.</p>
            </article>
            <article className="featureCard">
              <h3>Témoignages</h3>
              <p>Des retours de visiteurs, clients et partenaires qui partagent leurs expériences avec nous.</p>
            </article>
            <article className="featureCard">
              <h3>Collaborations</h3>
              <p>Des partenariats locaux et des actions collectives pour des projets agroécologiques.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section highlight referenceFooterCard">
        <div className="container referenceFooterContent">
          <div>
            <p className="eyebrow">Page en construction</p>
            <h2>Nous préparons des références inspirantes</h2>
            <p className="sectionLead">
              Cette page sera bientôt disponible avec un contenu visuel et des exemples concrets pour vous aider à mieux nous connaître.
            </p>
          </div>

          <div className="referenceFooterActions">
            <Link href="/contact" className="button">Contactez-nous</Link>
            <Link href="/who-we-are" className="button secondary">Qui sommes-nous</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
