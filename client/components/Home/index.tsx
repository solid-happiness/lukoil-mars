import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { isEmpty } from 'ramda';

import { Map } from 'client/components/Map';
import { ActiveStation } from 'client/components/ActiveStation';
import { Actions } from 'client/components/Actions';

import { loadGasStations } from 'client/slices';
import { getGasStations } from 'client/selectors';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const stations = useSelector(getGasStations);

  useMount(() => dispatch(loadGasStations()));

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
