import React from 'react';
import { useSelector } from 'react-redux';

import { Map } from 'client/components/Map';
import { ActiveStation } from 'client/components/ActiveStation';
import { Actions } from 'client/components/Actions';
import { Player } from 'client/components/Player';

import { getActiveSnapshot } from 'client/selectors';

export const Home: React.FC = () => {
  const snapshot = useSelector(getActiveSnapshot);

  return (
    <>
      <ActiveStation />
      <Actions />
      <Map snapshot={snapshot} />
      <Player />
    </>
  );
};
