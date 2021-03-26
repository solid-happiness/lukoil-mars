import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { YMaps } from 'react-yandex-maps';

import { store } from 'client/store';
import { theme } from 'client/components/theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Лукойл на Марсе</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <YMaps
        query={{
          apikey: '5dc68920-7776-4230-8d65-236f29843f50',
          lang: 'ru_RU',
        }}
      >
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </YMaps>
    </>
  );
};

export default App;
