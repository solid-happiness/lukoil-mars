import json
from django.http import JsonResponse
from .mock import SNAPSHOTS

def create_emulation(request):
    '''
    params:
        storageAmountFuel - количество топлива
        stationAmountFuel
        stationsCount
        tankersCount

        monthTimestampCount
        tankerCost
        fuelDeliveryTime
        carRefuelingTime
        baseAvgReceipt
        receiptAvgCoef
        maintenanceStationCost
        maintenanceColumnCost
        stationBuildingTime
        columnBuildingTime
        directorSalary
        refuillerSalary
        cashierSalary
        securitySalary
        needAdditionalCashierColumnCount
        dismissalProbability
    '''
    
    return JsonResponse({
        'shapshots': json.loads(SNAPSHOTS)
    })