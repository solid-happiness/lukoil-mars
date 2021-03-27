import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, Fab } from '@material-ui/core';
import { PlayCircleFilled as PlayCircleFilledIcon } from '@material-ui/icons';

import { showIntro } from 'client/slices';
import { Action, Props as ActionProps } from 'client/components/Actions/Action';

const useStyles = makeStyles(() => ({
  fab: {
    background: '#f27121 !important',
  },
}));

type Props = {
  className?: string;
  getTransform?: ActionProps['getTransform'];
};

export const IntroAction: React.FC<Props> = ({
  className = '',
  getTransform,
}) => {
  const s = useStyles();
  const dispatch = useDispatch();

  return (
    <Action className={className} getTransform={getTransform}>
      <Fab
        color="primary"
        size="medium"
        className={s.fab}
        onClick={() => dispatch(showIntro())}
      >
        <PlayCircleFilledIcon fontSize="small" />
      </Fab>
    </Action>
  );
};
