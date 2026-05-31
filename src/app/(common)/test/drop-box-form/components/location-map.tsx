"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CALIFORNIA_VIEWBOX } from "@/lib/location/california-boundary";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type LocationMapProps = {
  latitude: number | null;
  longitude: number | null;
  onMapClick: (lat: number, lon: number) => void;
};

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapViewController({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude != null && longitude != null) {
      map.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude, map]);

  return null;
}

export function LocationMap({
  latitude,
  longitude,
  onMapClick,
}: LocationMapProps) {
  const centerLat = (CALIFORNIA_VIEWBOX.north + CALIFORNIA_VIEWBOX.south) / 2;
  const centerLon = (CALIFORNIA_VIEWBOX.east + CALIFORNIA_VIEWBOX.west) / 2;

  return (
    <MapContainer
      center={[centerLat, centerLon]}
      zoom={6}
      className="h-[400px] w-full rounded-md border"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      <MapViewController latitude={latitude} longitude={longitude} />
      {latitude != null && longitude != null && (
        <Marker position={[latitude, longitude]} icon={defaultIcon} />
      )}
    </MapContainer>
  );
}
