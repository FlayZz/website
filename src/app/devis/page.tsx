'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DevisPage() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Header onUrgenceClick={() => {}} />
      
      <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT COLUMN: Reassurance */}
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ 
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'var(--foreground)'
                  }}
                >
                  Demandez votre <span style={{ color: '#d4a853' }}>devis gratuit</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                  Réponse sous 2h. Intervention rapide.
                </p>
              </div>

              {/* Reassurance Cards */}
              <div className="space-y-4">
                {/* Card 1: Intervention rapide */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(212, 168, 83, 0.15)' }}
                    >
                      <svg className="w-6 h-6" style={{ color: '#d4a853' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--foreground)' }}>
                        ⚡ Intervention moyenne 30 min
                      </h3>
                      <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                        Sur Rennes et métropole, nous intervenons sous 30 minutes en moyenne.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Tarifs clairs */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(212, 168, 83, 0.15)' }}
                    >
                      <svg className="w-6 h-6" style={{ color: '#d4a853' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--foreground)' }}>
                        💰 Tarifs clairs et transparents
                      </h3>
                      <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                        Devis détaillé avant intervention. Pas de frais cachés.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Assurances */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(212, 168, 83, 0.15)' }}
                    >
                      <svg className="w-6 h-6" style={{ color: '#d4a853' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--foreground)' }}>
                        🛡️ Agréé Assurances
                      </h3>
                      <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                        Certifications A2P. Interventions reconnues par les assureurs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact direct */}
              <div 
                className="p-6 rounded-2xl"
                style={{ 
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #0f0f1a 100%)'
                }}
              >
                <p className="text-white/80 mb-4">
                  Préférez-vous nous appeler directement ?
                </p>
                <a 
                  href="tel:+33255996202"
                  className="inline-flex items-center gap-2 text-xl font-bold text-white"
                >
                  📞 02 55 99 62 02
                </a>
                <p className="text-white/60 text-sm mt-2">
                  Disponibilité: 24h/24, 7j/7
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Form Card */}
            <div 
              className="p-8 rounded-3xl shadow-xl"
              style={{ 
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                      Vos coordonnées
                    </h2>
                  </div>

                  {/* Type d'urgence */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Type d&apos;intervention *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)'
                      }}
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="urgence">🚨 Urgence (porte bloquée, clé cassée)</option>
                      <option value="installation">🔧 Installation de serrure</option>
                      <option value="reparation">🔩 Réparation de serrure</option>
                      <option value="blindage">🛡️ Blindage de porte</option>
                      <option value="autre">📝 Autre demande</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Description de votre besoin *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      placeholder="Décrivez votre problème ou votre demande..."
                      className="w-full px-4 py-3 rounded-xl resize-none transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)'
                      }}
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Votre numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)'
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ 
                      background: 'linear-gradient(135deg, #d4a853 0%, #b8923f 100%)',
                      color: '#1e3a5f'
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      'Demander mon devis gratuit'
                    )}
                  </button>

                  <p className="text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Réponse garantie sous 2h. Aucun engagement.
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                  >
                    <svg className="w-10 h-10" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    Demande envoyée !
                  </h2>
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    Nous vous recontacterons sous 2h au numéro fourni.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ type: '', description: '', phone: '' });
                    }}
                    className="mt-6 px-6 py-3 rounded-xl font-medium"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      color: 'var(--foreground)'
                    }}
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
