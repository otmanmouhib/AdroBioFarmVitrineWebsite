import Link from 'next/link';
import { poles } from '../../data/poles';
import { services } from '../../data/services';

export default function ServicesPage() {
  const groupedServices = poles
    .map((pole) => ({
      pole,
      items: services.filter((service) => service.pole === pole.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Nos services</p>
          <h1>Services sur mesure pour vos projets durables et pédagogiques</h1>
          <p className="intro">
            ADRO BIO FARM propose un catalogue de services structuré pour accompagner vos initiatives d’agriculture durable, d’hébergement, d’événementiel et de formation.
          </p>
          <Link href="/contact" className="button">Nous contacter</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {groupedServices.map(({ pole, items }) => (
            <div key={pole.slug} className="sectionBlock">
              <div className="sectionIntro">
                <span className="detailBadge">{pole.label}</span>
                <h2>{pole.label}</h2>
                <p>{pole.shortDescription}</p>
              </div>
              <div className="itemGrid">
                {items.map((service) => (
                  <article key={service.slug} className="itemCard">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="button secondary">
                      En savoir plus
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
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
