'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const position: [number, number] = [48.1173, -1.6778]; // Rennes center

  return (
    <MapContainer
      center={position}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className="text-center">
            <strong className="block text-pro-blue">SerruAccess</strong>
            <span>Rennes et environs</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
