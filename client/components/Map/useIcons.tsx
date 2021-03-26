import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { isEmpty, mapObjIndexed } from 'ramda';

import { ThemeProvider } from '@material-ui/core';
import {
  LocalGasStation as LocalGasStationIcon,
  Build as BuildIcon,
} from '@material-ui/icons';

import { FuelStation } from 'client/typings';
import { theme } from 'client/components/theme';

import { TankerIcon } from './TankerIcon';

const defaults: Record<FuelStation['state'] | 'tanker', React.ReactNode> = {
  ready: <LocalGasStationIcon color="primary" fontSize="large" />,
  building: <BuildIcon color="primary" fontSize="default" />,
  tanker: <TankerIcon />,
};

export const useIcons = (ymaps: any) => {
  const [icons, set] = useState({} as Record<string, unknown>);

  useEffect(() => {
    if (!isEmpty(icons) || !ymaps?.templateLayoutFactory) {
      return;
    }

    set(
      mapObjIndexed(
        (icon) =>
          ymaps.templateLayoutFactory.createClass(
            renderToString(<ThemeProvider theme={theme}>{icon}</ThemeProvider>)
          ),
        defaults
      )
    );
  }, [icons, ymaps, ymaps?.templateLayoutFactory]);

  return icons;
};
