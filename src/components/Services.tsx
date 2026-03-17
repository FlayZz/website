'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '🚪',
    image: '/cle2.png',
    title: 'Ouverture de porte',
    description: 'Porte claquée, serrure bloquée ou clés perdues ? Intervention rapide sans dommages à Rennes.',
  },
  {
    icon: '🔧',
    image: '/image 1.jpg',
    title: 'Réparation de serrures',
    description: 'Réparation tous types : cylindre, serrure encastrée, en applique. Garantie 1 an.',
  },
  {
    icon: '🔐',
    image: '/image2.jpg',
    title: 'Installation de serrures',
    description: 'Pose serrures haute sécurité, certifié A2P. Matériel de qualité professionnelle.',
  },
  {
    icon: '🗄️',
    image: '/image4.webp',
    title: 'Coffres-forts',
    description: 'Installation, ouverture, réparation de coffres-forts pour particuliers et entreprises.',
  },
  {
    icon: '🛡️',
    image: '/image5.jpg',
    title: 'Blindage de porte',
    description: 'Blindage de porte, cornières anti-pince, serrures 3 points pour maximale sécurité.',
  },
  {
    icon: '🔑',
    image: '/image6.png',
    title: 'Fabrication de clés',
    description: 'Duplication toutes marques, clés sécurisées, badges et cartes magnétiques.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for service cards with scrub
      gsap.utils.toArray('.card-service').forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 100%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 200,
          opacity: 0,
          scale: 0.85,
          rotationX: 10,
        });
      });

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
      className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors border-y border-gray-100 dark:border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block text-brand-accent">
            Nos Services Premium
          </span>
          <h2 className="services-title text-3xl md:text-4xl font-bold mb-4 text-brand-gold dark:text-white font-sans">
            Solutions complètes pour votre sécurité
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Artisans certifiés pour tous types de serrures à Rennes et partout en Bretagne
          </p>
        </div>

        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-service bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-tranzinc-y-2 hover:shadow-2xl group"
            >
              {/* Accent bar animate on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent text-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-lg shadow-primary/10">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-2"
                />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-brand-gold text-white/90 text-white backdrop-blur-sm">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-brand-gold dark:text-white font-sans">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>
              
              {/* Removed "En savoir plus" link as per instruction's implied change */}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center relative z-20">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-2 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/40 rounded-full pr-8 shadow-2xl relative z-10 transition-all duration-300 hover:shadow-primary/20 hover:border-zinc-200 dark:border-zinc-700">
                <div className="flex -space-x-4 overflow-hidden p-2">
                    {['/image 1.jpg', '/image2.jpg', '/image4.webp', '/image5.jpg'].map((src, i) => (
                        <div key={i} className="relative inline-block h-12 w-12 rounded-full ring-4 ring-white dark:ring-zinc-900 overflow-hidden shadow-lg transform hover:scale-110 transition-transform z-[10]">
                            <Image
                                src={src}
                                alt={`Réalisation ${i}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Plus de <span className="text-brand-accent font-bold">2 500 interventions</span> réussies cette année
                </p>
                <Link href="/devis" className="bg-brand-gold text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-gold-hover transition-colors">
                    Obtenir mon devis
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
