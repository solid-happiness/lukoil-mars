import React, { useState, useRef } from 'react';
import { useMount } from 'react-use';
import { makeStyles, TextField } from '@material-ui/core';

import { Footer } from 'client/components/Footer';
import { ProductsList } from 'client/components/ProductsList';
import { Company } from 'client/typings';

import { Sort } from './Sort';
import { Background } from './Background';
import { Filters } from './Filters';
import { useSearch } from './useSearch';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minHeight: '196px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    background: '#f7f9fa',
    borderRadius: '16px',
    boxShadow: theme.shadows[1],
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    justifySelf: 'stretch',
    alignSelf: 'baseline',
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(4),
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minHeight: 'unset',
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
  },
  search: {
    width: '100%',
    padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(0)}px ${theme.spacing(4)}px`,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  label: {
    fontSize: '1.15rem',
  },
  input: {
    fontSize: '2rem',
  },
}));

type Props = {
  companies: Company[];
};

export const Search: React.FC<Props> = ({ companies }) => {
  const s = useStyles();

  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>();

  const {
    loading,
    load,
    products,
    sortOption,
    setSortOption,
    filters,
    toggleFilter,
    reverseSelectedFilters,
  } = useSearch({ value, companies });

  useMount(() => {
    setTimeout(() => {
      if (!input.current) {
        return;
      }

      input.current.focus();
    }, 1000);
  });

  return (
    <Background>
      <Filters
        companies={companies}
        filters={filters}
        toggleFilter={toggleFilter}
        reverseSelectedFilters={reverseSelectedFilters}
      />
      <div className={s.container}>
        <div className={s.search}>
          <TextField
            label="Начните искать товары..."
            variant="standard"
            size="medium"
            InputProps={{
              classes: {
                root: s.input,
              },
            }}
            InputLabelProps={{
              classes: {
                root: s.label,
              },
            }}
            fullWidth
            inputRef={input}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              load(event.target.value, filters);
            }}
          />
        </div>
        <ProductsList
          input={value}
          loading={loading}
          sortOption={sortOption}
          products={products}
        >
          <Sort
            products={products}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </ProductsList>
      </div>
      <Footer />
    </Background>
  );
};
