import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gutter: {
    marginTop: theme.spacing(2),
  },
  paragraph: {
    marginTop: theme.spacing(1),
  },
  title: {
    display: 'inline',
  },
}));

type Props = {
  title: string;
  gutter?: boolean;
};

export const Row: React.FC<Props> = ({ title, children, gutter }) => {
  const s = useStyles();

  return (
    <Typography
      className={gutter ? s.gutter : s.paragraph}
      variant="body1"
      component="div"
    >
      <Typography className={s.title} variant="body1">
        {title}
        {': '}
      </Typography>{' '}
      {children}
    </Typography>
  );
};
