import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Checkbox,
  Link,
} from '@material-ui/core';
import { any, values, map } from 'ramda';

import { Company } from 'client/typings';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBlock: 8,
    zIndex: 1,
    background: '#f7f9fa',
    borderRadius: '16px',
    boxShadow: theme.shadows[1],
    margin: `${theme.spacing(4)}px 0`,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    margin: theme.spacing(2),
    marginBottom: 0,
  },
  primary: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  list: {
    position: 'relative',
  },
  link: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    right: '24px',
  },
}));

type Props = {
  companies: Company[];
  filters: Record<number | string, boolean>;
  toggleFilter: (id: number | string) => void;
  reverseSelectedFilters: () => void;
};

export const Filters: React.FC<Props> = ({
  companies,
  filters,
  toggleFilter,
  reverseSelectedFilters,
}) => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <Typography variant="body1" className={s.title}>
        Искать среди следующих <br /> партнёров:
      </Typography>
      <List className={s.list} dense>
        {map(
          (company) => (
            <ListItem key={company.id}>
              <ListItemAvatar>
                <Avatar src={company.logo} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className={s.primary}>
                    <p className={s.text}>{company.title}</p>
                    <div>
                      <Checkbox
                        color="primary"
                        checked={!!filters[company.id]}
                        onChange={() => toggleFilter(company.id)}
                      />
                    </div>
                  </div>
                }
                primaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
          ),
          companies
        )}
        <Link className={s.link} onClick={reverseSelectedFilters}>
          {any(Boolean, values(filters)) ? 'снять выделение' : 'выбрать все'}
        </Link>
      </List>
    </div>
  );
};
