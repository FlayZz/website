'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const interventionTypes = [
  'Ouverture de porte',
  'Changement de serrure',
  'Changement de cylindre',
  'Serrure multipoints',
  'Blindage de porte',
  'Installation alarme',
  'Copie de clés',
  'Réparation mécanisme',
  'Autre',
];

const brands = [
  'ABUS', 'Bricard', 'DOM', 'Fichet', 'Kaba', 'Mottura', 
  'Picard', 'Poli', 'Vachon', 'Autre/Marque inconnue'
];

const budgets = [
  'Moins de 100€',
  '100€ - 200€',
  '200€ - 400€',
  '400€ - 600€',
  '600€ - 1000€',
  'Plus de 1000€',
];

export default function DevisPage() {
  const [formData, setFormData] = useState({
    typeIntervention: '',
    marque: '',
    budget: '',
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header onUrgenceClick={() => {}} />
        <div className="pt-24 pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Demande de devis envoyée !
            </h1>
            <p className="text-gray-600 mb-6">
              Nous avons bien reçu votre demande. Un serrurier vous contactera dans les plus brefs délais pour discuter de votre projet et établir un devis gratuit.
            </p>
            <a href="/" className="btn-primary inline-block">
              Retour à l&apos;accueil
            </a>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onUrgenceClick={() => {}} />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Demander un devis
            </h1>
            <p className="text-xl text-gray-600">
              Remplissez ce formulaire et nous vous répondrons sous 24h
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Type d'intervention */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Type d&apos;intervention *
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {interventionTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, typeIntervention: type })}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      formData.typeIntervention === type
                        ? 'border-pro-blue bg-pro-blue/5 text-pro-blue'
                        : 'border-gray-200 hover:border-pro-blue/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Marque préférée */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Marque préférée (optionnel)
              </label>
              <div className="grid md:grid-cols-5 gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setFormData({ ...formData, marque: brand })}
                    className={`p-2 rounded-lg border-2 text-sm transition-all ${
                      formData.marque === brand
                        ? 'border-pro-blue bg-pro-blue/5 text-pro-blue'
                        : 'border-gray-200 hover:border-pro-blue/50'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget estimé */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Budget estimé
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      formData.budget === budget
                        ? 'border-pro-blue bg-pro-blue/5 text-pro-blue'
                        : 'border-gray-200 hover:border-pro-blue/50'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vos coordonnées
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
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
                    required
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pro-blue focus:border-transparent"
                    placeholder="06 00 00 00 00"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pro-blue focus:border-transparent"
                    placeholder="Votre adresse"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message supplémentaire
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pro-blue focus:border-transparent"
                  placeholder="Décrivez votre projet..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-lg"
            >
              Envoyer ma demande de devis
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Envoi gratuit. Réponse sous 24h ouvrées.
            </p>
          </motion.form>
        </div>
      </div>
    </main>
  );
}
