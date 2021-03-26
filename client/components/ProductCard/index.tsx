import React, { useRef, useState } from 'react';
import { useMount } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import Clipboard from 'clipboard';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import { toggleFavoriteProduct } from 'client/slices';
import { getFavoritesMap } from 'client/selectors';
import { Product } from 'client/typings';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
      width: '100%',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  content: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition:
      'box-shadow .3s ease-out, transform .3s ease-out, opacity .2s ease-out',
    transitionDelay: '.1s',
    borderRadius: '4px',
    transform: 'translateZ(0)',
    '&:hover': {
      textDecoration: 'none',
      opacity: '1 !important',
      boxShadow:
        'rgb(45 45 45 / 5%) 0px 2px 2px, rgb(49 49 49 / 5%) 0px 4px 4px, rgb(42 42 42 / 5%) 0px 8px 8px, rgb(32 32 32 / 5%) 0px 16px 16px, rgb(49 49 49 / 5%) 0px 32px 32px, rgb(35 35 35 / 5%) 0px 64px 64px',
      transform: 'translate(0, -4px)',
      zIndex: 999,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tooltip: {
    padding: '2px 4px',
  },
}));

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const s = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const favoritesMap = useSelector(getFavoritesMap);
  const share = useRef<HTMLButtonElement>();

  useMount(() => {
    const clipboard = new Clipboard(share.current!, {
      text: () => product.productUrl,
    });

    clipboard.on('success', () => {
      setOpen(true);

      setTimeout(() => setOpen(false), 2000);
    });
  });

  return (
    <a className={s.link} href={product.productUrl} target="_blank">
      <Card className={s.root}>
        <CardHeader
          avatar={<Avatar src={product.siteLogo} />}
          title={product.title}
          subheader={`Цена: ${product.price} ₽`}
        />
        <CardMedia className={s.media} image={product.imageUrl} />
        <CardContent className={s.content}>
          <Typography variant="body2" color="textSecondary" component="section">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="добавить товар в избранные"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              dispatch(toggleFavoriteProduct({ product }));
            }}
          >
            <FavoriteIcon
              color={favoritesMap[product.productUrl] ? 'secondary' : undefined}
            />
          </IconButton>
          <Tooltip
            open={open}
            title={
              <Typography className={s.tooltip} variant="body2">
                Ссылка скопирована в буфер обмена
              </Typography>
            }
          >
            <IconButton
              aria-label="скопировать ссылку"
              ref={share as any}
              onClick={(event: React.PointerEvent<HTMLButtonElement>) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              component="button"
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </a>
  );
};
