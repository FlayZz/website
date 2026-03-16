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
  const shieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline intro
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
        .fromTo('.hero-title .word', { y: 80, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 }, '-=0.3')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-visual', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.5');

      // Scroll parallax
      gsap.to('.hero-visual', {
        y: 100,
        opacity: 0.3,
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
      });

      // Mouse parallax sur le shield
      const handleMouseMove = (e: MouseEvent) => {
        if (!shieldRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(shieldRef.current, { rotationY: x, rotationX: -y, duration: 0.5 });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen relative overflow-hidden flex items-center" 
      style={{ backgroundColor: 'var(--background)' }}>
      
      {/* Background gradient unifié */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20" 
          style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)', top: '-200px', right: '-100px' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-15" 
          style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)', bottom: '-150px', left: '-100px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full" 
              style={{ backgroundColor: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.4)', color: '#d4a853' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#d4a853' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#d4a853' }}></span>
              </span>
              Depannage urgent 24h/24 - Rennes
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--foreground)' }}>
              <span className="word inline-block mx-1">Votre</span>
              <span className="word inline-block mx-1">serrurier</span>
              <span className="word inline-block mx-1" style={{ color: '#d4a853' }}>expert</span>
              <span className="word inline-block mx-1">a</span>
              <span className="word inline-block mx-1">Rennes</span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: 'var(--muted-foreground)' }}>
              Intervention rapide 24h/24, 7j/7. Devis gratuit. Securite et tranquillite.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={onUrgenceClick}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #d4a853 0%, #b8923f 100%)', color: '#1e3a5f', boxShadow: '0 10px 40px rgba(212,168,83,0.3)' }}>
                Devis gratuit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Shield 3D Glassmorphism */}
          <div className="hero-visual relative flex items-center justify-center">
            <div ref={shieldRef} className="relative w-72 h-72 md:w-96 md:h-96" style={{ perspective: '1000px' }}>
              
              {/* Glow */}
              <div className="absolute inset-0 rounded-full" 
                style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
              
              {/* Shield Glassmorphism */}
              <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl" style={{ filter: 'drop-shadow(0 25px 50px rgba(212,168,83,0.3))' }}>
                <defs>
                  <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                  </linearGradient>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <filter id="glassBlur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>
                </defs>
                
                {/* Main shield shape */}
                <path 
                  d="M100 10 L180 40 L180 110 Q180 180 100 220 Q20 180 20 110 L20 40 Z" 
                  fill="url(#shieldGrad)" 
                  stroke="#d4a853" 
                  strokeWidth="3"
                />
                
                {/* Glass overlay */}
                <path 
                  d="M100 10 L180 40 L180 110 Q180 180 100 220 Q20 180 20 110 L20 40 Z" 
                  fill="url(#glassGrad)" 
                  filter="url(#glassBlur)"
                />
                
                {/* Inner shine */}
                <path 
                  d="M100 25 L165 50 L165 110 Q165 165 100 200 Q35 165 35 110 L35 50 Z" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="1"
                />
                
                {/* Lock cylinder */}
                <rect x="70" y="90" width="60" height="70" rx="8" fill="#0f172a" stroke="#d4a853" strokeWidth="2" />
                <circle cx="100" cy="115" r="20" fill="#1e3a5f" stroke="#d4a853" strokeWidth="1" />
                <ellipse cx="100" cy="108" rx="8" ry="10" fill="#0a0a15" />
                <rect x="95" y="115" width="10" height="25" rx="2" fill="#0a0a15" />
                <ellipse cx="97" cy="105" rx="2" ry="3" fill="rgba(255,255,255,0.3)" />
                
                {/* Keyhole highlight */}
                <ellipse cx="100" cy="150" rx="8" ry="3" fill="#d4a853" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
        <span className="text-xs uppercase tracking-widest">Decouvrir</span>
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1" style={{ borderColor: 'var(--border)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d4a853', animation: 'scrollDown 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown { 0% { transform: translateY(0); opacity: 1; } 50% { opacity: 0.5; } 100% { transform: translateY(20px); opacity: 0; } }
        .word { backface-visibility: hidden; }
      `}</style>
    </section>
  );
}
