import React from 'react';
import { makeStyles, Button, CircularProgress } from '@material-ui/core';
import { Task } from 'client/typings';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  root: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
  submit: {
    marginTop: theme.spacing(4),
  },
  input: {
    marginTop: theme.spacing(2),
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}));

type Props = {
  task?: Task;
  isSubmitting?: boolean;
};

export const Submit: React.FC<Props> = ({ task, isSubmitting }) => {
  const s = useStyles();

  if (isSubmitting) {
    return (
      <Button
        className={s.submit}
        type="submit"
        variant="outlined"
        color="primary"
        disabled
      >
        <CircularProgress size={25} />
      </Button>
    );
  }

  return (
    <Button
      className={s.submit}
      type="submit"
      variant="outlined"
      color="primary"
    >
      {task?.snapshotId ? 'Редактировать задачу' : 'Создать задачу'}
    </Button>
  );
};
