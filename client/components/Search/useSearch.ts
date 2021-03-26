import { useState, useEffect, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useLatest } from 'react-use';
import {
  any,
  values,
  isEmpty,
  reduce,
  keys,
  filter,
  join,
  mapObjIndexed,
} from 'ramda';

import { debounce } from 'throttle-debounce';
import axios from 'axios';

import { Product, Company } from 'client/typings';
import { SortOption } from './constants';

export const useSearch = (params: { value: string; companies: Company[] }) => {
  const { value, companies } = params;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string | Product[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.RATING);
  const [filters, setFilters] = useState(
    {} as Record<number | string, boolean>
  );

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(
    () =>
      setFilters({
        ...filters,
        ...reduce(
          (acc, company) => ({ [company.id]: true, ...acc }),
          {},
          companies
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [companies]
  );

  const state = useLatest({ value });

  const load = useCallback(
    debounce(
      300,
      async (
        input: undefined | string,
        filters: Record<number | string, boolean>
      ) => {
        if (!input) {
          setLoading(false);
          setProducts([]);

          return;
        }

        setLoading(true);

        const apis = filter((filter) => !!filters[filter], keys(filters));
        const response = await axios
          .get<{ payload: Product[] }>('/api/search', {
            params: {
              query: input,
              apis: isEmpty(apis) || isTablet ? undefined : join(',', apis),
            },
          })
          .catch(() => ({
            data: { payload: [] },
          }));

        if (input !== state.current.value) {
          return;
        }

        const result = (await response.data?.payload) || [];

        if (isEmpty(result)) {
          setProducts('empty');
        } else {
          setProducts(result);
        }

        setLoading(false);
      }
    ),
    []
  );

  return {
    loading,
    load,
    products,
    sortOption,
    setSortOption,
    filters,
    toggleFilter: (id: number | string) => {
      const resulted = { ...filters, [id]: !filters[id] };
      setFilters(resulted);

      load(value, resulted);
    },
    reverseSelectedFilters: () => {
      const hasCheckedFilter = any((value) => !!value, values(filters));
      const resulted = mapObjIndexed(() => !hasCheckedFilter, filters);
      setFilters(resulted);

      load(value, resulted);
    },
  };
};
