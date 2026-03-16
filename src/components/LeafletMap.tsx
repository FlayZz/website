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
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1e3a5f' }}></div>
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  // Rennes center coordinates
  const rennesCenter: [number, number] = [48.1173, -1.6778];
  
  // Zone radius in meters (15km for Rennes metropolitan area)
  const zoneRadius = 15000;

  return (
    <MapContainer
      center={rennesCenter}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      {/* CartoDB Positron neutral gray tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Custom marker with SVG */}
      <Marker position={rennesCenter}>
        <Popup>
          <div className="text-center p-2">
            <strong className="text-lg" style={{ color: '#1e3a5f' }}>SerruAccess</strong>
            <p className="text-sm text-gray-600">Serrurier Rennes</p>
            <p className="text-xs text-gray-500">15 Rue de la Motte, 35000 Rennes</p>
          </div>
        </Popup>
      </Marker>
      
      {/* Intervention zone circle */}
      <Circle
        center={rennesCenter}
        radius={zoneRadius}
        pathOptions={{
          color: '#1e3a5f',
          fillColor: '#1e3a5f',
          fillOpacity: 0.1,
          weight: 2,
          dashArray: '5, 10'
        }}
      />
    </MapContainer>
  );
}
