'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'leaflet/dist/leaflet.css';


// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

import TrustBar from '@/components/TrustBar';
import Hero from '@/components/Hero';

gsap.registerPlugin(ScrollTrigger);

// Villes d'intervention en Bretagne
const cities = [
  { name: 'Rennes', coords: [-1.6778, 48.1173], type: 'principal', phone: '02 99 00 00 00' },
  { name: 'Brest', coords: [-4.4861, 48.3900], type: 'secondary', phone: '02 98 00 00 00' },
  { name: 'Quimper', coords: [-4.1072, 47.9959], type: 'secondary', phone: '02 97 00 00 00' },
  { name: 'Lorient', coords: [-3.3665, 47.7320], type: 'secondary', phone: '02 97 00 00 00' },
  { name: 'Vannes', coords: [-2.7599, 47.6584], type: 'secondary', phone: '02 97 00 00 00' },
  { name: 'Saint-Malo', coords: [-1.9990, 48.6498], type: 'secondary', phone: '02 99 00 00 00' },
];

// Liste des départements bretons cliquables
const departments = [
  { code: '35', name: 'Ille-et-Vilaine', priority: true },
  { code: '29', name: 'Finistère', priority: true },
  { code: '22', name: 'Côtes-d\'Armor', priority: false },
  { code: '56', name: 'Morbihan', priority: true },
  { code: '44', name: 'Loire-Atlantique', priority: false },
  { code: '53', name: 'Mayenne', priority: false },
];

export default function DevisPage() {
  const router = useRouter();
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    issue: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fetch departments GeoJSON
    fetch('/departments.json')
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
      })
      .catch(e => console.error('Failed to load local GeoJSON', e));

    // Animations
    gsap.fromTo('.devis-title', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
    );
    gsap.fromTo('.devis-card',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.4 }
    );
  }, []);

  const handleDepartmentClick = (feature: any) => {
    setSelectedDepartment(feature.properties);
  };

  const handleDeptSelect = (dept: { code: string; name: string; priority: boolean }) => {
    setSelectedDepartment({ code: dept.code, name: dept.name, priority: dept.priority });
    // Scroll vers le formulaire
    setTimeout(() => {
      const formSection = document.getElementById('devis-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Veuillez entrer votre nom';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Veuillez entrer votre téléphone';
    } else if (!/^(\+33|0)[1-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.issue) {
      newErrors.issue = 'Veuillez sélectionner un type d\'intervention';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    // Logique de soumission - ici on pourrait envoyer vers une API
    setTimeout(() => {
      alert(`Demande de devis envoyée pour le département ${selectedDepartment?.code}!\n\nNous vous contacterons au ${formData.phone}`);
      setIsSubmitting(false);
      router.push('/');
    }, 1000);
  };

  const handleUrgenceClick = () => {
    const formSection = document.getElementById('devis-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('devis-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative">
      {/* Bouton sticky Retour à l'accueil */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-[1000] bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center gap-2 hover:bg-brand-gold text-zinc-900 dark:text-white hover:text-white transition-all font-bold text-sm"
      >
        <span>←</span> Retour à l&apos;accueil
      </Link>
      <Hero onUrgenceClick={handleUrgenceClick} onDevisClick={scrollToForm} />
      <TrustBar />
      
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="devis-title text-3xl md:text-4xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
            Demandez votre <span className="text-brand-accent">devis gratuit</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Carte interactive */}
            <div className="devis-card rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700" style={{ height: '550px' }}>
              <div className="bg-zinc-900 text-white px-4 py-3 text-sm font-semibold flex justify-between items-center">
                <span>🗺️ Cliquez sur votre département</span>
                <span className="text-xs text-zinc-400">ou cliquez sur la liste →</span>
              </div>
              
              {/* Liste des départements cliquables */}
              <div className="bg-zinc-100 dark:bg-zinc-800 px-2 py-2 flex flex-wrap gap-1 border-b border-zinc-200 dark:border-zinc-700">
                {departments.map((dept) => (
                  <button
                    key={dept.code}
                    onClick={() => handleDeptSelect(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-110 hover:shadow-lg hover:z-10 ${
                      selectedDepartment?.code === dept.code
                        ? 'bg-green-500 text-white shadow-md'
                        : dept.priority
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 hover:bg-amber-300 dark:hover:bg-amber-700'
                        : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300'
                    }`}
                  >
                    {dept.code} - {dept.name} {dept.priority && '⭐'}
                  </button>
                ))}
              </div>
              
              <MapContainer
                center={[48.1173, -1.6778]}
                zoom={8}
                style={{ height: 'calc(100% - 84px)', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                />
                {geoData && (
                  <GeoJSON
                    data={geoData}
                    style={(feature: any) => ({
                      fillColor: selectedDepartment?.code === feature.properties?.code ? '#22c55e' : feature.properties?.priority ? '#d4a853' : '#1e3a5f',
                      color: selectedDepartment?.code === feature.properties?.code ? '#22c55e' : '#fff',
                      weight: selectedDepartment?.code === feature.properties?.code ? 3 : 2,
                      opacity: 1,
                      fillOpacity: selectedDepartment?.code === feature.properties?.code ? 0.5 : feature.properties?.priority ? 0.35 : 0.15,
                    })}
                    onEachFeature={(feature, layer) => {
                      layer.on('click', () => handleDepartmentClick(feature));
                      layer.bindPopup(
                        `<div style="background: white; padding: 1rem; border-radius: 8px; min-width: 150px; cursor: pointer;">
                          <h3 style="margin: 0 0 0.5rem; color: ${feature.properties?.priority ? '#d4a853' : '#1e3a5f'}; font-weight: bold; font-size: 16px;">${feature.properties?.name}</h3>
                          <p style="margin: 0.5rem 0; font-size: 14px; color: #333;">Département ${feature.properties?.code}</p>
                          <p style="margin: 0.5rem 0; color: #666; font-size: 12px;">${feature.properties?.priority ? '⭐ Zone prioritaire' : 'Zone limitrophe'}</p>
                          <button onclick="this.closest('.leaflet-popup-content-wrapper').click()" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #1e3a5f; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;">Sélectionner</button>
                        </div>`
                      );
                    }}
                  />
                )}
                {cities.map((city) => (
                  <Marker
                    key={city.name}
                    position={[city.coords[1], city.coords[0]]}
                  >
                    <Popup>
                      <div style={{ padding: '0.5rem', minWidth: '120px' }}>
                        <h3 style={{ color: '#1e3a5f', fontWeight: 'bold', marginBottom: '0.25rem' }}>{city.name}</h3>
                        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                          {city.type === 'principal' ? '📍 Base principale' : '🏢 Ville d\'intervention'}
                        </p>
                        <p style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold', marginTop: '0.25rem' }}>{city.phone}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Formulaire de devis */}
            <div id="devis-form" className="devis-card rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6">
              {selectedDepartment ? (
                <>
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <p className="text-green-700 dark:text-green-400 font-semibold">
                      ✅ {selectedDepartment.name} (Département {selectedDepartment.code}) sélectionné
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: ''}); }}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-600'}`}
                        placeholder="Votre nom"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => { setFormData({...formData, phone: e.target.value}); setErrors({...errors, phone: ''}); }}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition ${errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-600'}`}
                        placeholder="06 00 00 00 00"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: ''}); }}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-600'}`}
                        placeholder="vous@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition"
                        placeholder="Votre adresse"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Type d&apos;intervention *
                      </label>
                      <select
                        required
                        value={formData.issue}
                        onChange={(e) => { setFormData({...formData, issue: e.target.value}); setErrors({...errors, issue: ''}); }}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition ${errors.issue ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-600'}`}
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="urgence">🚨 Urgence (porte bloquée/claquée)</option>
                        <option value="serrure">🔐 Changement de serrure</option>
                        <option value="blindage">🛡️ Pose de porte blindée</option>
                        <option value="cle">🔑 Reproduction de clés</option>
                        <option value="autre">📋 Autre intervention</option>
                      </select>
                      {errors.issue && <p className="text-red-500 text-xs mt-1">{errors.issue}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all hover:scale-[1.02] shadow-lg"
                    >
                      {isSubmitting ? '⏳ Envoi en cours...' : '📩 Demander mon devis gratuit'}
                    </button>

                    <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                      Réponse sous 24h. Sans engagement.
                    </p>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-200 mb-2">
                    Sélectionnez votre département
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Cliquez sur la carte ou sur un département pour commencer votre demande de devis.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <span className="text-amber-600">⭐</span> Zones prioritaires
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-blue-600">📍</span> Bases principales
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
