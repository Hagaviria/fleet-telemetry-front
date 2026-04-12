import {
  AlertsFeed,
  EmptyFleetState,
  SectionIntro,
  VehicleCard,
} from "../molecules";

export default function FleetSidePanel({
  vehicles,
  order,
  alerts,
  selectedVehicleId,
  onSelectVehicle,
  onDeleteVehicle,
}) {
  return (
    <aside className="side-panel">
      <SectionIntro
        title="Flota activa"
        description="Pulsa un vehículo para centrarlo en el mapa. Vuelve a pulsar para deseleccionar."
      />
      {!order.length ? (
        <div className="vehicle-list vehicle-list--empty">
          <EmptyFleetState message="Sin vehículos aún. Ejecuta el simulador del backend." />
        </div>
      ) : (
        <div className="vehicle-list">
          {order.map((id) => {
            const v = vehicles[id];
            if (!v) return null;
            return (
              <VehicleCard
                key={id}
                vehicle={v}
                selected={selectedVehicleId === id}
                onSelect={onSelectVehicle}
                onDelete={onDeleteVehicle}
              />
            );
          })}
        </div>
      )}
      <AlertsFeed
        alerts={alerts}
        vehiclesById={vehicles}
        maxVisible={8}
        emptyLabel="Sin alertas aún. Aparecen al detectar vehículo detenido (>1 min mismo punto) o al cargar historial del servidor."
      />
    </aside>
  );
}
