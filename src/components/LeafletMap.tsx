'use client';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default marker icons
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const cities = [
  { name: 'Rennes', pos: [48.1173, -1.6778], departement: '35' },
  { name: 'Brest', pos: [48.3904, -4.4861], departement: '29' },
  { name: 'Quimper', pos: [47.9973, -4.0984], departement: '29' },
  { name: 'Vannes', pos: [47.6571, -2.7602], departement: '56' },
  { name: 'Lorient', pos: [47.7489, -3.3669], departement: '56' },
  { name: 'Saint-Malo', pos: [48.6497, -2.0254], departement: '35' },
  { name: 'Laval', pos: [48.0733, -0.7686], departement: '53' },
  { name: 'Nantes', pos: [47.2184, -1.5536], departement: '44' },
];

const GEOJSON_URLS = {
  '35': 'https://france-geojson.gregoiredavid.fr/repo/departements/35-ille-et-vilaine.geojson',
  '29': 'https://france-geojson.gregoiredavid.fr/repo/departements/29-finistere.geojson',
  '22': 'https://france-geojson.gregoiredavid.fr/repo/departements/22-cotes-d-armor.geojson',
  '56': 'https://france-geojson.gregoiredavid.fr/repo/departements/56-morbihan.geojson',
  '44': 'https://france-geojson.gregoiredavid.fr/repo/departements/44-loire-atlantique.geojson',
  '53': 'https://france-geojson.gregoiredavid.fr/repo/departements/53-mayenne.geojson',
};

export default function LeafletMap() {
  const [geoData, setGeoData] = useState<any>(null);
  const position: [number, number] = [48.1173, -1.6778]; // Rennes

  useEffect(() => {
    fetch('/departments.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(e => console.error('Failed to load local GeoJSON', e));
  }, []);

  const getStyle = (feature: any) => {
    const code = feature.properties?.code;
    return {
      fillColor: code === '35' ? '#d4a853' : '#1e3a5f',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: code === '35' ? 0.35 : 0.15
    };
  };

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
      {/* Overlay Button */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <a 
          href="tel:0299000000"
          className="bg-brand-accent text-white hover:bg-brand-accent-hover text-brand-gold font-bold py-2 px-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 text-sm"
        >
          <span>📞</span> 02 99 00 00 00
        </a>
      </div>

      <MapContainer 
        center={position} 
        zoom={8} 
        scrollWheelZoom={false} 
        className="w-full h-full grayscale-[0.2] dark:invert-[0.9] dark:hue-rotate-180"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={getStyle}
          />
        )}

        {cities.map((city, idx) => (
          <Marker key={idx} position={city.pos as [number, number]} icon={icon}>
            <Popup className="premium-popup">
              <div className="p-2">
                <strong className="text-brand-gold block mb-1">{city.name} ({city.departement})</strong>
                <p className="text-xs m-0">Intervention Rapide 24h/24</p>
                <a href={`/serrurier/${city.departement}/${city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="text-brand-accent font-bold text-xs mt-2 block hover:underline">Voir les tarifs localisés</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}