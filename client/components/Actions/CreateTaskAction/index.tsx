import React, { useState } from 'react';
import { head } from 'ramda';
import { makeStyles, Drawer } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import cx from 'clsx';

import { Create as CreateIcon } from '@material-ui/icons';
import { Fab, Props as FabProps } from 'client/components/Actions/Fab';

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
  },
}));

type Props = {
  className?: string;
  getTransform?: FabProps['getTransform'];
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
      <Fab className={cx(className, s.fab)} getTransform={getTransform}>
        <div className={s.outer} {...getRootProps()}>
          <CreateIcon className={s.icon} fontSize="small" />
          <input {...getInputProps()} />
        </div>
      </Fab>
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
