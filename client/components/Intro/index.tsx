import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useKey } from 'react-use';
import { CODE_ESCAPE } from 'keycode-js';

import { hideIntro } from 'client/slices';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'black',
    zIndex: 999999,
  },
  fade: {
    position: 'relative',
    width: '100%',
    minHeight: '60vh',
    top: '-25px',
    backgroundImage: 'linear-gradient(0deg, transparent, black 75%)',
    zIndex: 1,
  },
  starWars: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    height: '800px',
    color: '#e3192d',
    fontFamily: "'Pathway Gothic One', sans-serif",
    fontSize: '500%',
    fontWeight: 'bold',
    letterSpacing: '6px',
    lineHeight: '150%',
    perspective: '400px',
    textAlign: 'justify',
  },
  '@global': {
    '.crawl': {
      position: 'relative',
      top: '99999px',
      transformOrigin: '50% 100%',
      animation: 'crawl 60s linear',
    },
    '.crawl > .title': {
      fontSize: '90%',
      textAlign: 'center',
    },
    '.crawl > .title h1': {
      margin: '0 0 100px',
      textTransform: 'uppercase',
    },
    '@keyframes crawl': {
      '0%': {
        top: '-100px',
        transform: 'rotateX(20deg)  translateZ(0)',
      },
      '100%': {
        top: '-6000px',
        transform: 'rotateX(25deg) translateZ(-2500px)',
      },
    },
  },
}));

export const Intro: React.FC = () => {
  const s = useStyles();

  const dispatch = useDispatch();
  useKey(CODE_ESCAPE, () => dispatch(hideIntro()));

  return (
    <div className={s.root}>
      <div className={s.fade} />
      <section className={s.starWars}>
        <div className="crawl">
          <div className="title">
            <p>BEB РАЗРАБОТКА</p>
            <h1>Постановка задачи</h1>
          </div>
          <p>
            Представим ситуацию: Илон таки колонизировал Марс, и людям открылся
            новый вид топлива. Лукойл получил его одним из первых, но открылась
            новая проблема: по-скольку спрос на топливо необычайно велик,
            необходимо продумать стратегию масштабирования компании (увеличения
            количества АЗС, поставок топлива, наема новых сотрудников) с учетом
            того, что поставки крайне нестабильны и возможна ситуация, когда
            топлива нет по полгода.
          </p>
          <p>
            В таком случае нужно минимизировать убытки. По условию, нет проблем
            с маркетингом, так что заправки всегда заполнены клиен- тами.
          </p>
          <p>
            Единственное, что может помешать продаже топлива – это его нехватка
            на конкретной АЗС (которая вызвана отсутствием поставок с хранилища,
            которая, в свою очередь, вызвана решением о прекращении поставок
            либо опустением храни- лища)...
          </p>
        </div>
      </section>
    </div>
  );
};
