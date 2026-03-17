'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
      
      const faq = document.getElementById('faq');
      const footer = document.querySelector('footer');
      
      let hide = false;
      if (faq && !isMobile) {
        const rect = faq.getBoundingClientRect();
        if (rect.top < window.innerHeight - 200 && rect.bottom > 200) {
          hide = true;
        }
      }
      
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          hide = true;
        }
      }
      
      setIsHidden(hide);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const handleClick = () => {
    if (isMobile) {
      window.location.href = 'tel:+330255996202';
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-500 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed button
          <motion.button
            key="collapsed"
            onClick={handleClick}
            className={`relative flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 bg-brand-gold text-white font-bold ${
              isScrolled ? 'py-2 px-3' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-brand-gold opacity-60"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Phone icon */}
            <svg className="w-5 h-5 relative z-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            
            {!isScrolled && (
              <span className="text-sm font-bold whitespace-nowrap relative z-10">
                Urgence 24/7
              </span>
            )}
          </motion.button>
        ) : (
          // Expanded panel
          <motion.div
            key="expanded"
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-4 w-72 border-2 border-brand-gold"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-brand-gold font-display">
                Urgence Serrurerie
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Phone number */}
            <a
              href="tel:+33255996202"
              className="flex items-center gap-3 p-3 rounded-xl mb-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-navy">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg text-brand-accent">
                   02 55 99 62 02
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Appelez-nous
                </div>
              </div>
            </a>

            {/* Schedule */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-navy">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-brand-gold">
                  Disponibilité
                </div>
                <div className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                  24h/24 - 7j/7
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="tel:+33255996202"
              className="block w-full mt-4 py-3 rounded-xl text-center font-bold transition-all hover:bg-brand-gold-hover bg-brand-gold text-white"
            >
              Appeler maintenant
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
