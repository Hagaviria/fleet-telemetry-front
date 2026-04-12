import { useEffect, useMemo, useRef } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { markerColorForState } from "../../lib/mapColors";
import { MapMetaOverlay } from "../molecules";

const CENTER_DEFAULT = [4.68, -74.06];
const FLY_ZOOM = 16;

function MapFlyToSelected({ selectedVehicleId, targetLatLng }) {
  const map = useMap();
  const lastFlownSelectionRef = useRef(null);

  useEffect(() => {
    if (!selectedVehicleId) {
      lastFlownSelectionRef.current = null;
      return;
    }
    if (
      !targetLatLng ||
      typeof targetLatLng[0] !== "number" ||
      typeof targetLatLng[1] !== "number" ||
      Number.isNaN(targetLatLng[0]) ||
      Number.isNaN(targetLatLng[1])
    ) {
      return;
    }
    if (lastFlownSelectionRef.current === selectedVehicleId) {
      return;
    }
    lastFlownSelectionRef.current = selectedVehicleId;
    map.flyTo(targetLatLng, FLY_ZOOM, { duration: 0.75 });
  }, [map, selectedVehicleId, targetLatLng]);

  return null;
}

/**
 * Mapa principal de la flota (organismo: layout + capa Leaflet + marcadores).
 */
export default function FleetMapView({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}) {
  const center = useMemo(() => {
    const list = Object.values(vehicles).filter((v) => v.lat && v.lng);
    if (!list.length) return CENTER_DEFAULT;
    const lat = list.reduce((a, v) => a + v.lat, 0) / list.length;
    const lng = list.reduce((a, v) => a + v.lng, 0) / list.length;
    return [lat, lng];
  }, [vehicles]);

  const flyTarget = useMemo(() => {
    if (!selectedVehicleId) return null;
    const v = vehicles[selectedVehicleId];
    if (!v || v.lat == null || v.lng == null) return null;
    return [v.lat, v.lng];
  }, [vehicles, selectedVehicleId]);

  const count = Object.keys(vehicles).length;

  return (
    <div className="map-wrap">
      <MapMetaOverlay>
        {count} unidades
        {selectedVehicleId
          ? ` · Enfoque: ${vehicles[selectedVehicleId]?.name || selectedVehicleId}`
          : ""}
        {" · "}
        OpenStreetMap
      </MapMetaOverlay>
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {flyTarget && selectedVehicleId ? (
          <MapFlyToSelected
            selectedVehicleId={selectedVehicleId}
            targetLatLng={flyTarget}
          />
        ) : null}
        {Object.values(vehicles).map((v) => {
          const color = markerColorForState(v.state);
          const selected = selectedVehicleId === v.vehicle_id;
          return (
            <CircleMarker
              key={v.vehicle_id}
              center={[v.lat, v.lng]}
              radius={selected ? 14 : 9}
              pathOptions={{
                color: selected ? "#fff" : color,
                fillColor: color,
                fillOpacity: 0.9,
                weight: selected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onSelectVehicle?.(v.vehicle_id),
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                <div style={{ fontSize: 12 }}>
                  <strong>{v.name || v.vehicle_id}</strong>
                  <div>{v.state}</div>
                  <div style={{ opacity: 0.8 }}>Clic para seleccionar</div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
