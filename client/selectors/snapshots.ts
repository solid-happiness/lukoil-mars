import { path, pathOr, indexBy, prop } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';
import { Snapshot } from 'client/typings';

export const getGasStations = pathOr([] as Snapshot[], ['snapshots', 'list']);

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
