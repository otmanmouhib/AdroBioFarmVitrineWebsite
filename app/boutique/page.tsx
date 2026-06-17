import Image from 'next/image';
import Link from 'next/link';
import { normalizeDbImageSrc } from '../../lib/image';
import { getBoutiqueCategories, getBoutiqueProducts } from '../../lib/db';

const PAGE_SIZE = 6;

function extractParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatPrice(price?: number) {
  if (price === undefined) return 'Prix sur demande';
  return `${price.toLocaleString('fr-FR')} DH`;
}

function formatAvailability(availability: 'in-stock' | 'out-of-stock' | 'on-demand') {
  if (availability === 'in-stock') return 'En stock';
  if (availability === 'out-of-stock') return 'Rupture de stock';
  return 'Sur demande';
}

export default async function BoutiquePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const requestedCategory = extractParam(params?.category) ?? null;
  const requestedSubcategory = extractParam(params?.subcategory) ?? null;
  const currentPage = Math.max(1, Number(extractParam(params?.page) ?? 1));

  const [boutiqueCategories, boutiqueProducts] = await Promise.all([
    getBoutiqueCategories(),
    getBoutiqueProducts(requestedCategory, requestedSubcategory),
  ]);

  const selectedCategory = boutiqueCategories.find((category) => category.slug === requestedCategory);
  const selectedSubcategory = selectedCategory?.subcategories.find((subcategory) => subcategory.slug === requestedSubcategory);
  const pageCount = Math.max(1, Math.ceil(boutiqueProducts.length / PAGE_SIZE));
  const paginatedProducts = boutiqueProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeLabel = selectedSubcategory?.label ?? selectedCategory?.label ?? 'Toutes les catégories';
  const subtitle = selectedSubcategory?.description ?? selectedCategory?.description ?? 'Découvrez tous nos accessoires, équipements et produits fermiers disponibles en boutique.';

  const findSubcategoryLabel = (categoryId: string, subcategoryId: string) => {
    const category = boutiqueCategories.find((item) => item.slug === categoryId);
    return category?.subcategories.find((sub) => sub.slug === subcategoryId)?.label ?? subcategoryId;
  };

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
              <span>{boutiqueProducts.length} références</span>
              <span className="catalogMetaLabel">{activeLabel}</span>
            </div>
          </div>

          <div className="itemGrid productCards">
            {paginatedProducts.map((product) => (
              <article key={product.slug} className="catalogItem">
                <div className="cardMedia">
                  <Image
                    src={normalizeDbImageSrc(product.image) ?? 'https://placehold.co/600x420/f0faf5/3b4f35?text=Produit'}
                    alt={product.title}
                    width={420}
                    height={320}
                    className="cardImage"
                    unoptimized
                  />
                </div>
                <div className="itemHeader">
                  <div>
                    <h3>{product.title}</h3>
                    <span className="detailBadge">
                      {findSubcategoryLabel(product.boutiqueCategoryId, product.boutiqueSubcategoryId)}
                    </span>
                  </div>
                  <span
                    className={`stockLabel ${product.availability === 'in-stock' ? 'inStock' : product.availability === 'out-of-stock' ? 'outOfStock' : 'onDemand'}`}
                  >
                    {formatAvailability(product.availability)}
                  </span>
                </div>
                <p>{product.shortDescription}</p>
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
              <Link
                href={`/boutique?category=${requestedCategory ?? ''}&subcategory=${requestedSubcategory ?? ''}&page=${Math.max(1, currentPage - 1)}`}
                className="button secondary"
              >
                Précédent
              </Link>
              <span>
                Page {currentPage} sur {pageCount}
              </span>
              <Link
                href={`/boutique?category=${requestedCategory ?? ''}&subcategory=${requestedSubcategory ?? ''}&page=${Math.min(pageCount, currentPage + 1)}`}
                className="button secondary"
              >
                Suivant
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
