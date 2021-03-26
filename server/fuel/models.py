from __future__ import annotations

from django.db import models
from api import models as api_models
from .exceptinos import TooLittleFuel

class Storage(models.Model):
    _amount = models.BigIntegerField(
        default=0,
    )
    _emulation = models.ForeignKey(
        'api.Emulation',
        on_delete=models.PROTECT,
    )

    @classmethod
    def create(cls, emulation: api_models.Emulation, fuel_amount: int = 0) -> Storage:
        return cls.objects.create(_amount=fuel_amount, _emulation=emulation)

    def get_amount(self) -> int:
        return self._amount

    def take(self, count: int) -> int:
        if self.get_amount() < count:
            raise TooLittleFuel(available=self.get_amount())
        self.update(_amount=self.get_amount() - count)
        return count

    def fill(self, count: int):
        if count < 0:
            raise ValueError
        self.update(_amount=self.get_amount() + count)

    def take_all(self) -> int:
        amount_to_take = self.get_amount()
        self.update(_amount=0)
        return amount_to_take
    
    class Meta:
        verbose_name = 'Топливное хранилище'


class Station(models.Model):
    '''
    Координаты меняются от 56.26077286, 36.37642921 до 55.05309867, 39.85718392
    '''
    STATES = [
        ('building', 'Строится'),
        ('ready', 'Построена'),
        ('destroyed', 'Снесена'),
    ]
    _state = models.CharField(
        max_length=16,
        choices=STATES,
        default='building',
    )
    _fuel_amount = models.BigIntegerField(
        verbose_name='Остаток топлива',
        default=0,
    )
    _emulation = models.ForeignKey(
        'api.Emulation',
        on_delete=models.PROTECT,
    )
    _builded_at = models.PositiveIntegerField(
        default=0,
    )

    @classmethod
    def create(cls, emulation: api_models.Emulation, fuel_amount: int = 0) -> Station:
        return cls.objects.create(
            _state='ready',
            _fuel_amount=fuel_amount,
            _emulation=emulation,
        )

    @classmethod
    def build(cls, emulation: api_models.Emulation, timestamp: int) -> Station:
        '''Построить заправочную станцию'''
        return cls.objects.create(
            _emulation=emulation,
            _builded_at=timestamp + emulation.get_config().station_building_time,
        )


class Column(models.Model):
    _fuel_station = models.ForeignKey(
        'fuel.Station',
        on_delete=models.PROTECT,
    )


class Tanker(models.Model):
    _amount = models.PositiveIntegerField(null=True)
    _busy_to = models.PositiveIntegerField(null=True)
    _emulation = models.ForeignKey('api.Emulation', on_delete=models.PROTECT)

    @classmethod
    def create(cls, emulation: api_models.Emulation) -> Tanker:
        return cls.objects.create(_emulation=emulation)

    @classmethod
    def get_free(cls, emulation: api_models.Emulation) -> Tanker | None:
        free_tanker = cls.objects.filter(_state='ready', _emulation=emulation).first()
        return free_tanker

    def get_emulation(self) -> api_models.Emulation:
        return self._emulation

    @classmethod
    def delivery(cls, amount: int, fuel_station: Station):
        tanker = cls.get_free()
        fuel_storage = tanker.get_emulation().get_fuel_storage()
        tanker.update(_amount=fuel_storage.take(amount))
        tanker.update(_state='busy')
