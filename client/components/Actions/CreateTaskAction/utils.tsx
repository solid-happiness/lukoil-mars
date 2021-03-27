import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';
import { head } from 'ramda';

import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import {
  showSnackbar,
  hideSnackbar,
  setSnapshots,
  setActiveSnapshot,
  setTask,
} from 'client/slices';
import { makeRequest } from 'client/features/request';

import { Snapshot, Task } from 'client/typings';
import { getCSRFToken } from 'client/utils';

const useStyles = makeStyles((theme) => ({
  alert: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows[1],
  },
}));

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
        const response = await makeRequest.post<{
          emulate: { id: number; snapshots: Snapshot[] };
        }>('/api/emulate/', JSON.stringify(values), {
          headers: {
            'X-CSRFToken': await getCSRFToken(),
            'Content-Type': 'application/json',
          },
        });

        const { emulate } = response.data;

        dispatch(setTask({ task: { ...values, emulateId: emulate.id } }));
        dispatch(setSnapshots({ snapshots: emulate.snapshots }));
        dispatch(
          setActiveSnapshot({ snapshotId: head(emulate.snapshots)?.id })
        );

        dispatch(
          showSnackbar({
            message: (
              <Alert
                severity="success"
                variant="filled"
                onClose={() => dispatch(hideSnackbar())}
              >
                Задача успешно решена!
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
                variant="filled"
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
