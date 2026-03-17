'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: "Combien coûte l'intervention d'un serrurier à Rennes ?",
    answer: (
      <span>
        Le tarif de base pour une ouverture de porte simple à Rennes commence à 80€. Cependant, le coût peut varier selon l&apos;heure, la complexité et le type d&apos;intervention. Nous fournissons toujours un <Link href="/devis" className="text-brand-accent hover:underline font-bold">devis gratuit</Link> avant toute intervention.
      </span>
    )
  },
  {
    question: "Quel est le délai d'intervention à Rennes ?",
    answer: (
      <span>
        Nous intervenons généralement sous 30 à 60 minutes sur Rennes et sa métropole. Pour les communes environnantes comme <Link href="/serrurier/35/cesson-sevigne" className="text-brand-accent hover:underline">Cesson-Sévigné</Link> ou <Link href="/serrurier/35/saint-malo" className="text-brand-accent hover:underline">Saint-Malo</Link>, le délai peut varier. Notre service d&apos;urgence 24h/24 garantit une réponse rapide.
      </span>
    )
  },
  {
    question: "Quelles certifications possède SerruAccess ?",
    answer: "Nos serruriers sont certifiés et expérimentés. Nous sommes spécialisés dans la pose de serrures certifiées A2P (Assurance Prévention Protection), le plus haut niveau de sécurité en France."
  },
  {
    question: "Intervenez-vous la nuit et les dimanches à Rennes ?",
    answer: (
      <span>
        Oui, notre service d&apos;urgence est disponible 24h/24, 7j/7, y compris dimanches et jours fériés. Contactez-nous au <a href="tel:0299000000" className="text-brand-accent font-bold">02 99 00 00 00</a> pour une assistance immédiate.
      </span>
    )
  },
  {
    question: "Comment choisir une serrure haute sécurité ?",
    answer: "Pour une sécurité optimale, privilégiez les serrures certifiées A2P avec 3 ou 5 points de fermeture. Nous recommandons également le blindage de porte pour les logements sensibles."
  },
  {
    question: "Que faire après une effraction à Rennes ?",
    answer: "En cas d'effraction, sécurisez votre domicile immédiatement. Appelez-nous pour une pose de blocage temporaire et consultez nos experts pour un futur blindage de porte."
  }
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.faq-title',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-title',
            start: 'top 85%',
          }
        }
      );

      // Stagger FAQ items
      gsap.fromTo('.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block text-brand-gold">
            Foire Aux Questions
          </span>
          <h2 className="faq-title text-4xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white font-display">
            Questions fréquentes sur nos services
          </h2>
          <p className="text-xl text-zinc-500 dark:text-zinc-400">
            Tout ce que vous devez savoir sur nos interventions de serrurerie à Rennes
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 faq-list space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="faq-item rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700/50"
                style={{ 
                  borderColor: openIndex === index ? '#d4a853' : ''
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span 
                    className="font-semibold text-lg text-brand-gold dark:text-white"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg 
                      className="w-6 h-6 text-brand-gold dark:text-brand-accent" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0',
                    transition: 'max-height 0.3s ease-out'
                  }}
                >
                  <div className="px-6 pb-6 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Static Anchored CTA Block */}
          <div className="hidden lg:block sticky top-32 faq-cta-block">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-6 w-full texture-card border border-brand-gold">
              <div className="flex items-center justify-between mb-6">
                <h3 
                  className="font-bold text-xl text-brand-gold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Urgence Serrurerie
                </h3>
              </div>

              <a
                href="tel:0299000000"
                className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-colors hover:bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700/50"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-gold text-white shadow-inner"
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xl text-brand-accent">
                     02 99 00 00 00
                  </div>
                  <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Disponible 24h/24, 7j/7
                </div>
                </div>
              </a>

              <div 
                className="flex items-center gap-4 p-4 rounded-xl mb-6 bg-zinc-900 dark:bg-black/50"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-zinc-800"
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-zinc-300">
                    Disponibilité
                  </div>
                  <div className="text-md font-bold text-brand-gold">
                    24h/24 - 7j/7
                  </div>
                </div>
              </div>

              <a
                href="tel:0299000000"
                className="block w-full py-4 rounded-xl text-center font-bold text-white transition-all shadow-lg hover:-tranzinc-y-1"
                style={{ backgroundColor: '#d4a853' }}
              >
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
