import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Nos services</p>
          <h1>Solutions durables, formation et hébergement pour tous</h1>
          <p className="intro">
            Nous accompagnons les particuliers, les groupes et les artistes avec des services d'hydroponie, d'aquaponie, de formation, de séjour et de résidence artistique.
          </p>
          <Link href="/contact" className="button">Nous contacter</Link>
        </div>
      </section>

      <section className="section">
        <div className="container contactGrid">
          <div className="sectionCard">
            <h2>Hydroponie</h2>
            <p>Conception et vente de systèmes hydroponiques adaptés aux jardins urbains et aux fermes pédagogiques.</p>
          </div>
          <div className="sectionCard">
            <h2>Aquaponie</h2>
            <p>Solutions aquaponiques pour une production intégrée de poissons et de légumes, optimale pour l'autonomie alimentaire.</p>
          </div>
          <div className="sectionCard">
            <h2>Formations</h2>
            <p>Ateliers pour groupes et individuels sur l'environnement, l'écologie, la permaculture et le développement durable.</p>
          </div>
          <div className="sectionCard">
            <h2>Hébergement</h2>
            <p>Séjours immersifs à la ferme, hébergement confortable et découverte des pratiques agricoles naturelles.</p>
          </div>
          <div className="sectionCard">
            <h2>Résidence artistique</h2>
            <p>Accueil d'artistes et de musiciens pour créer, enregistrer et se ressourcer dans un environnement inspirant.</p>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="container">
          <h2>Construisons ensemble votre projet</h2>
          <p>Que vous recherchiez un système sur mesure, un atelier ou un séjour, nous adaptons nos services à votre besoin.</p>
          <Link href="/contact" className="button secondary">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
