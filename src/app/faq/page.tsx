'use client';

import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function FAQPage() {
  return (
    <>
      <Header onUrgenceClick={() => {}} />
      <main className="pt-24">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
