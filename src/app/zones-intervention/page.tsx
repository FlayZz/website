'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const MapWithNoSSR = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
});

const departments = [
  { code: '35', name: 'Ille-et-Vilaine', cities: 'Rennes, Cesson-Sévigné, Saint-Grégoire, Bruz, Pacé', priority: true },
  { code: '29', name: 'Finistère', cities: 'Brest, Quimper, Morlaix, Douarnenez', priority: false },
  { code: '22', name: 'Côtes-d\'Armor', cities: 'Saint-Brieuc, Lannion, Dinan', priority: false },
  { code: '56', name: 'Morbihan', cities: 'Vannes, Lorient, Auray', priority: false },
  { code: '44', name: 'Loire-Atlantique', cities: 'Nantes, Saint-Nazaire, Rezé', priority: false },
  { code: '53', name: 'Mayenne', cities: 'Laval, Mayenne, Château-Gontier', priority: false },
];

export default function ZonesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1e3a5f 50%, #0a0a15 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Zones d&apos;intervention
          </h1>
          <p className="text-xl text-gray-300">
            Intervention rapide 24h/24, 7j/7 en Bretagne et Pays de la Loire
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <MapWithNoSSR />
          </div>
        </div>
      </section>

      {/* Priority Zone */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#d4a853' }}>
              Zone prioritaire
            </span>
            <h2 className="text-3xl font-bold mt-2 dark:text-white" style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}>
              Intervention sous 30 minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Priority Card */}
            <div className="bg-[#d4a853] rounded-2xl p-8 text-white" style={{ backgroundColor: '#d4a853' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⚡</span>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>Rennes Métropole</h3>
                  <p className="text-sm" style={{ color: '#1e3a5f' }}>Département 35</p>
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: '#1e3a5f' }}>
                Intervention sous 30 minutes garantie. Réponse rapide pour tous vos besoins de serrurerie.
              </p>
              <a href="tel:+33255996202" className="inline-block px-6 py-3 rounded-full font-bold" style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                📞 02 55 99 62 02
              </a>
            </div>

            {/* Other Departments */}
            <div className="space-y-4">
              {departments.filter(d => !d.priority).map((dept) => (
                <div key={dept.code} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold dark:text-white" style={{ color: '#1e3a5f' }}>
                      {dept.code} - {dept.name}
                    </h4>
                    <span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                      Intervention rapide
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{dept.cities}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 dark:text-white" style={{ color: '#1e3a5f' }}>
            Besoin d&apos;un serrurier ?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            N&apos;hésitez pas à nous contacter pour toute demande de devis ou intervention urgente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33255996202" className="px-8 py-4 rounded-full font-bold" style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}>
              📞 Appeler: 02 55 99 62 02
            </a>
            <Link href="/devis" className="px-8 py-4 rounded-full font-bold border-2" style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}>
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
