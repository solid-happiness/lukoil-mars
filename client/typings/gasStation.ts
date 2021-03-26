export type GasStation = {
  id: string;
  title: string;
  template: 'built' | 'building';
  location: [number, number];
};
