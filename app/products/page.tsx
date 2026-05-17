'use client';

import { useState } from 'react';
import Link from 'next/link';
import TagList from '../components/TagList';
import PoleFilter from '../components/PoleFilter';
import { poles } from '../../data/poles';
import { products } from '../../data/products';
import { productTags } from '../../data/productTags';

function getPoleIcon(slug: string) {
  return poles.find((pole) => pole.slug === slug)?.icon ?? '🍃';
}

export default function ProductsPage() {
  const [activePole, setActivePole] = useState(poles[0]?.slug ?? '');
  const selectedPole = poles.find((pole) => pole.slug === activePole) ?? poles[0];
  const visibleProducts = products.filter((product) => product.pole === activePole);

  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Nos produits</p>
          <h1>Des produits fermiers et végétaux au service d’une agriculture durable</h1>
          <p className="intro">
            ADRO BIO FARM propose un catalogue de produits locaux, bio et saisonniers, structurés autour de nos principaux domaines métiers.
          </p>
          <Link href="/contact" className="button">Commander ou réserver</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <h2>Choisissez un domaine</h2>
            <p className="sectionLead">Voyez un domaine à la fois pour rester clair et découvrir l’offre sans surcharge.</p>
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
              {visibleProducts.map((product) => (
                <article key={product.slug} className="itemCard">
                  <div>
                    <span className="cardIcon small">{getPoleIcon(product.pole)}</span>
                    <h3>{product.title}</h3>
                    <span className="detailBadge">{product.category}</span>
                    <p>{product.shortDescription}</p>
                    <TagList tags={productTags[product.slug]} max={2} />
                  </div>
                  <Link href={`/products/${product.slug}`} className="button secondary">
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
          <h2>Prêt à commander ?</h2>
          <p>Contactez-nous pour construire votre panier ou passer commande sur mesure.</p>
          <Link href="/contact" className="button secondary">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
