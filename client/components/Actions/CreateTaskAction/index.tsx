import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { head } from 'ramda';
import { makeStyles, Fab, Drawer } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import cx from 'clsx';

import { Create as CreateIcon } from '@material-ui/icons';
import { Action, Props as ActionProps } from 'client/components/Actions/Action';

import { setTask, showTaskForm, hideTaskForm } from 'client/slices';
import { getTask, isTaskFormVisible } from 'client/selectors';
import { Task } from 'client/typings';

import { CreateTaskForm } from './CreateTaskForm';

const useStyles = makeStyles((theme) => ({
  fab: {
    background: '#f27121 !important',
  },
  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  icon: {
    outline: 'none',
  },
  outer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  drawer: {
    minWidth: '300px',
    background: 'linear-gradient(to bottom, #ffffff, #fffef6);',
    borderRadius: '8px',
    boxShadow: '0 2px 6px 0 rgb(0 0 0 / 20%)',
    fontSize: '14px',
    lineHeight: '16px',
    right: theme.spacing(4),
    top: theme.spacing(8),
    bottom: theme.spacing(8),
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
      width: '90vw',
      right: 0,
      top: theme.spacing(2),
      bottom: theme.spacing(0),
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

type Props = {
  className?: string;
  getTransform?: ActionProps['getTransform'];
  onClose: () => void;
};

export const CreateTaskAction: React.FC<Props> = ({
  className = '',
  getTransform,
  onClose,
}) => {
  const s = useStyles();
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => {
      const configFile = head(files);
      if (!configFile) {
        return null;
      }

      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const content = event?.target?.result;
        if (!content) {
          return;
        }

        const task: Task = JSON.parse(String(content));

        dispatch(showTaskForm());
        dispatch(setTask({ task }));

        onClose();
      });

      reader.readAsText(configFile);
    },
  });

  const task = useSelector(getTask);
  const formVisible = useSelector(isTaskFormVisible);

  return (
    <>
      <Action className={className} getTransform={getTransform}>
        <Fab
          color="primary"
          size="medium"
          className={cx(s.outer, s.fab)}
          {...(getRootProps() as any)}
        >
          <CreateIcon className={s.icon} fontSize="small" />
          <input {...getInputProps()} />
        </Fab>
      </Action>
      <Drawer
        open={formVisible}
        onClose={() => dispatch(hideTaskForm())}
        classes={{
          paper: s.drawer,
        }}
        variant="temporary"
        anchor="right"
      >
        <CreateTaskForm
          task={task}
          handleClose={() => dispatch(hideTaskForm())}
        />
      </Drawer>
    </>
  );
};
