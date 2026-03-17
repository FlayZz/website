import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import FloatingCTA from '@/components/FloatingCTA';
import { ThemeProvider } from '@/components/ThemeProvider';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'SerruAccess - Serrurier Rennes | Intervention rapide 24h/24',
  description: 'Serrurier professionnel à Rennes et Bretagne. Intervention rapide, urgences 24h/24, devis gratuit.',
  robots: 'index, follow',
  openGraph: {
    title: 'SerruAccess - Serrurier Rennes',
    description: 'Serrurier professionnel à Rennes et Bretagne. Intervention rapide 24h/24.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SerruAccess',
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte l'intervention d'un serrurier à Rennes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le tarif de base pour une ouverture de porte simple à Rennes commence à 80€. Cependant, le coût peut varier selon l'heure, la complexité de la serrure, et le type d'intervention."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le délai d'intervention à Rennes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous intervenons généralement sous 30 à 60 minutes sur Rennes et sa métropole."
      }
    },
    {
      "@type": "Question",
      "name": "Intervenez-vous la nuit et les dimanches à Rennes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, notre service d'urgence est disponible 24h/24, 7j/7, y compris dimanches et jours fériés."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles certifications possède SerruAccess ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos serruriers sont certifiés et expérimentés. Nous sommes spécialisés dans la pose de serrures certifiées A2P."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <Analytics />
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
            <FloatingCTA />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
