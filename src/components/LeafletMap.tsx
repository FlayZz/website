'use client';

import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// 3 Zones principales
const zones = [
  // Zone 1: Rennes + Agglo - 30min (jaune/or)
  {
    id: 'rennes-30min',
    name: "Zone prioritaire",
    bounds: [[47.95, -1.85], [48.28, -1.45]] as [[number, number], [number, number]],
    color: '#d4a853',
    fillColor: '#d4a853',
    fillOpacity: 0.25,
    weight: 3,
    dashArray: undefined,
    label: 'Intervention sous 30 min'
  },
  // Zone 2: Bretagne (35+29+22+56)
  {
    id: 'bretagne',
    name: "Bretagne",
    bounds: [[47.3, -5.5], [48.9, -1.8]] as [[number, number], [number, number]],
    color: '#1e3a5f',
    fillColor: '#1e3a5f',
    fillOpacity: 0.08,
    weight: 2,
    dashArray: '10, 10',
    label: 'Intervention Bretagne'
  },
  // Zone 3: Limitrophes (44+53)
  {
    id: 'limitrophes',
    name: "Départements limitrophes",
    bounds: [[46.5, -3], [49, 1.5]] as [[number, number], [number, number]],
    color: '#94a3b8',
    fillColor: '#94a3b8',
    fillOpacity: 0.03,
    weight: 1,
    dashArray: '5, 5',
    label: 'Sur demande'
  }
];

// Villes avec pins
const cities = [
  { name: 'Rennes', coords: [48.1173, -1.6778] as [number, number], type: 'principal' },
  { name: 'Brest', coords: [48.3905, -4.4861] as [number, number], type: 'ville' },
  { name: 'Quimper', coords: [47.9960, -4.1024] as [number, number], type: 'ville' },
  { name: 'Vannes', coords: [47.6585, -2.7605] as [number, number], type: 'ville' },
  { name: 'Laval', coords: [48.0715, -0.7602] as [number, number], type: 'ville' },
  { name: 'Saint-Malo', coords: [48.6493, -2.0269] as [number, number], type: 'ville' },
  { name: 'Lorient', coords: [47.7324, -3.3634] as [number, number], type: 'ville' },
  { name: 'Saint-Brieuc', coords: [48.5138, -2.7560] as [number, number], type: 'ville' },
];

// Custom pin marker - bleu marine
const createPinIcon = (type: string) => {
  const color = type === 'principal' ? '#d4a853' : '#1e3a5f';
  const size = type === 'principal' ? 32 : 26;
  return L.divIcon({
    className: 'custom-pin',
    html: `
      <div style="width: ${size}px; height: ${size}px; position: relative;">
        <svg viewBox="0 0 24 24" fill="none" style="width:100%;height:100%;">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}"/>
          <circle cx="12" cy="9" r="4" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
  });
};

export default function LeafletMap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#d4a853' }}></div>
      </div>
    );
  }

  // Centre Bretagne
  const center: [number, number] = [48.0, -2.5];

  return (
    <MapContainer 
      center={center} 
      zoom={8} 
      style={{ height: '100%', width: '100%' }} 
      scrollWheelZoom={false}
    >
      <TileLayer 
        attribution='&copy; OpenStreetMap' 
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" 
      />
      
      {/* Zone 3 - Limitrophes (gris) */}
      <Rectangle
        bounds={zones[2].bounds}
        pathOptions={{
          color: zones[2].color,
          fillColor: zones[2].fillColor,
          fillOpacity: zones[2].fillOpacity,
          weight: zones[2].weight,
          dashArray: zones[2].dashArray,
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', padding: '5px', minWidth: '120px' }}>
            <strong style={{ color: '#64748b', fontSize: '13px' }}>{zones[2].name}</strong>
            <p style={{ fontSize: '11px', marginTop: '3px', color: '#94a3b8' }}>{zones[2].label}</p>
          </div>
        </Popup>
      </Rectangle>

      {/* Zone 2 - Bretagne (bleu) */}
      <Rectangle
        bounds={zones[1].bounds}
        pathOptions={{
          color: zones[1].color,
          fillColor: zones[1].fillColor,
          fillOpacity: zones[1].fillOpacity,
          weight: zones[1].weight,
          dashArray: zones[1].dashArray,
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', padding: '5px', minWidth: '120px' }}>
            <strong style={{ color: '#1e3a5f', fontSize: '14px' }}>{zones[1].name}</strong>
            <p style={{ fontSize: '12px', marginTop: '3px', color: '#1e3a5f' }}>{zones[1].label}</p>
          </div>
        </Popup>
      </Rectangle>

      {/* Zone 1 - Rennes 30min (or) */}
      <Rectangle
        bounds={zones[0].bounds}
        pathOptions={{
          color: zones[0].color,
          fillColor: zones[0].fillColor,
          fillOpacity: zones[0].fillOpacity,
          weight: zones[0].weight,
          dashArray: zones[0].dashArray,
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', padding: '5px', minWidth: '140px' }}>
            <strong style={{ color: '#d4a853', fontSize: '14px' }}>{zones[0].name}</strong>
            <p style={{ fontSize: '12px', marginTop: '3px', color: '#1e3a5f', fontWeight: 'bold' }}>{zones[0].label}</p>
          </div>
        </Popup>
      </Rectangle>

      {/* Pins villes */}
      {cities.map((city) => (
        <Marker 
          key={city.name} 
          position={city.coords} 
          icon={createPinIcon(city.type)}
        >
          <Popup>
            <div style={{ textAlign: 'center', padding: '3px', minWidth: '100px' }}>
              <strong style={{ color: city.type === 'principal' ? '#d4a853' : '#1e3a5f', fontSize: '14px' }}>
                {city.name}
              </strong>
              {city.type === 'principal' && (
                <p style={{ fontSize: '10px', marginTop: '2px', color: '#d4a853' }}>Base</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
