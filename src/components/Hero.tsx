'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onUrgenceClick: () => void;
}

export default function Hero({ onUrgenceClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title .word',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Background grid animation
      gsap.to('.hero-grid', {
        backgroundPosition: '60px 60px',
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f0f1a 50%, #2a4f7a 100%)'
      }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(212,168,83,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(30,58,95,0.4) 0%, transparent 50%)'
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="hero-grid absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="hero-badge inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full" 
              style={{ backgroundColor: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', color: '#d4a853' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#d4a853' }}></span>
              Dépannage urgent 24h/24 à Rennes
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="word block">Votre</span>
              <span className="word block">Serrurier</span>
              <span className="word block">de</span>
              <span className="word block" style={{ color: '#d4a853' }}>Confiance</span>
              <span className="word block">à Rennes</span>
            </h1>

            <p className="hero-subtitle text-xl text-gray-300 mb-8">
              Intervention rapide 24h/24, 7j/7. Artisans certifiés, devis gratuit, qualité garantie. 
              Sécurité et tranquillité d'esprit pour votre logement ou entreprise en Bretagne.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <button
                onClick={onUrgenceClick}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
              >
                Demander un devis gratuit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated lock icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'rotateY 20s linear infinite' }}>
                  <rect x="50" y="80" width="100" height="90" rx="10" fill="#d4a853" />
                  <path d="M70 80 V60 A30 30 0 0 1 130 60 V80" fill="none" stroke="#d4a853" strokeWidth="15" />
                  <circle cx="100" cy="125" r="15" fill="#1e3a5f" />
                  <rect x="92" y="125" width="16" height="25" rx="3" fill="#1e3a5f" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
        <span>Découvrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#d4a853] to-transparent" />
      </div>
    </section>
  );
}
