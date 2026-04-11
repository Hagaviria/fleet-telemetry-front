import { useEffect } from "react";

import {
  setAlertsFromREST,
  setCircuit,
  setFromREST,
} from "../../../app/store/fleetSlice";
import {
  fetchAlerts,
  fetchCircuitDetail,
  fetchVehicles,
} from "../services/fleetApi";

export function useFleetDashboardSync(dispatch) {
  useEffect(() => {
    let cancelled = false;
    const pull = async () => {
      try {
        const data = await fetchVehicles();
        if (!cancelled) dispatch(setFromREST(data));
      } catch {
        if (!cancelled) dispatch(setFromREST([]));
      }
      try {
        const alerts = await fetchAlerts();
        if (!cancelled) dispatch(setAlertsFromREST(alerts));
      } catch {
        /* mantener alertas en store si GET /alerts falla */
      }
    };
    pull();
    const t = setInterval(pull, 15_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [dispatch]);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const c = await fetchCircuitDetail();
      if (!cancelled && c) dispatch(setCircuit(c));
    };
    tick();
    const t = setInterval(tick, 20_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [dispatch]);
}
