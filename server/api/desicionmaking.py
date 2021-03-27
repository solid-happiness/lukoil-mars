from random import random, randrange, uniform

from api import models as api_models

AVG_RECEIPT_FUEL = 15  # Среднее количество топлива за одну заправку
MAX_COLUMNS_ON_STATION = 8  # Максимальное количество колонок на АЗС
MAX_STATIONS = 10  # Максимальное число АЗС

MAP_COORDS = {
    'left_x': 56.26077286,
    'right_x': 55.05309867,
    'top_y': 36.37642921,
    'bottom_y': 39.85718392
}

MAP_CENTER = (
    (MAP_COORDS['left_x'] + MAP_COORDS['right_x']) / 2,
    (MAP_COORDS['bottom_y'] + MAP_COORDS['top_y']) / 2,
)


def get_new_location():
    return api_models.Location(
        latitude=uniform(
            MAP_COORDS['left_x'],
            MAP_COORDS['right_x']
        ),
        longitude=uniform(
            MAP_COORDS['bottom_y'],
            MAP_COORDS['top_y']
        ),
    )


def get_fuel_station_by_id(fuel_stations, id_to_find):
    '''Получаем индекс заправки в списке заправок по ее id'''
    for idx, fuel_station in enumerate(fuel_stations):
        if fuel_station.id == id_to_find:
            return idx
    return None


def make_snapshot(snapshot, config):
    '''Метод принятия решений'''
    timestamp = snapshot.timestamp
    month_timestamp_count = config.month_timestamp_count

    year = month_timestamp_count * 12
    month_number = timestamp // month_timestamp_count

    def every_month(snapshot):
        # Пополняем хранилище
        snapshot.fuel_storage_amount += config.fuel_supplies[month_number - 1]
        # Платим за содержание АЗС
        snapshot.bank -= (
            config.maintenance_station_cost * len(snapshot.fuel_stations)
        )

        for station in snapshot.fuel_stations:
            # Платим за содержание каждой колонки на АЗС
            snapshot.bank -= (
                config.maintenance_column_cost * len(station.columns)
            )
            # Платим ЗП сотрудникам АЗС
            employees = {
                'refueller': 0,
                'cashier': 0,
                'director': 0,
                'security': 0,
            }
            for employee in station.employees:
                employees[employee.role] += 1

            snapshot.bank -= (
                employees['refueller'] * config.refuiller_salary
            )
            snapshot.bank -= (
                employees['cashier'] * config.cashier_salary
            )
            snapshot.bank -= (
                employees['director'] * config.director_salary
            )
            snapshot.bank -= (
                employees['security'] * config.security_salary
            )

    def get_avg_receipt(number_of_columns):
        '''
        Вычисляем стоимость заправки:
        Б.СР.ЧЕК * КОЭФФ ^ (ЧИСЛО КОЛОНОК - 1)
        '''
        return config.base_avg_receipt * config.receipt_avg_coef ** (
            number_of_columns - 1
        )

    def get_tanker_coord(station, tanker):
        '''Вычисляем текущие координаты танкера'''
        map_x, map_y = MAP_CENTER

        location_s = station.location
        location_t = tanker.location

        k = (location_s.longitude - map_y) / (
            location_s.latitude - map_x
        )

        x_0 = location_t.latitude + (
            location_s.latitude - location_t.latitude
        ) / (
            tanker.busy_to - timestamp
        )

        return (x_0, k * (x_0 - map_x) + map_y)

    def can_to_fill_car(station):
        '''Проверяем, можем ли мы заправить машину'''
        conditions = (
            station.fuel_amount >= AVG_RECEIPT_FUEL,
            timestamp + config.car_refueling_time <= year,
        )
        return all(conditions)

    def can_to_build_column(station):
        '''Проверяем, можем ли мы построить еще одну колонку на АЗС'''
        # TODO: Рассчитать, успеет ли она построиться и заработать денег
        # на выплату ЗП сотрудникам (заправщику и, возможно, кассиру)
        # до наступления дня выдачи зарплаты
        conditions = (
            len(station.columns) < MAX_COLUMNS_ON_STATION,
            timestamp + config.column_building_time <= year,
        )
        return all(conditions)

    def build_column(station):
        '''Строим колонку на АЗС'''
        station.columns.append(
            api_models.FuelColumn(
                busy_to=timestamp + config.column_building_time
            )
        )
        station.actions.append('Построили новую колонку')
        # Нанимаем заправщика
        station.employees.append(api_models.Employee(
            role='refueller',
            contract='td'
        ))
        station.actions.append('Наняли нового заправщика')
        # Если колонок много, то нанимаем еще кассира
        number_of_cashiers = len(list(filter(
            lambda emp: emp.role == 'cashier', station.employees
        )))
        if len(station.columns) / number_of_cashiers > config.need_additional_cashier_column_count:
            station.employees.append(api_models.Employee(
                role='cashier',
                contract='td'
            ))
            station.actions.append('Наняли нового кассира')

    def calculate_fuel_time(station):
        """
        Считаем, на сколько "дней" (итераций) хватит топлива на АЗС.
        Складываем оставшееся топливо на АЗС с топливом,
        которое на нее едет на танкерах, делим на количество топлива,
        которое тратится на одну заправку и на количество бензоколонок,
        умножаем на время одной заправки. Пример:
        Осталось 100 л + 50 л везет танкер. За один раз в машину заправляют 10 л.
        На заправке 3 бензоколонки, одна заправка занимает 2 "дня" (итерации).
        (100 + 50) / 10 = 15 (на столько заправок нам хватит еще)
        Делим это на число бензоколонок:
        15 / 3 = 5 (на столько одновременных заправок на АЗС хватит топлива)
        5 * 2 = 10 (на столько "дней" (итераций) на АЗС еще хватит топлива)."""
        future_fuel = 0
        for tanker in snapshot.tankers:
            if tanker.delivery_to == station.id:
                future_fuel += tanker.fuel_amount
        return len(station.columns) and (station.fuel_amount + future_fuel) // (
            len(station.columns) * AVG_RECEIPT_FUEL
        ) * config.car_refueling_time

    def can_to_delivery_tanker(station):
        '''Проверяем, нужно ли и можем ли мы вызвать танкер на АЗС'''
        less_time_work = calculate_fuel_time(station)
        # Считаем количество топлива, которое надо заказать
        fuel_to_delivery = AVG_RECEIPT_FUEL * month_timestamp_count * len(
            station.columns
        ) // config.car_refueling_time

        conditions = (
            less_time_work <= config.fuel_delivery_time,
            len(list(filter(
                lambda tank: tank.busy_to <= timestamp, snapshot.tankers
            ))),
            snapshot.fuel_storage_amount >= fuel_to_delivery,
        )

        return all(conditions)

    def delivery_tanker(station):
        '''Вызываем танкер'''
        for tanker in snapshot.tankers:
            if tanker.busy_to <= timestamp:
                tanker.busy_to = timestamp + config.fuel_delivery_time
                # Считаем количество топлива, которое надо заказать
                fuel_to_delivery = AVG_RECEIPT_FUEL * month_timestamp_count * len(
                    station.columns
                ) // config.car_refueling_time
                tanker.fuel_amount = fuel_to_delivery
                tanker.delivery_to = station.id
                tanker.location = api_models.Location(
                    latitude=MAP_CENTER[0],
                    longitude=MAP_CENTER[1],
                )
                station.actions.append('Вызвали танкер')
                break

    def can_to_build_station():
        '''Проверяем, можем ли мы построить еще одну АЗС'''
        # TODO: Рассчитать, успеет ли она построиться и окупить себя
        # до конца года
        conditions = (
            len(snapshot.fuel_stations) < MAX_STATIONS,
            timestamp + config.station_building_time <= year,
        )
        return all(conditions)

    def build_station():
        snapshot.fuel_stations.append(api_models.FuelStation(
            id=randrange(4, 100000000),
            fuel_amount=0,
            location=get_new_location(),
            columns=[],
            busy_to=config.station_building_time,
            employees=[
                api_models.Employee(
                    role='director',
                    contract='td'
                ),
                api_models.Employee(
                    role='cashier',
                    contract='td'
                ),
                api_models.Employee(
                    role='security',
                    contract='td'
                ),
            ],
            actions=[],
            state='building',
        ))
        build_column(snapshot.fuel_stations[-1])

    # Если сегодня последний день месяца,
    # делаем обязательные каждый месяц дела
    if timestamp % month_timestamp_count == 0:
        # snapshot = every_month(snapshot)
        every_month(snapshot)

    # Проверяем, не должен ли приехать сегодня какой-нибудь танкер
    # и пересчитываем их координаты на карте
    for tanker in snapshot.tankers:

        if tanker.busy_to == timestamp:
            fuel_station_id = get_fuel_station_by_id(
                snapshot.fuel_stations,
                tanker.delivery_to
            )
            fuel_station = snapshot.fuel_stations[fuel_station_id]
            fuel_station.fuel_amount += tanker.fuel_amount
            tanker.location = api_models.Location(
                latitude=MAP_CENTER[0],
                longitude=MAP_CENTER[1]
            )
        elif tanker.busy_to > timestamp:
            fuel_station_id = get_fuel_station_by_id(
                snapshot.fuel_stations,
                tanker.delivery_to
            )
            fuel_station = snapshot.fuel_stations[fuel_station_id]
            x, y = get_tanker_coord(fuel_station, tanker)
            tanker.location = api_models.Location(latitude=x, longitude=y)

    # Идем по всем заправкам и заправляем машины
    for station in snapshot.fuel_stations:
        if station.busy_to <= timestamp:
            number_of_columns = len(station.columns)
            avg_receipt = get_avg_receipt(number_of_columns)

            for column in station.columns:
                if column.busy_to <= timestamp and can_to_fill_car(station):
                    # Получаем деньги
                    snapshot.bank += avg_receipt
                    # Уменьшаем количество топлива на АЗС
                    station.fuel_amount -= AVG_RECEIPT_FUEL
                    # Блокируем колонку на время заправки
                    column.busy_to = timestamp + config.car_refueling_time

            # Если можем построить еще колонку на этой АЗС, то строим
            if can_to_build_column(station):
                build_column(station)

            station.state = 'ready'

        if can_to_delivery_tanker(station):
            delivery_tanker(station)

    if can_to_build_station():
        build_station()

    return snapshot
