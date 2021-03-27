import React, { useState } from 'react';
import { head } from 'ramda';
import { makeStyles, Fab, Drawer } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import cx from 'clsx';

import { Create as CreateIcon } from '@material-ui/icons';
import { Action, Props as ActionProps } from 'client/components/Actions/Action';

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
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Task>();

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

        const task = JSON.parse(String(content));

        setOpen(true);
        setTask(task);

        onClose();
      });

      reader.readAsText(configFile);
    },
  });

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
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: s.drawer,
        }}
        variant="temporary"
        anchor="right"
      >
        <CreateTaskForm
          task={task}
          handleClose={() => {
            setOpen(false);
            setTask(undefined);
          }}
        />
      </Drawer>
    </>
  );
};
