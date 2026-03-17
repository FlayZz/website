'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MapWithNoSSR = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
});

const cityData = [
  { name: 'Rennes', dept: '35', lat: 48.1173, lng: -1.6778 },
  { name: 'Cesson-Sévigné', dept: '35', lat: 48.1186, lng: -1.6031 },
  { name: 'Saint-Malo', dept: '35', lat: 48.6493, lng: -2.0257 },
  { name: 'Pacé', dept: '35', lat: 48.1481, lng: -1.7725 },
  { name: 'Bruz', dept: '35', lat: 48.0269, lng: -1.7483 },
  { name: 'Saint-Grégoire', dept: '35', lat: 48.1500, lng: -1.6833 },
  { name: 'Brest', dept: '29', lat: 48.3904, lng: -4.4861 },
  { name: 'Quimper', dept: '29', lat: 47.9975, lng: -4.0979 },
  { name: 'Concarneau', dept: '29', lat: 47.8726, lng: -3.9213 },
  { name: 'Vannes', dept: '56', lat: 47.6582, lng: -2.7608 },
  { name: 'Lorient', dept: '56', lat: 47.7483, lng: -3.3618 },
  { name: 'Lanester', dept: '56', lat: 47.7667, lng: -3.3333 },
  { name: 'Nantes', dept: '44', lat: 47.2184, lng: -1.5536 },
  { name: 'Laval', dept: '53', lat: 48.0707, lng: -0.7734 },
];

const departmentsInfo = [
  { code: '35', name: 'Ille-et-Vilaine', priority: true },
  { code: '29', name: 'Finistère' },
  { code: '56', name: 'Morbihan' },
  { code: '44', name: 'Loire-Atlantique' },
  { code: '53', name: 'Mayenne' },
];

// Helper to calc distance (Haversine formula)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

export default function ZonesPage() {
  const [nearestCity, setNearestCity] = useState<{name: string, dept: string, distance: number} | null>(null);
  const [locating, setLocating] = useState(false);

  // Logic to find the closest city automatically
  const findNearestCity = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let closest = cityData[0];
          let minDistance = Infinity;

          for (const city of cityData) {
            const dist = getDistanceFromLatLonInKm(
              position.coords.latitude, 
              position.coords.longitude, 
              city.lat, 
              city.lng
            );
            if (dist < minDistance) {
              minDistance = dist;
              closest = city;
            }
          }
          setNearestCity({ ...closest, distance: Math.round(minDistance) });
          setLocating(false);
        },
        () => { setLocating(false); }
      );
    } else {
      setLocating(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-zinc-900 via-primary to-zinc-900 border-b border-zinc-200 dark:border-zinc-700/20 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Zones d&apos;intervention
          </h1>
          <p className="text-xl text-gray-200 font-medium">
            Trouvez rapidement votre serrurier en Bretagne et Pays de la Loire
          </p>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Legend & Nearest Local */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Geolocation Card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-xl hover:shadow-primary/10 transition-shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-brand-gold dark:text-white">
                  <span>📍</span> Mon serrurier local
                </h2>
                
                {nearestCity ? (
                  <div className="bg-brand-accent text-white/10 border border-accent/20 p-4 rounded-xl">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Le plus proche de vous :</p>
                    <p className="text-xl font-bold text-brand-accent mb-2">Serrurier {nearestCity.name}</p>
                    <p className="text-sm mb-4">À environ {nearestCity.distance} km.</p>
                    <Link 
                      href={`/serrurier/${nearestCity.dept}/${nearestCity.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}
                      className="w-full block text-center py-2 bg-brand-gold text-white rounded-lg font-bold hover:bg-brand-gold text-white-foreground transition-colors"
                    >
                      Voir ma page locale
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Trouvez le technicien le plus proche de votre position instantanément.</p>
                    <button 
                      onClick={findNearestCity}
                      disabled={locating}
                      className="w-full py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-2 border-primary text-brand-gold dark:text-white rounded-xl font-bold hover:bg-brand-gold text-white hover:text-white transition-all disabled:opacity-50"
                    >
                      {locating ? 'Recherche en cours...' : 'Me localiser'}
                    </button>
                  </div>
                )}
              </div>

              {/* Legend Card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-xl">
                <h3 className="font-bold mb-4 text-brand-gold dark:text-white">Légende de la carte</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-brand-accent text-white/30 border-2 border-accent shadow-sm"></div>
                    <div>
                      <p className="text-sm font-bold">Zone Prioritaire</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Rennes et sa métropole (Délai 30 min)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-brand-gold text-white/20 border-2 border-primary border-dashed shadow-sm"></div>
                    <div>
                      <p className="text-sm font-bold">Zone Bretagne étendue</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Intervention le jour même</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Map */}
            <div className="lg:col-span-8">
              <div className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-card/30 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative z-10">
                <MapWithNoSSR />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Directory Grid (No nested scroll) */}
      <section className="py-16 bg-zinc-100 dark:bg-zinc-800/30 border-t border-zinc-200 dark:border-zinc-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-gold dark:text-white mb-4">
              L&apos;Annuaire de nos interventions
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Retrouvez facilement la liste des villes où nous intervenons quotidiennement. 
              Cliquez sur votre ville pour obtenir des informations détaillées et contacter votre artisan local.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsInfo.map(dept => {
              const citiesInDept = cityData.filter(c => c.dept === dept.code);
              
              if (citiesInDept.length === 0) return null; // Don't show empty departments yet
              
              return (
                <div key={dept.code} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-700/50">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {dept.code} - {dept.name}
                    </h3>
                    {dept.priority && (
                      <span className="text-[10px] bg-brand-accent text-white/20 text-brand-accent font-bold px-2 py-1 rounded-md uppercase">
                        QG
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {citiesInDept.map(city => (
                      <li key={city.name}>
                        <Link 
                          href={`/serrurier/${city.dept}/${city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}
                          className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-brand-accent group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-brand-accent text-white mr-2 transition-colors" />
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-t border-zinc-200 dark:border-zinc-700 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent text-white/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            Votre ville ne figure pas dans la liste ?
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Nous intervenons également dans les petites communes alentours. 
            N&apos;hésitez pas à nous appeler directement pour vérifier notre disponibilité.
          </p>
          <a 
            href="tel:0299000000" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold bg-brand-gold text-white hover:bg-brand-accent text-white transition-all shadow-xl shadow-primary/20"
          >
            <span className="text-xl">📞</span> 02 99 00 00 00
          </a>
        </div>
      </section>
    </main>
  );
}
