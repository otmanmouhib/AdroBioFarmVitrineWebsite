'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TagList from '../components/TagList';
import { poles } from '../../data/poles';
import { products } from '../../data/products';
import { productTags } from '../../data/productTags';

function getPoleIcon(slug: string) {
  return poles.find((pole) => pole.slug === slug)?.icon ?? '🍃';
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const requestedPole = searchParams.get('pole');
  const activePole = poles.some((pole) => pole.slug === requestedPole) ? requestedPole : poles[0]?.slug ?? '';
  const selectedPole = poles.find((pole) => pole.slug === activePole) ?? poles[0];
  const visibleProducts = products.filter((product) => product.pole === activePole);

  return (
    <main>
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
