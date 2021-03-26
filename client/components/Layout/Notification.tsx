import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { hideSnackbar } from 'client/slices/snackbar';
import { AppState } from 'client/typings';

export const Notification = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: AppState) => state.snackbar);

  const content = useMemo(() => {
    if (snackbar.type === 'default') {
      return (
        <SnackbarContent
          message={<Typography variant="body1">{snackbar.message}</Typography>}
          action={
            <IconButton
              color="inherit"
              onClick={() => dispatch(hideSnackbar())}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      );
    }

    return snackbar.message;
  }, [dispatch, snackbar]);

  if (!snackbar.message) {
    return null;
  }

  return (
    <Snackbar
      open={snackbar.open}
      anchorOrigin={snackbar.anchor}
      onClose={() => dispatch(hideSnackbar())}
      autoHideDuration={5000}
    >
      {content as any}
    </Snackbar>
  );
};
