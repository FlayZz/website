'use client';

import { MapContainer, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Simplified department polygons (approximate coordinates)
const departmentPolygons: { [key: string]: [number, number][] } = {
  // Ille-et-Vilaine (35) - Priority GOLD
  '35': [
    [48.35, -1.8], [48.4, -1.5], [48.45, -1.2], [48.5, -0.9], [48.4, -0.5], 
    [48.2, -0.3], [48.0, -0.5], [47.9, -1.0], [47.85, -1.5], [47.9, -2.0], 
    [48.1, -2.2], [48.35, -1.8]
  ],
  // Finistère (29) - BLUE
  '29': [
    [48.75, -4.5], [48.8, -4.0], [48.7, -3.5], [48.55, -3.0], [48.4, -2.8], 
    [48.2, -3.0], [47.9, -3.5], [47.8, -4.0], [47.85, -4.5], [48.0, -4.8], 
    [48.3, -5.0], [48.6, -4.8], [48.75, -4.5]
  ],
  // Côtes-d'Armor (22) - BLUE
  '22': [
    [48.75, -3.0], [48.8, -2.5], [48.7, -2.0], [48.55, -1.5], [48.4, -1.2], 
    [48.2, -1.5], [48.0, -2.0], [47.85, -2.5], [47.9, -3.0], [48.1, -3.2], 
    [48.4, -3.2], [48.6, -3.0], [48.75, -3.0]
  ],
  // Morbihan (56) - BLUE
  '56': [
    [47.9, -3.0], [47.85, -2.5], [47.8, -2.0], [47.75, -1.5], [47.9, -1.0], 
    [48.0, -0.5], [48.1, -0.3], [47.9, -0.2], [47.7, -0.5], [47.5, -1.0], 
    [47.4, -1.5], [47.5, -2.5], [47.7, -3.0], [47.9, -3.0]
  ],
  // Loire-Atlantique (44) - GRAY/BLUE
  '44': [
    [47.5, -2.5], [47.4, -2.0], [47.3, -1.5], [47.2, -1.0], [47.1, -0.5], 
    [47.0, 0.0], [47.1, 0.5], [47.2, 1.0], [47.3, 1.5], [47.5, 2.0], 
    [47.7, 2.2], [47.8, 1.5], [47.7, 1.0], [47.6, 0.5], [47.5, 0.0], 
    [47.5, -0.5], [47.5, -2.5]
  ],
  // Mayenne (53) - GRAY/BLUE
  '53': [
    [48.5, -0.5], [48.45, 0.0], [48.4, 0.5], [48.35, 1.0], [48.2, 1.3], 
    [48.0, 1.0], [47.8, 0.5], [47.7, 0.0], [47.75, -0.5], [47.9, -0.5], 
    [48.1, -0.5], [48.3, -0.5], [48.5, -0.5]
  ]
};

// City markers
const cityMarkers = [
  { name: 'Rennes', coords: [48.1173, -1.6778] as [number, number], priority: true },
  { name: 'Cesson-Sévigné', coords: [48.1205, -1.6031] as [number, number], priority: false },
  { name: 'Bruz', coords: [47.9962, -1.7489] as [number, number], priority: false },
  { name: 'Saint-Malo', coords: [48.6493, -2.0269] as [number, number], priority: false },
];

// Custom marker icon
const createMarkerIcon = (priority: boolean) => {
  const color = priority ? '#d4a853' : '#1e3a5f';
  const size = priority ? 30 : 24;
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
  });
};

export default function LeafletMap() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center" 
        style={{ backgroundColor: 'var(--muted)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1e3a5f' }}></div>
          <p style={{ color: 'var(--muted-foreground)' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  const rennesCenter: [number, number] = [48.1173, -1.6778];

  return (
    <MapContainer
      center={rennesCenter}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      {/* CartoDB Positron neutral gray tiles */}
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Priority Zone - Rennes (35) - GOLD 40% */}
      <Polygon
        positions={departmentPolygons['35']}
        pathOptions={{
          color: '#d4a853',
          fillColor: '#d4a853',
          fillOpacity: 0.4,
          weight: 3,
        }}
      >
        <Popup>
          <div className="text-center p-2">
            <strong className="text-lg" style={{ color: '#1e3a5f' }}>35 - Ille-et-Vilaine</strong>
            <p style={{ fontSize: '12px' }}>Zone prioritaire - Intervention sous 30 min</p>
          </div>
        </Popup>
      </Polygon>

      {/* Bretagne Departments - BLUE 20% */}
      {['29', '22', '56'].map((dept) => (
        <Polygon
          key={dept}
          positions={departmentPolygons[dept]}
          pathOptions={{
            color: '#1e3a5f',
            fillColor: '#1e3a5f',
            fillOpacity: 0.2,
            weight: 2,
            dashArray: '5, 5',
          }}
        >
          <Popup>
            <div className="text-center p-2">
              <strong style={{ color: '#1e3a5f' }}>Département {dept}</strong>
              <p style={{ fontSize: '12px' }}>Intervention rapide en Bretagne</p>
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Limitrophe Departments - GRAY/BLUE 15% */}
      {['44', '53'].map((dept) => (
        <Polygon
          key={dept}
          positions={departmentPolygons[dept]}
          pathOptions={{
            color: '#94a3b8',
            fillColor: '#94a3b8',
            fillOpacity: 0.15,
            weight: 1,
            dashArray: '3, 3',
          }}
        >
          <Popup>
            <div className="text-center p-2">
              <strong style={{ color: '#64748b' }}>Département {dept}</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Zone d&apos;intervention</p>
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* City Markers */}
      {cityMarkers.map((city) => (
        <Marker 
          key={city.name} 
          position={city.coords}
          icon={createMarkerIcon(city.priority)}
        >
          <Popup>
            <div className="text-center p-1">
              <strong className={city.priority ? '' : ''} style={{ color: city.priority ? '#d4a853' : '#1e3a5f' }}>
                {city.name}
              </strong>
              {city.priority && <p style={{ fontSize: '10px', color: '#d4a853' }}>Zone prioritaire</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
