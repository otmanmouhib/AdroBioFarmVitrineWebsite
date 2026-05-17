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
      <section className="section hero productsHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">Nos produits</p>
            <h1>Produits fermiers et végétaux, choisis pour vos projets durables.</h1>
            <p className="intro">
              Un catalogue bio, local et saisonnier, organisé par pôle pour une commande simple et rapide.
            </p>

            <div className="heroBadges">
              <span className="heroBadge">Bio</span>
              <span className="heroBadge">Local</span>
              <span className="heroBadge">Saisonnier</span>
            </div>

            <Link href="/contact" className="button">Commander ou réserver</Link>
          </div>

          <aside className="heroPanel heroPanelProduct">
            <div className="heroPanelHeader">
              <p className="eyebrow">Catalogue produit</p>
              <div className="heroPanelStat">
                <strong>{products.length}+</strong>
                <span>références disponibles</span>
              </div>
            </div>
            <h2>Un inventaire lisible et organisé par métier.</h2>
            <p className="heroPanelText">
              Choisissez parmi nos références fermes, plantes et assortiments, puis passez commande ou réservez en quelques clics.
            </p>
            <ul className="heroPanelList">
              <li>Tri par domaine métier</li>
              <li>Produits saisonniers et de proximité</li>
              <li>Accès direct à la commande</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Catalogue produit</p>
              <h2>{selectedPole.label}</h2>
              <p className="sectionLead">Voyez un domaine à la fois pour rester clair et découvrir l’offre sans surcharge.</p>
            </div>
            <div className="catalogMeta">
              <span>{visibleProducts.length} références</span>
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
            {visibleProducts.map((product) => (
              <article key={product.slug} className="itemCard catalogItem">
                <div className="itemHeader">
                  <span className="cardIcon small">{getPoleIcon(product.pole)}</span>
                  <div>
                    <h3>{product.title}</h3>
                    <span className="detailBadge">{product.category}</span>
                  </div>
                </div>
                <p>{product.shortDescription}</p>
                <div className="itemFooter">
                  <TagList tags={productTags[product.slug]} max={2} />
                  <Link href={`/products/${product.slug}`} className="button secondary">
                    En savoir plus
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
            <p className="eyebrow">Prêt à commander ?</p>
            <h2>Construisons votre panier ou commande sur mesure.</h2>
            <p>
              Envoyez-nous votre demande et nous vous préparons une proposition claire, rapide et adaptée à vos besoins.
            </p>
          </div>
          <Link href="/contact" className="button">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
