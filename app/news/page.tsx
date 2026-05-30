import Link from 'next/link';
import { newsPosts } from '../../data/news';

export const metadata = {
  title: 'News - ADRO BIO FARM',
  description: 'Journal d’ADRO BIO FARM : actualités, perspectives et annonces sur la ferme, les formations et les projets durables.',
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsPage() {
  const sortedPosts = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Actualités récentes</p>
              <h2>Journal d’ADRO BIO FARM</h2>
              <p className="sectionLead">Des articles structurés pour présenter nos projets, nos offres et nos temps forts dans un format professionnel et lisible.</p>
            </div>
            <div className="catalogMeta">
              <span>{newsPosts.length} publications</span>
              <span className="catalogMetaLabel">Dernières actualités</span>
            </div>
          </div>

          <div className="itemGrid productCards">
            {sortedPosts.map((post) => (
              <article key={post.slug} className="catalogItem">
                <div className="cardMedia">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="itemHeader">
                  <div>
                    <h3>{post.title}</h3>
                    <span className="detailBadge">{post.category}</span>
                  </div>
                </div>
                <p>{post.excerpt}</p>
                <div className="itemFooter">
                  <span>{formatDate(post.date)}</span>
                  <Link href={`/news/${post.slug}`} className="button secondary">
                    Lire l’article
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
            <p className="eyebrow">Une question ?</p>
            <h2>Contactez-nous pour en savoir plus sur nos projets et nos services.</h2>
            <p>
              Si vous souhaitez participer à nos programmes, recevoir un panier de saison ou organiser une visite, notre équipe est à votre écoute.
            </p>
          </div>
          <Link href="/contact" className="button">
            Nous contacter
          </Link>
        </div>
      </section>
    </main>
  );
}
