import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, useEffect } from 'react';
import theme from '../src/constants/theme';
import createCache from '@emotion/cache';
import { AppProvider } from '../src/contexts/app/appContext';

export const cache = createCache({ key: 'css', prepend: true });

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <AppProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppProvider>
    </CacheProvider>
  );
}
