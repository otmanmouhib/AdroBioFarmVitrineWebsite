import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { newsPosts } from '../../../data/news';

function getCardImage(title: string) {
  return `https://placehold.co/1200x700/eaf1e1/3b4f35?text=${encodeURIComponent(title)}`;
}

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
      description: 'Cet article n’a pas été trouvé.',
    };
  }

  return {
    title: `${post.title} – News | ADRO BIO FARM`,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = newsPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <section className="section hero detailHero">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">News</p>
            <span className="detailBadge">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="intro">{post.summary}</p>
            <div className="heroBadges">
              <span className="heroBadge">Publié le {new Date(post.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="heroActions">
              <Link href="/news" className="button secondary">
                Retour au journal
              </Link>
            </div>
          </div>

          <div className="heroPanel">
            <div className="heroPanelImage">
              <img src={post.image ?? getCardImage(post.title)} alt={post.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Article</p>
              <h2>{post.title}</h2>
              <p className="sectionLead">{post.excerpt}</p>
            </div>
          </div>

          <article className="catalogItem">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
