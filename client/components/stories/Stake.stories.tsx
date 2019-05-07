import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Stake from '../../pages/slates/stake';
import MainProvider from '../MainProvider';
import EthereumProvider from '../EthereumProvider';

storiesOf('Stake', module).add('Stake', () => (
  <MainProvider>
    <EthereumProvider>
      <Stake query={{ id: '0' }} />
    </EthereumProvider>
  </MainProvider>
));
