'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: "Combien coûte l'intervention d'un serrurier à Rennes ?",
    answer: "Le tarif de base pour une ouverture de porte simple à Rennes commence à 80€. Cependant, le coût peut varier selon l'heure (jour/nuit), la complexité de la serrure, et le type d'intervention. Nous fournissons toujours un devis gratuit avant toute intervention. Pour une urgence en dehors des horaires classiques, un supplément de 20 à 50% peut s'appliquer."
  },
  {
    question: "Quel est le délai d'intervention à Rennes ?",
    answer: "Nous intervenons généralement sous 30 à 60 minutes sur Rennes et sa métropole. Pour les communes environnantes (Cesson-Sévigné, Saint-Grégoire, Bruz, Pacé), le délai peut atteindre 1h30. Notre service d'urgence 24h/24 garantit une réponse rapide même la nuit et les jours fériés."
  },
  {
    question: "Quelles certifications possède SerruAccess ?",
    answer: "Nos serruriers sont certifiés et expérimentés. Nous sommes spécialisés dans la pose de serrures certifiées A2P (Assurance Prévention Protection), le plus haut niveau de sécurité en France. Nous manipulons toutes les marques de serrures (Fichet, Vachon, JPM, Kaba, Abloy) et proposons des solutions homologées par les assurances."
  },
  {
    question: "Intervenez-vous la nuit et les dimanches à Rennes ?",
    answer: "Oui, notre service d'urgence est disponible 24h/24, 7j/7, y compris dimanches et jours fériés. Nous comprenons qu'une urgence de serrurerie peut survenir à tout moment. Notre équipe de serruriers qualifiés assure des interventions nocturnes à Rennes pour tous vos problèmes de serrures, portes bloquées ou clés perdues."
  },
  {
    question: "Comment choisir une serrure haute sécurité pour mon domicile ?",
    answer: "Pour une sécurité optimale, privilégiez les serrures certifiées A2P avec 3 ou 5 points de fermeture. Les serrures électroniques connectées offrent un contrôle d'accès à distance. Nous recommandons également le blindage de porte ou la pose d'une porte blindée pour les logements situés en rez-de-chaussée ou dans des zones sensibles. Notre équipe vous conseillera gratuitement sur la solution la plus adaptée à votre budget et vos besoins."
  },
  {
    question: "Que faire après une effraction à Rennes ?",
    answer: "En cas d'effraction, la priorité est de sécuriser votre domicile immédiatement. Appelez-nous pour une intervention d'urgence - nous posons un blocage temporaire le temps de remplacer la serrure définitivement. Nous collaborons avec votre assureur pour les démarches. Nous recommandons également unblindage de porte ou l'installation d'une porte blindée pour prévenir récidives."
  },
  {
    question: "Proposez-vous des garanties sur les réparations ?",
    answer: "Oui, toutes nos interventions et installations bénéficient d'une garantie minimale de 1 an. Les serrures certifiées A2P que nous posons disposent souvent d'une garantie constructeur de 5 à 10 ans. Nous fournissons des factures détaillées acceptées par toutes les assurances pour vos demandes de remboursement."
  },
  {
    question: "Quelles zones desservez-vous autour de Rennes ?",
    answer: "Nous intervenons sur l'ensemble de Rennes Métropole (Rennes, Cesson-Sévigné, Saint-Grégoire, Pacé, Bruz, Chantepie, Liffré) ainsi que dans tout le département d'Ille-et-Vilaine (Vitré, Fougères, Redon). Pour les interventions hors métropole, des frais de déplacement peuvent s'appliquer. N'hésitez pas à nous appeler pour confirmer notre capacité d'intervention sur votre commune."
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
      className="py-24"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="text-xs font-bold uppercase tracking-widest mb-4 block"
            style={{ color: '#d4a853' }}
          >
            Foire Aux Questions
          </span>
          <h2 
            className="faq-title text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Questions fréquentes sur nos services
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur nos interventions de serrurerie à Rennes
          </p>
        </div>

        <div className="faq-list space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="faq-item rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: '#f8f6f0',
                border: openIndex === index ? '2px solid #d4a853' : '2px solid transparent'
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span 
                  className="font-semibold text-lg"
                  style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-6 h-6" 
                    style={{ color: '#d4a853' }} 
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
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
