import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GasStation, AppThunk } from 'client/typings';

type GasStationsState = {
  loading?: boolean;
  stations: GasStation[];
};

const initialState: GasStationsState = {
  loading: true,
  stations: [],
};

const gasStations = createSlice({
  name: 'gasStations',
  initialState,
  reducers: {
    startLoading: (state: GasStationsState) => ({
      ...state,
      loading: true,
    }),
    stationsLoaded: (
      state: GasStationsState,
      action: PayloadAction<{ stations: GasStation[] }>
    ) => ({
      ...state,
      loading: false,
      stations: action.payload.stations,
    }),
  },
});

const { startLoading, stationsLoaded } = gasStations.actions;

export const loadGasStations = (): AppThunk => async (dispatch) => {
  dispatch(startLoading());

  dispatch(
    stationsLoaded({
      stations: [
        {
          id: '12',
          title: 'Заправка №1',
          template: 'built',
          location: [55.76156721, 37.57738343],
        },
        {
          id: '13',
          title: 'Заправка №2',
          template: 'building',
          location: [55.76026896, 37.78254781],
        },
      ],
    })
  );
};

export default gasStations.reducer;
