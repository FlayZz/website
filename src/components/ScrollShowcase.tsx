'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Images de services serrurerie (placeholder avec icônes)
const serviceImages = [
  { icon: '🔒', title: 'Serrures haute sécurité', desc: 'Certification A2P' },
  { icon: '🚪', title: 'Ouverture porte', desc: 'Sans dommage' },
  { icon: '🛡️', title: 'Blindage', desc: 'Protection maximale' },
  { icon: '🔑', title: 'Duplication clés', desc: 'Toutes marques' },
  { icon: '🗄️', title: 'Coffres-forts', desc: 'Installation & ouverture' },
  { icon: '⚡', title: 'Urgence 24/7', desc: 'Intervention rapide' },
];

export default function ScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation des cards au scroll
      gsap.utils.toArray('.showcase-card').forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          scale: 0.9,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-brand-gold">
            Nos réalisations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-display">
            Expertise serrurerie
          </h2>
        </div>

        {/* Grid de cards avec scroll animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceImages.map((item, index) => (
            <div 
              key={index}
              className="showcase-card p-8 rounded-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-lg"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{ backgroundColor: 'color-mix(in srgb, #d4a853 15%, transparent)' }}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          {[
            { number: '700+', label: 'Clients satisfaits à Rennes et en Bretagne' },
            { number: '100%', label: 'Satisfaction garantie' },
            { number: '24h/24', label: 'Disponibilité' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-gold font-display">
                {stat.number}
              </div>
              <div className="text-zinc-500 dark:text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
