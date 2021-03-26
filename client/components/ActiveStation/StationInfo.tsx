import React from 'react';
import { join } from 'ramda';
import { makeStyles, Typography } from '@material-ui/core';

import { FuelStation } from 'client/typings';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    margin: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
  },
  title: {
    fontWeight: 'bold',
  },
  coords: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  station?: FuelStation;
};

const statusMap: Record<FuelStation['state'], string> = {
  ready: 'готово к обслуживанию',
  building: 'постройка станции',
  destroyed: 'разрушено',
};

export const StationInfo: React.FC<Props> = ({ station }) => {
  const s = useStyles();
  if (!station) {
    return null;
  }

  return (
    <div className={s.root}>
      <Typography variant="h6">Станция №{station.id}</Typography>
      <Typography variant="body1" className={s.coords}>
        Координаты: {station.location.latitude}, {station.location.longitude}
      </Typography>
      <Typography variant="body1">
        Статус: {statusMap[station.state]}
      </Typography>
      <Typography variant="body1">
        Запас топлива: {station.fuelAmount}
      </Typography>
      <Typography variant="body1">
        Количество бензоколонок: {station.fuelColumns}
      </Typography>
      <Typography variant="body1">
        Последние события: {join(', ', station.actions)}
      </Typography>
      <Typography variant="body1">
        Кол-во директоров: {station.employees.directors}
      </Typography>
      <Typography variant="body1">
        Кол-во кассиров: {station.employees.cashiers}
      </Typography>
      <Typography variant="body1">
        Кол-во заправщиков: {station.employees.refuelers}
      </Typography>
      <Typography variant="body1">
        Кол-во охранников: {station.employees.securityes}
      </Typography>
    </div>
  );
};
