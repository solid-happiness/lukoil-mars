import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import snapshots from 'client/slices/snapshots';
import snackbar from 'client/slices/snackbar';
import intro from 'client/slices/intro';
import task from 'client/slices/task';

export const rootReducer = combineReducers({
  snapshots,
  snackbar,
  intro,
  task,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
