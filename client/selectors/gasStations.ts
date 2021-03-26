import { pathOr } from 'ramda';
import { GasStation } from 'client/typings';

export const getGasStations = pathOr([] as GasStation[], [
  'gasStations',
  'stations',
]);
