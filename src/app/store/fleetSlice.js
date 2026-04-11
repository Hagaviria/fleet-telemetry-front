import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehiclesById: {},
  vehicleOrder: [],
  alerts: [],
  selectedVehicleId: null,
  wsConnected: false,
  lastError: null,
  circuit: null,
};

function upsertVehicle(state, snap) {
  const id = snap.vehicle_id;
  if (!state.vehiclesById[id]) {
    state.vehicleOrder.push(id);
  }
  state.vehiclesById[id] = { ...snap };
}

const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    setFromREST(state, action) {
      const list = action.payload;
      state.vehiclesById = {};
      state.vehicleOrder = [];
      list.forEach((v) => upsertVehicle(state, v));
    },
    applyWSMessage(state, action) {
      const msg = action.payload;
      if (msg.type === 'position' && msg.payload) {
        upsertVehicle(state, msg.payload);
      }
      if (msg.type === 'alert' && msg.payload) {
        const incoming = msg.payload;
        const dup = state.alerts.some((x) => x.id === incoming.id);
        if (!dup) {
          state.alerts.unshift(incoming);
          state.alerts = state.alerts.slice(0, 200);
        }
        const id = incoming.vehicle_id;
        if (state.vehiclesById[id]) {
          state.vehiclesById[id].state = 'alert';
          state.vehiclesById[id].alert_reason = incoming.message;
        }
      }
      if (msg.type === 'vehicle_removed' && msg.payload?.vehicle_id) {
        const id = msg.payload.vehicle_id;
        delete state.vehiclesById[id];
        state.vehicleOrder = state.vehicleOrder.filter((x) => x !== id);
      }
    },
    setWsConnected(state, action) {
      state.wsConnected = action.payload;
    },
    setLastError(state, action) {
      state.lastError = action.payload;
    },
    setCircuit(state, action) {
      state.circuit = action.payload;
    },
    removeVehicleLocal(state, action) {
      const id = action.payload;
      delete state.vehiclesById[id];
      state.vehicleOrder = state.vehicleOrder.filter((x) => x !== id);
      if (state.selectedVehicleId === id) {
        state.selectedVehicleId = null;
      }
    },
    setAlertsFromREST(state, action) {
      state.alerts = Array.isArray(action.payload) ? action.payload.slice(0, 200) : [];
    },
    setSelectedVehicle(state, action) {
      const id = action.payload;
      state.selectedVehicleId = id === state.selectedVehicleId ? null : id;
    },
    clearSelectedVehicle(state) {
      state.selectedVehicleId = null;
    },
  },
});

export const {
  setFromREST,
  applyWSMessage,
  setWsConnected,
  setLastError,
  setCircuit,
  removeVehicleLocal,
  setAlertsFromREST,
  setSelectedVehicle,
  clearSelectedVehicle,
} = fleetSlice.actions;

export default fleetSlice.reducer;
