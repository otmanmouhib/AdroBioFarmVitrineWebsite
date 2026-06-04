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

export default function HomePage() {
  return (
    <main>
      <section className="hero heroLanding">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">Coopérative agroécologique</p>
            <h1>Ferme durable, services clairs et expériences pédagogiques.</h1>
            <p className="intro">
              Si vous cherchez des produits de la ferme, un projet écoresponsable ou une formation pratique, ADRO BIO FARM est l’endroit où commencer.
            </p>

            <div className="heroBadgeGroup">
              <span className="heroBadge">Local</span>
              <span className="heroBadge">Éthique</span>
              <span className="heroBadge">Engagé</span>
            </div>

            <div className="actions heroActions">
              <Link href="/products" className="button primaryLarge">Découvrir les produits</Link>
              <Link href="/contact" className="button secondaryLarge">Demander un devis</Link>
            </div>
          </div>

          <aside className="heroPanel heroPanelLanding">
            <div>
              <p className="eyebrow">Offre structurée</p>
              <h2>Une proposition claire et engagée.</h2>
              <p className="heroPanelText">
                Trois types d’offres — produits, services et formations — présentés simplement, pour que vous trouviez rapidement ce qui correspond à votre projet durable.
              </p>
            </div>

            <div className="heroPanelStats">
              <div>
                <strong>3 cibles</strong>
                <span>Produits, services, formations</span>
              </div>
              <div>
                <strong>7 domaines</strong>
                <span>De la ferme à l’écologie</span>
              </div>
            </div>

            <ul className="heroPanelList heroPanelListLanding">
              <li>Offres structurées par métier</li>
              <li>Choix rapides, impact durable</li>
              <li>Commande ou contact direct</li>
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
            <h2>Nos pôles d’activité</h2>
            <p className="sectionLead">
              Sept pôles d’expertise pour structurer notre offre : production, végétal, pépinière, formation, hébergement, événementiel et écologie.
            </p>
          </div>
          <div className="domainGrid">
            {poles.map((pole) => (
              <article key={pole.slug} className="domainCard">
                <div className="domainCardHeader" style={{ backgroundColor: `${pole.color}22` }}>
                  <span className="domainIcon">{pole.icon}</span>
                </div>
                <div className="domainCardBody">
                  <h3>{pole.label}</h3>
                  <p>{pole.shortDescription}</p>
                  <Link href={`/products?pole=${pole.slug}`} className="button secondary">
                    Explorer ce pôle
                  </Link>
                </div>
              </article>
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
