import React from 'react';
import cx from 'clsx';

import { makeStyles, Tooltip } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

import { Fab, Props as FabProps } from 'client/components/Actions/Fab';
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
  },
}));

type Props = {
  className?: string;
  getTransform?: FabProps['getTransform'];
};

export const InfoAction: React.FC<Props> = ({
  className = '',
  getTransform,
}) => {
  const s = useStyles();

  return (
    <>
      <Fab className={cx(className, s.fab)} getTransform={getTransform}>
        <Tooltip
          classes={{ tooltip: s.tooltip }}
          title={<Team />}
          placement="left"
          interactive
        >
          <InfoIcon fontSize="small" />
        </Tooltip>
      </Fab>
    </>
  );
};
