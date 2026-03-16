'use client';

import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Simple marker icon
const createMarkerIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 30px;
        height: 40px;
        position: relative;
      ">
        <svg viewBox="0 0 24 24" fill="none" style="width:100%;height:100%;">
          <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z" fill="#d4a853"/>
          <circle cx="12" cy="8" r="4" fill="#1e3a5f"/>
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
      <div className="h-full w-full flex items-center justify-center" 
        style={{ backgroundColor: 'var(--muted)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#d4a853' }}></div>
          <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  // Rennes center
  const rennesCenter: [number, number] = [48.1173, -1.6778];

  return (
    <MapContainer
      center={rennesCenter}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      {/* OpenStreetMap en français */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
      />
      
      {/* Zone d'intervention - 15km autour de Rennes */}
      <Circle
        center={rennesCenter}
        radius={15000}
        pathOptions={{
          color: '#d4a853',
          fillColor: '#d4a853',
          fillOpacity: 0.2,
          weight: 2,
          dashArray: '8, 8',
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', padding: '5px' }}>
            <strong style={{ color: '#1e3a5f', fontSize: '14px' }}>Zone d&apos;intervention</strong>
            <p style={{ fontSize: '12px', margin: '5px 0 0' }}>Sous 30 minutes</p>
          </div>
        </Popup>
      </Circle>

      {/* Marqueur principal - Rennes */}
      <Marker position={rennesCenter} icon={createMarkerIcon()}>
        <Popup>
          <div style={{ textAlign: 'center', minWidth: '150px' }}>
            <strong style={{ color: '#1e3a5f', fontSize: '16px' }}>SerruAccess</strong>
            <p style={{ fontSize: '12px', margin: '5px 0', color: '#666' }}>15 Rue de la Motte</p>
            <p style={{ fontSize: '12px', margin: '5px 0', color: '#666' }}>35000 Rennes</p>
            <p style={{ fontSize: '11px', marginTop: '8px', color: '#d4a853', fontWeight: 'bold' }}>🕐 Intervention 24h/24</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
