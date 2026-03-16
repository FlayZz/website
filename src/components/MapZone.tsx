'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const departments = [
  { code: '35', name: 'Ille-et-Vilaine', delay: '30 min', priority: true },
  { code: '29', name: 'Finistère', delay: 'Rapide', priority: false },
  { code: '22', name: "Côtes-d'Armor", delay: 'Rapide', priority: false },
  { code: '56', name: 'Morbihan', delay: 'Rapide', priority: false },
  { code: '44', name: 'Loire-Atlantique', delay: '-', priority: false },
  { code: '53', name: 'Mayenne', delay: '-', priority: false },
];

const MapWithNoSSR = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--muted)' }}>
      <p style={{ color: 'var(--muted-foreground)' }}>Chargement...</p>
    </div>
  ),
});

export default function MapZone() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.map-content', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.map-content', start: 'top 80%' }
      });
      gsap.fromTo('.zone-info', { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.zone-info', start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="zone" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: '#d4a853' }}>
            Zone d&apos;intervention
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--foreground)' }}>
            Nos secteurs d&apos;intervention
          </h2>
          <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
            Intervention rapide dans toute la Bretagne
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 map-content h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <MapWithNoSSR />
          </div>

          {/* Legend & Info */}
          <div className="zone-info space-y-6">
            
            {/* Legend */}
            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <h3 className="font-bold mb-4" style={{ color: 'var(--foreground)' }}>Légende</h3>
              
              <div className="space-y-3">
                {/* 30min zone */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: 'rgba(212,168,83,0.3)', border: '2px solid #d4a853' }}></div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Zone prioritaire</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Intervention sous 30 min</p>
                  </div>
                </div>
                
                {/* Bretagne */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: 'rgba(30,58,95,0.15)', border: '2px dashed #1e3a5f' }}></div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Bretagne</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Intervention rapide</p>
                  </div>
                </div>
                
                {/* Limitrophe */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: 'rgba(148,163,184,0.1)', border: '2px dotted #94a3b8' }}></div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Départements limitrophes</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Sur demande</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Departments list */}
            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <h3 className="font-bold mb-4" style={{ color: 'var(--foreground)' }}>Départements</h3>
              <div className="grid grid-cols-2 gap-2">
                {departments.map((dept) => (
                  <div 
                    key={dept.code}
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: dept.priority ? 'rgba(212,168,83,0.1)' : 'var(--muted)',
                      border: dept.priority ? '1px solid #d4a853' : '1px solid var(--border)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm" style={{ color: dept.priority ? '#d4a853' : 'var(--foreground)' }}>
                        {dept.code}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {dept.name}
                      </span>
                    </div>
                    {dept.priority && (
                      <p className="text-xs mt-1" style={{ color: '#d4a853' }}>⏱️ {dept.delay}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="tel:+33255996202"
              className="block w-full py-4 rounded-xl text-center font-bold"
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
