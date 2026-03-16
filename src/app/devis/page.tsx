'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DevisPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    tel: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation envoi
    setSubmitted(true);
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const urgencyTypes = [
    { value: 'porte-claquee', label: '🚪 Porte claquée' },
    { value: 'cles-perdues', label: '🔑 Clés perdues' },
    { value: 'serrure-bloquee', label: '🔒 Serrure bloquée' },
    { value: 'cambriolage', label: '🛡️ Cambriolage' },
    { value: 'autre', label: '❓ Autre' },
  ];

  return (
    <main className="min-h-screen py-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: '#d4a853' }}>
            Devis gratuit
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" 
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--foreground)' }}>
            Demandez un devis
          </h1>
          <p style={{ color: 'var(--muted-foreground)', maxWidth: '500px', margin: '0 auto' }}>
            Intervention rapide à Rennes. Réponse sous 30 minutes.
          </p>
        </div>

        {/* Split Screen */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Colonne gauche: Reassurance */}
          <div className="space-y-6">
            <div 
              className="p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: 'rgba(212,168,83,0.15)' }}
                >
                  ⏱️
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    Intervention 30 min
                  </h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                    Moyenne d&apos;intervention sur Rennes Métropole. Départ immédiat après votre appel.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: 'rgba(212,168,83,0.15)' }}
                >
                  💰
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    Tarifs clairs
                  </h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                    Devis gratuit et transparent. Pas de surprise. Paiement par CB, espèces ou virement.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: 'rgba(212,168,83,0.15)' }}
                >
                  ✅
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    Agréé assurances
                  </h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                    Certifié A2P. Intervention prise en charge par votre assurance habitation.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact direct */}
            <div 
              className="p-6 rounded-2xl text-center"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <p className="text-white/80 mb-2">Preferez-vous appeler ?</p>
              <a 
                href="tel:+33255996202" 
                className="text-2xl font-bold text-white block"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                02 55 99 62 02
              </a>
              <p className="text-white/60 text-sm mt-2">24h/24 - 7j/7</p>
            </div>
          </div>

          {/* Colonne droite: Formulaire */}
          <div>
            {submitted ? (
              <div 
                className="p-8 rounded-2xl text-center"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  Demande envoyée !
                </h3>
                <p style={{ color: 'var(--muted-foreground)' }}>
                  Nous vous contactons sous 30 minutes.
                </p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl"
                style={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                  Votre demande
                </h3>

                <div className="space-y-5">
                  {/* Type urgence */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: 'var(--foreground)' }}
                    >
                      Type d&apos;urgence
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                      }}
                    >
                      <option value="">Choisir...</option>
                      {urgencyTypes.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: 'var(--foreground)' }}
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Decrivez votre probleme..."
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 resize-none"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                      }}
                    />
                  </div>

                  {/* Telephone */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: 'var(--foreground)' }}
                    >
                      Telephone
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      value={formData.tel}
                      onChange={handleChange}
                      required
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
                    style={{ 
                      background: 'linear-gradient(135deg, #d4a853 0%, #b8923f 100%)',
                      color: '#1e3a5f'
                    }}
                  >
                    Envoyer ma demande
                  </button>

                  <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                    Envoi instantane. Reponse sous 30 min.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
