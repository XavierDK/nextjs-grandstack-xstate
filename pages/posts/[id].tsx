import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
  postData: { title: string; date: string; contentHtml: string };
};

export default function Post({ postData }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const postData = {};
  return {
    props: {
      postData
    }
  };
};
