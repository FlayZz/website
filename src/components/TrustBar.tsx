'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Marques certifiées - logos texte
const brands = [
  { name: 'FICHET', color: '#1e3a5f' },
  { name: 'VACHETTE', color: '#1e3a5f' },
  { name: 'BRICARD', color: '#1e3a5f' },
  { name: 'ABUS', color: '#1e3a5f' },
  { name: 'KABA', color: '#1e3a5f' },
  { name: 'APD', color: '#1e3a5f' },
  { name: 'TESA', color: '#1e3a5f' },
  { name: 'HERACLES', color: '#1e3a5f' },
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
        
        {/* Logo marque -scroll horizontal infini */}
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap items-center" style={{ animation: 'marquee 25s linear infinite' }}>
            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
              <div 
                key={index}
                className="trust-item inline-flex items-center mx-8"
              >
                <span 
                  className="text-2xl font-bold tracking-wider"
                  style={{ color: brand.color, fontFamily: 'Space Grotesk, sans-serif', opacity: 0.7 }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
