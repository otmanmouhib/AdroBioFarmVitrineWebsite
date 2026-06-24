'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAllDomains } from '../../data/poles';
import type { Pole } from '../../data/poles';
import type { Product } from '../../data/products';
import type { Service } from '../../data/services';
import type { BoutiqueCategory } from '../../data/boutique';
import type { NewsPost } from '../../data/news';

type BreadcrumbProps = {
  poles: Pole[];
  products: Product[];
  services: Service[];
  boutiqueCategories: BoutiqueCategory[];
  newsPosts: NewsPost[];
};

function findPoleLabel(slug: string | null, poles: Pole[]) {
  return poles.find((pole) => pole.slug === slug)?.label;
}

function findDomainLabel(slug: string | null, poles: Pole[]) {
  return slug
    ? poles.flatMap((pole) => getAllDomains(pole)).find((domain) => domain.slug === slug)?.label
    : undefined;
}

function findCategoryLabel(slug: string | null, boutiqueCategories: BoutiqueCategory[]) {
  return boutiqueCategories.find((category) => category.slug === slug)?.label;
}

function findBoutiqueSubcategoryLabel(categorySlug: string | null, subcategorySlug: string | null, boutiqueCategories: BoutiqueCategory[]) {
  if (!categorySlug || !subcategorySlug) return undefined;
  const category = boutiqueCategories.find((categoryItem) => categoryItem.slug === categorySlug);
  return category?.subcategories.find((subcategory) => subcategory.slug === subcategorySlug)?.label;
}

function buildListHref(base: string, pole?: string | null, domain?: string | null) {
  const params = new URLSearchParams();
  if (pole) params.set('pole', pole);
  if (domain) params.set('domain', domain);
  return `${base}${params.toString() ? `?${params.toString()}` : ''}`;
}

export default function Breadcrumb({ poles, products, services, boutiqueCategories, newsPosts }: BreadcrumbProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const crumbs = useMemo(() => {
    const items: Array<{ href: string; label: string; active?: boolean }> = [
      { href: '/', label: 'Accueil' },
    ];

    if (!pathname || pathname === '/') {
      return items;
    }

    const segments = pathname.split('/').filter(Boolean);
    const [first, second] = segments;

    if (first === 'products') {
      items.push({ href: '/products', label: 'Produits' });
      const queryPole = searchParams.get('pole');
      const queryDomain = searchParams.get('domain');
      let pole = queryPole;
      let domain = queryDomain;
      if (second) {
        const product = products.find((item) => item.slug === second);
        if (product) {
          if (!pole) pole = product.pole;
          if (!domain) domain = product.domain;
        }
      }
      const poleLabel = findPoleLabel(pole, poles);
      if (poleLabel) {
        items.push({ href: buildListHref('/products', pole), label: poleLabel });
      }
      const domainLabel = findDomainLabel(domain, poles);
      if (domainLabel) {
        items.push({ href: buildListHref('/products', pole, domain), label: domainLabel });
      }
      if (second) {
        const product = products.find((item) => item.slug === second);
        if (product) {
          items.push({ href: `/products/${product.slug}`, label: product.title, active: true });
        }
      }
      return items;
    }

    if (first === 'services') {
      items.push({ href: '/services', label: 'Services' });
      const queryPole = searchParams.get('pole');
      const queryDomain = searchParams.get('domain');
      let pole = queryPole;
      let domain = queryDomain;
      if (second) {
        const service = services.find((item) => item.slug === second);
        if (service) {
          if (!pole) pole = service.pole;
          if (!domain) domain = service.domain;
        }
      }
      const poleLabel = findPoleLabel(pole, poles);
      if (poleLabel) {
        items.push({ href: buildListHref('/services', pole), label: poleLabel });
      }
      const domainLabel = findDomainLabel(domain, poles);
      if (domainLabel) {
        items.push({ href: buildListHref('/services', pole, domain), label: domainLabel });
      }
      if (second) {
        const service = services.find((item) => item.slug === second);
        if (service) {
          items.push({ href: `/services/${service.slug}`, label: service.title, active: true });
        }
      }
      return items;
    }

    if (first === 'boutique') {
      items.push({ href: '/boutique', label: 'Boutique' });
      const category = searchParams.get('category');
      const subcategory = searchParams.get('subcategory');
      const categoryLabel = findCategoryLabel(category, boutiqueCategories);
      if (categoryLabel) {
        items.push({ href: `/boutique?category=${category}`, label: categoryLabel });
      }
      const subcategoryLabel = findBoutiqueSubcategoryLabel(category, subcategory, boutiqueCategories);
      if (subcategoryLabel) {
        items.push({ href: `/boutique?category=${category}&subcategory=${subcategory}`, label: subcategoryLabel });
      }
      if (second) {
        const productItem = products.find((item) => item.slug === second) || services.find((item) => item.slug === second);
        if (productItem) {
          items.push({ href: `/boutique/${productItem.slug}`, label: productItem.title, active: true });
        }
      }
      return items;
    }

    if (first === 'news') {
      items.push({ href: '/news', label: 'News' });
      if (second) {
        const post = newsPosts.find((item) => item.slug === second);
        if (post) {
          items.push({ href: `/news/${post.slug}`, label: post.title, active: true });
        }
      }
      return items;
    }

    if (first === 'references') {
      items.push({ href: '/references', label: 'Références', active: true });
      return items;
    }

    if (first === 'certifications') {
      items.push({ href: '/certifications', label: 'Certifications', active: true });
      return items;
    }

    if (first === 'who-we-are') {
      items.push({ href: '/who-we-are', label: 'Qui sommes-nous', active: true });
      return items;
    }

    if (first === 'contact') {
      items.push({ href: '/contact', label: 'Contact', active: true });
      return items;
    }

    return items;
  }, [pathname, searchParams, boutiqueCategories, newsPosts, poles, products, services]);

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumb" aria-label="Fil d’Ariane">
      <ol>
        {crumbs.map((item, index) => (
          <li key={item.href} className={item.active ? 'active' : undefined}>
            {item.active ? (
              <span>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
            {index < crumbs.length - 1 && <span className="breadcrumbSeparator">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
