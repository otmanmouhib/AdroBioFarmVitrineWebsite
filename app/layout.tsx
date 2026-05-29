import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navbar from './components/Navbar';
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
          <Navbar />
        </Suspense>
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
