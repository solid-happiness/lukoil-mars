import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Drawer } from '@material-ui/core';

import { toggleActive } from 'client/slices';
import { getActiveGasStation } from 'client/selectors';

import { Station } from './Station';

const useStyles = makeStyles(() => ({
  drawer: {
    minWidth: '300px',
    background: 'linear-gradient(to bottom, #ffffff, #fffef6);',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    boxShadow: '0 2px 6px 0 rgb(0 0 0 / 20%)',
    fontSize: '14px',
    lineHeight: '16px',
  },
}));

export const ActiveStation: React.FC = () => {
  const s = useStyles();
  const dispatch = useDispatch();
  const activeStation = useSelector(getActiveGasStation);

  return (
    <Drawer
      open={!!activeStation}
      onClose={() => dispatch(toggleActive({}))}
      classes={{
        paper: s.drawer,
      }}
      variant="temporary"
      anchor="right"
    >
      <Station station={activeStation} />
    </Drawer>
  );
};
