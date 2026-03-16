'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Marques certifiées - noms simples
const brands = [
  'FICHET',
  'VACHETTE', 
  'BRICARD',
  'ABUS',
  'KABA',
  'APD',
  'TESA',
  'HERACLES',
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-6 border-y"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium mb-6 uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>
          Marques certifiees et partenaires assurance
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="trust-item"
            >
              <span 
                className="text-xl md:text-2xl font-bold tracking-wider"
                style={{ 
                  color: 'var(--muted-foreground)', 
                  fontFamily: 'Space Grotesk, sans-serif',
                  opacity: 0.6
                }}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
