import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'SerruAccess - Serrurier Rennes | Intervention rapide 24h/24',
  description: 'Serrurier professionnel à Rennes et Bretagne. Intervention rapide, urgences 24h/24, devis gratuit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
