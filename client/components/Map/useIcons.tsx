import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { isEmpty, mapObjIndexed } from 'ramda';

import { ThemeProvider } from '@material-ui/core';
import {
  LocalGasStation as LocalGasStationIcon,
  Build as BuildIcon,
} from '@material-ui/icons';

import { GasStation } from 'client/typings';
import { theme } from 'client/components/theme';

const defaults: Record<GasStation['template'], React.ReactNode> = {
  built: <LocalGasStationIcon color="primary" fontSize="large" />,
  building: <BuildIcon color="primary" fontSize="default" />,
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
