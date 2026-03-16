'use client';

import Services from '@/components/Services';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ServicesPage() {
  return (
    <>
      <Header onUrgenceClick={() => {}} />
      <main className="pt-24">
        <section className="py-20" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Nos services de serrurerie
            </h1>
            <p className="text-xl text-white/80">
              Des solutions complètes pour votre sécurité à Rennes et Bretagne
            </p>
          </div>
        </section>
        <Services />
      </main>
      <Footer />
    </>
  );
}
