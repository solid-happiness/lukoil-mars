from __future__ import annotations

from django.db import models
from fuel import models as fuel_models

class EmulationConfig(models.Model):
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
    _config = models.ForeignKey(
        EmulationConfig,
        on_delete=models.PROTECT,
    )

    def get_config(self) -> EmulationConfig:
        return self._config

    @classmethod
    def create(cls, params: dict) -> Emulation:

        # Настройки, которые не будут сохранены
        storage_amount_fuel=params.get('storageAmountFuel')
        station_amount_fuel=params.get('stationAmountFuel')
        stations_count=params.get('stationsCount')
        tankers_count=params.get('tankersCount')

        emulation = cls.objects.create(config=EmulationConfig.from_dict(params))
        fuel_models.Storage.create()
        for _ in range(tankers_count):
            fuel_models.Tanker.create(emulation)

        return emulation
    
    def get_fuel_storage(self) -> fuel_models.Storage:
        return self.storage_set.first()

    def get_shot(self):
        return {}


class EmulationSnapshot(models.Model):
    timestamp = models.PositiveIntegerField()
    emulation = models.ForeignKey('Emulation', on_delete=models.PROTECT)
    state = models.JSONField()

    @classmethod
    def shot(cls, emulation: Emulation, timestamp: int):
        cls.objects.create(
            timestamp=timestamp,
            emulation=emulation,
            state=emulation.get_shot()
        )


class Bank(models.Model):
    _amount = models.BigIntegerField(
        default=0,
    )

    def get_amount(self) -> int:
        return self._amount
    
    def take(self, count: int) -> int:
        self.update(_amount=self.get_amount() - count)
        return count

    def fill(self, count: int):
        if count < 0:
            raise ValueError
        self.update(_amount=self.get_amount() + count)

    
    class Meta:
        verbose_name = 'Банк денег'


class Employee(models.Model):
    ROLES = [
        ('director', 'Директор'),
        ('refuiller', 'Заправщик'),
        ('cashier', 'Кассир'),
        ('security', 'Охранник'),
    ]
    CONTRACTS = [
        ('tk', 'ТК'),
        ('gph', 'ГПХ'),
    ]
    role = models.CharField(
        max_length=16,
        choices=ROLES,
    )
    contract = models.CharField(
        max_length=16,
        choices=CONTRACTS,
    )

    def pay_salary(self):
        pass

    def dissmis(self):
        pass

    def hire(self):
        pass