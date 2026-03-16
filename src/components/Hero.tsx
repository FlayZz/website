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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title .word',
        { y: 80, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 },
        '-=0.3'
      )
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo('.hero-visual',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.5'
      );

      // Lock 3D effect on mouse move
      if (!isMobile && lockRef.current) {
        const lock = lockRef.current;
        
        window.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          
          const rotateY = ((clientX - centerX) / centerX) * 20;
          const rotateX = ((centerY - clientY) / centerY) * 20;
          
          gsap.to(lock, {
            rotationY: rotateY,
            rotationX: -rotateX,
            duration: 1,
            ease: 'power2.out'
          });
        });
      }

      // Parallax on scroll
      gsap.to('.hero-visual', {
        y: 150,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 83, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 168, 83, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ 
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1e3a5f 50%, #0a0a15 100%)'
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)',
            top: '-200px',
            right: '-100px',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)',
            bottom: '-150px',
            left: '-100px',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Particles canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: isMobile ? 0 : 0.6 }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full" 
              style={{ 
                backgroundColor: 'rgba(212,168,83,0.15)', 
                border: '1px solid rgba(212,168,83,0.4)', 
                color: '#d4a853' 
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#d4a853' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#d4a853' }}></span>
              </span>
              Dépannage urgent 24h/24 - Rennes
            </div>

            <h1 
              className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="word inline-block mx-1">Votre</span>
              <span className="word inline-block mx-1">serrurier</span>
              <span className="word inline-block mx-1" style={{ color: '#d4a853' }}>expert</span>
              <span className="word inline-block mx-1">à</span>
              <span className="word inline-block mx-1">Rennes</span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Intervention rapide 24h/24, 7j/7. Devis gratuit. 
              Sécurité et tranquillité pour votre logement ou entreprise.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={onUrgenceClick}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ 
                  background: 'linear-gradient(135deg, #d4a853 0%, #b8923f 100%)', 
                  color: '#1e3a5f',
                  boxShadow: '0 10px 40px rgba(212,168,83,0.3)'
                }}
              >
                Devis gratuit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* 3D Lock Visual */}
          <div className="hero-visual relative flex items-center justify-center">
            <div 
              ref={lockRef}
              className="relative w-72 h-72 md:w-96 md:h-96"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              />

              {/* Lock body */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'translateZ(0)' }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="lockBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4a853" />
                      <stop offset="50%" stopColor="#b8923f" />
                      <stop offset="100%" stopColor="#8b6914" />
                    </linearGradient>
                    <linearGradient id="lockShackle" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e5c275" />
                      <stop offset="50%" stopColor="#d4a853" />
                      <stop offset="100%" stopColor="#b8923f" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="cylinderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2a4f7a" />
                      <stop offset="50%" stopColor="#1e3a5f" />
                      <stop offset="100%" stopColor="#152a45" />
                    </linearGradient>
                  </defs>

                  {/* Shackle */}
                  <path 
                    d="M65 70 V50 A35 35 0 0 1 135 50 V70"
                    fill="none"
                    stroke="url(#lockShackle)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    style={{ transform: 'translateZ(20px)' }}
                  />

                  {/* Lock body */}
                  <rect 
                    x="40" 
                    y="70" 
                    width="120" 
                    height="100" 
                    rx="15"
                    fill="url(#lockBody)"
                    filter="url(#glow)"
                    style={{ transform: 'translateZ(0px)' }}
                  />

                  {/* Body shine */}
                  <rect 
                    x="50" 
                    y="80" 
                    width="100" 
                    height="15" 
                    rx="5"
                    fill="rgba(255,255,255,0.2)"
                    style={{ transform: 'translateZ(1px)' }}
                  />

                  {/* Cylinder */}
                  <circle 
                    cx="100" 
                    cy="120" 
                    r="35" 
                    fill="url(#cylinderGrad)"
                    stroke="#d4a853"
                    strokeWidth="2"
                    style={{ transform: 'translateZ(10px)' }}
                  />

                  {/* Keyhole */}
                  <ellipse cx="100" cy="110" rx="10" ry="14" fill="#0f0f1a" />
                  <rect x="94" y="115" width="12" height="25" rx="2" fill="#0f0f1a" />

                  {/* Keyhole shine */}
                  <ellipse cx="97" cy="107" rx="3" ry="4" fill="rgba(255,255,255,0.3)" />

                  {/* Pins */}
                  <rect x="75" y="100" width="6" height="20" rx="2" fill="#d4a853" opacity="0.6" />
                  <rect x="97" y="95" width="6" height="28" rx="2" fill="#d4a853" opacity="0.6" />
                  <rect x="119" y="100" width="6" height="20" rx="2" fill="#d4a853" opacity="0.6" />

                  {/* Screws */}
                  <circle cx="55" cy="85" r="5" fill="#8b6914" />
                  <circle cx="145" cy="85" r="5" fill="#8b6914" />
                  <circle cx="55" cy="155" r="5" fill="#8b6914" />
                  <circle cx="145" cy="155" r="5" fill="#8b6914" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Découvrir</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ 
              backgroundColor: '#d4a853',
              animation: 'scrollDown 2s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 1; }
          50% { opacity: 0.5; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .word {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
