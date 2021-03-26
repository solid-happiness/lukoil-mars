import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    '&:before': {
      content: '""',
      width: '8px',
      height: '8px',
      position: 'absolute',
      top: '34%',
      right: '-16px',
      background: (props: { type: 'asc' | 'desc' }) =>
        props.type === 'asc'
          ? 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM2NTY1NjUiPjxwYXRoIGQ9Ik0wIDBoNHYySDB6bTAgM2g2djJIMHptMCAzaDh2MkgweiIvPjwvc3ZnPg==) no-repeat'
          : 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM2NTY1NjUiPjxwYXRoIGQ9Ik0wIDZoNHYySDB6bTAtM2g2djJIMHptMC0zaDh2MkgweiIvPjwvc3ZnPg==) no-repeat',
    },
  },
}));

type Props = {
  type: 'asc' | 'desc';
};

export const PriceFilter: React.FC<Props> = ({ type, children }) => {
  const s = useStyles({ type });

  return <span className={s.root}>{children}</span>;
};
