'use client';

import { useEffect, useRef } from 'react';
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
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for testimonial cards
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
          }
        }
      );

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24"
      style={{ backgroundColor: '#f8f6f0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="text-xs font-bold uppercase tracking-widest mb-4 block"
            style={{ color: '#d4a853' }}
          >
            Avis Clients
          </span>
          <h2 
            className="testimonials-title text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ce que disent nos clients
          </h2>
        </div>

        <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-2xl p-8 shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="#d4a853" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#1e3a5f' }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#1e3a5f' }}>
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}, {testimonial.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
