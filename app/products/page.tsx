import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container heroContent">
          <p className="eyebrow">Nos produits</p>
          <h1>Des produits fermiers et frais, cultivés avec soin</h1>
          <p className="intro">
            ADRO BIO FARM propose une sélection de produits locaux : œufs, volailles, petits animaux, fruits et légumes de saison, tous issus de pratiques responsables.
          </p>
          <Link href="/contact" className="button">Commander ou réserver</Link>
        </div>
      </section>

      <section className="section">
        <div className="container contactGrid">
          <div className="sectionCard">
            <h2>Œufs et volailles</h2>
            <p>Œufs bio, poulets, cailles et autres volailles élevés dans un environnement sain et naturel.</p>
          </div>
          <div className="sectionCard">
            <h2>Petits animaux</h2>
            <p>Lapins et moutons disponibles pour élevage local ou production directe, selon les commandes.</p>
          </div>
          <div className="sectionCard">
            <h2>Fruits et légumes</h2>
            <p>Produits de saison récoltés sur place, en plein champ ou en culture respectueuse de l'environnement.</p>
          </div>
          <div className="sectionCard">
            <h2>Panier découverte</h2>
            <p>Composez un panier ou demandez nos suggestions pour goûter le meilleur de la ferme.</p>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="container">
          <h2>Vous voulez en savoir plus ?</h2>
          <p>Contactez-nous pour recevoir notre liste de produits disponible, connaître les tarifs et organiser une livraison ou un retrait à la ferme.</p>
          <Link href="/contact" className="button secondary">Page contact</Link>
        </div>
      </section>
    </main>
  );
}
