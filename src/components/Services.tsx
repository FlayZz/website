'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '🚪',
    title: 'Ouverture de porte',
    description: 'Porte claquée, serrure bloquée ou clés perdues ? Intervention rapide sans dommages à Rennes.',
  },
  {
    icon: '🔧',
    title: 'Réparation de serrures',
    description: 'Réparation tous types : cylindre, serrure encastrée, en applique. Garantie 1 an.',
  },
  {
    icon: '🔐',
    title: 'Installation de serrures',
    description: 'Pose serrures haute sécurité, certifié A2P. Matériel de qualité professionnelle.',
  },
  {
    icon: '🗄️',
    title: 'Coffres-forts',
    description: 'Installation, ouverture, réparation de coffres-forts pour particuliers et entreprises.',
  },
  {
    icon: '🛡️',
    title: 'Blindage de porte',
    description: 'Blindage de porte, cornières anti-pince, serrures 3 points pour maximale sécurité.',
  },
  {
    icon: '🔑',
    title: 'Fabrication de clés',
    description: 'Duplication toutes marques, clés sécurisées, badges et cartes magnétiques.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for service cards
      gsap.fromTo('.card-service', 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 90%',
          }
        }
      );

      // Title animation
      gsap.fromTo('.services-title',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-title',
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
      id="services" 
      className="py-24 bg-white dark:bg-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="text-xs font-bold uppercase tracking-widest mb-4 block"
            style={{ color: '#d4a853' }}
          >
            Nos Services
          </span>
          <h2 
            className="services-title text-3xl md:text-4xl font-bold mb-4 dark:text-white"
            style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Solutions complètes pour votre sécurité
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Artisans certifiés pour tous types de serrures et systèmes de fermeture à Rennes
          </p>
        </div>

        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-service bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Accent bar */}
              <div 
                className="absolute top-0 left-0 w-1 h-0 transition-all duration-300"
                style={{ backgroundColor: '#d4a853' }}
              />
              
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: '#1e3a5f' }}
              >
                {service.icon}
              </div>
              
              <h3 
                className="text-xl font-semibold mb-2 dark:text-white"
                style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
