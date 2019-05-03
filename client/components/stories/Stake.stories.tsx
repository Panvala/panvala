import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Stake from '../../pages/slates/stake';

// // https://github.com/zeit/next.js/issues/1827#issuecomment-323314141
// import Router from 'next/router';
// const mockedRouter = { push: () => {}, prefetch: () => {} };
// (Router as any).router = mockedRouter;

storiesOf('Stake', module).add('Stake', () => <Stake />);
