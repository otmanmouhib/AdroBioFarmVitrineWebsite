'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { boutiqueCategories, boutiqueProducts } from '../../data/boutique';

function formatPrice(price?: number) {
  if (price === undefined) return 'Prix sur demande';
  return `${price.toLocaleString('fr-FR')} DH`;
}

const PAGE_SIZE = 6;

export default function BoutiquePage() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get('category');
  const selectedCategory = boutiqueCategories.find((category) => category.slug === requestedCategory);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [requestedCategory]);

  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return boutiqueProducts;
    return boutiqueProducts.filter((product) => product.category === selectedCategory.slug);
  }, [selectedCategory]);

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return visibleProducts.slice(start, start + PAGE_SIZE);
  }, [visibleProducts, currentPage]);

  const subtitle = selectedCategory ? selectedCategory.description : 'Découvrez tous nos accessoires, équipements et produits fermiers disponibles en boutique.';
  const activeLabel = selectedCategory ? selectedCategory.label : 'Toutes les catégories';

  return (
    <main>
      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Boutique</p>
              <h2>{activeLabel}</h2>
              <p className="sectionLead">{subtitle}</p>
            </div>
            <div className="catalogMeta">
              <span>{visibleProducts.length} références</span>
              <span className="catalogMetaLabel">{activeLabel}</span>
            </div>
          </div>

          <div className="itemGrid productCards">
            {paginatedProducts.map((product) => (
              <article key={product.slug} className="catalogItem">
                <div className="cardMedia">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="itemHeader">
                  <div>
                    <h3>{product.title}</h3>
                    <span className="detailBadge">{product.subcategory}</span>
                  </div>
                  <span className={`stockLabel ${product.stock === 'in-stock' ? 'inStock' : product.stock === 'rupture' ? 'outOfStock' : 'onDemand'}`}>
                    {product.stock === 'in-stock' ? 'En stock' : product.stock === 'rupture' ? 'Rupture de stock' : 'Sur demande'}
                  </span>
                </div>
                <p>{product.excerpt}</p>
                <div className="itemFooter boutiqueFooter">
                  <span className="priceTag">{formatPrice(product.price)}</span>
                  <div className="boutiqueActions">
                    <Link href={`/boutique/${product.slug}`} className="button secondary">
                      Détails
                    </Link>
                    <Link href="/contact" className="button">
                      Commander
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="paginationControls">
              <button
                type="button"
                className="button secondary"
                onClick={() => setCurrentPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              <span>
                Page {currentPage} sur {pageCount}
              </span>
              <button
                type="button"
                className="button secondary"
                onClick={() => setCurrentPage((current) => Math.min(pageCount, current + 1))}
                disabled={currentPage === pageCount}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
