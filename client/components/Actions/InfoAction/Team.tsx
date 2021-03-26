import React from 'react';
import { map } from 'ramda';
import { makeStyles, Typography } from '@material-ui/core';

import { Link } from 'client/components/Link';
import { members } from './members';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  team: {
    display: 'flex',
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
  },
  person: {
    marginRight: theme.spacing(1),
  },
}));

export const Team: React.FC = () => {
  const s = useStyles();

  return (
    <Typography className={s.root} variant="body1" component="footer">
      <section className={s.team}>
        {map(
          (person) => (
            <Link
              className={s.person}
              url={person.github}
              key={person.name}
              target="_blank"
            >
              {person.name}
            </Link>
          ),
          members
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
