import { path, pathOr, indexBy, prop } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';
import { Snapshot } from 'client/typings';

export const getSnapshots = pathOr([] as Snapshot[], ['snapshots', 'list']);

export const getSnapshotsById = createSelector(
  getSnapshots,
  indexBy(prop('id'))
);

export const getActiveSnapshotId = path<number>(['snapshots', 'snapshotId']);

export const getActiveSnapshot = createSelector(
  getSnapshotsById,
  getActiveSnapshotId,
  (stations, active) => (active ? stations[active] : undefined)
);

export const getActiveTankerId = path<number>(['snapshots', 'tankerId']);

export const getActiveTanker = createSelector(
  getActiveSnapshot,
  getActiveTankerId,
  (snapshot, tankerId) => {
    if (!snapshot || !tankerId) {
      return;
    }

    const tankersMap = indexBy(prop('id'), snapshot.tankers);
    return tankersMap[tankerId];
  }
);

export const getActiveStationId = path<number>(['snapshots', 'stationId']);

export const getActiveStation = createSelector(
  getActiveSnapshot,
  getActiveStationId,
  (snapshot, stationId) => {
    if (!snapshot || !stationId) {
      return;
    }

    const fuelStations = indexBy(prop('id'), snapshot.fuelStations);
    return fuelStations[stationId];
  }
);
