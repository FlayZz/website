'use client';

import { MapContainer, TileLayer, Marker, Circle, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Department coordinates for polygons
const departmentPolygons: { [key: string]: [number, number][] } = {
  // Ille-et-Vilaine (35) - Priority - RED/GOLD
  '35': [
    [48.35, -1.8], [48.4, -1.5], [48.45, -1.2], [48.5, -0.9], [48.4, -0.5], [48.2, -0.3], [48.0, -0.5], [47.9, -1.0], [47.85, -1.5], [47.9, -2.0], [48.1, -2.2], [48.35, -1.8]
  ],
  // Finistère (29) - BLUE
  '29': [
    [48.75, -4.5], [48.8, -4.0], [48.7, -3.5], [48.55, -3.0], [48.4, -2.8], [48.2, -3.0], [47.9, -3.5], [47.8, -4.0], [47.85, -4.5], [48.0, -4.8], [48.3, -5.0], [48.6, -4.8], [48.75, -4.5]
  ],
  // Côtes-d'Armor (22) - BLUE  
  '22': [
    [48.75, -3.0], [48.8, -2.5], [48.7, -2.0], [48.55, -1.5], [48.4, -1.2], [48.2, -1.5], [48.0, -2.0], [47.85, -2.5], [47.9, -3.0], [48.1, -3.2], [48.4, -3.2], [48.6, -3.0], [48.75, -3.0]
  ],
  // Morbihan (56) - BLUE
  '56': [
    [47.9, -3.0], [47.85, -2.5], [47.8, -2.0], [47.75, -1.5], [47.9, -1.0], [48.0, -0.5], [48.1, -0.3], [47.9, -0.2], [47.7, -0.5], [47.5, -1.0], [47.4, -1.5], [47.5, -2.5], [47.7, -3.0], [47.9, -3.0]
  ],
  // Loire-Atlantique (44) - GRAY
  '44': [
    [47.5, -2.5], [47.4, -2.0], [47.3, -1.5], [47.2, -1.0], [47.1, -0.5], [47.0, 0.0], [47.1, 0.5], [47.2, 1.0], [47.3, 1.5], [47.5, 2.0], [47.7, 2.2], [47.8, 1.5], [47.7, 1.0], [47.6, 0.5], [47.5, 0.0], [47.5, -0.5], [47.5, -2.5]
  ],
  // Mayenne (53) - GRAY
  '53': [
    [48.5, -0.5], [48.45, 0.0], [48.4, 0.5], [48.35, 1.0], [48.2, 1.3], [48.0, 1.0], [47.8, 0.5], [47.7, 0.0], [47.75, -0.5], [47.9, -0.5], [48.1, -0.5], [48.3, -0.5], [48.5, -0.5]
  ]
};

// City markers
const cityMarkers = [
  { name: 'Rennes', coords: [48.1173, -1.6778] as [number, number], priority: true },
  { name: 'Cesson-Sévigné', coords: [48.1205, -1.6031] as [number, number], priority: false },
  { name: 'Bruz', coords: [47.9962, -1.7489] as [number, number], priority: false },
  { name: 'Saint-Malo', coords: [48.6493, -2.0269] as [number, number], priority: false },
  { name: 'Fougères', coords: [48.3537, -1.1999] as [number, number], priority: false },
  { name: 'Vitré', coords: [48.1233, -1.2108] as [number, number], priority: false },
  { name: 'Laval', coords: [48.0715, -0.7602] as [number, number], priority: false },
  { name: 'Nantes', coords: [47.2184, -1.5536] as [number, number], priority: false },
  { name: 'Saint-Nazaire', coords: [47.2643, -2.1881] as [number, number], priority: false },
];

// Custom marker icon
const createMarkerIcon = (priority: boolean) => {
  const color = priority ? '#d4a853' : '#1e3a5f';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Fix Leaflet SSR issue
export default function LeafletMap() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1e3a5f' }}></div>
          <p className="text-slate-500 dark:text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  // Rennes center
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
      
      {/* Priority Zone - Rennes (35) - RED/GOLD */}
      <Polygon
        positions={departmentPolygons['35']}
        pathOptions={{
          color: '#d4a853',
          fillColor: '#d4a853',
          fillOpacity: 0.25,
          weight: 3,
        }}
      >
        <Popup>
          <div className="text-center p-2">
            <strong className="text-lg text-[#1e3a5f]">35 - Ille-et-Vilaine</strong>
            <p className="text-sm">Zone prioritaire - Intervention sous 30 min</p>
          </div>
        </Popup>
      </Polygon>

      {/* Bretagne Departments - BLUE */}
      {['29', '22', '56'].map((dept) => (
        <Polygon
          key={dept}
          positions={departmentPolygons[dept]}
          pathOptions={{
            color: '#1e3a5f',
            fillColor: '#1e3a5f',
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '5, 5',
          }}
        >
          <Popup>
            <div className="text-center p-2">
              <strong className="text-[#1e3a5f]">Département {dept}</strong>
              <p className="text-sm">Intervention rapide en Bretagne</p>
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Limitrophe Departments - GRAY */}
      {['44', '53'].map((dept) => (
        <Polygon
          key={dept}
          positions={departmentPolygons[dept]}
          pathOptions={{
            color: '#94a3b8',
            fillColor: '#94a3b8',
            fillOpacity: 0.05,
            weight: 1,
            dashArray: '3, 3',
          }}
        >
          <Popup>
            <div className="text-center p-2">
              <strong className="text-slate-600">Département {dept}</strong>
              <p className="text-sm text-slate-500">Zone d'intervention</p>
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
              <strong className={city.priority ? 'text-[#d4a853]' : 'text-[#1e3a5f]'}>
                {city.name}
              </strong>
              {city.priority && <p className="text-xs text-[#d4a853]">Zone prioritaire</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
