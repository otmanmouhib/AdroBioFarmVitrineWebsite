'use client';

import { Pole } from '../../data/poles';

type PoleFilterProps = {
  poles: Pole[];
  active: string;
  onSelect: (slug: string) => void;
};

export default function PoleFilter({ poles, active, onSelect }: PoleFilterProps) {
  return (
    <div className="poleTabs" role="tablist" aria-label="Filtrer le catalogue par pôle">
      {poles.map((pole) => (
        <button
          key={pole.slug}
          type="button"
          role="tab"
          aria-selected={active === pole.slug}
          className={`poleTabButton ${active === pole.slug ? 'active' : ''}`}
          onClick={() => onSelect(pole.slug)}
        >
          {pole.label}
        </button>
      ))}
    </div>
  );
}
