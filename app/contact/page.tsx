export default function ContactPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Contact</p>
          <h1>Contactez ADRO BIO FARM</h1>
          <p className="intro">
            Pour commander, réserver un séjour, organiser une formation ou en savoir plus sur nos activités, envoyez-nous un message ou appelez-nous directement.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contactGrid">
          <div className="contactCard">
            <h2>Nos informations</h2>
            <p>Email : <a href="mailto:contact@adro-bio-farm.example">contact@adro-bio-farm.example</a></p>
            <p>Téléphone : <a href="tel:+33600000000">+33 6 00 00 00 00</a></p>
            <p>Adresse : Ferme pédagogique ADRO BIO FARM, France</p>
          </div>
          <div className="contactCard">
            <h2>Pourquoi nous écrire ?</h2>
            <ul>
              <li>Réserver des produits fermiers et des paniers</li>
              <li>Demander un devis pour un système hydroponique ou aquaponique</li>
              <li>Organiser une formation ou un atelier</li>
              <li>Proposer un séjour ou une résidence artistique</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="container">
          <h2>Disponible pour votre projet</h2>
          <p>Nous serons heureux de vous accompagner dans votre démarche durable et pédagogique.</p>
          <p className="intro">Contact direct : <a href="mailto:contact@adro-bio-farm.example">contact@adro-bio-farm.example</a></p>
        </div>
      </section>
    </main>
  );
}
