import { FuelStation } from './fuelStation';
import { Tanker } from './tanker';

export type Snapshot = {
  id: number;
  fuelStations: FuelStation[];
  tankers: Tanker[];
  bank: number;
};
