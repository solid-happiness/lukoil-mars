import React, { useRef, useState } from 'react';
import { map, isEmpty } from 'ramda';
import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';

import { Product } from 'client/typings';
import { Link } from 'client/components/Link';
import { SortOption, sortOptions, sortOptionsNameMap } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '-36px',
    right: '60px',
    [theme.breakpoints.down('md')]: {
      right: '64px',
    },
    [theme.breakpoints.down('sm')]: {
      top: '-32px',
      right: '15px',
    },
  },
  type: {
    padding: '0 4px',
  },
}));

type Props = {
  products: string | Product[];
  sortOption: SortOption;
  setSortOption: (sortOption: SortOption) => unknown;
};

export const Sort: React.FC<Props> = ({
  sortOption,
  products,
  setSortOption,
}) => {
  const s = useStyles();
  const [open, setOpen] = useState(false);
  const filterRef = useRef();

  if (typeof products === 'string' || isEmpty(products)) {
    return null;
  }

  return (
    <Typography component="div" variant="body1" className={s.root}>
      Сортировать по{' '}
      <Link ref={filterRef} onClick={() => setOpen(true)} className={s.type}>
        <Typography variant="body1">
          {sortOptionsNameMap[sortOption]}
        </Typography>
      </Link>
      <Menu
        anchorEl={filterRef.current}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
      >
        {map(
          (filter) => (
            <MenuItem
              key={filter.name}
              onClick={() => {
                setOpen(false);
                setSortOption(filter.value);
              }}
            >
              {filter.name}
            </MenuItem>
          ),
          sortOptions
        )}
      </Menu>
    </Typography>
  );
};
