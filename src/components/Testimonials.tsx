'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Intervention très rapide un dimanche. Prix transparent, travail soigné. Je recommande sincèrement.",
    author: "Marie L.",
    location: "Rennes",
    date: "Janvier 2025"
  },
  {
    text: "Serrure haute sécurité posée parfaitement. Devis respecté, excellent rapport qualité-prix à Rennes.",
    author: "Thomas D.",
    location: "Cesson-Sévigné",
    date: "Février 2025"
  },
  {
    text: "Après une effraction, ils sont venus le jour même pour sécuriser ma porte. Très professionnels.",
    author: "Sophie P.",
    location: "Bruz",
    date: "Janvier 2025"
  },
  {
    text: "Porte blindée installée en une journée. Équipe consciencieuse, chantier nettoyé. Très satisfait.",
    author: "Pierre M.",
    location: "Saint-Grégoire",
    date: "Mars 2025"
  },
  {
    text: "Mon cadenas de coffre-fort ouvert en 15 minutes. Tarif raisonnable pour un dimanche. Merci !",
    author: "Claire B.",
    location: "Pacé",
    date: "Février 2025"
  },
  {
    text: "Duplication de clés de haute sécurité parfaite. Équipement professionnel. Je recommande.",
    author: "Jean-Pierre R.",
    location: "Rennes",
    date: "Mars 2025"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.testimonials-title',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-title',
            start: 'top 85%',
          }
        }
      );

      // Horizontal scroll with mouse wheel
      if (sliderRef.current) {
        const slider = sliderRef.current;
        
        gsap.to(slider, {
          x: () => -(slider.scrollWidth - slider.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: slider,
            start: 'left right',
            end: () => `+=${slider.scrollWidth}`,
            scrub: 1,
            pin: false,
            anticipatePin: 1,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current.offsetLeft || 0));
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <span 
            className="text-xs font-bold uppercase tracking-widest mb-4 block"
            style={{ color: '#d4a853' }}
          >
            Avis Clients
          </span>
          <h2 
            className="testimonials-title text-3xl md:text-4xl font-bold mb-4 dark:text-white"
            style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Faites glisser pour découvrir tous les avis →
          </p>
        </div>
      </div>

      {/* Horizontal scrolling carousel */}
      <div 
        ref={sliderRef}
        className="flex gap-6 px-4 cursor-grab active:cursor-grabbing select-none"
        style={{ 
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl p-8 shadow-lg"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="#d4a853" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-700 italic mb-6 leading-relaxed line-clamp-4">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: '#1e3a5f' }}
              >
                {testimonial.author.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate" style={{ color: '#1e3a5f' }}>
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {testimonial.location}, {testimonial.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
