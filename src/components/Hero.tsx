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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
        .fromTo('.hero-title .word', { y: 80, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 }, '-=0.3')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-visual', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.5');

      gsap.to('.hero-visual', {
        y: 100,
        opacity: 0.3,
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen relative overflow-hidden flex items-center" 
      style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1e3a5f 50%, #0a0a15 100%)' }}>
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-30" 
          style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)', top: '-200px', right: '-100px', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-20" 
          style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)', bottom: '-150px', left: '-100px', animation: 'float 10s ease-in-out infinite reverse' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

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
              Dépannage urgent 24h/24 - Rennes
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#ffffff' }}>
              <span className="word inline-block mx-1">Votre</span>
              <span className="word inline-block mx-1">serrurier</span>
              <span className="word inline-block mx-1" style={{ color: '#d4a853' }}>expert</span>
              <span className="word inline-block mx-1">à</span>
              <span className="word inline-block mx-1">Rennes</span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: '#9ca3af' }}>
              Intervention rapide 24h/24, 7j/7. Devis gratuit. Sécurité et tranquillité.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={onUrgenceClick}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #d4a853 0%, #b8923f 100%)', color: '#1e3a5f', boxShadow: '0 10px 40px rgba(212,168,83,0.3)' }}>
                Devis gratuit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Visual - Premium Lock Image */}
          <div className="hero-visual relative flex items-center justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full" 
                style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'pulse 3s ease-in-out infinite' }} />
              
              {/* Premium Lock SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a853" />
                    <stop offset="50%" stopColor="#b8923f" />
                    <stop offset="100%" stopColor="#8b6914" />
                  </linearGradient>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a4f7a" />
                    <stop offset="100%" stopColor="#1e3a5f" />
                  </linearGradient>
                </defs>
                {/* Lock body */}
                <rect x="45" y="80" width="110" height="90" rx="12" fill="url(#goldGrad)" />
                <rect x="52" y="87" width="96" height="12" rx="4" fill="rgba(255,255,255,0.2)" />
                {/* Shackle */}
                <path d="M65 80 V55 A35 35 0 0 1 135 55 V80" fill="none" stroke="url(#goldGrad)" strokeWidth="14" strokeLinecap="round" />
                {/* Cylinder */}
                <circle cx="100" cy="125" r="32" fill="url(#blueGrad)" stroke="#d4a853" strokeWidth="2" />
                <ellipse cx="100" cy="115" rx="10" ry="14" fill="#0f0f1a" />
                <rect x="94" y="120" width="12" height="22" rx="2" fill="#0f0f1a" />
                <ellipse cx="97" cy="112" rx="3" ry="4" fill="rgba(255,255,255,0.3)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <span className="text-xs uppercase tracking-widest">Découvrir</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d4a853', animation: 'scrollDown 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
        @keyframes scrollDown { 0% { transform: translateY(0); opacity: 1; } 50% { opacity: 0.5; } 100% { transform: translateY(20px); opacity: 0; } }
        .word { backface-visibility: hidden; }
      `}</style>
    </section>
  );
}
