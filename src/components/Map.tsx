import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import type { Coords } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

export default function Map({ coords, onMapClick }: Props) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{
        width: "100%",
        height: "420px",
        borderRadius: "1.25rem",
        overflow: "hidden",
        boxShadow: "0 20px 45px rgba(15,23,42,0.8)",
        border: "1px solid rgba(148,163,184,0.35)",
      }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      <MapTileLayer />
      <TileLayer
        opacity={0.7}
        url={`https://maps.openweathermap.org/maps/2.0/weather/1h/precipitation/{z}/{x}/{y}?appid=${API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
}

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    if (!MAPTILER_API_KEY) return;

    const tileLayer = new MaptilerLayer({
      apiKey: MAPTILER_API_KEY,
      // colorful, legible base map that fits the UI
      style: "streets-v2",
    });

    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
}
