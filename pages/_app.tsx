import { ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, useEffect } from 'react';
import theme from '../src/constants/theme';
import appMachine, { AppProvider } from '../src/machines/app/appMachine';
import { useMachine } from '@xstate/react';
import config from '../src/constants/config';
import DebugMenu from '../src/components/DebugMenu';
import '../src/utils/debug'; // Needed to make debug working
import CacheProvider from '../src/utils/cache';

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  const [, , service] = useMachine(appMachine, { devTools: config.isDebugEnabled });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider>
      <AppProvider value={service}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <DebugMenu />
        </ThemeProvider>
      </AppProvider>
    </CacheProvider>
  );
}
