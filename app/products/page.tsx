import Image from 'next/image';
import Link from 'next/link';
import TagList from '../components/TagList';
import { normalizeDbImageSrc } from '../../lib/image';
import { getPoles, getProducts } from '../../lib/db';
import type { Pole } from '../../data/poles';
import { productTags } from '../../data/productTags';

function extractParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function findDomainLabel(poles: Pole[], slug: string | null | undefined) {
  return slug
    ? poles.flatMap((pole) => pole.domains).find((domain) => domain.slug === slug)?.label
    : undefined;
}

function getPoleIcon(poles: Pole[], slug: string) {
  return poles.find((pole) => pole.slug === slug)?.icon ?? '🍃';
}

function getCardImage(title: string) {
  return `https://placehold.co/600x420/f0faf5/3b4f35?text=${encodeURIComponent(title)}`;
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const requestedPole = extractParam(params?.pole) ?? null;
  const requestedDomain = extractParam(params?.domain) ?? null;
  const [poles, products] = await Promise.all([
    getPoles(),
    getProducts(requestedPole, requestedDomain),
  ]);

  const selectedPole = poles.find((pole) => pole.slug === requestedPole);
  const selectedDomainLabel = findDomainLabel(poles, requestedDomain);
  const categoryLabel = selectedDomainLabel ?? selectedPole?.label ?? 'Toutes les catégories';
  const categoryDescription = selectedDomainLabel
    ? `Produits ${selectedDomainLabel}${selectedPole ? ` dans le pôle ${selectedPole.label}` : ''}.`
    : selectedPole?.shortDescription ?? 'Découvrez tous nos produits ADRO BIO FARM.';

  const visibleProducts = products;

  return (
    <main>
      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Catalogue produit</p>
              <h2>{categoryLabel}</h2>
              <p className="sectionLead">{categoryDescription}</p>
            </div>
            <div className="catalogMeta">
              <span>{visibleProducts.length} références</span>
              <span className="catalogMetaLabel">{categoryLabel}</span>
            </div>
          </div>

          <div className="itemGrid productCards">
            {visibleProducts.map((product) => (
              <article key={product.slug} className="itemCard catalogItem">
                <div className="cardMedia">
                  <Image
                    src={normalizeDbImageSrc(product.image) ?? getCardImage(product.title)}
                    alt={product.title}
                    width={420}
                    height={280}
                    className="cardImage"
                    unoptimized
                  />
                </div>
                <div className="itemHeader">
                  <span className="cardIcon small">{getPoleIcon(poles, product.pole)}</span>
                  <div>
                    <h3>{product.title}</h3>
                    <span className="detailBadge">{findDomainLabel(poles, product.domain) ?? product.category}</span>
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
