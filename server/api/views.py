import json

from django.http import JsonResponse
from django.middleware.csrf import get_token

from .mock import MOCK_SNAPSHOTS
from .models import Emulation


def csrf(request):
    return JsonResponse({
        'csrfToken': get_token(request),
    })


def create_emulation(request):
    '''
    params:
        storageAmountFuel - изначальное количество топлива в хранилище
        stationAmountFuel - изначальное количество топлива на каждой заправочной станции
        stationsCount - изначальное количество заправочных станций
        tankersCount - изначальное количество танкеров для перевозки топлива

        monthTimestampCount - количество условных единиц в месяце
        tankerCost - стоимость покупки танкера для перевозки топлива
        fuelDeliveryTime - время доставки топлива до заправочной станции
        carRefuelingTime - время заправки одного автомобиля
        baseAvgReceipt - базовый средний чек на заправочной станции
        receiptAvgCoef - коэффициент увеличения среднего чека при увеличении количества топливных колонок
        maintenanceStationCost - ежемесячная стоимость обслуживания заправочной станции
        maintenanceColumnCost - ежемесячная стоимость обслуживания топливной колонки
        stationBuildingTime - время постройки заправочной станции
        columnBuildingTime - время постройки заправочной колонки
        directorSalary - зарплата директора
        refuillerSalary - зарплата заправщика
        cashierSalary - зарплата кассира
        securitySalary - зарплата охранника
        needAdditionalCashierColumnCount - количество заправочных колонок, при котором необходимо нанять дополнительного кассира
        dismissalProbability - вероятность увольнения сотрудника, устроенного по ГПХ
    '''
    data = json.loads(request.body.decode('utf-8'))
    if data.get('emulateId'):
        id, result = Emulation.recalculate(
            emulate_id=data.get('emulateId'),
            snapshot_id=data.get('snapshotId'),
            fuel_supplies=data.get('fuelSupplies'),
        )
    else:
        id, result = Emulation.create(data)

    return JsonResponse({
        'emulate': {
            'id': id,
            'snapshots': result,
        }
    })
