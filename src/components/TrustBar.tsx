'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Marques certifiées - fichiers dans /public
const brands = [
  { name: 'Fichet', logo: '/FICHET.png' },
  { name: 'Bricard', logo: '/Bricard.png' },
  { name: 'Abus', logo: '/ABUS.png' },
  { name: 'Picard', logo: '/picard.png' },
  { name: 'Heracles', logo: '/heracles.png' },
  { name: 'DOM', logo: '/DOM.png' },
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
          stagger: 0.08,
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
      className="py-8 border-y border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold mb-8 uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Marques certifiées &amp; partenaires assurance
        </p>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="trust-item inline-flex items-center mx-10"
              >
                <div className="w-36 h-20 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-zinc-700/50 px-3 py-2 hover:scale-105 transition-transform duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={144}
                    height={80}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                    title={brand.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}