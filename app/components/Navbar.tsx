'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { poles } from '../../data/poles';
import { boutiqueCategories, boutiqueProducts } from '../../data/boutique';

type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

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

const boutiquePanes: NavItem[] = boutiqueCategories.map((category) => {
  const subcategories = Array.from(
    new Set(
      boutiqueProducts
        .filter((product) => product.category === category.slug)
        .map((product) => product.subcategory),
    ),
  );

  return {
    href: `/boutique?category=${category.slug}`,
    label: `${category.icon} ${category.label}`,
    children: subcategories.map((subcategory) => ({
      href: `/boutique?category=${category.slug}&subcategory=${encodeURIComponent(subcategory)}`,
      label: subcategory,
    })),
  };
});

const navItems: NavItem[] = [
  { href: '/', label: 'Accueil' },
  {
    href: '/products',
    label: 'Produits',
    children: productPanes,
  },
  {
    href: '/services',
    label: 'Services',
    children: servicePanes,
  },
  {
    href: '/boutique',
    label: 'Boutique',
    children: boutiquePanes,
  },
  { href: '/news', label: 'News' },
  { href: '/references', label: 'Références' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/who-we-are', label: 'Qui sommes-nous' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openPole, setOpenPole] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';

    const [basePath, query] = href.split('?');
    if (pathname !== basePath) return false;
    if (!query) return true;

    const expected = new URLSearchParams(query);
    for (const [key, value] of expected.entries()) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  };

  const toggleDropdown = (href: string) => {
    setOpenDropdown((current) => (current === href ? null : href));
    setOpenPole(null);
  };

  const togglePole = (href: string) => {
    setOpenPole((current) => (current === href ? null : href));
  };

  return (
    <header className="siteHeader">
      <div className="container navBar">
        <div className="brandRow">
          <div className="brandBlock">
            <Link href="/" className="brand">
              ADRO BIO FARM
            </Link>
            <p className="brandTag">Ferme durable, formations et expériences engagées.</p>
          </div>

          <button
            type="button"
            className={`navToggle ${menuOpen ? 'open' : ''}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`navLinks ${menuOpen ? 'active' : ''}`}>
          <div className="navItems">
            {navItems.map((item) => (
              <div key={item.href} className="navGroup">
                <div className="navGroupHeader">
                  <Link
                    href={item.href}
                    className={`navLink ${isActive(item.href) ? 'active' : ''}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      className={`navDropdownToggle ${openDropdown === item.href ? 'open' : ''}`}
                      aria-expanded={openDropdown === item.href}
                      aria-label={`${item.label} menu`}
                      onClick={() => toggleDropdown(item.href)}
                    >
                      ▾
                    </button>
                  )}
                </div>
                {item.children && openDropdown === item.href && (
                  <div className="navGroupList navMegaMenu">
                    <div className="navMegaIntro">
                      <p className="eyebrow">{item.label}</p>
                      <h3>Navigation par pôle</h3>
                      <p>Choisissez un pôle, puis développez les domaines pour voir l’offre associée.</p>
                      <Link href={item.href} className="navMegaAction" onClick={() => setMenuOpen(false)}>
                        Voir tous les {item.label.toLowerCase()}
                      </Link>
                    </div>
                    <div className="navMegaGrid">
                      {item.children.map((child) => {
                        const isPoleOpen = openPole === child.href;
                        return (
                          <div key={child.href} className="navMegaColumn">
                            <div className="navMegaHeadingRow">
                              <Link
                                href={child.href}
                                className={`navMegaHeading ${isActive(child.href) ? 'active' : ''}`}
                                aria-current={isActive(child.href) ? 'page' : undefined}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setOpenDropdown(null);
                                  setOpenPole(null);
                                }}
                              >
                                {child.label}
                              </Link>
                              {child.children && (
                                <button
                                  type="button"
                                  className={`navMegaToggle ${isPoleOpen ? 'open' : ''}`}
                                  aria-expanded={isPoleOpen}
                                  aria-label={`Afficher les domaines de ${child.label}`}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    togglePole(child.href);
                                  }}
                                >
                                  ▾
                                </button>
                              )}
                            </div>
                            {child.children && isPoleOpen && (
                              <div className="navMegaItems">
                                <Link
                                  href={child.href}
                                  className={`navMegaItem navMegaItemAll ${isActive(child.href) ? 'active' : ''}`}
                                  aria-current={isActive(child.href) ? 'page' : undefined}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setOpenDropdown(null);
                                    setOpenPole(null);
                                  }}
                                >
                                  Tous les {child.label.toLowerCase()}
                                </Link>
                                {child.children.map((subChild) => (
                                  <Link
                                    key={subChild.href}
                                    href={subChild.href}
                                    className={`navMegaItem ${isActive(subChild.href) ? 'active' : ''}`}
                                    aria-current={isActive(subChild.href) ? 'page' : undefined}
                                    onClick={() => {
                                      setMenuOpen(false);
                                      setOpenDropdown(null);
                                      setOpenPole(null);
                                    }}
                                  >
                                    {subChild.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="navActions">
            <Link href="/contact" className="navAction" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
