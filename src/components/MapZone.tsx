'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const departments = [
  { code: '35', name: 'Ille-et-Vilaine', priority: true },
  { code: '29', name: 'Finistère', priority: false },
  { code: '22', name: 'Côtes-d\'Armor', priority: false },
  { code: '56', name: 'Morbihan', priority: false },
  { code: '44', name: 'Loire-Atlantique', priority: false },
  { code: '53', name: 'Mayenne', priority: false },
];

const MapWithNoSSR = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
    </div>
  ),
});

export default function MapZone() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo('.zone-info',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.zone-info',
            start: 'top 80%',
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
      className="py-24 bg-white dark:bg-slate-800 transition-colors"
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
            className="text-3xl md:text-4xl font-bold mb-4 dark:text-white"
            style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Intervention rapide à Rennes et Bretagne
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Intervention sous 30 minutes sur Rennes. Départements: 35, 29, 22, 56, 44, 53
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="map-content h-96 lg:h-auto rounded-2xl overflow-hidden shadow-lg">
            <MapWithNoSSR />
          </div>

          {/* Zone Info */}
          <div className="zone-info space-y-6">
            {/* Priority Zone */}
            <div 
              className="rounded-2xl p-6 text-white"
              style={{ backgroundColor: '#d4a853' }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#1e3a5f' }}>
                ⚡ Intervention sous 30 minutes
              </h3>
              <p className="text-sm" style={{ color: '#1e3a5f' }}>
                Nous intervenons rapidement sur Rennes centre et métropole.
              </p>
            </div>

            {/* Departments */}
            <div>
              <h4 className="text-lg font-semibold mb-4 dark:text-white" style={{ color: '#1e3a5f' }}>
               Départements couverts :
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-3 rounded-xl ${
                      dept.priority 
                        ? 'bg-[#d4a853]/10 border-2 border-[#d4a853]' 
                        : 'bg-gray-100 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`font-bold ${dept.priority ? 'text-[#d4a853]' : 'text-[#1e3a5f] dark:text-white'}`}>
                      {dept.code}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {dept.name}
                    </span>
                    {dept.priority && (
                      <span className="ml-auto text-xs bg-[#d4a853] text-[#1e3a5f] px-2 py-0.5 rounded-full font-medium">
                        30min
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="tel:+33255996202"
              className="block w-full py-4 rounded-xl text-center font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1e3a5f', color: 'white' }}
            >
              📞 02 55 99 62 02
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
