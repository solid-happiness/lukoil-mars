class TooLittleFuel(Exception):
    '''Слишком мало топлива в хранилище'''
    available: int