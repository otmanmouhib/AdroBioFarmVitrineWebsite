import Image from 'next/image';
import Link from 'next/link';
import { normalizeDbImageSrc } from '../../lib/image';
import { getNewsCategories, getNewsPosts } from '../../lib/db';
import type { NewsCategory } from '../../data/news';

export const metadata = {
  title: 'News - ADRO BIO FARM',
  description: 'Journal d’ADRO BIO FARM : actualités, perspectives et annonces sur la ferme, les formations et les projets durables.',
};

type NewsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function extractParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function findCategoryLabel(categorySlug: string | null, categories: NewsCategory[]) {
  return categories.find((category) => category.slug === categorySlug)?.label;
}

function findSubcategoryLabel(categorySlug: string | null, subcategorySlug: string | null, categories: NewsCategory[]) {
  const category = categories.find((cat) => cat.slug === categorySlug);
  return category?.subcategories.find((subcategory) => subcategory.slug === subcategorySlug)?.label;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const requestedCategory = extractParam(params?.category) ?? null;
  const requestedSubcategory = extractParam(params?.subcategory) ?? null;

  const [newsCategories, newsPosts] = await Promise.all([
    getNewsCategories(),
    getNewsPosts(requestedCategory, requestedSubcategory),
  ]);

  const selectedCategory = newsCategories.find((category) => category.slug === requestedCategory);
  const selectedSubcategory = selectedCategory?.subcategories.find((subcategory) => subcategory.slug === requestedSubcategory);
  const activeLabel = selectedSubcategory?.label ?? selectedCategory?.label ?? 'Journal d’ADRO BIO FARM';
  const activeDescription = selectedSubcategory?.description ?? selectedCategory?.description ?? 'Des articles structurés pour présenter nos projets, nos offres et nos temps forts dans un format professionnel et lisible.';
  const sortedPosts = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Actualités récentes</p>
              <h2>{activeLabel}</h2>
              <p className="sectionLead">{activeDescription}</p>
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
                  <Image
                    src={normalizeDbImageSrc(post.image) ?? 'https://placehold.co/600x420/f0faf5/3b4f35?text=Article'}
                    alt={post.title}
                    width={420}
                    height={280}
                    className="cardImage"
                    unoptimized
                  />
                </div>
                <div className="itemHeader">
                  <div>
                    <h3>{post.title}</h3>
                    <span className="detailBadge">
                      {findCategoryLabel(post.category, newsCategories) ?? post.category}
                      {post.subcategory ? ` • ${findSubcategoryLabel(post.category, post.subcategory, newsCategories) ?? post.subcategory}` : ''}
                    </span>
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
