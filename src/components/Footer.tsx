'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="text-white pt-16 pb-8"
      style={{ backgroundColor: '#0f0f1a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Colonne 1: Logo + Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#1e3a5f' }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Serru<span style={{ color: '#d4a853' }}>Access</span></span>
            </div>
            <p className="text-white/60 mb-6 max-w-md">
              Votre serrurier de confiance à Rennes et Bretagne. Intervention rapide 24h/24, 
              7j/7. Devis gratuit, qualité garantie. Artisans certifiés A2P.
            </p>
            <div className="flex gap-4">
              <a 
                href="tel:+33299123456"
                className="px-4 py-2 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
              >
                02 99 12 34 56
              </a>
            </div>
          </div>

          {/* Colonne 2: Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4a853', fontFamily: 'Space Grotesk, sans-serif' }}>Services</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/services" className="hover:text-white transition-colors">Ouverture de porte</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Réparation serrures</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Installation serrures</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Blindage de porte</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Coffres-forts</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Fabrication clés</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4a853', fontFamily: 'Space Grotesk, sans-serif' }}>Navigation</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Nos services</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/devis" className="hover:text-white transition-colors">Devis gratuit</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/mentions-legales#confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact row */}
        <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-white/10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3 text-white/60">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>02 99 12 34 56</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>contact@serruaccess.fr</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>15 Rue de la Motte, 35000 Rennes</span>
          </div>
        </div>

        {/* Copyright */}
        <div 
          className="pt-8 text-center text-white/40 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p>© {currentYear} SerruAccess. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
