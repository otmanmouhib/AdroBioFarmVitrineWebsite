'use client';

import { useState } from 'react';
import Link from 'next/link';
import TagList from '../components/TagList';
import PoleFilter from '../components/PoleFilter';
import { poles } from '../../data/poles';
import { services } from '../../data/services';
import { serviceTags } from '../../data/serviceTags';

function getPoleIcon(slug: string) {
  return poles.find((pole) => pole.slug === slug)?.icon ?? '🍃';
}

export default function ServicesPage() {
  const [activePole, setActivePole] = useState(poles[0]?.slug ?? '');
  const selectedPole = poles.find((pole) => pole.slug === activePole) ?? poles[0];
  const visibleServices = services.filter((service) => service.pole === activePole);

  return (
    <main>
      <section className="section hero productsHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">Nos services</p>
            <h1>Services sur mesure pour vos projets durables et pédagogiques</h1>
            <p className="intro">
              ADRO BIO FARM propose un catalogue de services organisé par domaine pour vous aider à choisir vite et activer votre projet.
            </p>

            <div className="heroBadges">
              <span className="heroBadge">Accompagnement</span>
              <span className="heroBadge">Formation</span>
              <span className="heroBadge">Événementiel</span>
            </div>

            <Link href="/contact" className="button">Nous contacter</Link>
          </div>

          <aside className="heroPanel heroPanelProduct">
            <div className="heroPanelHeader">
              <p className="eyebrow">Catalogue service</p>
              <div className="heroPanelStat">
                <strong>{services.length}+</strong>
                <span>références disponibles</span>
              </div>
            </div>
            <h2>Un parcours clair et adapté à votre besoin.</h2>
            <p className="heroPanelText">
              Retrouvez nos offres de formation, d’accueil, d’événements et d’accompagnement en un seul endroit.
            </p>
            <ul className="heroPanelList">
              <li>Parcours métier par domaine</li>
              <li>Services clairs et faciles à comparer</li>
              <li>Accès direct au contact et à la commande</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Catalogue service</p>
              <h2>{selectedPole.label}</h2>
              <p className="sectionLead">Voyez un domaine à la fois pour rester clair et découvrir l’offre sans surcharge.</p>
            </div>
            <div className="catalogMeta">
              <span>{visibleServices.length} références</span>
              <span className="catalogMetaLabel">{selectedPole.label}</span>
            </div>
          </div>

          <div className="filterBar">
            <PoleFilter poles={poles} active={activePole} onSelect={setActivePole} />
          </div>

          <div className="catalogSummary">
            <span className="detailBadge">{selectedPole.label}</span>
            <p>{selectedPole.shortDescription}</p>
          </div>

          <div className="itemGrid productCards">
            {visibleServices.map((service) => (
              <article key={service.slug} className="itemCard catalogItem">
                <div className="itemHeader">
                  <span className="cardIcon small">{getPoleIcon(service.pole)}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <span className="detailBadge">{service.category}</span>
                  </div>
                </div>
                <p>{service.description}</p>
                <div className="itemFooter">
                  <TagList tags={serviceTags[service.slug]} max={2} />
                  <Link href={`/services/${service.slug}`} className="button secondary">
                    En savoir plus
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlight contactCta">
        <div className="container">
          <h2>Construisons votre projet ensemble</h2>
          <p>Que vous cherchiez de l’accompagnement, un atelier, un séjour ou un événement, nous adaptons notre offre à vos besoins.</p>
          <Link href="/contact" className="button secondary">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
