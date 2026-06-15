import { getPoles } from '../../lib/db';
import { boutiqueCategories } from '../../data/boutique';
import { newsCategories } from '../../data/news';
import Navbar from './Navbar';

type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

export default async function NavbarServer() {
  const poles = await getPoles();

  const productPanes: NavItem[] = poles.map((pole) => ({
    href: `/products?pole=${pole.slug}`,
    label: `${pole.icon} ${pole.label}`,
    children: pole.domains.map((domain) => ({
      href: `/products?pole=${pole.slug}&domain=${domain.slug}`,
      label: domain.label,
    })),
  }));

  const servicePanes: NavItem[] = poles.map((pole) => ({
    href: `/services?pole=${pole.slug}`,
    label: `${pole.icon} ${pole.label}`,
    children: pole.domains.map((domain) => ({
      href: `/services?pole=${pole.slug}&domain=${domain.slug}`,
      label: domain.label,
    })),
  }));

  const boutiquePanes: NavItem[] = boutiqueCategories.map((category) => ({
    href: `/boutique?category=${category.slug}`,
    label: `${category.icon} ${category.label}`,
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
