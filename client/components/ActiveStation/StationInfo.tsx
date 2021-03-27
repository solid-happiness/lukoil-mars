import React from 'react';
import { join } from 'ramda';
import { makeStyles, Typography } from '@material-ui/core';

import { FuelStation } from 'client/typings';
import { Row } from './Row';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    margin: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
  },
  title: {
    fontWeight: 'bold',
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
      <Typography variant="h6" className={s.title}>
        Станция №{station.id}
      </Typography>
      <Row title="Координаты" gutter>
        {station.location.latitude}, {station.location.longitude}
      </Row>
      <Row title="Статус">{statusMap[station.state]}</Row>
      <Row title="Запас топлива">{station.fuelAmount}</Row>
      <Row title="Количество бензоколонок">{station.fuelColumns}</Row>
      <Row title="Последние события">{join(', ', station.actions)}</Row>
      <Row title="Кол-во директоров">{station.employees.directors}</Row>
      <Row title="Кол-во кассиров">{station.employees.cashiers}</Row>
      <Row title="Кол-во заправщиков">{station.employees.refuelers}</Row>
      <Row title="Кол-во охранников">{station.employees.securityes}</Row>
    </div>
  );
};
