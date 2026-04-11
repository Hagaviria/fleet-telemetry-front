import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeVehicleLocal, setSelectedVehicle } from "../../../app/store/fleetSlice";
import { useFleetSocket } from "../../../shared/hooks/useFleetSocket";
import {
  DashboardTopBar,
  FleetMapView,
  FleetSidePanel,
} from "../../../shared/ui/organisms";
import { deleteVehicleRemote } from "../services/fleetApi";
import { useFleetDashboardSync } from "../hooks/useFleetDashboardSync";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const fleet = useSelector((s) => s.fleet);

  useFleetSocket(true);
  useFleetDashboardSync(dispatch);

  const handleDeleteVehicle = useCallback(
    async (id) => {
      try {
        await deleteVehicleRemote(id);
        dispatch(removeVehicleLocal(id));
      } catch {
        window.alert("No se pudo eliminar el vehículo");
      }
    },
    [dispatch],
  );

  const handleSelectVehicle = useCallback(
    (id) => {
      dispatch(setSelectedVehicle(id));
    },
    [dispatch],
  );

  return (
    <div className="app-shell">
      <DashboardTopBar
        wsConnected={fleet.wsConnected}
        circuit={fleet.circuit}
      />
      <div className="layout">
        <FleetSidePanel
          vehicles={fleet.vehiclesById}
          order={fleet.vehicleOrder}
          alerts={fleet.alerts}
          selectedVehicleId={fleet.selectedVehicleId}
          onSelectVehicle={handleSelectVehicle}
          onDeleteVehicle={handleDeleteVehicle}
        />
        <FleetMapView
          vehicles={fleet.vehiclesById}
          selectedVehicleId={fleet.selectedVehicleId}
          onSelectVehicle={handleSelectVehicle}
        />
      </div>
    </div>
  );
}
