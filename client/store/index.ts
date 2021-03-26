import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import snapshots from 'client/slices/snapshots';
import snackbar from 'client/slices/snackbar';

export const rootReducer = combineReducers({
  snapshots,
  snackbar,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
