import React, { useRef, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import tippy from 'tippy.js';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  '@global': {
    ".tippy-box[data-theme~='bank']": {
      background: 'linear-gradient(to right, #e3192d, #e94057, #f27121)',
      color: 'white',
      zIndex: 99,
    },
  },
}));

export const Bank: React.FC<{ bank: number }> = ({ bank }) => {
  const s = useStyles();
  const bankRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tooltip = tippy(bankRef.current!, {
      placement: 'right',
      content: 'Текущий банк',
      theme: 'bank',
      arrow: false,
    });

    return () => tooltip.destroy();
  }, []);

  return (
    <Typography className={s.root} ref={bankRef} variant="body1">
      {bank}₽
    </Typography>
  );
};
