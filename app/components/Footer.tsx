import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div className="footerBrandBlock">
          <p className="footerBrand">ADRO BIO FARM</p>
          <p className="footerText">
            Coopérative agroécologique dédiée aux produits bio, au tourisme vert, à la formation et aux événements durables.
          </p>
        </div>

        <div>
          <p className="footerTitle">Explorer</p>
          <ul className="footerLinks">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/products">Produits</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="footerTitle">Contact</p>
          <p className="footerText">contact@adro-bio-farm.example</p>
          <p className="footerText">+212 6 00 00 00 00</p>
          <p className="footerText">Domaine ADRO BIO FARM, 12345 Rabat, Morocco</p>
        </div>
      </div>

      <div className="footerBottom">
        <div className="container footerBottomGrid">
          <p>© 2026 ADRO BIO FARM</p>
          <p>Engagement local, durable et pédagogique.</p>
        </div>
      </div>
    </footer>
  );
}
