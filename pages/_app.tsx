import React, { FC, ReactElement } from 'react';
import '../styles/global.css';

type Props = {
  Component: FC;
  pageProps: any;
};

export default function App(props: Props): ReactElement {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
