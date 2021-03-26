import React, { forwardRef } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    background: `linear-gradient(to bottom, #f27121 0%, #f27121 100%)`,
    backgroundPosition: '0 100%',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '2px 2px',
    color: theme.palette.common.black,
    textDecoration: 'none',
    transition: 'background-size .2s',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
    outline: 'none',
    '&:hover': {
      backgroundSize: '4px 50px',
      color: theme.palette.common.white,
      textDecoration: 'none',
    },
  },
}));

type Props = {
  url?: string;
  target?: '_blank';
  className?: string;
  onClick?: () => unknown;
  ref?: any;
};

export const Link: React.FC<Props> = forwardRef(
  ({ url, children, target, className, onClick }, ref) => {
    const s = useStyles();
    const Component = url ? 'a' : 'button';

    return (
      <Component
        ref={ref as any}
        className={cx(s.link, className)}
        href={url}
        target={target}
        onClick={onClick}
      >
        {children}
      </Component>
    );
  }
);
