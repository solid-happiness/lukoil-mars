import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, findIndex } from 'ramda';

import { makeStyles, IconButton } from '@material-ui/core';
import {
  PlayCircleFilled as PlayCircleFilledIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
} from '@material-ui/icons';

import { setActiveSnapshot } from 'client/slices';
import { getSnapshots, getActiveSnapshot } from 'client/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 50,
    left: '50%',
    transform: 'translate(-50%)',
    zIndex: 99,
    minWidth: '300px',
    background: 'linear-gradient(to bottom, #ffffff, #fffef6);',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.shadows[2],
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
  },
}));

export const Player: React.FC = () => {
  const s = useStyles();
  const dispatch = useDispatch();
  const activeSnapshot = useSelector(getActiveSnapshot);
  const snapshots = useSelector(getSnapshots);

  const idx = findIndex(
    (snapshot) => snapshot.id === activeSnapshot?.id,
    snapshots || []
  );

  if (isEmpty(snapshots)) {
    return null;
  }

  return (
    <section className={s.root}>
      <div className={s.controls}>
        <IconButton
          onClick={() =>
            dispatch(setActiveSnapshot({ snapshotId: snapshots[idx - 1]?.id }))
          }
          color="primary"
        >
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() =>
            dispatch(setActiveSnapshot({ snapshotId: snapshots[idx + 1]?.id }))
          }
        >
          <PlayCircleFilledIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            dispatch(setActiveSnapshot({ snapshotId: snapshots[idx + 1]?.id }))
          }
          color="primary"
        >
          <SkipNextIcon />
        </IconButton>
      </div>
    </section>
  );
};
