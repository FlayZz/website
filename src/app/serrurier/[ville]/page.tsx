import dynamic from 'next/dynamic';
import Link from 'next/link';

const MapWithNoSSR = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
});

const cities = {
  rennes: {
    name: 'Rennes',
    slug: 'rennes',
    heroTitle: 'Intervention Rapide Serrurerie à Rennes',
    heroSubtitle: 'Votre serrurier de confiance à Rennes. Dépannage urgent, installation, réparation. Disponible 24h/24, 7j/7.',
    cities: 'Rennes, Cesson-Sévigné, Saint-Grégoire, Bruz, Pacé, Chantepie'
  },
  'cesson-sevigne': {
    name: 'Cesson-Sévigné',
    slug: 'cesson-sevigne',
    heroTitle: 'Intervention Rapide Serrurerie à Cesson-Sévigné',
    heroSubtitle: 'Votre serrurier expert à Cesson-Sévigné. Dépannage rapide, installation serrures, urgence 24h/24.',
    cities: 'Cesson-Sévigné, Rennes, Thorigné-Fouillard'
  },
  bruz: {
    name: 'Bruz',
    slug: 'bruz',
    heroTitle: 'Intervention Rapide Serrurerie à Bruz',
    heroSubtitle: 'Votre serrurier à Bruz. Réparation, installation, urgence. Toutes certifications A2P.',
    cities: 'Bruz, Rennes, Guichen'
  },
  pace: {
    name: 'Pacé',
    slug: 'pace',
    heroTitle: 'Intervention Rapide Serrurerie à Pacé',
    heroSubtitle: 'Votre serrurier expert à Pacé. Intervention rapide, devis gratuit, qualité garantie.',
    cities: 'Pacé, Rennes, Le Rheu'
  }
};

export function generateStaticParams() {
  return Object.keys(cities).map((ville) => ({ ville }));
}

export default function SerrurierPage({ params }: { params: { ville: string } }) {
  const ville = params.ville;
  const cityData = cities[ville as keyof typeof cities] || cities.rennes;

  return (
    <>
      {/* Hero */}
      <section 
        className="pt-32 pb-20"
        style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1e3a5f 50%, #0a0a15 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {cityData.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {cityData.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+33255996202"
              className="px-8 py-4 rounded-full font-bold text-lg"
              style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
            >
              📞 02 55 99 62 02
            </a>
            <Link 
              href="/devis"
              className="px-8 py-4 rounded-full font-bold text-lg border-2"
              style={{ borderColor: 'white', color: 'white' }}
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 dark:text-white" style={{ color: '#1e3a5f' }}>
            Nos services à {cityData.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Ouverture de porte',
              'Réparation serrures',
              'Installation serrures',
              'Changement cylindre',
              'Blindage porte',
              'Coffre-fort'
            ].map((service, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <span className="font-medium dark:text-white">✓ {service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 dark:text-white" style={{ color: '#1e3a5f' }}>
            Zone d'intervention à {cityData.name}
          </h2>
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg mb-6">
            <MapWithNoSSR />
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Communes: {cityData.cities}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white" style={{ color: '#1e3a5f' }}>
            Besoin d'un serrurier à {cityData.name} ?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Intervention rapide garantie. Devis gratuit sans engagement.
          </p>
          <a 
            href="tel:+33255996202"
            className="inline-block px-8 py-4 rounded-full font-bold text-lg"
            style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
          >
            Appeler maintenant: 02 55 99 62 02
          </a>
        </div>
      </section>
    </>
  );
}
