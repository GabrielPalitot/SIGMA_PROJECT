import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useLeaflet from "@/hooks/useLeaflet";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const initialPosition: [number, number] = [-23.55052, -46.633308];
const initialZoom = 10;

const createCustomIcon = (L: any) => {
  return new L.DivIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d32f2f" width="24px" height="24px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

function MapViewUpdater({
  position,
  zoom,
}: {
  position: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, zoom);
  }, [map, position, zoom]);

  return null;
}

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false },
);
const DynamicPopup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false },
);

export default function Map() {
  // Estado para a posição, inicializado com um valor default
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [customIcon, setCustomIcon] = useState<any>(null);
  const L = useLeaflet();
  console
  // Busca a posição do dispositivo no backend
  useEffect(() => {
    axios
      .get(`http://localhost:8500/iot-device/204276d4-fdc3-47c6-b4ee-36336b3bc9c3`)
      .then((response) => {
        console.log('entrei')
        // Supondo que a resposta contenha { lat, lng }
        const { latitude, longitude } = response.data;
        setPosition([latitude, longitude]);
        setZoom(16);
      })
      .catch((error) => {
        console.error("Erro ao buscar a localização do dispositivo", error);
      });
  }, []);

  useEffect(() => {
    if (L) {
      setCustomIcon(createCustomIcon(L));
    }
  }, [L]);

  return (
    <DynamicMapContainer
      key={`map-container-${position[0]}-${position[1]}`}
      center={position}
      zoom={zoom}
      style={{ width: "100%", height: "100vh" }}
    >
      <MapViewUpdater position={position} zoom={zoom} />
      <DynamicTileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />
      {customIcon && (
        <DynamicMarker position={position} icon={customIcon}>
          <DynamicPopup>📍SIGMA Sensor Location</DynamicPopup>
        </DynamicMarker>
      )}
    </DynamicMapContainer>
  );
}
