'use client';

import { Pole } from '../../data/poles';

type PoleFilterProps = {
  poles: Pole[];
  active: string;
  onSelect: (slug: string) => void;
};

export default function PoleFilter({ poles, active, onSelect }: PoleFilterProps) {
  return (
    <div className="poleTabs">
      {poles.map((pole) => (
        <button
          key={pole.slug}
          type="button"
          className={`poleTabButton ${active === pole.slug ? 'active' : ''}`}
          style={active === pole.slug ? { borderColor: pole.color, color: pole.color } : undefined}
          onClick={() => onSelect(pole.slug)}
        >
          <span>{pole.icon}</span>
          {pole.label}
        </button>
      ))}
    </div>
  );
}
