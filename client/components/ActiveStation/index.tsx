import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Drawer } from '@material-ui/core';

import { setActiveSnapshot } from 'client/slices';
import { getActiveStation, getActiveTanker } from 'client/selectors';

import { StationInfo } from './StationInfo';
import { TankerInfo } from './TankerInfo';

const useStyles = makeStyles((theme) => ({
  drawer: {
    minWidth: '300px',
    background: 'linear-gradient(to bottom, #ffffff, #fffef6);',
    borderRadius: '8px',
    boxShadow: '0 2px 6px 0 rgb(0 0 0 / 20%)',
    fontSize: '14px',
    lineHeight: '16px',
    right: theme.spacing(4),
    top: theme.spacing(8),
    bottom: theme.spacing(8),
    height: 'auto',
  },
}));

export const ActiveStation: React.FC = () => {
  const s = useStyles();
  const dispatch = useDispatch();

  const activeStation = useSelector(getActiveStation);
  const activeTanker = useSelector(getActiveTanker);

  return (
    <Drawer
      open={!!(activeStation || activeTanker)}
      onClose={() => dispatch(setActiveSnapshot({}))}
      classes={{
        paper: s.drawer,
      }}
      variant="temporary"
      anchor="right"
    >
      {activeStation ? (
        <StationInfo station={activeStation} />
      ) : (
        <TankerInfo tanker={activeTanker} />
      )}
    </Drawer>
  );
};
