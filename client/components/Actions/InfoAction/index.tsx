import React from 'react';

import { makeStyles, Tooltip, Fab } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

import { Action, Props as ActionProps } from 'client/components/Actions/Action';
import { Team } from './Team';

const useStyles = makeStyles((theme) => ({
  fab: {
    background: '#f27121 !important',
  },
  tooltip: {
    background: '#f7f9fa',
    padding: '10px 0',
    borderRadius: '8px',
    boxShadow: theme.shadows[1],
    marginRight: theme.spacing(4),
    minWidth: '350px',
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
    },
  },
}));

type Props = {
  className?: string;
  getTransform?: ActionProps['getTransform'];
};

export const InfoAction: React.FC<Props> = ({
  className = '',
  getTransform,
}) => {
  const s = useStyles();

  return (
    <Action className={className} getTransform={getTransform}>
      <Tooltip
        classes={{ tooltip: s.tooltip }}
        title={<Team />}
        placement="left"
        interactive
      >
        <Fab color="primary" size="medium" className={s.fab}>
          <InfoIcon fontSize="small" />
        </Fab>
      </Tooltip>
    </Action>
  );
};
