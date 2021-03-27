import { Task } from 'client/typings';

type Field = {
  name: keyof Task;
  title: string;
  editableOnSnapshot?: boolean;
};

export const fields: Field[] = [
  {
    name: 'fuelSupplies',
    title: 'Распределение топлива по месяцам',
    editableOnSnapshot: true,
  },
  {
    name: 'storageAmountFuel',
    title: 'Остаток топлива в хранилище',
  },
  {
    name: 'stationAmountFuel',
    title: 'Остаток топлива на АЗС',
  },
  {
    name: 'stationsCount',
    title: 'Кол-во существующих АЗС',
  },
  {
    name: 'tankersCount',
    title: 'Кол-во существующих танкеров для поставки топлива',
  },
  {
    name: 'monthTimestampCount',
    title: 'Длина виртуального месяца в секундах',
  },
  {
    name: 'tankerCost',
    title: 'Стоимость одного танкера',
  },
  {
    name: 'fuelDeliveryTime',
    title: 'Время, за которое танкер доставит топливо в АЗС',
  },
  {
    name: 'carRefuelingTime',
    title: 'Время на обслуживание одной машины',
  },
  {
    name: 'baseAvgReceipt',
    title: 'Средний чек',
  },
  {
    name: 'receiptAvgCoef',
    title: 'Коэффициент увеличения среднего чека',
  },
  {
    name: 'maintenanceStationCost',
    title: 'Базовая стоимость содержания АЗС',
  },
  {
    name: 'maintenanceColumnCost',
    title: 'Доп. стоимость содержания одного обслуживаемого места',
  },
  {
    name: 'stationBuildingTime',
    title: 'Время постройки базовой части АЗС',
  },
  {
    name: 'columnBuildingTime',
    title: 'Время постройки одного обслуживаемого места',
  },
  {
    name: 'directorSalary',
    title: 'Стоимость содержания директора',
  },
  {
    name: 'refuillerSalary',
    title: 'Стоимость содержания заправщика',
  },
  {
    name: 'cashierSalary',
    title: 'Стоимость содержания кассира',
  },
  {
    name: 'securitySalary',
    title: 'Стоимость содержания охранника',
  },
  {
    name: 'needAdditionalCashierColumnCount',
    title: 'Кол-во обслуживаемых мест, при котором нанимается доп. кассир',
  },
  {
    name: 'dismissalProbability',
    title: 'Вероятность увольнения сотрудника по ГПХ',
  },
];
