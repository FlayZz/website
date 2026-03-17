'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function NotFound() {
  useEffect(() => {
    gsap.fromTo('.notfound-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
    gsap.fromTo('.notfound-btn',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, delay: 0.3 }
    );
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="notfound-content text-center max-w-2xl">
        <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-gold mb-4">
          404
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Page non trouvée
        </h1>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          D&eacute;sol&eacute;, la page que vous recherchez n&apos;existe pas ou a &eacute;t&eacute; d&eacute;plac&eacute;e.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center notfound-btn">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            🏠 Retour &agrave; l&apos;accueil
          </Link>
          <Link 
            href="/devis"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            📋 Demander un devis
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Link href="/services" className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-accent transition-colors">
            <div className="text-2xl mb-2">🔧</div>
            <div className="font-medium">Nos Services</div>
          </Link>
          <Link href="/zones-intervention" className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-accent transition-colors">
            <div className="text-2xl mb-2">📍</div>
            <div className="font-medium">Zones</div>
          </Link>
          <Link href="/faq" className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-accent transition-colors">
            <div className="text-2xl mb-2">❓</div>
            <div className="font-medium">FAQ</div>
          </Link>
          <a href="tel:0299000000" className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-accent transition-colors">
            <div className="text-2xl mb-2">📞</div>
            <div className="font-medium">Urgence</div>
          </a>
        </div>
      </div>
    </main>
  );
}
