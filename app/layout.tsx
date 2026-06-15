import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import NavbarServer from './components/NavbarServer';
import BreadcrumbServer from './components/BreadcrumbServer';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'ADRO BIO FARM',
  description: 'Ferme pédagogique et coopérative durable : produits, services, hébergement, formations et résidences artistiques.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Suspense fallback={null}>
          <NavbarServer />
          <BreadcrumbServer />
        </Suspense>
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
