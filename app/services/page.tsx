'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TagList from '../components/TagList';
import { poles } from '../../data/poles';
import { services } from '../../data/services';
import { serviceTags } from '../../data/serviceTags';

function getPoleIcon(slug: string) {
  return poles.find((pole) => pole.slug === slug)?.icon ?? '🍃';
}

function getCardImage(title: string) {
  return `https://placehold.co/600x420/f0faf5/3b4f35?text=${encodeURIComponent(title)}`;
}

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const requestedPole = searchParams.get('pole');
  const selectedPole = poles.find((pole) => pole.slug === requestedPole);
  const visibleServices = selectedPole ? services.filter((service) => service.pole === selectedPole.slug) : services;
  const categoryLabel = selectedPole?.label ?? 'Toutes les catégories';
  const categoryDescription = selectedPole?.shortDescription ?? 'Tous les services ADRO BIO FARM sont affichés ensemble.';

  return (
    <main>
      <section className="section productCatalog">
        <div className="container">
          <div className="catalogHeader">
            <div>
              <p className="eyebrow">Catalogue service</p>
              <h2>{categoryLabel}</h2>
              <p className="sectionLead">{categoryDescription}</p>
            </div>
            <div className="catalogMeta">
              <span>{visibleServices.length} références</span>
              <span className="catalogMetaLabel">{categoryLabel}</span>
            </div>
          </div>

          <div className="itemGrid productCards">
            {visibleServices.map((service) => (
              <article key={service.slug} className="itemCard catalogItem">
                <div className="cardMedia">
                  <img src={service.image ?? getCardImage(service.title)} alt={service.title} />
                </div>
                <div className="itemHeader">
                  <span className="cardIcon small">{getPoleIcon(service.pole)}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <span className="detailBadge">{service.category}</span>
                  </div>
                </div>
                <p>{service.description}</p>
                <div className="itemFooter">
                  <TagList tags={serviceTags[service.slug]} max={2} />
                  <Link href={`/services/${service.slug}`} className="button secondary">
                    En savoir plus
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlight contactCta">
        <div className="container">
          <h2>Construisons votre projet ensemble</h2>
          <p>Que vous cherchiez de l’accompagnement, un atelier, un séjour ou un événement, nous adaptons notre offre à vos besoins.</p>
          <Link href="/contact" className="button secondary">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
