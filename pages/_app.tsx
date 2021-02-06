import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, useEffect } from 'react';
import theme from '../src/constants/theme';
import createCache from '@emotion/cache';
import appMachine, { AppServiceType } from '../src/machines/app/appMachine';
import { useMachine } from '@xstate/react';
import { inspect } from '@xstate/inspect';

if (typeof window !== 'undefined') {
  inspect({
    iframe: false
  });
}

export const cache = createCache({ key: 'css', prepend: true });
export const AppContext = React.createContext<AppServiceType>(undefined);

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;
  const [, , service] = useMachine(appMachine, { devTools: true });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <AppContext.Provider value={service}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </CacheProvider>
  );
}
