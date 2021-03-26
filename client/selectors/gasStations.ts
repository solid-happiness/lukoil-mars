import { path, pathOr, indexBy, prop } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';
import { GasStation } from 'client/typings';

export const getGasStations = pathOr([] as GasStation[], [
  'gasStations',
  'stations',
]);

export const getGasStationsById = createSelector(
  getGasStations,
  indexBy(prop('id'))
);

export const getActiveGasStationId = path<string>(['gasStations', 'activeId']);

export const getActiveGasStation = createSelector(
  getGasStationsById,
  getActiveGasStationId,
  (stations, active) => (active ? stations[active] : undefined)
);
