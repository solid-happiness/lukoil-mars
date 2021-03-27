import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { Tanker } from 'client/typings';
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
  tanker?: Tanker;
};

export const TankerInfo: React.FC<Props> = ({ tanker }) => {
  const s = useStyles();
  if (!tanker) {
    return null;
  }

  return (
    <div className={s.root}>
      <Typography variant="h6" className={s.title}>
        Танкер №{tanker.id}
      </Typography>
      <Row title="Координаты" gutter>
        {tanker.location.latitude}, {tanker.location.longitude}
      </Row>
      <Row title="Запас топлива">{tanker.fuelAmount}</Row>
      {!!tanker.toFuelStation && (
        <Row title="Станция">{tanker.toFuelStation}</Row>
      )}
    </div>
  );
};
