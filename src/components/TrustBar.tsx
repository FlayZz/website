'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Fichet', logo: '🔒' },
  { name: 'Vachette', logo: '🛡️' },
  { name: 'Bricard', logo: '🔐' },
  { name: 'Abus', logo: '⚡' },
  { name: 'Kaba', logo: '🔑' },
  { name: 'APD', logo: '🏢' },
  { name: 'Axeo', logo: '🗝️' },
  { name: 'TESA', logo: '🚪' },
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
      className="py-8 bg-white dark:bg-slate-800 border-y border-gray-200 dark:border-slate-700 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium mb-6 text-gray-500 dark:text-gray-400">
          Marque·s certifié·e·s et partenaire·s assurance
        </p>
        
        {/* Marquee infini avec CSS */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div 
                key={index}
                className="trust-item inline-flex flex-col items-center mx-8 opacity-70 hover:opacity-100 transition-opacity"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-1 bg-gray-100 dark:bg-slate-700"
                >
                  {brand.logo}
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
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
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
