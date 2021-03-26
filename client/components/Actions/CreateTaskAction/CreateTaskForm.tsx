import React from 'react';
import {
  makeStyles,
  OutlinedInput,
  Button,
  Typography,
} from '@material-ui/core';

import { Formik, FormikProps } from 'formik';

import { Task } from 'client/typings';
import { useHandleSubmit } from './utils';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  root: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
  submit: {
    marginTop: theme.spacing(4),
  },
}));

type Props = {
  task?: Task;
};

export const CreateTaskForm: React.FC<Props> = ({ task }) => {
  const s = useStyles();
  const handleSubmit = useHandleSubmit();

  if (!task) {
    return null;
  }

  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h5">
        Постановка задачи
      </Typography>
      <Formik<Task> initialValues={task} onSubmit={handleSubmit}>
        {(formik: FormikProps<Task>) => {
          console.log('values', formik.values);

          return (
            <form className={s.form} onSubmit={formik.handleSubmit}>
              <OutlinedInput
                value={1}
                onChange={formik.handleChange}
                fullWidth
              />
              <Button
                className={s.submit}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Создать задачу
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
