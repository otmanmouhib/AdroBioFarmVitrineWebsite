import Link from 'next/link';
import { poles } from '../data/poles';

const trustPoints = [
  {
    icon: '🌱',
    title: 'Production bio de terrain',
    description: 'Nos produits sont cultivés et transformés avec des pratiques durables, à partir de notre ferme et de nos jardins.',
  },
  {
    icon: '🏡',
    title: 'Séjours immersifs',
    description: 'Accueil de visiteurs, familles et groupes pour des expériences nature authentiques et responsables.',
  },
  {
    icon: '📚',
    title: 'Formations concrètes',
    description: 'Ateliers, stages et coaching pour apprendre la permaculture, l’agroécologie et les techniques durables.',
  },
  {
    icon: '🎪',
    title: 'Événements écoresponsables',
    description: 'Organisation de rencontres, séminaires et animations pédagogiques respectueuses de l’environnement.',
  },
];

function getIconForSlug(slug: string) {
  return poles.find((pole) => pole.slug === slug)?.icon ?? '🍃';
}

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">Coopérative agroécologique</p>
            <h1>Ferme durable, expériences pédagogiques et services responsables.</h1>
            <p className="intro">
              ADRO BIO FARM combine production locale, accueil engagé et formation pratique pour accompagner vos projets durables et citoyens.
            </p>

            <div className="heroBadges">
              <span className="heroBadge">Local</span>
              <span className="heroBadge">Éthique</span>
              <span className="heroBadge">Engagé</span>
            </div>

            <div className="actions heroActions">
              <Link href="/products" className="button">Découvrir les produits</Link>
              <Link href="/contact" className="button secondary">Demander un devis</Link>
            </div>
          </div>

          <aside className="heroPanel">
            <p className="eyebrow">Ce que nous vous offrons</p>
            <h2>Un parcours rapide vers l’essentiel.</h2>
            <p className="heroPanelText">
              Un site qui met en avant ce qui compte : des domaines métiers clairs, des offres identifiées et un accès direct à la commande ou au contact.
            </p>
            <ul className="heroPanelList">
              <li>Offres structurées par métier</li>
              <li>Visibilité immédiate des produits et services</li>
              <li>Un parcours simple pour agir</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <h2>Pourquoi choisir ADRO BIO FARM ?</h2>
            <p className="sectionLead">
              Nous proposons des produits fermiers, des services d’accueil et des formations pratiques qui ont un impact concret.
            </p>
          </div>
          <div className="featureList">
            {trustPoints.slice(0, 3).map((point) => (
              <article key={point.title} className="featureCard">
                <span className="featureIcon">{point.icon}</span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="container">
          <div className="sectionIntro">
            <h2>Nos domaines d’activité</h2>
            <p className="sectionLead">
              Sept pôles d’expertise pour structurer notre offre : production, végétal, pépinière, formation, hébergement, événementiel et écologie.
            </p>
          </div>
          <div className="domainGrid">
            {poles.map((pole) => (
              <Link
                key={pole.slug}
                href={`/products#${pole.slug}`}
                className="domainCard"
              >
                <div className="domainCardHeader" style={{ backgroundColor: `${pole.color}22` }}>
                  <span className="domainIcon">{pole.icon}</span>
                </div>
                <div className="domainCardBody">
                  <h3>{pole.label}</h3>
                  <p>{pole.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlight contactCta">
        <div className="container contactCtaContent">
          <div className="contactCtaText">
            <p className="eyebrow">Votre projet commence ici</p>
            <h2>Contactez-nous pour commander ou réserver en quelques clics.</h2>
            <p>
              Une seule action claire : envoyez votre demande et nous reviendrons rapidement avec une solution adaptée.
            </p>
          </div>

          <Link href="/contact" className="button">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
