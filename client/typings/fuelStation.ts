export type FuelStation = {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  state: 'ready' | 'building' | 'destroyed';
  fuelAmount: number;
  fuelColumns: number;
  actions: ['Наняли нового сотрудника'];
  employees: {
    directors: number;
    refuellers: number;
    cashiers: number;
    securitys: number;
  };
};
