import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { normalizeDbImageSrc } from '../../../lib/image';
import { getPoles, getProductBySlug, getProducts, getServices } from '../../../lib/db';
import { getProductDomains } from '../../../data/poles';

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produit introuvable',
      description: 'Produit non trouvé sur ADRO BIO FARM.',
    };
  }

  return {
    title: `${product.title} • ADRO BIO FARM`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [poles, relatedServices] = await Promise.all([
    getPoles(),
    getServices(undefined, product.domain),
  ]);

  const pole = poles.find((item) => item.slug === product.pole);
  const domain = pole ? getProductDomains(pole).find((domainItem) => domainItem.slug === product.domain) : undefined;

  return (
    <main>
      <section className="section hero detailHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <span className="detailBadge">{domain?.label ?? product.category}</span>
            <p className="eyebrow">Produit</p>
            <h1>{product.title}</h1>
            <p className="intro">{product.description}</p>
            <div className="heroActions heroActionsCompact">
              <Link href={`/products?pole=${encodeURIComponent(product.pole)}&domain=${encodeURIComponent(product.domain)}`} className="button secondary small">
                Voir plus de {domain?.label ?? product.category}
              </Link>
            </div>
            <div className="chips">
              {product.features.map((feature) => (
                <span key={feature} className="tagChip">
                  {feature}
                </span>
              ))}
            </div>
            <div className="actions">
              <Link href="/contact" className="button">Contacter pour commande</Link>
              <Link href="/products" className="button secondary">Retour aux produits</Link>
            </div>
          </div>

          <div className="detailGallery">
            {product.image ? (
              <Image
                src={normalizeDbImageSrc(product.image) ?? 'https://placehold.co/900x540/eaf1e1/3b4f35?text=Produit'}
                alt={product.title}
                width={900}
                height={540}
                className="detailImage"
                unoptimized
              />
            ) : (
              <div className="galleryPlaceholder">
                <span>📦</span>
                <p>Image du produit</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detailGrid">
          <div>
            <span className="detailBadge">{pole?.label ?? 'Catalogue'}</span>
            <p className="sectionLead">{pole?.shortDescription}</p>
            <h2>Description détaillée</h2>
            <p>{product.description}</p>
            <h3>Ce que contient ce produit</h3>
            <ul className="detailList">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="itemCard detailSidebar">
            <h3>Informations clés</h3>
            <p><strong>Catalogue :</strong> {pole?.label ?? 'ADRO BIO FARM'}</p>
            <p><strong>Domaine :</strong> {domain?.label ?? product.category}</p>
            <p><strong>Commande :</strong> par contact uniquement</p>
            <div className="detailFooter">
              <Link href="/contact" className="button secondary">Contacter pour une commande</Link>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="section highlight">
          <div className="container">
            <div className="sectionIntro">
              <h2>Services associés</h2>
              <p>Découvrez nos services qui complètent ce produit dans le même domaine.</p>
            </div>
            <div className="itemGrid">
              {relatedServices.map((service) => (
                <article key={service.slug} className="itemCard">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={`/services/${service.slug}`} className="button secondary">
                    Voir le service
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
