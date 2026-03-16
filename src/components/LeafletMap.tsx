'use client';

import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Départements avec bounds réels [sud-ouest, nord-est]
const departments = [
  { 
    code: '35', 
    name: 'Ille-et-Vilaine', 
    bounds: [[47.8, -2.3], [48.5, -0.9]], 
    priority: true,
    color: '#d4a853'
  },
  { 
    code: '29', 
    name: 'Finistère', 
    bounds: [[47.7, -5.1], [48.8, -3.3]], 
    priority: false,
    color: '#1e3a5f'
  },
  { 
    code: '22', 
    name: "Côtes-d'Armor", 
    bounds: [[47.7, -3.2], [48.75, -2.0]], 
    priority: false,
    color: '#1e3a5f'
  },
  { 
    code: '56', 
    name: 'Morbihan', 
    bounds: [[47.6, -3.1], [48.1, -2.4]], 
    priority: false,
    color: '#1e3a5f'
  },
  { 
    code: '44', 
    name: 'Loire-Atlantique', 
    bounds: [[46.9, -2.5], [47.8, -1.3]], 
    priority: false,
    color: '#94a3b8'
  },
  { 
    code: '53', 
    name: 'Mayenne', 
    bounds: [[47.7, -0.6], [48.5, 0.4]], 
    priority: false,
    color: '#94a3b8'
  },
];

const cities = [
  { name: 'Rennes', coords: [48.1173, -1.6778] as [number, number], type: 'principal' },
  { name: 'Saint-Malo', coords: [48.6493, -2.0269] as [number, number], type: 'ville' },
  { name: 'Brest', coords: [48.3905, -4.4861] as [number, number], type: 'ville' },
  { name: 'Quimper', coords: [47.9960, -4.1024] as [number, number], type: 'ville' },
  { name: 'Vannes', coords: [47.6585, -2.7605] as [number, number], type: 'ville' },
  { name: 'Laval', coords: [48.0715, -0.7602] as [number, number], type: 'ville' },
];

const createMarkerIcon = (type: string) => {
  const color = type === 'principal' ? '#d4a853' : '#1e3a5f';
  const size = type === 'principal' ? 35 : 28;
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="width: ${size}px; height: ${size}px;">
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#d4a853' }}></div>
        </div>
      </div>
    );
  }

  return (
    <MapContainer center={[48.2, -2.5]} zoom={8} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
      
      {/* Départements */}
      {departments.map((dept) => (
        <Rectangle
          key={dept.code}
          bounds={dept.bounds}
          pathOptions={{
            color: dept.color,
            fillColor: dept.color,
            fillOpacity: dept.priority ? 0.25 : 0.08,
            weight: dept.priority ? 3 : 2,
            dashArray: dept.priority ? undefined : '8, 8',
          }}
        >
          <Popup>
            <div style={{ textAlign: 'center', padding: '5px', minWidth: '130px' }}>
              <strong style={{ color: '#1e3a5f', fontSize: '14px' }}>{dept.code} - {dept.name}</strong>
              <p style={{ fontSize: '12px', marginTop: '5px', color: dept.priority ? '#d4a853' : '#666' }}>
                {dept.priority ? '⏱️ Intervention sous 30 min' : '🌊 Intervention rapide'}
              </p>
            </div>
          </Popup>
        </Rectangle>
      ))}

      {/* Rennes - Marqueur principal */}
      <Marker position={[48.1173, -1.6778]} icon={createMarkerIcon('principal')}>
        <Popup>
          <div style={{ textAlign: 'center', minWidth: '140px' }}>
            <strong style={{ color: '#d4a853', fontSize: '16px' }}>SerruAccess</strong>
            <p style={{ fontSize: '12px', color: '#1e3a5f', marginTop: '3px' }}>15 Rue de la Motte, Rennes</p>
            <p style={{ fontSize: '11px', color: '#d4a853', fontWeight: 'bold', marginTop: '5px' }}>⏱️ 24h/24 - 7j/7</p>
          </div>
        </Popup>
      </Marker>

      {/* Autres villes */}
      {cities.filter(c => c.type !== 'principal').map((city) => (
        <Marker key={city.name} position={city.coords} icon={createMarkerIcon('ville')}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '3px' }}>
              <strong style={{ color: '#1e3a5f', fontSize: '13px' }}>{city.name}</strong>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
