import * as React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Header from './Header';

export const LayoutWrapper = styled.div`
  font-family: 'Roboto';
  min-height: 100vh;
  margin: 2em 10em;
`;

export default ({ title, children }: any) => (
  <LayoutWrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    {children}
  </LayoutWrapper>
);
