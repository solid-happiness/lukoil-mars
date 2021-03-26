import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '48px',
    height: '48px',
  },
}));

export const TankerIcon: React.FC = () => {
  const s = useStyles();

  return <img src="/truck.svg" className={s.root} />;
};
