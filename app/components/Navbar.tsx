import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="siteHeader">
      <div className="container navBar">
        <Link href="/" className="brand">
          ADRO BIO FARM
        </Link>
        <nav className="navLinks">
          <Link href="/" className="navLink">Accueil</Link>
          <Link href="/products" className="navLink">Produits</Link>
          <Link href="/services" className="navLink">Services</Link>
          <Link href="/contact" className="navLink">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
