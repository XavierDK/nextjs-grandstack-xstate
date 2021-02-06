import React, { ReactElement } from 'react';
import Head from 'next/head';
import Layout from '../src/components/layout/Layout';
import { Container, Box, Typography, Button } from '@material-ui/core';
import ProTip from '../src/components/ProTip';
import Link from '../src/components/Link';

export default function Home(): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-alpha with TypeScript example
          </Typography>
          <Button variant="contained" component={Link} noLinkStyle href="/about">
            Go to the about page
          </Button>
          <ProTip />
        </Box>
      </Container>
    </Layout>
  );
}
