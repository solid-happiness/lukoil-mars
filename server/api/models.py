from __future__ import annotations
from typing import List

from django.db import models
from . import desicionmaking


class Employee:
    role: str
    dismissal_probability: float
    contact: str
    def __init__(self, role=None, dismissal_probability=None, contract=None) -> None:
        self.role = role
        self.dismissal_probability = dismissal_probability
        self.contact = contract

class FuelColumn:
    busy_to: int
    def __init__(self, busy_to=None) -> None:
        self.busy_to = busy_to

class Location:
    latitude: float
    longitude: float
    def __init__(self, latitude=None, longitude=None) -> None:
        self.latitude = latitude
        self.longitude = longitude
    
    def to_dict(self):
        return {
            'latitude': self.latitude,
            'longitude': self.longitude
        }

class Tanker:
    location: Location
    delivery_to: int
    fuel_amount: int
    busy_to: int
    def __init__(self, location=None, delivery_to=None, fuel_amount=None, busy_to=None) -> None:
        self.location = location
        self.delivery_to = delivery_to
        self.fuel_amount = fuel_amount
        self.busy_to = busy_to
    
    def to_dict(self):
        return {
            'location': self.location.to_dict(),
            'deliveryTo': self.delivery_to,
            'fuelAmount': self.fuel_amount
        }

class FuelStation:
    id: int
    fuel_amount: int
    location: Location
    columns: List[FuelColumn]
    busy_to: int
    employees: List[Employee]
    def __init__(self, id=None, fuel_amount=None, location=None, columns=None, busy_to=None, employees=None) -> None:
        self.id = id
        self.fuel_amount = fuel_amount
        self.location = location
        self.columns = columns
        self.busy_to = busy_to
        self.employees = employees

    def get_employees_stat(self):
        employees = {
            'refueller': 0,
            'cashier': 0,
            'director': 0,
            'security': 0,
        }
        for employee in self.employees:
            employees[employee.role] += 1
        return employees
    
    def to_dict(self):
        return {
            'id': self.id,
            'fuelAmount': self.fuel_amount,
            'location': self.location.to_dict(),
            'columnsCount': len(self.columns),
            'employees': self.get_employees_stat(),
        }

class Snapshot:
    timestamp: int
    config: EmulationConfig
    bank: int
    fuel_storage_amount: int
    fuel_stations: List[FuelStation]
    tankers: List[Tanker]

    def __init__(self, timestamp=None, config=None, bank=None, fuel_storage_amount=None, fuel_stations=None, tankers=None) -> None:
        self.timestamp = timestamp
        self.config = config
        self.bank = bank
        self.fuel_storage_amount = fuel_storage_amount
        self.fuel_stations = fuel_stations
        self.tankers = tankers
    
    def to_dict(self):
        return {
            'timestamp': self.timestamp,
            'bank': self.bank,
            'fuelStorageAmount': self.fuel_storage_amount,
            'fuelStations': [
                station.to_dict()
                for station
                in self.fuel_stations
            ],
            'tankers': [
                tanker.to_dict()
                for tanker
                in self.tankers
            ],
        }


class EmulationConfig(models.Model):
    fuel_supplies = models.JSONField(verbose_name='Распределение поставок по месяцам')
    month_timestamp_count = models.PositiveIntegerField(verbose_name='количество условных единиц в месяце')
    tanker_cost = models.PositiveIntegerField(verbose_name='тоимость покупки танкера для перевозки топлива')
    fuel_delivery_time = models.PositiveIntegerField(verbose_name='время доставки топлива до заправочной станции')
    car_refueling_time = models.PositiveIntegerField(verbose_name='время заправки одного автомобиля')
    base_avg_receipt = models.PositiveIntegerField(verbose_name='базовый средний чек на заправочной станции')
    receipt_avg_coef = models.FloatField(verbose_name='коэффициент увеличения среднего чека')
    maintenance_station_cost = models.PositiveIntegerField(verbose_name='Стоимость обслуживания заправочной станции')
    maintenance_column_cost = models.PositiveIntegerField(verbose_name='Стоимость обслуживания колонки')
    station_building_time = models.PositiveIntegerField(verbose_name='время постройки заправочной станции')
    column_building_time = models.PositiveIntegerField(verbose_name='время постройки заправочной колонки')
    director_salary = models.PositiveIntegerField(verbose_name='зарплата директора')
    refuiller_salary = models.PositiveIntegerField(verbose_name='зарплата заправщика')
    cashier_salary = models.PositiveIntegerField(verbose_name='зарплата кассира')
    security_salary = models.PositiveIntegerField(verbose_name='зарплата охранника')
    need_additional_cashier_column_count = models.PositiveIntegerField(
        help_text='количество заправочных колонок, при котором необходимо нанять дополнительного кассира'
    )
    dismissal_probability = models.FloatField(verbose_name='Вероятность увольнения')

    @classmethod
    def from_dict(cls, params: dict) -> EmulationConfig:
        return cls.objects.create(
            fuel_supplies=params.get('fuelSupplies'),
            month_timestamp_count=params.get('monthTimestampCount'),
            tanker_cost=params.get('tankerCost'),
            fuel_delivery_time=params.get('fuelDeliveryTime'),
            car_refueling_time=params.get('carRefuelingTime'),
            base_avg_receipt=params.get('baseAvgReceipt'),
            receipt_avg_coef=params.get('receiptAvgCoef'),
            maintenance_station_cost=params.get('maintenanceStationCost'),
            maintenance_column_cost=params.get('maintenanceColumnCost'),
            station_building_time=params.get('stationBuildingTime'),
            column_building_time=params.get('columnBuildingTime'),
            director_salary=params.get('directorSalary'),
            refuiller_salary=params.get('refuillerSalary'),
            cashier_salary=params.get('cashierSalary'),
            security_salary=params.get('securitySalary'),
            need_additional_cashier_column_count=params.get('needAdditionalCashierColumnCount'),
            dismissal_probability=params.get('dismissalProbability'),
        )


class Emulation(models.Model):
    config = models.ForeignKey(
        EmulationConfig,
        on_delete=models.PROTECT,
    )

    @classmethod
    def create(cls, params: dict) -> dict:
        # Настройки, которые не будут сохранены
        storage_amount_fuel=params.get('storageAmountFuel')
        station_amount_fuel=params.get('stationAmountFuel')
        stations_count=params.get('stationsCount')
        tankers_count=params.get('tankersCount')
        start_snapshot = Snapshot()
        start_snapshot.timestamp=1
        start_snapshot.config=EmulationConfig.from_dict(params)
        start_snapshot.bank=0
        start_snapshot.fuel_storage_amount=storage_amount_fuel

        tankers = []
        for _ in range(tankers_count):
            tankers.append(
                Tanker(
                    location=Location(0, 0),
                    delivery_to=-1,
                    fuel_amount=None,
                    busy_to=0,
                )
            )
        fuel_stations = []
        for i in range(stations_count):
            fuel_stations.append(
                FuelStation(
                    id=i+1,
                    fuel_amount=station_amount_fuel,
                    location=Location(55, 38),
                    columns=[],
                    busy_to=0,
                    employees=[
                        Employee(
                            role='director',
                            dismissal_probability=0,
                            contract='tk',
                        ),
                        Employee(
                            role='cashier',
                            dismissal_probability=0,
                            contract='tk',
                        ),
                        Employee(
                            role='security',
                            dismissal_probability=0,
                            contract='tk',
                        )
                    ]
                )
            )
            start_snapshot.fuel_stations = fuel_stations
            start_snapshot.tankers = tankers
        
        result = [start_snapshot.to_dict()]
        
        for i in range(params.get('monthTimestampCount') * 12):
            result.append(desicionmaking.make_snapshot(start_snapshot).to_dict())
            start_snapshot.timestamp += 1

        return result
