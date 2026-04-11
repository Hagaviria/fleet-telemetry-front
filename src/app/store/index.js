import { configureStore } from '@reduxjs/toolkit';

import fleetReducer from './fleetSlice';

export const store = configureStore({
  reducer: {
    fleet: fleetReducer,
  },
});
