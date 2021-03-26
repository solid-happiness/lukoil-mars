import React from 'react';
import useForceUpdate from 'use-force-update';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Map as YMap, Placemark, withYMaps } from 'react-yandex-maps';
import { map } from 'ramda';

import { toggleActive } from 'client/slices/gasStations';
import { GasStation } from 'client/typings';
import { useIcons } from './useIcons';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
}));

type Props = {
  ymaps: any;
  stations: GasStation[];
};

export const Map: React.ComponentType<any> = withYMaps(
  ({ ymaps, stations }: Props) => {
    const s = useStyles();
    const dispatch = useDispatch();
    const forceUpdate = useForceUpdate();
    const icons = useIcons(ymaps);

    return (
      <div className={s.root}>
        <YMap
          className={s.map}
          defaultState={{
            center: [55.76085909, 37.58151165],
            zoom: 10,
            type: 'yandex#map',
          }}
          modules={['templateLayoutFactory']}
          onLoad={() => forceUpdate()}
          defaultOptions={{
            autoFitToViewport: 'always',
          }}
        >
          {map((station) => {
            if (!icons[station.template]) {
              return null;
            }

            return (
              <Placemark
                key={station.id}
                geometry={station.location}
                options={{
                  hintContent: 'Метка с прямоугольным HTML макетом',
                  iconLayout: icons[station.template],
                  // Описываем фигуру активной области "Прямоугольник".
                  iconShape: {
                    type: 'Rectangle',
                    // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                    coordinates: [
                      [-25, -25],
                      [25, 25],
                    ],
                  },
                }}
                onClick={() => dispatch(toggleActive({ id: station.id }))}
              />
            );
          }, stations)}
        </YMap>
      </div>
    );
  }
);
