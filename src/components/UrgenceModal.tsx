'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UrgenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProblemType = 'porte_claquee' | 'serrure_bloquee' | 'cambriolage' | 'autre' | null;

const problemTypes = [
  { id: 'porte_claquee', label: 'Porte claquée', icon: '🚪' },
  { id: 'serrure_bloquee', label: 'Serrure bloquée', icon: '🔒' },
  { id: 'cambriolage', label: 'Cambriolage', icon: '⚠️' },
  { id: 'autre', label: 'Autre problème', icon: '❓' },
];

const zones = [
  'Rennes Centre', 'Rennes Nord', 'Rennes Sud', 'Rennes Est', 'Rennes Ouest',
  'Cesson-Sévigné', 'Saint-Grégoire', 'Bruz', 'Pacé', 'Autre commune'
];

export default function UrgenceModal({ isOpen, onClose }: UrgenceModalProps) {
  const [step, setStep] = useState(1);
  const [problemType, setProblemType] = useState<ProblemType>(null);
  const [selectedZone, setSelectedZone] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleClose = () => {
    // Reset state
    setStep(1);
    setProblemType(null);
    setSelectedZone('');
    setFormData({ nom: '', telephone: '', email: '' });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-pro-blue text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Urgence serrurerie</h2>
                  <button onClick={handleClose} className="text-white/80 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress */}
                {!isSubmitted && (
                  <div className="flex gap-2 mt-4">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          s <= step ? 'bg-urgent-orange' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {isSubmitted ? (
                  // Confirmation
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Demande envoyée !
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Nous vous appelons dans les plus brefs délais.
                    </p>
                    <a
                      href="tel:0255996202"
                      className="btn-urgent inline-flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Appeler maintenant
                    </a>
                  </motion.div>
                ) : (
                  <>
                    {/* Step 1: Problem Type */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="text-xl font-semibold mb-4">
                          1. Quel est votre problème ?
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {problemTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setProblemType(type.id as ProblemType)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                problemType === type.id
                                  ? 'border-pro-blue bg-pro-blue/5'
                                  : 'border-gray-200 hover:border-pro-blue/50'
                              }`}
                            >
                              <span className="text-3xl block mb-2">{type.icon}</span>
                              <span className="font-medium">{type.label}</span>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => problemType && setStep(2)}
                          disabled={!problemType}
                          className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Suivant
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: Zone */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="text-xl font-semibold mb-4">
                          2. Dans quel secteur ?
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {zones.map((zone) => (
                            <button
                              key={zone}
                              onClick={() => setSelectedZone(zone)}
                              className={`p-3 rounded-lg border-2 text-sm transition-all ${
                                selectedZone === zone
                                  ? 'border-pro-blue bg-pro-blue/5'
                                  : 'border-gray-200 hover:border-pro-blue/50'
                              }`}
                            >
                              {zone}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() => setStep(1)}
                            className="btn-primary bg-gray-500 hover:bg-gray-600 flex-1"
                          >
                            Retour
                          </button>
                          <button
                            onClick={() => selectedZone && setStep(3)}
                            disabled={!selectedZone}
                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Suivant
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Contact */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="text-xl font-semibold mb-4">
                          3. Vos coordonnées
                        </h3>
                        
                        {/* Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <p className="text-sm text-gray-600 mb-2">Récapitulatif :</p>
                          <p className="font-medium">
                            {problemTypes.find(p => p.id === problemType)?.label} • {selectedZone}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nom complet
                            </label>
                            <input
                              type="text"
                              value={formData.nom}
                              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pro-blue focus:border-transparent"
                              placeholder="Votre nom"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Téléphone *
                            </label>
                            <input
                              type="tel"
                              value={formData.telephone}
                              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pro-blue focus:border-transparent"
                              placeholder="06 00 00 00 00"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pro-blue focus:border-transparent"
                              placeholder="votre@email.com"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() => setStep(2)}
                            className="btn-primary bg-gray-500 hover:bg-gray-600 flex-1"
                          >
                            Retour
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={!formData.telephone || !formData.nom}
                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Valider
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
