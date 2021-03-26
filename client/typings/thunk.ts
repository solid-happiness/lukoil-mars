import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './state';

export type AppThunk<R = Promise<void>> = ThunkAction<
  R,
  AppState,
  null,
  Action<string>
>;
