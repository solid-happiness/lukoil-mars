import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { Tanker } from 'client/typings';

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
  tanker?: Tanker;
};

export const TankerInfo: React.FC<Props> = ({ tanker }) => {
  const s = useStyles();
  if (!tanker) {
    return null;
  }

  return (
    <div className={s.root}>
      <Typography variant="h6">{tanker.fuelAmount}</Typography>
    </div>
  );
};
