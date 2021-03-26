import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { GasStation } from 'client/typings';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    margin: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
  },
  title: {
    fontWeight: 'bold',
  },
}));

type Props = {
  station?: GasStation;
};

export const Station: React.FC<Props> = ({ station }) => {
  const s = useStyles();
  if (!station) {
    return null;
  }

  return (
    <div className={s.root}>
      <Typography variant="h6">{station.title}</Typography>
    </div>
  );
};
