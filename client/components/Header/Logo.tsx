import React, { useRef, useEffect } from 'react';
import { useTheme, useMediaQuery, makeStyles } from '@material-ui/core';

import cx from 'clsx';
import tippy from 'tippy.js';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.black,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.common.black,
    },
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 9999,
    [theme.breakpoints.down('sm')]: {
      top: 10,
      left: 10,
      zIndex: 99,
    },
  },
  box: {
    width: 50,
    height: 50,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    objectFit: 'cover',
  },
  '@global': {
    ".tippy-box[data-theme~='logo']": {
      background: 'linear-gradient(to right, #e3192d, #e94057, #f27121)',
      color: 'white',
      fontSize: '1.2rem',
      zIndex: 99,
    },
  },
}));

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const s = useStyles();
  const root = useRef<HTMLLinkElement>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const tooltip = tippy(root.current!, {
      placement: 'right',
      content: 'Лукойл на Марсе!',
      theme: 'logo',
      arrow: false,
      trigger: 'manual',
      hideOnClick: isMobile,
    });

    tooltip.show();
    return () => tooltip.destroy();
  }, [isMobile]);

  return (
    <a ref={root as any} className={cx(s.link, className)} href="/">
      <div className={s.box}>
        <img className={s.img} src="/logo.png" />
      </div>
    </a>
  );
};
