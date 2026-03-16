'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const communes = [
  'Rennes', 'Cesson-Sévigné', 'Saint-Grégoire', 'Bruz', 'Pacé', 
  'Vignoc', 'Langan', 'La Mézière', 'Clayes', 'Bécherel'
];

const MapWithNoSSR = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-200 flex items-center justify-center">
      <p className="text-gray-500">Chargement de la carte...</p>
    </div>
  ),
});

export default function MapZone() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map and list animations
      gsap.fromTo('.map-content',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.map-content',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.communes-grid',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.communes-grid',
            start: 'top 80%',
          }
        }
      );

      // Stagger commune items
      gsap.fromTo('.commune-item',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.communes-grid',
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="zone" 
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="text-xs font-bold uppercase tracking-widest mb-4 block"
            style={{ color: '#d4a853' }}
          >
            Zone d'intervention
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Nous intervenons à Rennes et Bretagne
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intervention rapide sur Rennes et ses environs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="map-content h-96 lg:h-auto rounded-2xl overflow-hidden shadow-lg">
            <MapWithNoSSR />
          </div>

          {/* Communes list */}
          <div className="communes-grid space-y-6">
            <div 
              className="text-white rounded-2xl p-6"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                🚀 Intervention sous 30 minutes
              </h3>
              <p className="text-blue-200">
                Nous intervenons rapidement sur Rennes centre et toutes les communes limitrophes en Bretagne.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#1e3a5f' }}>
                Communes desservies :
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {communes.map((commune, index) => (
                  <div
                    key={index}
                    className="commune-item flex items-center gap-2 text-gray-600"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d4a853' }}></span>
                    {commune}
                  </div>
                ))}
              </div>
            </div>

            <a
              href="tel:+33299123456"
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              02 99 12 34 56
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
