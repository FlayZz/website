'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Fichet', logo: '/fichet.png' },
  { name: 'Vachette', logo: '/vachette.png' },
  { name: 'Bricard', logo: '/bricard.png' },
  { name: 'Abus', logo: '/abus.png' },
  { name: 'Kaba', logo: '/kaba.png' },
  { name: 'APD', logo: '/apd.png' },
  { name: 'Tesa', logo: '/tesa.png' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium mb-8 text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Marque·s certifié·e·s et partenaire·s assurance
        </p>
        
        {/* Marquee infini avec CSS */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div 
                key={index}
                className="trust-item inline-flex items-center mx-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
              >
                <div 
                  className="w-32 h-20 rounded-2xl flex items-center justify-center bg-gray-50/50 dark:bg-slate-700/30 backdrop-blur-sm"
                >
                  {brand.logo.startsWith('/') ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-w-[80%] max-h-[70%] object-contain"
                      title={brand.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as any).parentNode;
                        if (parent && brand.name) {
                          parent.innerHTML = `<span class="text-2xl font-bold text-gray-400">${brand.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-4xl">{brand.logo}</span>
                  )}
                </div>
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
