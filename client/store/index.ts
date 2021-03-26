import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gasStations from 'client/slices/gasStations';
import snackbar from 'client/slices/snackbar';

export const rootReducer = combineReducers({
  gasStations,
  snackbar,
});

export const store = configureStore({
  reducer: rootReducer,
});
