import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { showSnackbar, hideSnackbar, setSnapshots } from 'client/slices';
import { makeRequest } from 'client/features/request';

import { Task } from 'client/typings';
import { getCSRFToken } from 'client/utils';

const useStyles = makeStyles({
  alert: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Params = {
  handleClose: () => void;
};

export const useHandleSubmit = (params: Params) => {
  const s = useStyles();
  const { handleClose } = params;
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (values: Task, actions: FormikHelpers<Task>) => {
      try {
        const { data } = await makeRequest.post<{ snapshots: [] }>(
          '/api/emulate/',
          JSON.stringify(values),
          {
            headers: {
              'X-CSRFToken': await getCSRFToken(),
              'Content-Type': 'application/json',
            },
          }
        );

        dispatch(setSnapshots({ snapshots: data.snapshots }));

        dispatch(
          showSnackbar({
            message: (
              <Alert
                severity="success"
                onClose={() => dispatch(hideSnackbar())}
              >
                Задача успешно создана
              </Alert>
            ),
            type: 'alert',
          })
        );

        actions.resetForm();
        handleClose();
      } catch (err) {
        dispatch(
          showSnackbar({
            message: (
              <Alert
                className={s.alert}
                severity="error"
                onClose={() => dispatch(hideSnackbar())}
              >
                Не удалось создать задачу
              </Alert>
            ),
            type: 'alert',
          })
        );

        actions.setSubmitting(false);
      }
    },
    [s, dispatch, handleClose]
  );

  return handleSubmit;
};
