import React, { forwardRef, useCallback } from 'react';
import { once } from 'ramda';
import cx from 'clsx';

import { useSpring, animated } from 'react-spring';

import { useContainerStyles } from './common';

export type Props = {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  getTransform?: (state: { hovered: boolean }) => any;
  className?: string;
  ref?: any;
};

const AnimatedFab = animated.div;

const defaultTransform = (state: { hovered: boolean }) => {
  if (state.hovered) {
    return {
      transform: 'scale(1.2)',
    };
  }

  return {
    transform: 'scale(1)',
  };
};

export const Action: React.FC<Props> = forwardRef((props, ref) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const { getTransform = defaultTransform } = props;

  const initialTransform = useCallback(once(getTransform), []);

  const fab = useSpring({
    ...getTransform({ hovered }),
    from: initialTransform({ hovered }),
  });

  const handleActive = useCallback(() => setHovered(true), []);
  const handleBlur = useCallback(() => setHovered(false), []);
  const classes = useContainerStyles({});

  const { children, onClick, className = '' } = props;

  return (
    <AnimatedFab
      style={fab}
      className={cx(classes.container, className)}
      onMouseOver={handleActive}
      onMouseOut={handleBlur}
      onFocus={handleActive}
      onBlur={handleBlur}
      onClick={onClick}
      ref={ref as any}
    >
      {children as React.ReactElement}
    </AnimatedFab>
  );
});
