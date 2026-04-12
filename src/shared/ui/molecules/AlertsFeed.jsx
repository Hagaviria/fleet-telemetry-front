export default function AlertsFeed({
  alerts,
  vehiclesById,
  maxVisible = 6,
  emptyLabel,
}) {
  const resolveName = (alert) => {
    if (alert.vehicle_name) return alert.vehicle_name;
    const v = vehiclesById?.[alert.vehicle_id];
    return v?.name || v?.vehicle_id || alert.vehicle_id;
  };

  const formatCoords = (a) => {
    const lat = a.lat;
    const lng = a.lng;
    if (typeof lat !== "number" || typeof lng !== "number") return null;
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  };

  return (
    <div className="alerts-strip">
      <strong>Alertas recientes</strong>

      {alerts.length === 0 ? (
        <div>{emptyLabel}</div>
      ) : (
        alerts.slice(0, maxVisible).map((a) => (
          <div key={`${a.id}-${a.created_at}`} className="alerts-feed-row">
            <span className="alerts-feed-name">{resolveName(a)}</span>
            <span className="alerts-feed-msg">{a.message}</span>
            {formatCoords(a) ? (
              <span
                className="alerts-feed-coords"
                title="Coordenadas donde quedó detenido"
              >
                {formatCoords(a)}
              </span>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}
