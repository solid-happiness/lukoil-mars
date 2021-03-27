import React, { useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import memoizeOne from 'memoize-one';
import cx from 'clsx';

import {
  makeStyles,
  ClickAwayListener,
  Fab as FabBase,
} from '@material-ui/core';

import { Add as AddIcon } from '@material-ui/icons';

import { CreateTaskAction } from './CreateTaskAction';
import { InfoAction } from './InfoAction';
import { IntroAction } from './IntroAction';

import { useContainerStyles, useFadeTransition } from './common';
import { ReducerActionsState, ReducerAction, ReducerActionType } from './types';

const Fab = animated(FabBase);

const useStyles = makeStyles((theme) => ({
  close: {
    backgroundColor: (state: ReducerActionsState) => {
      if (state.open) {
        return theme.palette.primary.main;
      }

      return theme.palette.primary.light;
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const getTransform = memoizeOne(
  (state: { open: boolean; hovered: boolean }) => {
    const { open, hovered } = state;
    if (open) {
      return 'scale(1.2) rotate(45)';
    }

    if (hovered) {
      return 'scale(1.2) rotate(0deg)';
    }

    return 'scale(1) rotate(0deg)';
  }
);

const reducer = (state: ReducerActionsState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case ReducerActionType.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case ReducerActionType.SET_HOVERED:
      return {
        ...state,
        hovered: action.payload,
      };
    default:
      return state;
  }
};

export const Actions: React.FC = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    {
      open: false,
      active: false,
      hovered: false,
    },
    (initial) => ({
      ...initial,
      active: true,
    })
  );

  const fab = useSpring({
    transform: getTransform(state),
    from: { transform: 'scale(1) rotate(0deg)' },
  });

  const handleFocus = useCallback(
    () =>
      dispatch({
        type: ReducerActionType.SET_HOVERED,
        payload: true,
      }),
    []
  );

  const handleBlur = useCallback(
    () =>
      dispatch({
        type: ReducerActionType.SET_HOVERED,
        payload: false,
      }),
    []
  );

  const handleClick = useCallback(
    () =>
      dispatch({
        type: ReducerActionType.SET_OPEN,
        payload: !state.open,
      }),
    [state.open]
  );

  const commonClasses = useContainerStyles(state);
  const classes = useStyles(state);

  const getIntroTransform = useFadeTransition({
    index: 1,
    open: state.open,
  });

  const getInfoActionTransform = useFadeTransition({
    index: 2,
    open: state.open,
  });

  const getCreateTaskActionTransform = useFadeTransition({
    index: 3,
    open: state.open,
  });

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (state.open) {
          handleClick();
        }
      }}
    >
      <div>
        <Fab
          style={fab}
          color="primary"
          size="medium"
          className={cx(commonClasses.container, classes.close)}
          onMouseOver={handleFocus}
          onMouseOut={handleBlur}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        >
          <AddIcon fontSize="small" />
        </Fab>
        <IntroAction
          className={commonClasses.open}
          getTransform={getIntroTransform}
        />
        <InfoAction
          className={commonClasses.open}
          getTransform={getInfoActionTransform}
        />
        <CreateTaskAction
          className={commonClasses.open}
          getTransform={getCreateTaskActionTransform}
          onClose={() =>
            dispatch({
              type: ReducerActionType.SET_OPEN,
              payload: false,
            })
          }
        />
      </div>
    </ClickAwayListener>
  );
};
