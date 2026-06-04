import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { normalizeDbImageSrc } from '../../../lib/image';
import { getPoles, getProducts, getServiceBySlug, getServices } from '../../../lib/db';

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

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
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [poles, relatedProducts] = await Promise.all([
    getPoles(),
    getProducts(undefined, service.domain),
  ]);

  const pole = poles.find((item) => item.slug === service.pole);
  const domain = pole?.domains.find((domainItem) => domainItem.slug === service.domain);

  return (
    <main>
      <section className="section hero detailHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <span className="detailBadge">{domain?.label ?? service.category}</span>
            <p className="eyebrow">Service</p>
            <h1>{service.title}</h1>
            <p className="intro">{service.description}</p>
            <div className="heroActions heroActionsCompact">
              <Link href={`/services?pole=${encodeURIComponent(service.pole)}&domain=${encodeURIComponent(service.domain)}`} className="button secondary small">
                Voir plus de {domain?.label ?? service.category}
              </Link>
            </div>
            <div className="chips">
              {service.methodology.slice(0, 3).map((item) => (
                <span key={item} className="tagChip">
                  {item}
                </span>
              ))}
            </div>
            <div className="actions">
              <Link href="/contact" className="button">Contactez-nous</Link>
              <Link href="/services" className="button secondary">Retour aux services</Link>
            </div>
          </div>

          <div className="detailGallery">
            {service.image ? (
              <Image
                src={normalizeDbImageSrc(service.image) ?? 'https://placehold.co/900x540/eaf1e1/3b4f35?text=Service'}
                alt={service.title}
                width={900}
                height={540}
                className="detailImage"
                unoptimized
              />
            ) : (
              <div className="galleryPlaceholder">
                <span>📷</span>
                <p>Image du service</p>
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
            <h2>Comment ça marche</h2>
            <ul className="detailList">
              {service.methodology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Ce que vous recevez</h3>
            <ul className="detailList">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </div>

          <div className="itemCard detailSidebar">
            <h3>Informations clés</h3>
            <p><strong>Catalogue :</strong> {pole?.label ?? 'ADRO BIO FARM'}</p>
            <p><strong>Domaine :</strong> {domain?.label ?? service.category}</p>
            {service.duration && <p><strong>Durée :</strong> {service.duration}</p>}
            {service.audience && <p><strong>Public :</strong> {service.audience}</p>}
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
