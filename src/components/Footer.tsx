'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const cities = [
    { name: 'Rennes', dept: '35', slug: 'rennes' },
    { name: 'Cesson-Sévigné', dept: '35', slug: 'cesson-sevigne' },
    { name: 'Saint-Malo', dept: '35', slug: 'saint-malo' },
    { name: 'Brest', dept: '29', slug: 'brest' },
    { name: 'Nantes', dept: '44', slug: 'nantes' },
    { name: 'Vannes', dept: '56', slug: 'vannes' },
    { name: 'Laval', dept: '53', slug: 'laval' },
  ];

  return (
    <footer className="footer-premium pt-16 pb-8 border-t border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Colonne 1: Logo + Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-gold text-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-xl font-bold font-sans text-brand-gold dark:text-white">
                Serru<span className="text-brand-accent">Access</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Votre serrurier de confiance en Bretagne. Intervention rapide 24h/24, 
              7j/7. Artisans certifiés A2P, agréés assurances.
            </p>
            <div className="flex gap-4">
              <a 
                href="tel:0299000000"
                className="px-6 py-3 rounded-full font-bold bg-brand-accent text-white text-brand-gold hover:scale-105 transition-transform shadow-lg"
              >
                02 99 00 00 00
              </a>
            </div>
          </div>

          {/* Colonne 2: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-brand-gold dark:text-brand-accent">Services</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><Link href="/services" className="hover:text-brand-accent transition-colors">Ouverture de porte</Link></li>
              <li><Link href="/services" className="hover:text-brand-accent transition-colors">Réparation serrures</Link></li>
              <li><Link href="/services" className="hover:text-brand-accent transition-colors">Installation blindage</Link></li>
              <li><Link href="/services" className="hover:text-brand-accent transition-colors">Coffre-fort</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Villes (SEO) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-brand-gold dark:text-brand-accent">Nos zones</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              {cities.map(c => (
                <li key={c.slug}>
                  <Link href={`/serrurier/${c.dept}/${c.slug}`} className="hover:text-brand-accent transition-colors">
                    Serrurier {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-brand-gold dark:text-brand-accent">Infos</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><Link href="/faq" className="hover:text-brand-accent transition-colors">FAQ</Link></li>
              <li><Link href="/devis" className="hover:text-brand-accent transition-colors">Devis gratuit</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-brand-accent transition-colors">Légal</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact row */}
        <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
             <span>📍 15 Rue de la Motte, Rennes</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
             <span>✉️ contact@serruaccess.fr</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 justify-end">
             <span className="text-xs uppercase tracking-widest font-bold text-brand-accent">Disponibilité 24/7</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-gray-400 dark:text-gray-600 border-t border-gray-50 dark:border-zinc-900">
          <p className="text-xs">© {currentYear} SerruAccess. Artisans Serruriers de Bretagne.</p>
        </div>
      </div>
    </footer>
  );
}
