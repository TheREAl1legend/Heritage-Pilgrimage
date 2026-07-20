// src/components/NearbyMap.jsx

import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const NearbyMap = ({ temple }) => {
  const latitude = temple.location?.latitude;
  const longitude = temple.location?.longitude;

  if (!latitude || !longitude) {
    return (
      <div className="p-6 text-red-500">
        Location not available
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden">
      <MapContainer
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        {/* Map Layer */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Temple Marker */}
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-center">
              <h2 className="font-bold text-lg">
                🛕 {temple.templeName}
              </h2>

              <p>
                {temple.city}, {temple.state}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default NearbyMap;