import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gasStations from 'client/slices/gasStations';

export const rootReducer = combineReducers({
  gasStations,
});

export const store = configureStore({
  reducer: rootReducer,
});
