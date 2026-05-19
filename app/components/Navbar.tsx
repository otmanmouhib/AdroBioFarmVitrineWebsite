import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="siteHeader">
      <div className="container navBar">
        <div className="brandBlock">
          <Link href="/" className="brand">
            ADRO BIO FARM
          </Link>
          <p className="brandTag">Ferme durable, formations et expériences engagées.</p>
        </div>

        <nav className="navLinks">
          <Link href="/" className="navLink">Accueil</Link>
          <Link href="/products" className="navLink">Produits</Link>
          <Link href="/services" className="navLink">Services</Link>
          <Link href="/who-we-are" className="navLink">Qui sommes-nous</Link>
          <Link href="/references" className="navLink">Références</Link>
          <Link href="/contact" className="navLink navButton">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
