'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onUrgenceClick: () => void;
  onDevisClick?: () => void;
}

export default function Hero({ onUrgenceClick, onDevisClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      const elements = gsap.utils.toArray('.bg-circle');
      elements.forEach((el: any) => {
        gsap.to(el, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      });

      // Timeline intro
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
        .fromTo('.hero-title .word', { y: 80, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 }, '-=0.3')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.feature-card', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, '-=0.5');

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen relative overflow-hidden flex items-center bg-zinc-50 dark:bg-zinc-950 premium-bg">
      
      {/* Dynamic Animated Background */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="bg-circle absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-accent text-white/10 blur-[80px]" />
        <div className="bg-circle absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-brand-gold text-white/10 blur-[100px]" />
        <div className="bg-circle absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-brand-accent text-white/5 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-brand-accent text-white/15 border border-accent/30 text-brand-accent font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent text-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent text-white"></span>
              </span>
              Urgence Dépannage 24/7 - Bretagne & Rennes
            </div>

            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] text-brand-gold dark:text-white font-sans">
              <span className="word inline-block mx-1">Artisan</span>
              <span className="word inline-block mx-1 text-brand-accent">Serrurier</span>
              <br />
              <span className="word inline-block mx-1">de Confiance</span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl mb-10 max-w-xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-400">
              Intervention en <span className="text-brand-accent font-bold">moins de 30 minutes</span> à Rennes et alentours. Expertise, rapidité et transparence.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={onDevisClick || onUrgenceClick}
                className="inline-flex items-center gap-4 px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 bg-brand-gold text-white shadow-2xl shadow-brand-gold/30 hover:bg-brand-gold-hover"
              >
                {onDevisClick ? '📋 Demander un Devis' : 'Demander un Devis'}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a href="tel:0299000000" className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-lg text-brand-gold dark:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                 📞 02 99 00 00 00
              </a>
            </div>
          </div>

          {/* Feature Grid / Visual */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
             <div className="feature-card glass-premium p-6 rounded-3xl mt-12 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="text-3xl mb-4">🛡️</div>
                <h4 className="font-bold text-lg mb-2">Sécurité</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Serrurerie certifiée A2P pour une protection maximale.</p>
             </div>
             <div className="feature-card glass-premium p-6 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="text-3xl mb-4">⏱️</div>
                <h3 className="font-bold text-brand-gold dark:text-white">Rapidité d&apos;intervention</h3>
                <p className="text-sm text-gray-500">Moins de 30 minutes</p>
             </div>
             <div className="feature-card glass-premium p-6 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="text-3xl mb-4">💼</div>
                <h4 className="font-bold text-lg mb-2">Transparence</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Devis détaillé avant chaque intervention.</p>
             </div>
             <div className="feature-card glass-premium p-6 rounded-3xl mt-12 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="text-3xl mb-4">🤝</div>
                <h4 className="font-bold text-lg mb-2">Agréé Assurances</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Toutes nos prestations sont reconnues.</p>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDown { 0% { transform: tranzincY(0); opacity: 1; } 50% { opacity: 0.5; } 100% { transform: tranzincY(20px); opacity: 0; } }
        .word { backface-visibility: hidden; }
        .glass-premium { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .glass-premium:hover { transform: tranzincY(-10px) rotate(1deg); background: rgba(255, 255, 255, 0.15); border-color: #ff4f19; }
      `}</style>
    </section>
  );
}
