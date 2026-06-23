import Image from 'next/image';
import Link from 'next/link';
import TagList from '../components/TagList';
import { normalizeDbImageSrc } from '../../lib/image';
import { getPoles, getServices } from '../../lib/db';
import type { Pole } from '../../data/poles';
import { serviceTags } from '../../data/serviceTags';

function extractParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function findDomainLabel(poles: Pole[], slug: string | null | undefined) {
  return slug
    ? poles.flatMap((pole) => pole.domains).find((domain) => domain.slug === slug)?.label
    : undefined;
}

function getPoleIcon(poles: Pole[], slug: string) {
  return poles.find((pole) => pole.slug === slug)?.label.charAt(0) ?? 'S';
}

function getCardImage(title: string) {
  return `https://placehold.co/600x420/f0faf5/3b4f35?text=${encodeURIComponent(title)}`;
}

export default async function ServicesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const requestedPole = extractParam(params?.pole) ?? null;
  const requestedDomain = extractParam(params?.domain) ?? null;
  const [poles, services] = await Promise.all([
    getPoles(),
    getServices(requestedPole, requestedDomain),
  ]);

  const selectedPole = poles.find((pole) => pole.slug === requestedPole);
  const selectedDomainLabel = findDomainLabel(poles, requestedDomain);
  const categoryLabel = selectedDomainLabel ?? selectedPole?.label ?? 'Toutes les catégories';
  const categoryDescription = selectedDomainLabel
    ? `Services ${selectedDomainLabel}${selectedPole ? ` dans le pôle ${selectedPole.label}` : ''}.`
    : selectedPole?.shortDescription ?? 'Tous les services ADRO BIO FARM sont affichés ensemble.';

  const visibleServices = services;

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
                  <Image
                    src={normalizeDbImageSrc(service.image) ?? getCardImage(service.title)}
                    alt={service.title}
                    width={420}
                    height={280}
                    className="cardImage"
                    unoptimized
                  />
                </div>
                <div className="itemHeader">
                  <span className="cardIcon small">{getPoleIcon(poles, service.pole)}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <span className="detailBadge">{findDomainLabel(poles, service.domain) ?? service.category}</span>
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
