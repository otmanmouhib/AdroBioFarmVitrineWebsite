import Link from 'next/link';
import TagList from './components/TagList';
import { poles } from '../data/poles';
import { products } from '../data/products';
import { services } from '../data/services';
import { productTags } from '../data/productTags';
import { serviceTags } from '../data/serviceTags';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 4);

  return (
    <main>
      <section className="hero">
        <div className="container heroContent">
          <p className="eyebrow">ADRO BIO FARM</p>
          <h1>Vivre, apprendre et créer au cœur d'une ferme durable</h1>
          <p className="intro">
            Coopérative pédagogique, nous cultivons des produits bio, concevons des systèmes hydroponiques et aquaponiques, accueillons des séjours et formons des groupes à l'écologie et au développement durable.
          </p>
          <div className="actions">
            <Link href="/products" className="button">Voir les produits</Link>
            <Link href="/services" className="button secondary">Découvrir nos services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <h2>Nos domaines métiers</h2>
            <p className="sectionLead">
              ADRO BIO FARM s'organise autour de sept domaines métiers : ferme, végétal, pépinière, formation, hébergement, événementiel et écologie.
            </p>
          </div>
          <div className="poleGrid">
            {poles.map((pole) => (
              <article key={pole.slug} className="poleCard">
                <span className="cardIcon">{pole.icon}</span>
                <h3>{pole.label}</h3>
                <p>{pole.shortDescription}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="container">
          <div className="sectionIntro">
            <h2>Produits phares</h2>
            <p className="sectionLead">Une sélection de nos meilleurs produits, représentatifs de la diversité de la ferme et de nos pratiques durables.</p>
          </div>
          <div className="itemGrid">
            {featuredProducts.map((product) => (
              <article key={product.slug} className="itemCard">
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.shortDescription}</p>
                  <TagList tags={productTags[product.slug]} />
                </div>
                <Link href={`/products/${product.slug}`} className="button secondary">
                  Voir le produit
                </Link>
              </article>
            ))}
          </div>
          <div className="actions" style={{ paddingTop: '1.75rem' }}>
            <Link href="/products" className="button secondary">Voir tous les produits</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <h2>Services essentiels</h2>
            <p className="sectionLead">Des services sur-mesure pour accompagner vos projets d’agriculture durable, d’hébergement et d’événementiel.</p>
          </div>
          <div className="itemGrid">
            {featuredServices.map((service) => (
              <article key={service.slug} className="itemCard">
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <TagList tags={serviceTags[service.slug]} />
                </div>
                <Link href={`/services/${service.slug}`} className="button secondary">
                  Voir le service
                </Link>
              </article>
            ))}
          </div>
          <div className="actions" style={{ paddingTop: '1.75rem' }}>
            <Link href="/services" className="button secondary">Découvrir tous les services</Link>
          </div>
        </div>
      </section>

      <section className="section highlight contactCta">
        <div className="container">
          <h2>Prêt à nous rejoindre ?</h2>
          <p>Contactez-nous pour réserver un séjour, commander des produits ou organiser une formation.</p>
          <Link href="/contact" className="button">Page contact</Link>
        </div>
      </section>
    </main>
  );
}
