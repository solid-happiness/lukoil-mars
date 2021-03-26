import React from 'react';
import { map } from 'ramda';
import { makeStyles, Typography } from '@material-ui/core';

import { Link } from 'client/components/Link';
import { team } from './team';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: '64px',
    background: '#f7f9fa',
    padding: '10px 15px',
    borderRadius: '8px',
    [theme.breakpoints.down('md')]: {
      left: 'calc(50%)',
      transform: 'translate(-50%)',
    },
    [theme.breakpoints.down('sm')]: {
      left: 'calc(50%)',
      transform: 'translate(-50%)',
    },
  },
  team: {
    display: 'grid',
    grid: '1fr / repeat(4, 1fr)',
    gridColumnGap: theme.spacing(2),
    alignItems: 'center',
    justifyItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  copyright: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
    whiteSpace: 'nowrap',
  },
}));

export const Footer: React.FC = () => {
  const s = useStyles();

  return (
    <Typography className={s.root} variant="body1" component="footer">
      <section className={s.team}>
        {map(
          (person) => (
            <Link url={person.github} key={person.name} target="_blank">
              {person.name}
            </Link>
          ),
          team
        )}
      </section>
      <section className={s.copyright}>
        © 2021,{' '}
        <Link
          url="https://github.com/solid-happiness/stylish-cow"
          target="_blank"
        >
          solid-happiness
        </Link>
      </section>
    </Typography>
  );
};
