'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onUrgenceClick: () => void;
}

export default function Hero({ onUrgenceClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [lockElement, setLockElement] = useState<SVGGElement | null>(null);
  const [haloElement, setHaloElement] = useState<SVGEllipseElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      // Mouse movement effect on lock (desktop only)
      if (!isMobile && lockElement) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          
          const rotateX = (centerY - clientY) / 30; // Max 15deg
          const rotateY = (clientX - centerX) / 30; // Max 15deg
          
          gsap.to(lockElement, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.8,
            ease: 'power2.out'
          });

          // Halo effect
          if (haloElement) {
            const haloIntensity = Math.abs(rotateX) + Math.abs(rotateY);
            gsap.to(haloElement, {
              opacity: 0.3 + haloIntensity * 0.02,
              attr: { rx: 90 + haloIntensity * 2, ry: 90 + haloIntensity * 2 },
              duration: 0.5
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(lockElement, {
            rotationX: 0,
            rotationY: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
          if (haloElement) {
            gsap.to(haloElement, {
              opacity: 0.3,
              attr: { rx: 90, ry: 90 },
              duration: 1
            });
          }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        };
      }

      // Mobile idle animation
      if (isMobile && lockElement) {
        gsap.to(lockElement, {
          rotationY: 360,
          duration: 20,
          repeat: -1,
          ease: 'none'
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

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

          {/* Visual - Lock Mechanism SVG */}
          <div className="hidden lg:block relative" style={{ perspective: '1000px' }}>
            <div className="relative w-96 h-96 mx-auto" style={{ perspective: '1000px' }}>
              {/* Luminous halo */}
              <svg 
                viewBox="0 0 300 300" 
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'blur(20px)' }}
              >
                <ellipse 
                  ref={setHaloElement}
                  cx="150" 
                  cy="150" 
                  rx="90" 
                  ry="90" 
                  fill="url(#haloGradient)"
                  opacity="0.3"
                />
              </svg>

              {/* Lock mechanism SVG */}
              <svg 
                ref={setLockElement}
                viewBox="0 0 300 300" 
                className="w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <defs>
                  <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a853" />
                    <stop offset="50%" stopColor="#b8923f" />
                    <stop offset="100%" stopColor="#8b6914" />
                  </linearGradient>
                  <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="30%" stopColor="#2a4f7a" />
                    <stop offset="70%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#152a45" />
                  </linearGradient>
                  <linearGradient id="haloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a853" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Lock body */}
                <rect 
                  x="60" 
                  y="120" 
                  width="180" 
                  height="140" 
                  rx="20" 
                  fill="url(#metalGradient)"
                  filter="url(#glow)"
                />

                {/* Lock body highlight */}
                <rect 
                  x="70" 
                  y="130" 
                  width="160" 
                  height="20" 
                  rx="5" 
                  fill="rgba(255,255,255,0.2)"
                />

                {/* Shackle (arc) */}
                <path 
                  d="M90 120 V90 A60 60 0 0 1 210 90 V120" 
                  fill="none" 
                  stroke="url(#metalGradient)" 
                  strokeWidth="25"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Cylinder core */}
                <circle 
                  cx="150" 
                  cy="190" 
                  r="45" 
                  fill="url(#cylinderGradient)"
                  stroke="#d4a853"
                  strokeWidth="3"
                />

                {/* Cylinder keyhole */}
                <ellipse cx="150" cy="175" rx="12" ry="18" fill="#0f0f1a" />
                <rect x="144" y="185" width="12" height="35" rx="2" fill="#0f0f1a" />
                
                {/* Keyhole highlight */}
                <ellipse cx="147" cy="172" rx="4" ry="6" fill="rgba(255,255,255,0.3)" />

                {/* Pins inside cylinder */}
                <rect x="120" y="160" width="8" height="25" rx="2" fill="#d4a853" opacity="0.7" />
                <rect x="146" y="155" width="8" height="35" rx="2" fill="#d4a853" opacity="0.7" />
                <rect x="172" y="160" width="8" height="25" rx="2" fill="#d4a853" opacity="0.7" />

                {/* Decorative screws */}
                <circle cx="85" cy="145" r="8" fill="#b8923f" />
                <circle cx="215" cy="145" r="8" fill="#b8923f" />
                <circle cx="85" cy="235" r="8" fill="#b8923f" />
                <circle cx="215" cy="235" r="8" fill="#b8923f" />
              </svg>
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
