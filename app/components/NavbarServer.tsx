import { getPoles, getBoutiqueCategories, getNewsCategories } from '../../lib/db';
import { getProductDomains, getServiceDomains } from '../../data/poles';
import Navbar from './Navbar';

export const dynamic = 'force-dynamic';

type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

export default async function NavbarServer() {
  const [poles, boutiqueCategories, newsCategories] = await Promise.all([
    getPoles(),
    getBoutiqueCategories(),
    getNewsCategories(),
  ]);

  const productPanes: NavItem[] = poles.map((pole) => ({
    href: `/products?pole=${pole.slug}`,
    label: pole.label,
    children: getProductDomains(pole).map((domain) => ({
      href: `/products?pole=${pole.slug}&domain=${domain.slug}`,
      label: domain.label,
    })),
  }));

  const servicePanes: NavItem[] = poles.map((pole) => ({
    href: `/services?pole=${pole.slug}`,
    label: pole.label,
    children: getServiceDomains(pole).map((domain) => ({
      href: `/services?pole=${pole.slug}&domain=${domain.slug}`,
      label: domain.label,
    })),
  }));

  const boutiquePanes: NavItem[] = boutiqueCategories.map((category) => ({
    href: `/boutique?category=${category.slug}`,
    label: category.icon ? `${category.icon} ${category.label}` : category.label,
    children: category.subcategories.map((subcategory) => ({
      href: `/boutique?category=${category.slug}&subcategory=${subcategory.slug}`,
      label: subcategory.label,
    })),
  }));

  const newsPanes: NavItem[] = newsCategories.map((category) => ({
    href: `/news?category=${category.slug}`,
    label: category.label,
    children: category.subcategories.map((subcategory) => ({
      href: `/news?category=${category.slug}&subcategory=${subcategory.slug}`,
      label: subcategory.label,
    })),
  }));

  const navItems: NavItem[] = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits', children: productPanes },
    { href: '/services', label: 'Services', children: servicePanes },
    { href: '/boutique', label: 'Boutique', children: boutiquePanes },
    { href: '/news', label: 'News', children: newsPanes },
    { href: '/references', label: 'Références' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/who-we-are', label: 'Qui sommes-nous' },
  ];

  return <Navbar navItems={navItems} />;
}
