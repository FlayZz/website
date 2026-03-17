'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Fichet', logo: '🔒' },
  { name: 'Vachon', logo: '🛡️' },
  { name: 'JPM', logo: '🔐' },
  { name: 'Kaba', logo: '⚡' },
  { name: 'Abloy', logo: '🔑' },
  { name: 'Mul-T-Lock', logo: '🗝️' },
];

export default function PartnerBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation
      gsap.fromTo('.brand-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.brands-grid',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 bg-zinc-100 dark:bg-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium mb-8 text-zinc-500 dark:text-zinc-400">
          Marques partenaires certifiées
        </p>
        
        <div className="brands-grid grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="brand-item flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-brand-navy dark:bg-brand-gold/20">
                {brand.logo}
              </div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
