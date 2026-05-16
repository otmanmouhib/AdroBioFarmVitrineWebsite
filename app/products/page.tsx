import Link from 'next/link';
import { poles } from '../../data/poles';
import { products } from '../../data/products';

export default function ProductsPage() {
  const groupedProducts = poles
    .map((pole) => ({
      pole,
      items: products.filter((product) => product.pole === pole.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Nos produits</p>
          <h1>Des produits fermiers et végétaux au service d’une agriculture durable</h1>
          <p className="intro">
            ADRO BIO FARM propose un catalogue de produits locaux, bio et saisonniers, structurés autour de nos principaux domaines métiers.
          </p>
          <Link href="/contact" className="button">Commander ou réserver</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {groupedProducts.map(({ pole, items }) => (
            <div key={pole.slug} className="sectionBlock">
              <div className="sectionIntro">
                <span className="detailBadge">{pole.label}</span>
                <h2>{pole.label}</h2>
                <p>{pole.shortDescription}</p>
              </div>
              <div className="itemGrid">
                {items.map((product) => (
                  <article key={product.slug} className="itemCard">
                    <h3>{product.title}</h3>
                    <p>{product.shortDescription}</p>
                    <Link href={`/products/${product.slug}`} className="button secondary">
                      En savoir plus
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section highlight contactCta">
        <div className="container">
          <h2>Prêt à commander ?</h2>
          <p>Contactez-nous pour construire votre panier ou passer commande sur mesure.</p>
          <Link href="/contact" className="button secondary">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
