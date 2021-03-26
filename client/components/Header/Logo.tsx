import React, { useRef } from 'react';
import { useMount } from 'react-use';

import cx from 'clsx';
import tippy from 'tippy.js';
import { makeStyles } from '@material-ui/core';

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
    zIndex: 1,
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
      background: 'linear-gradient(to right, #8a2387, #e94057, #f27121)',
      color: 'white',
      fontSize: '1.2rem',
    },
  },
}));

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const s = useStyles();
  const root = useRef<HTMLLinkElement>();

  useMount(() => {
    tippy(root.current!, {
      placement: 'right',
      content: 'Лукойл на Марсе!',
      theme: 'logo',
      arrow: false,
    });
  });

  return (
    <a ref={root as any} className={cx(s.link, className)} href="/">
      <div className={s.box}>
        <img className={s.img} src="/logo.png" />
      </div>
    </a>
  );
};
