'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Counters from '@/components/Counters';
import MapZone from '@/components/MapZone';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import UrgenceModal from '@/components/UrgenceModal';

export default function Home() {
  const [isUrgenceOpen, setIsUrgenceOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onUrgenceClick={() => setIsUrgenceOpen(true)} />
      <Hero onUrgenceClick={() => setIsUrgenceOpen(true)} />
      <Services />
      <Counters />
      <MapZone />
      <Testimonials />
      <FAQ />
      <Footer />
      
      <UrgenceModal isOpen={isUrgenceOpen} onClose={() => setIsUrgenceOpen(false)} />
    </main>
  );
}
