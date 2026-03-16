'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const counters = [
  { target: 15000, suffix: '+', label: 'Interventions réalisées' },
  { target: 24, suffix: 'h/24', label: 'Disponibilité' },
  { target: 98, suffix: '%', label: 'Clients satisfaits' },
];

export default function Counters() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterElements = document.querySelectorAll('.counter-number');
      
      counterElements.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';
        
        gsap.fromTo(counter, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              once: true,
            },
            onUpdate: function() {
              const current = Math.round(this.targets()[0] as any);
              (counter as HTMLElement).innerHTML = current.toLocaleString() + suffix;
            }
          }
        );
      });

      // Fade in animation for the section
      gsap.fromTo('.counter-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-[#1e3a5f] relative overflow-hidden"
      style={{ backgroundColor: '#1e3a5f' }}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {counters.map((counter, index) => (
            <div key={index} className="counter-item">
              <div 
                className="counter-number text-5xl md:text-6xl font-bold text-[#d4a853] mb-2"
                style={{ color: '#d4a853', fontFamily: 'Space Grotesk, sans-serif' }}
                data-target={counter.target}
                data-suffix={counter.suffix}
              >
                0
              </div>
              <div className="text-white/80 text-lg">
                {counter.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
