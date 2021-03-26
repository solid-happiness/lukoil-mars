export type Tanker = {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  fuelAmount: number;
  toFuelStation: number;
};
