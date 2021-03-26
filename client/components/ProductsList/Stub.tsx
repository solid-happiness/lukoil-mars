import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    maxWidth: 345,
    minHeight: 300,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
    },
  },
  skeleton: {
    transform: 'none',
  },
}));

export const Stub: React.FC = () => {
  const s = useStyles();
  const isLg = useMediaQuery('@media (min-width: 1920px)');

  return (
    <>
      <div className={s.card}>
        <Skeleton className={s.skeleton} height={300} />
      </div>
      <div className={s.card}>
        <Skeleton className={s.skeleton} height={300} />
      </div>
      {isLg && (
        <div className={s.card}>
          <Skeleton className={s.skeleton} height={300} />
        </div>
      )}
    </>
  );
};
