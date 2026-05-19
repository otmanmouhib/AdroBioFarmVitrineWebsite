import Link from 'next/link';

export const metadata = {
  title: 'Qui sommes-nous - ADRO BIO FARM',
  description: 'Découvrez l’histoire, les valeurs et la mission de la ferme coopérative ADRO BIO FARM.',
};

export default function WhoWeArePage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="whoHero">
            <div className="whoHeroIntro">
              <p className="eyebrow">Qui sommes-nous</p>
              <h1>Une ferme coopérative durable, pédagogique et locale</h1>
              <p className="sectionLead">
                ADRO BIO FARM accompagne les projets citoyens avec une agriculture respectueuse, des formations concrètes et un accueil engagé.
              </p>

              <ul className="whoHeroList">
                <li>Production bio et locale</li>
                <li>Accueil terrain et pédagogie</li>
                <li>Services sur mesure pour vos projets</li>
              </ul>

              <div className="sectionActions">
                <Link href="/contact" className="button">Nous contacter</Link>
                <Link href="/references" className="button secondary">Voir les références</Link>
              </div>
            </div>

            <aside className="whoHeroPanel">
              <div className="whoStat">
                <span>🌿</span>
                <div>
                  <strong>Engagement terrain</strong>
                  <p>Un projet ancré dans l’agroécologie et la vie locale.</p>
                </div>
              </div>
              <div className="whoStat">
                <span>🤝</span>
                <div>
                  <strong>Partenariats locaux</strong>
                  <p>Coopération avec des acteurs du territoire et des visiteurs engagés.</p>
                </div>
              </div>
              <div className="whoStat">
                <span>📚</span>
                <div>
                  <strong>Transmission</strong>
                  <p>Ateliers, stages et partages de savoir-faire accessibles et concrets.</p>
                </div>
              </div>
            </aside>
          </div>

          <div className="whoCards">
            <article className="featureCard">
              <h2>Notre mission</h2>
              <p>
                Donner du sens à l’agriculture en proposant une ferme ouverte, des produits de qualité et des parcours de formation qui nourrissent l’autonomie.
              </p>
            </article>

            <article className="featureCard">
              <h2>Nos valeurs</h2>
              <ul>
                <li>Respect du vivant</li>
                <li>Qualité et transparence</li>
                <li>Solidarité locale</li>
                <li>Apprentissage partagé</li>
              </ul>
            </article>

            <article className="featureCard">
              <h2>Ce qui nous distingue</h2>
              <p>
                Une approche complète qui relie production, accueil et formation, pour proposer une expérience engageante et responsable.
              </p>
            </article>

            <article className="featureCard">
              <h2>Votre prochaine étape</h2>
              <p>
                Rejoignez-nous pour une visite, un atelier ou un projet collaboratif : nous adaptons notre offre à vos besoins.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
