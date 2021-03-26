import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '32px',
    height: '32px',
    color: theme.palette.primary.main,
  },
}));

type Props = {
  path: string;
};

export const SvgIcon: React.FC<Props> = ({ path }) => {
  const s = useStyles();

  return <img src={path} className={s.root} />;
};
