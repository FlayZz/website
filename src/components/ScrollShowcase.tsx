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
    <section ref={sectionRef} className="py-24 overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: '#d4a853' }}>
            Nos réalisations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--foreground)' }}>
            Expertise serrurerie
          </h2>
        </div>

        {/* Grid de cards avec scroll animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceImages.map((item, index) => (
            <div 
              key={index}
              className="showcase-card p-8 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--card)', 
                border: '1px solid var(--border)',
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{ backgroundColor: 'rgba(212, 168, 83, 0.15)' }}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { number: '15 000+', label: 'Interventions' },
            { number: '98%', label: 'Satisfaction' },
            { number: '24h/24', label: 'Disponibilité' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#d4a853', fontFamily: 'Space Grotesk, sans-serif' }}>
                {stat.number}
              </div>
              <div style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
