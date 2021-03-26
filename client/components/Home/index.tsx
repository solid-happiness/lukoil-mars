import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';

import { Map } from 'client/components/Map';
import { ActiveStation } from 'client/components/ActiveStation';
import { Actions } from 'client/components/Actions';

import { getGasStations } from 'client/selectors';

export const Home: React.FC = () => {
  const stations = useSelector(getGasStations);

  if (isEmpty(stations)) {
    return null;
  }

  return (
    <>
      <ActiveStation />
      <Actions />
      <Map stations={stations} />
    </>
  );
};
