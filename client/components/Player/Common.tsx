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

type Props = {
  bank: number;
  result?: number;
  iteration: string;
};

export const Common: React.FC<Props> = ({ bank, result, iteration }) => {
  const s = useStyles();
  const bankRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    tippy(bankRef.current!, {
      placement: 'right',
      allowHTML: true,
      content: `
        Текущий банк
        <br>
        Итерация: ${iteration}
        <br>
        Результат: ${Math.round(result! * 100) / 100}₽
      `,
      theme: 'bank',
      arrow: false,
    });
  }, [result, iteration]);

  return (
    <Typography className={s.root} ref={bankRef} variant="body1">
      {Math.round(bank * 100) / 100}₽
    </Typography>
  );
};
