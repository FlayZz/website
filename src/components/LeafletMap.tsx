'use client';

import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Fix Leaflet SSR issue
export default function LeafletMap() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1e3a5f' }}></div>
          <p className="text-gray-500 dark:text-gray-400">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  // Rennes center coordinates
  const rennesCenter: [number, number] = [48.1173, -1.6778];
  
  // Zone radii in meters
  const rennesRadius = 15000; // 15km for Rennes metropolitan
  const brittanyRadius = 80000; // 80km for broader Brittany

  return (
    <MapContainer
      center={rennesCenter}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      {/* CartoDB Positron neutral gray tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Rennes metropolitan zone - Priority */}
      <Circle
        center={rennesCenter}
        radius={rennesRadius}
        pathOptions={{
          color: '#d4a853',
          fillColor: '#d4a853',
          fillOpacity: 0.2,
          weight: 3,
        }}
      >
        <Popup>
          <div className="text-center p-2">
            <strong className="text-lg" style={{ color: '#1e3a5f' }}>Zone Prioritaire</strong>
            <p className="text-sm">Intervention sous 30 minutes</p>
          </div>
        </Popup>
      </Circle>

      {/* Bretagne broader zone - Departments 35, 29, 22, 56 */}
      <Circle
        center={rennesCenter}
        radius={brittanyRadius}
        pathOptions={{
          color: '#1e3a5f',
          fillColor: '#1e3a5f',
          fillOpacity: 0.05,
          weight: 2,
          dashArray: '10, 10',
        }}
      >
        <Popup>
          <div className="text-center p-2">
            <strong style={{ color: '#1e3a5f' }}>Bretagne</strong>
            <p className="text-sm">Départements: 35, 29, 22, 56</p>
          </div>
        </Popup>
      </Circle>
      
      {/* Main marker on Rennes */}
      <Marker position={rennesCenter}>
        <Popup>
          <div className="text-center p-2">
            <strong className="text-lg" style={{ color: '#1e3a5f' }}>SerruAccess Rennes</strong>
            <p className="text-sm text-gray-600">15 Rue de la Motte, 35000 Rennes</p>
            <p className="text-xs text-gray-500 mt-1">Intervention sous 30 min</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
