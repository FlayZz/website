'use client';

import { MapContainer, TileLayer, Marker, Circle, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Départements Bretagne (polygones approximatifs)
const departmentPolygons = {
  // Ille-et-Vilaine (35) - Zone prioritaire
  '35': {
    coords: [
      [48.35, -1.8], [48.4, -1.5], [48.45, -1.2], [48.5, -0.9], [48.4, -0.5], 
      [48.2, -0.3], [48.0, -0.5], [47.9, -1.0], [47.85, -1.5], [47.9, -2.0], [48.1, -2.2], [48.35, -1.8]
    ],
    name: "Ille-et-Vilaine",
    priority: true
  },
  // Finistère (29)
  '29': {
    coords: [
      [48.75, -4.5], [48.8, -4.0], [48.7, -3.5], [48.55, -3.0], [48.4, -2.8], 
      [48.2, -3.0], [47.9, -3.5], [47.8, -4.0], [47.85, -4.5], [48.0, -4.8], 
      [48.3, -5.0], [48.6, -4.8], [48.75, -4.5]
    ],
    name: "Finistère",
    priority: false
  },
  // Côtes-d'Armor (22)
  '22': {
    coords: [
      [48.75, -3.0], [48.8, -2.5], [48.7, -2.0], [48.55, -1.5], [48.4, -1.2], 
      [48.2, -1.5], [48.0, -2.0], [47.85, -2.5], [47.9, -3.0], [48.1, -3.2], 
      [48.4, -3.2], [48.6, -3.0], [48.75, -3.0]
    ],
    name: "Côtes-d'Armor",
    priority: false
  },
  // Morbihan (56)
  '56': {
    coords: [
      [47.9, -3.0], [47.85, -2.5], [47.8, -2.0], [47.75, -1.5], [47.9, -1.0], 
      [48.0, -0.5], [48.1, -0.3], [47.9, -0.2], [47.7, -0.5], [47.5, -1.0], 
      [47.4, -1.5], [47.5, -2.5], [47.7, -3.0], [47.9, -3.0]
    ],
    name: "Morbihan",
    priority: false
  },
  // Loire-Atlantique (44) - Limitrophe
  '44': {
    coords: [
      [47.5, -2.5], [47.4, -2.0], [47.3, -1.5], [47.2, -1.0], [47.1, -0.5], 
      [47.0, 0.0], [47.1, 0.5], [47.2, 1.0], [47.3, 1.5], [47.5, 2.0], 
      [47.7, 2.2], [47.8, 1.5], [47.7, 1.0], [47.6, 0.5], [47.5, 0.0], [47.5, -0.5], [47.5, -2.5]
    ],
    name: "Loire-Atlantique",
    priority: false
  },
  // Mayenne (53) - Limitrophe
  '53': {
    coords: [
      [48.5, -0.5], [48.45, 0.0], [48.4, 0.5], [48.35, 1.0], [48.2, 1.3], 
      [48.0, 1.0], [47.8, 0.5], [47.7, 0.0], [47.75, -0.5], [47.9, -0.5], 
      [48.1, -0.5], [48.3, -0.5], [48.5, -0.5]
    ],
    name: "Mayenne",
    priority: false
  }
};

// Marqueurs villes
const cities = [
  { name: 'Rennes', coords: [48.1173, -1.6778], priority: true },
  { name: 'Cesson-Sévigné', coords: [48.1205, -1.6031], priority: false },
  { name: 'Saint-Malo', coords: [48.6493, -2.0269], priority: false },
  { name: 'Brest', coords: [48.3905, -4.4861], priority: false },
];

// Icône marqueur
const createMarkerIcon = (priority: boolean) => {
  const color = priority ? '#d4a853' : '#1e3a5f';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="width: 30px; height: 40px; position: relative;">
        <svg viewBox="0 0 24 24" fill="none" style="width:100%;height:100%;">
          <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z" fill="${color}"/>
          <circle cx="12" cy="8" r="4" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });
};

export default function LeafletMap() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#d4a853' }}></div>
          <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  const rennesCenter: [number, number] = [48.1173, -1.6778];

  return (
    <MapContainer
      center={rennesCenter}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      {/* OpenStreetMap France */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
      />
      
      {/* Départements Bretagne - Délai connu */}
      {['35', '29', '22', '56'].map((code) => {
        const dept = departmentPolygons[code as keyof typeof departmentPolygons];
        return (
          <Polygon
            key={code}
            positions={dept.coords}
            pathOptions={{
              color: code === '35' ? '#d4a853' : '#1e3a5f',
              fillColor: code === '35' ? '#d4a853' : '#1e3a5f',
              fillOpacity: code === '35' ? 0.15 : 0.08,
              weight: code === '35' ? 3 : 2,
              dashArray: code === '35' ? undefined : '5, 5',
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '5px', minWidth: '120px' }}>
                <strong style={{ color: '#1e3a5f', fontSize: '14px' }}>{code} - {dept.name}</strong>
                <p style={{ fontSize: '12px', marginTop: '5px', color: code === '35' ? '#d4a853' : '#666' }}>
                  {code === '35' ? '⏱️ Intervention sous 30 min' : '🌊 Bretagne - Intervention rapide'}
                </p>
              </div>
            </Popup>
          </Polygon>
        );
      })}

      {/* Départements limitrophes */}
      {['44', '53'].map((code) => {
        const dept = departmentPolygons[code as keyof typeof departmentPolygons];
        return (
          <Polygon
            key={code}
            positions={dept.coords}
            pathOptions={{
              color: '#94a3b8',
              fillColor: '#94a3b8',
              fillOpacity: 0.03,
              weight: 1,
              dashArray: '3, 3',
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '5px' }}>
                <strong style={{ color: '#64748b', fontSize: '13px' }}>{code} - {dept.name}</strong>
                <p style={{ fontSize: '11px', marginTop: '3px', color: '#94a3b8' }}>Zone d'intervention</p>
              </div>
            </Popup>
          </Polygon>
        );
      })}

      {/* Cercle 30min autour de Rennes */}
      <Circle
        center={rennesCenter}
        radius={15000}
        pathOptions={{
          color: '#d4a853',
          fillColor: '#d4a853',
          fillOpacity: 0.25,
          weight: 3,
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', padding: '5px' }}>
            <strong style={{ color: '#d4a853', fontSize: '14px' }}>Zone prioritaire</strong>
            <p style={{ fontSize: '12px', marginTop: '5px', color: '#1e3a5f' }}>Intervention sous 30 min</p>
          </div>
        </Popup>
      </Circle>

      {/* Marqueurs villes */}
      {cities.map((city) => (
        <Marker 
          key={city.name} 
          position={city.coords as [number, number]}
          icon={createMarkerIcon(city.priority)}
        >
          <Popup>
            <div style={{ textAlign: 'center', minWidth: '120px' }}>
              <strong style={{ color: city.priority ? '#d4a853' : '#1e3a5f', fontSize: '14px' }}>{city.name}</strong>
              {city.priority && <p style={{ fontSize: '11px', marginTop: '5px', color: '#d4a853' }}>Base principale</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
