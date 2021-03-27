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

export const Bank: React.FC<{ bank: number; result?: number }> = ({
  bank,
  result,
}) => {
  const s = useStyles();
  const bankRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tooltip = tippy(bankRef.current!, {
      placement: 'right',
      allowHTML: true,
      content: `
        Текущий банк
        <br>
        Результат: ${result}₽
      `,
      theme: 'bank',
      arrow: false,
    });

    return () => tooltip.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Typography className={s.root} ref={bankRef} variant="body1">
      {bank}₽
    </Typography>
  );
};
