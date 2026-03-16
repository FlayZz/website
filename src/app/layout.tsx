import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import FloatingCTA from '@/components/FloatingCTA';

export const metadata: Metadata = {
  title: 'SerruAccess - Serrurier Rennes | Intervention rapide 24h/24',
  description: 'Serrurier professionnel à Rennes et Bretagne. Intervention rapide, urgences 24h/24, devis gratuit.',
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
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
          <FloatingCTA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
