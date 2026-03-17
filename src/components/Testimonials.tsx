'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring", bounce: 0.2 }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 mb-12 relative z-10">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-brand-gold">
            Avis Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-zinc-900 dark:text-white">
            Ils nous font confiance
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            L&apos;excellence de notre service, racontée par vous.
          </p>
        </div>
      </div>

      {/* Single Card Carousel */}
      <div className="max-w-3xl mx-auto px-4 relative flex items-center justify-center min-h-[300px]">
        {/* Nav Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 md:-left-12 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/50 text-zinc-900 dark:text-white hover:bg-brand-gold text-white hover:text-white transition-all shadow-lg hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <div className="w-full max-w-xl relative h-[450px] sm:h-[400px] overflow-visible">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-full testimonial-card rounded-2xl p-8 md:p-12 texture-card shadow-2xl"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" fill="#d4a853" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-200 italic mb-8 leading-relaxed text-center font-medium">
                &ldquo;{currentTestimonial.text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-inner bg-brand-gold text-white">
                  {currentTestimonial.author.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-brand-gold">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {currentTestimonial.location}, {currentTestimonial.date}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={nextSlide}
          className="absolute right-0 md:-right-12 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/50 text-zinc-900 dark:text-white hover:bg-brand-gold text-white hover:text-white transition-all shadow-lg hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8 relative z-20">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all shadow-sm ${
              currentIndex === idx 
                ? 'bg-brand-gold text-white scale-125 ring-2 ring-primary/30' 
                : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
