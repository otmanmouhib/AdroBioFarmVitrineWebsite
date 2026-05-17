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
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Nos services</p>
          <h1>Services sur mesure pour vos projets durables et pédagogiques</h1>
          <p className="intro">
            ADRO BIO FARM propose un catalogue de services structuré pour accompagner vos initiatives d’agriculture durable, d’hébergement, d’événementiel et de formation.
          </p>
          <Link href="/contact" className="button">Nous contacter</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <h2>Choisissez un domaine</h2>
            <p className="sectionLead">Explorez un domaine à la fois pour une navigation plus claire et efficace.</p>
          </div>
          <PoleFilter poles={poles} active={activePole} onSelect={setActivePole} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionBlock">
            <div className="sectionIntro">
              <span className="detailBadge">{selectedPole.label}</span>
              <h2>{selectedPole.label}</h2>
              <p>{selectedPole.shortDescription}</p>
            </div>
            <div className="itemGrid">
              {visibleServices.map((service) => (
                <article key={service.slug} className="itemCard">
                  <div>
                    <span className="cardIcon small">{getPoleIcon(service.pole)}</span>
                    <h3>{service.title}</h3>
                    <span className="detailBadge">{service.category}</span>
                    <p>{service.description}</p>
                    <TagList tags={serviceTags[service.slug]} max={2} />
                  </div>
                  <Link href={`/services/${service.slug}`} className="button secondary">
                    En savoir plus
                  </Link>
                </article>
              ))}
            </div>
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
