import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'grid',
    alignItems: 'start',
    justifyItems: 'center',
    minHeight: 'calc(100vh - 74px)',
    [theme.breakpoints.up('lg')]: {
      grid: '1fr / 0.25fr 0.75fr',
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      position: 'relative',
    },
    '@media (min-width: 1800px)': {
      grid: '1fr / 0.5fr 1fr 0.5fr',
    },
  },
  images: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    objectFit: 'cover',
    height: 'calc(100vh - 74px)',
    pointerEvents: 'none',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    objectFit: 'cover',
    height: 'calc(100vh - 74px)',
    animationName: '$search-background-fade-in-out',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDuration: '16s',
    pointerEvents: 'none',
  },
  '@global': {
    '#search-background img:nth-of-type(1)': {
      animationDelay: '2s',
    },
    '#search-background img:nth-of-type(2)': {
      animationDelay: '6s',
    },
    '#search-background img:nth-of-type(3)': {
      animationDelay: '8s',
    },
    '#search-background img:nth-of-type(4)': {
      animationDelay: '12s',
    },
  },
  '@keyframes search-background-fade-in-out': {
    '0%': {
      opacity: 1,
    },
    '17%': {
      opacity: 1,
    },
    '25%': {
      opacity: 0,
    },
    '92%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

export const Background: React.FC = ({ children }) => {
  const s = useStyles();

  return (
    <section className={s.root}>
      <div className={s.images} id="search-background">
        <img className={s.background} src="/search/b1.jpg" />
        <img className={s.background} src="/search/b2.jpg" />
        <img className={s.background} src="/search/b3.webp" />
        <img className={s.background} src="/search/b4.jpg" />
      </div>
      {children}
    </section>
  );
};
