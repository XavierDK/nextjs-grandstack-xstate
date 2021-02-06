import React, { ReactElement } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function Home(): ReactElement {
  return (
    <Layout>
      <Head>
        <title>NextJS</title>
      </Head>

      <p>[Your Self Introduction]</p>
      <p>
        (This is a sample website - you’ll be building a site like this in{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
    </Layout>
  );
}
