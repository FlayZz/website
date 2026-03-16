'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface HeaderProps {
  onUrgenceClick: () => void;
}

export default function Header({ onUrgenceClick }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current,
      { y: -100 },
      { y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm"
      style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-xl font-bold" style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}>SerruAccess</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-gray-600 hover:text-[#1e3a5f] transition-colors font-medium">
              Services
            </Link>
            <Link href="#zone" className="text-gray-600 hover:text-[#1e3a5f] transition-colors font-medium">
              Zone
            </Link>
            <Link href="#temoignages" className="text-gray-600 hover:text-[#1e3a5f] transition-colors font-medium">
              Témoignages
            </Link>
            <Link href="/devis" className="text-gray-600 hover:text-[#1e3a5f] transition-colors font-medium">
              Devis
            </Link>
          </nav>

          {/* Urgence Button */}
          <button
            onClick={onUrgenceClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#d4a853', color: '#1e3a5f' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            URGENCE 24/7
          </button>
        </div>
      </div>
    </header>
  );
}
