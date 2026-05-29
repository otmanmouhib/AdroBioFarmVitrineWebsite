import Link from 'next/link';
import { notFound } from 'next/navigation';
import TagList from '../../components/TagList';
import { poles } from '../../../data/poles';
import { products } from '../../../data/products';
import { services } from '../../../data/services';
import { productTags } from '../../../data/productTags';

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: 'Produit introuvable', description: 'Produit non trouvé sur ADRO BIO FARM.' };
  }

  return {
    title: `${product.title} • ADRO BIO FARM`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const pole = poles.find((item) => item.slug === product.pole);
  const relatedServices = services.filter((service) => service.pole === product.pole).slice(0, 3);

  return (
    <main>
      <section className="section hero detailHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <span className="detailBadge">{product.category}</span>
            <p className="eyebrow">Produit</p>
            <h1>{product.title}</h1>
            <p className="intro">{product.description}</p>
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
              <img src={product.image} alt={product.title} />
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
            <p><strong>Type :</strong> {product.category}</p>
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
