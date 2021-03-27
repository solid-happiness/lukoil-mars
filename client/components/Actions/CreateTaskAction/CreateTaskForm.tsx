import React from 'react';
import { map } from 'ramda';
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { Formik, FormikProps } from 'formik';

import { Task } from 'client/typings';

import { fields } from './fields';
import { useHandleSubmit } from './utils';

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
  handleClose: () => void;
};

export const CreateTaskForm: React.FC<Props> = ({ task, handleClose }) => {
  const s = useStyles();
  const handleSubmit = useHandleSubmit({ handleClose });

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
          const { values, handleChange, isSubmitting } = formik;

          return (
            <form className={s.form} onSubmit={formik.handleSubmit}>
              {map(
                (field) => (
                  <TextField
                    className={s.input}
                    key={field.name}
                    name={field.name}
                    value={values[field.name]}
                    onChange={handleChange}
                    label={field.title}
                    disabled={!field.editableOnSnapshot && task.snapshotId}
                    variant="outlined"
                    fullWidth
                  />
                ),
                fields
              )}
              <Button
                className={s.submit}
                disabled={isSubmitting}
                type="submit"
                variant="outlined"
                color="primary"
              >
                {isSubmitting ? (
                  <CircularProgress size={25} />
                ) : (
                  'Создать задачу'
                )}
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
