MOCK_SNAPSHOTS = {
    'snapshots': {
        '1': {
            'fuelStations': [
                {
                    'id': 1,
                    'location': {
                        'latitude': 55.2,
                        'longitude': 36.5
                    },
                    'state': 'ready',
                    'fuelAmount': 1000,
                    'fuelColumns': 3,
                    'actions': ['Наняли нового сотрудника'],
                    'employees': {
                        'directors': 1,
                        'refuelers': 3,
                        'cashiers': 1,
                        'securityes': 1,
                    }
                },
                {
                    'id': 2,
                    'location': {
                        'latitude': 55.5,
                        'longitude': 37.5
                    },
                    'state': 'building',
                    'fuelAmount': 0,
                    'fuelColumns': 0,
                    'actions': ['Началось строительство станции'],
                    'employees': {
                        'directors': 0,
                        'refuelers': 0,
                        'cashiers': 0,
                        'securityes': 0,
                    }
                },
                {
                    'id': 3,
                    'location': {
                        'latitude': 55.8,
                        'longitude': 38,
                    },
                    'state': 'destroyed',
                    'fuelAmount': 0,
                    'fuelColumns': 0,
                    'actions': ['Станция закрыта'],
                    'employees': {
                        'directors': 0,
                        'refuelers': 0,
                        'cashiers': 0,
                        'securityes': 0,
                    }
                }
            ],
            'tankers': [
                {
                    'id': 1,
                    'location': {
                        'latitude': 55,
                        'longitude': 38,
                    },
                    'fuelAmount': 600,
                    'toFuelStation': 1,
                }
            ]
        },
        '2': {
            'fuelStations': [
                {
                    'id': 1,
                    'location': {
                        'latitude': 55.2,
                        'longitude': 36.5
                    },
                    'state': 'ready',
                    'fuelAmount': 900,
                    'fuelColumns': 3,
                    'actions': [],
                    'employees': {
                        'directors': 1,
                        'refuelers': 3,
                        'cashiers': 1,
                        'securityes': 1,
                    }
                },
                {
                    'id': 2,
                    'location': {
                        'latitude': 55.5,
                        'longitude': 37.5
                    },
                    'state': 'ready',
                    'fuelAmount': 0,
                    'fuelColumns': 0,
                    'actions': ['Строительство закончено', 'Нанят новый сторудник', 'Началось строительство заправочной колонки'],
                    'employees': {
                        'directors': 1,
                        'refuelers': 0,
                        'cashiers': 1,
                        'securityes': 1,
                    }
                },
                {
                    'id': 3,
                    'location': {
                        'latitude': 55.8,
                        'longitude': 38,
                    },
                    'state': 'destroyed',
                    'fuelAmount': 0,
                    'fuelColumns': 0,
                    'actions': [],
                    'employees': {
                        'directors': 0,
                        'refuelers': 0,
                        'cashiers': 0,
                        'securityes': 0,
                    }
                }
            ],
            'tankers': [
                {
                    'id': 1,
                    'location': {
                        'latitude': 55,
                        'longitude': 38,
                    },
                    'fuelAmount': 600,
                    'toFuelStation': 1,
                }
            ]
        },
        '3': {
            'fuelStations': [
                {
                    'id': 1,
                    'location': {
                        'latitude': 55.2,
                        'longitude': 36.5
                    },
                    'state': 'ready',
                    'fuelAmount': 1500,
                    'fuelColumns': 3,
                    'actions': ['Топливо доставлено'],
                    'employees': {
                        'directors': 1,
                        'refuelers': 3,
                        'cashiers': 1,
                        'securityes': 1,
                    }
                },
                {
                    'id': 2,
                    'location': {
                        'latitude': 55.5,
                        'longitude': 37.5
                    },
                    'state': 'building',
                    'fuelAmount': 0,
                    'fuelColumns': 0,
                    'actions': ['Завершено строительство заправочной колонки'],
                    'employees': {
                        'directors': 1,
                        'refuelers': 1,
                        'cashiers': 1,
                        'securityes': 1,
                    }
                },
                {
                    'id': 3,
                    'location': {
                        'latitude': 55.8,
                        'longitude': 38,
                    },
                    'state': 'destroyed',
                    'fuelAmount': 0,
                    'fuelColumns': 0,
                    'actions': ['destroyedStation'],
                    'employees': {
                        'directors': 0,
                        'refuelers': 0,
                        'cashiers': 0,
                        'securityes': 0,
                    }
                }
            ],
            'tankers': [
                {
                    'id': 1,
                    'location': {
                        'latitude': 55,
                        'longitude': 38,
                    },
                    'fuelAmount': 500,
                    'toFuelStation': 2,
                }
            ]
        } 
    }
}