import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

export const useContainerStyles = makeStyles({
  container: {
    position: 'fixed',
    right: '30px',
    bottom: '30px',
    zIndex: 5,
  },
  open: {
    display: (state: { open?: boolean }) => (state.open ? 'flex' : 'none'),
  },
});

export const useFadeTransition = (props: { index: number; open: boolean }) => {
  const { index, open } = props;

  const getTransform = React.useCallback(
    (state: { hovered: boolean }) => {
      const bottom = 48 * (index - 1) + 30 * index + 70;

      if (open && state.hovered) {
        return {
          transform: 'scale(1.2)',
          bottom,
          opacity: 1,
        };
      }

      if (open) {
        return {
          transform: 'scale(1)',
          bottom,
          opacity: 1,
        };
      }

      return {
        transform: 'scale(1)',
        bottom: 40,
        opacity: 0,
      };
    },
    [open, index]
  );

  return getTransform;
};
