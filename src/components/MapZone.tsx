'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
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
    <div className="h-full rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#f4f4f5' }}>
      <p style={{ color: '#71717a' }}>Chargement...</p>
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
    <section ref={sectionRef} id="zone" className="py-24" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Headers & Map */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="text-center lg:text-left mb-8">
              <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-brand-gold">
                Zone d&apos;intervention
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white font-display">
                Nos secteurs d&apos;intervention
              </h2>
              <p className="text-xl text-zinc-500 dark:text-zinc-400">
                Intervention rapide dans toute la Bretagne
              </p>
            </div>
            
            <div className="map-content flex-grow min-h-[500px] h-full rounded-2xl overflow-hidden shadow-lg border-2 border-zinc-200 dark:border-zinc-700/50">
              <MapWithNoSSR />
            </div>
          </div>

          {/* Legend & Info (Cards) */}
          <div className="zone-info space-y-4 flex flex-col h-full">
            
            {/* Legend */}
            <div className="texture-card p-5 rounded-2xl">
              <h3 className="font-bold mb-3 text-brand-gold">Légende</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded" style={{ backgroundColor: 'color-mix(in srgb, #d4a853 30%, transparent)', border: '2px solid #d4a853' }}></div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Zone prioritaire</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Intervention 30 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded" style={{ backgroundColor: 'color-mix(in srgb, #1e3a5f 15%, transparent)', border: '2px dashed #1e3a5f' }}></div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Bretagne étendue</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Rapide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Cards */}
            {departments.map((dept) => (
              <div key={dept.code} className="texture-card p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-bold ${dept.priority ? 'text-brand-accent' : 'text-brand-gold'}`}>
                    {dept.code} - {dept.name}
                  </span>
                  {dept.priority && <span className="text-[10px] bg-brand-accent text-white/20 text-brand-accent font-bold px-2 py-0.5 rounded-full uppercase">Prio</span>}
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {/* 35 - Ille-et-Vilaine */}
                    {dept.code === '35' && ['Rennes', 'Cesson-Sévigné', 'Saint-Malo', 'Pacé', 'Bruz', 'Saint-Grégoire'].map(v => (
                      <Link 
                        key={v}
                        href={`/serrurier/35/${v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}
                        className="text-[11px] bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/50 px-2 py-1.5 rounded-md hover:bg-brand-accent text-white transition-all hover:scale-105"
                      >
                        {v}
                      </Link>
                    ))}
                    
                    {/* 29 - Finistère */}
                    {dept.code === '29' && ['Brest', 'Quimper', 'Concarneau'].map(v => (
                      <Link 
                        key={v}
                        href={`/serrurier/29/${v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}
                        className="text-[11px] bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/50 px-2 py-1.5 rounded-md hover:bg-brand-accent text-white transition-all hover:scale-105"
                      >
                        {v}
                      </Link>
                    ))}

                    {/* 56 - Morbihan */}
                    {dept.code === '56' && ['Vannes', 'Lorient', 'Lanester'].map(v => (
                      <Link 
                        key={v}
                        href={`/serrurier/56/${v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}
                        className="text-[11px] bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/50 px-2 py-1.5 rounded-md hover:bg-brand-accent text-white transition-all hover:scale-105"
                      >
                        {v}
                      </Link>
                    ))}
                </div>
              </div>
            ))}

            <div className="flex-grow"></div> {/* Spacer to push CTA to bottom if needed */}

            {/* CTA */}
            <a
              href="tel:0299000000"
              className="block w-full py-4 mt-2 rounded-xl text-center font-bold bg-brand-gold text-white hover:bg-brand-gold-hover transition-all shadow-lg shadow-primary/20 hover:-tranzinc-y-1"
            >
              📞 02 99 00 00 00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
