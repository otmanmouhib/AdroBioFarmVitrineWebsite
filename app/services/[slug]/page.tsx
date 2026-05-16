import Link from 'next/link';
import { notFound } from 'next/navigation';
import TagList from '../../components/TagList';
import { poles } from '../../../data/poles';
import { services } from '../../../data/services';
import { products } from '../../../data/products';
import { serviceTags } from '../../../data/serviceTags';

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { title: 'Service introuvable', description: 'Service non trouvé sur ADRO BIO FARM.' };
  }

  return {
    title: `${service.title} • ADRO BIO FARM`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const pole = poles.find((item) => item.slug === service.pole);
  const relatedProducts = products.filter((product) => product.pole === service.pole).slice(0, 3);

  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Service</p>
          <h1>{service.title}</h1>
          <p className="intro">{service.description}</p>
          <TagList tags={serviceTags[service.slug]} />
          <div className="actions">
            <Link href="/contact" className="button">Contactez-nous</Link>
            <Link href="/services" className="button secondary">Retour aux services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detailGrid">
          <div>
            <span className="detailBadge">{pole?.label ?? 'Catalogue'}</span>
            <p className="sectionLead">{pole?.shortDescription}</p>
            <h2>Méthodologie</h2>
            <ul className="detailList">
              {service.methodology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="itemCard">
            <h3>Livrables</h3>
            <ul className="detailList">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
            {service.duration && (
              <>
                <h3>Durée</h3>
                <p>{service.duration}</p>
              </>
            )}
            {service.audience && (
              <>
                <h3>Public</h3>
                <p>{service.audience}</p>
              </>
            )}
            <div className="detailFooter">
              <Link href="/contact" className="button secondary">Demander un devis</Link>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section highlight">
          <div className="container">
            <div className="sectionIntro">
              <h2>Produits associés</h2>
              <p>Nos produits liés à ce service, issus du même domaine d’expertise.</p>
            </div>
            <div className="itemGrid">
              {relatedProducts.map((product) => (
                <article key={product.slug} className="itemCard">
                  <h3>{product.title}</h3>
                  <p>{product.shortDescription}</p>
                  <Link href={`/products/${product.slug}`} className="button secondary">
                    Voir le produit
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
