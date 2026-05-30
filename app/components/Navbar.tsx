'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { poles } from '../../data/poles';
import { boutiqueCategories } from '../../data/boutique';

const productPanes = poles.map((pole) => ({
  href: `/products?pole=${pole.slug}`,
  label: `${pole.icon} ${pole.label}`,
}));

const servicePanes = poles.map((pole) => ({
  href: `/services?pole=${pole.slug}`,
  label: `${pole.icon} ${pole.label}`,
}));

const boutiquePanes = boutiqueCategories.map((category) => ({
  href: `/boutique?category=${category.slug}`,
  label: `${category.icon} ${category.label}`,
}));

const navItems = [
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
                  <div className="navGroupList">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`navSubLink ${isActive(child.href) ? 'active' : ''}`}
                        aria-current={isActive(child.href) ? 'page' : undefined}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
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
