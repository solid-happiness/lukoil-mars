import React from 'react';
import { makeStyles } from '@material-ui/core';

import { Header } from 'client/components/Header';
import { Notification } from './Notification';

const useStyles = makeStyles(() => ({
  '@global': {
    'html, body, #root, #__next': {
      width: '100%',
      height: '100%',
    },
  },
  root: {
    width: '100%',
    height: '100%',
  },
  main: {
    width: '100%',
    height: '100%',
  },
}));

export const Layout: React.FC = ({ children }) => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
      <Notification />
    </div>
  );
};
