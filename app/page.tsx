export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container heroContent">
          <p className="eyebrow">ADRO BIO FARM</p>
          <h1>Vivre, apprendre et créer au cœur d'une ferme durable</h1>
          <p className="intro">
            Coopérative pédagogique, nous cultivons des produits bio, concevons des systèmes hydroponiques et aquaponiques, accueillons des séjours et formons des groupes à l'écologie et au développement durable.
          </p>
          <div className="actions">
            <a href="/products" className="button">Voir les produits</a>
            <a href="/services" className="button secondary">Découvrir nos services</a>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="container homeGrid">
          <article>
            <h2>Produits naturels</h2>
            <p>Œufs, volailles, petits animaux, fruits et légumes cultivés avec soin et respect de la terre.</p>
          </article>
          <article>
            <h2>Services durables</h2>
            <p>Hydroponie, aquaponie, formations, hébergement et résidence artistique au service d'une démarche écologique.</p>
          </article>
          <article>
            <h2>Expérience immersive</h2>
            <p>Venez séjourner, apprendre sur place ou inviter votre groupe à découvrir les pratiques durables en direct.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Pourquoi choisir ADRO BIO FARM ?</h2>
          <p>
            Nous sommes une coopérative qui rassemble agriculture, pédagogie et créativité. Notre mission est de proposer des produits locaux, des systèmes innovants et des expériences enrichissantes pour les visiteurs, les artistes et les groupes.
          </p>
          <div className="featureList">
            <div>
              <h3>Produits fermiers</h3>
              <p>Des œufs, du poulet, des moutons, des cailles, des lapins et des légumes de saison cultivés en respectant la nature.</p>
            </div>
            <div>
              <h3>Formation</h3>
              <p>Stages et ateliers pour apprendre l'agriculture durable, la permaculture, l'hydroponie et l'aquaponie.</p>
            </div>
            <div>
              <h3>Hébergement</h3>
              <p>Des séjours en immersion avec un accueil chaleureux et un environnement propice à la détente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section highlight contactCta">
        <div className="container">
          <h2>Prêt à nous rejoindre ?</h2>
          <p>Contactez-nous pour réserver un séjour, commander des produits ou organiser une formation.</p>
          <a href="/contact" className="button">Page contact</a>
        </div>
      </section>
    </main>
  );
}
