import React, { useState } from 'react';
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  Drawer,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '90vw',
    margin: `${theme.spacing(2)}px 0`,
  },
  tooltip: {
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    boxShadow: theme.shadows[5],
  },
}));

type Props = {
  products: React.ReactElement;
};

export const Popup: React.FC<Props> = ({ children, products }) => {
  const s = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (isMobile) {
    return (
      <>
        <div onClick={() => setOpen(true)}>{children}</div>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          variant="temporary"
          anchor="right"
        >
          <div className={s.drawer}>{products}</div>
        </Drawer>
      </>
    );
  }

  return (
    <Tooltip
      interactive
      classes={{
        tooltip: s.tooltip,
      }}
      title={products}
    >
      <div>{children}</div>
    </Tooltip>
  );
};
