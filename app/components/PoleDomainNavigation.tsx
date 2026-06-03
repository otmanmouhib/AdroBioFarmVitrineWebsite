'use client';

import Link from 'next/link';
import { Pole } from '../../data/poles';

type NavItem = {
  pole: string;
  domain: string;
};

type PoleDomainNavigationProps = {
  poles: Pole[];
  items: NavItem[];
  page: 'products' | 'services';
  activePole?: string | null;
  activeDomain?: string | null;
};

function buildDomainsByPole(items: NavItem[]) {
  return items.reduce<Record<string, Set<string>>>((acc, item) => {
    const domains = acc[item.pole] ?? new Set<string>();
    domains.add(item.domain);
    acc[item.pole] = domains;
    return acc;
  }, {});
}

export default function PoleDomainNavigation({ poles, items, page, activePole, activeDomain }: PoleDomainNavigationProps) {
  const availableDomainsByPole = buildDomainsByPole(items);
  const pageLabel = page === 'products' ? 'produits' : 'services';

  return (
    <section className="filterBar">
      <div className="poleTabs" role="tablist" aria-label={`Filtrer les ${pageLabel} par pôle`}>
        <Link href={`/${page}`} className={`poleTabButton ${!activePole && !activeDomain ? 'active' : ''}`}>
          Tous
        </Link>
        {poles.map((pole) => (
          <Link
            key={pole.slug}
            href={`/${page}?pole=${pole.slug}`}
            className={`poleTabButton ${activePole === pole.slug ? 'active' : ''}`}
          >
            <span>{pole.icon}</span>
            {pole.label}
          </Link>
        ))}
      </div>

      <div className="polePanels">
        {poles.map((pole) => {
          const domains = pole.domains.filter((domain) => availableDomainsByPole[pole.slug]?.has(domain.slug));
          if (domains.length === 0) {
            return null;
          }

          return (
            <div key={pole.slug} className="catalogPanel">
              <div className="catalogPanelHeader">
                <div className="polePanelTitle">
                  <span className="polePanelIcon">{pole.icon}</span>
                  <div>
                    <h3>{pole.label}</h3>
                    <p>{pole.shortDescription}</p>
                  </div>
                </div>
                <Link href={`/${page}?pole=${pole.slug}`} className="button secondary">
                  Voir tous les {pageLabel}
                </Link>
              </div>

              <div className="domainLinks">
                {domains.map((domain) => (
                  <Link
                    key={domain.slug}
                    href={`/${page}?pole=${pole.slug}&domain=${domain.slug}`}
                    className={`domainLink ${activeDomain === domain.slug ? 'active' : ''}`}
                  >
                    {domain.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
