import React from 'react';
import useForceUpdate from 'use-force-update';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import { Map as YMap, Placemark, withYMaps } from 'react-yandex-maps';
import { map } from 'ramda';

import { Snapshot } from 'client/typings';
import { setActiveSnapshot } from 'client/slices/snapshots';
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
  snapshot: Snapshot;
};

export const Map: React.ComponentType<any> = withYMaps(
  ({ ymaps, snapshot }: Props) => {
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
          <>
            {map((station) => {
              const { latitude, longitude } = station.location;

              return (
                <Placemark
                  key={station.id}
                  geometry={[latitude, longitude]}
                  options={{
                    hintContent: 'Метка с прямоугольным HTML макетом',
                    iconLayout: icons[station.state],
                    iconShape: {
                      type: 'Rectangle',
                      coordinates: [
                        [-25, -25],
                        [25, 25],
                      ],
                    },
                  }}
                  onClick={() =>
                    dispatch(
                      setActiveSnapshot({
                        snapshotId: snapshot.id,
                        stationId: station.id,
                      })
                    )
                  }
                />
              );
            }, snapshot?.fuelStations || [])}
            {map((tanker) => {
              const { latitude, longitude } = tanker.location;

              return (
                <Placemark
                  key={tanker.id}
                  geometry={[latitude, longitude]}
                  options={{
                    hintContent: 'Метка с прямоугольным HTML макетом',
                    iconLayout: icons.tanker,
                    iconShape: {
                      type: 'Rectangle',
                      coordinates: [
                        [-25, -25],
                        [25, 25],
                      ],
                    },
                  }}
                  onClick={() =>
                    dispatch(
                      setActiveSnapshot({
                        snapshotId: snapshot.id,
                        tankerId: tanker.id,
                      })
                    )
                  }
                />
              );
            }, snapshot?.tankers || [])}
          </>
        </YMap>
      </div>
    );
  }
);
