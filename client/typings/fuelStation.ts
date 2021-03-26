export type FuelStation = {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  state: 'ready' | 'building';
  fuelAmount: number;
  fuelColumns: number;
  actions: ['Наняли нового сотрудника'];
  employees: {
    directors: number;
    refuelers: number;
    cashiers: number;
    securityes: number;
  };
};
