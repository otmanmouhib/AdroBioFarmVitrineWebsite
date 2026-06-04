import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { normalizeDbImageSrc } from '../../../lib/image';
import { getBoutiqueProductBySlug, getBoutiqueProducts } from '../../../lib/db';

type PageParams = { params: Promise<{ slug: string }> };

function formatPrice(price?: number) {
  if (price === undefined) return 'Prix sur demande';
  return `${price.toLocaleString('fr-FR')} DH`;
}

export async function generateStaticParams() {
  const products = await getBoutiqueProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await getBoutiqueProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produit non trouvé',
      description: 'Ce produit n’a pas été trouvé dans la boutique.',
    };
  }

  return {
    title: `${product.title} – Boutique | ADRO BIO FARM`,
    description: product.excerpt,
  };
}

export default async function BoutiqueProductPage({ params }: PageParams) {
  const { slug } = await params;
  const product = await getBoutiqueProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <section className="section hero detailHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">Boutique</p>
            <span className="detailBadge">{product.subcategory}</span>
            <h1>{product.title}</h1>
            <p className="intro">{product.excerpt}</p>
            <div className="heroActions heroActionsCompact">
              <Link
                href={`/boutique?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subcategory)}`}
                className="button secondary small"
              >
                Voir plus de {product.subcategory}
              </Link>
            </div>
            <div className="heroBadges">
              <span className={`stockLabel ${product.stock === 'in-stock' ? 'inStock' : product.stock === 'rupture' ? 'outOfStock' : 'onDemand'}`}>
                {product.stock === 'in-stock' ? 'En stock' : product.stock === 'rupture' ? 'Rupture de stock' : 'Sur demande'}
              </span>
              <span className="priceTag detailPrice">{formatPrice(product.price)}</span>
            </div>
            <div className="heroActions">
              <Link href="/contact" className="button">
                Commander
              </Link>
              <Link href="/boutique" className="button secondary">
                Retour à la boutique
              </Link>
            </div>
          </div>

          <div className="heroPanel">
            <div className="heroPanelImage">
              <Image
                src={normalizeDbImageSrc(product.image) ?? 'https://placehold.co/900x540/eaf1e1/3b4f35?text=Produit'}
                alt={product.title}
                width={900}
                height={540}
                className="detailImage"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Détails du produit</p>
              <h2>{product.title}</h2>
              <p className="sectionLead">{product.description}</p>
            </div>
          </div>

          <article className="catalogItem">
            <ul className="productDetailList">
              {product.detail.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{product.description}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
