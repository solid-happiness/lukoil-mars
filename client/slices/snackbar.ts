import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarOrigin } from '@material-ui/core';
import { AppThunk } from 'client/typings';

export type SnackbarState = {
  open: boolean;
  message?: React.ReactNode;
  anchor?: SnackbarOrigin;
  type?: 'default' | 'alert';
};

const initialState: SnackbarState = {
  open: false,
  message: '',
  type: 'default',
  anchor: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};

const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state: SnackbarState,
      action: PayloadAction<{
        anchor?: SnackbarState['anchor'];
        type?: SnackbarState['type'];
        message: SnackbarState['message'];
      }>
    ) => {
      const {
        anchor = {
          horizontal: 'right',
          vertical: 'top',
        },
        type = 'default',
        message,
      } = action.payload;

      return {
        ...state,
        open: true,
        message,
        anchor,
        type,
      };
    },
    hideSnackbarNaive: (state) => ({
      ...state,
      open: false,
    }),
    destroySnackbar: () => initialState,
  },
});

export const {
  showSnackbar,
  hideSnackbarNaive,
  destroySnackbar,
} = snackbar.actions;

export const hideSnackbar = (): AppThunk => async (dispatch) => {
  dispatch(hideSnackbarNaive());

  setTimeout(() => {
    dispatch(destroySnackbar());
  }, 1000);
};

export default snackbar.reducer;
