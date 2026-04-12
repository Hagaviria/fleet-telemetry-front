import {
  formatRelativeAge,
  isTelemetryStale,
} from "../../lib/telemetryFreshness";
import { GhostButton, StateBadge } from "../atoms";

export default function VehicleCard({ vehicle, selected, onSelect, onDelete }) {
  const id = vehicle.vehicle_id;
  const rawState = vehicle.state || "moving";
  const stale = isTelemetryStale(vehicle.last_seen);

  const displayState = stale && rawState !== "alert" ? "inactive" : rawState;
  const relative = formatRelativeAge(vehicle.last_seen);

  return (
    <article
      className={`vehicle-card ${selected ? "selected" : ""} ${stale ? "inactive-data" : ""}`.trim()}
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(id);
        }
      }}
    >
      <header>
        <span className="id">{vehicle.name || id}</span>
        <StateBadge state={displayState} />
      </header>
      <div className="coords">
        {vehicle.lat?.toFixed(5)}, {vehicle.lng?.toFixed(5)} ·{" "}
        {vehicle.last_seen
          ? new Date(vehicle.last_seen).toLocaleTimeString()
          : "—"}
        {relative ? ` · ${relative}` : ""}
      </div>
      {stale ? (
        <div className="vehicle-card-stale-hint">
          Última telemetría antigua; el mapa muestra la última posición
          conocida.
        </div>
      ) : null}
      {vehicle.alert_reason ? (
        <div className="coords" style={{ color: "var(--danger)" }}>
          {vehicle.alert_reason}
        </div>
      ) : null}
      <div onClick={(e) => e.stopPropagation()}>
        <GhostButton onClick={() => onDelete(id)}>Eliminar </GhostButton>
      </div>
    </article>
  );
}
