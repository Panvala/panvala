import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Withdraw from '../../pages/Withdraw';
import EthereumProvider from '../EthereumProvider';

storiesOf('Withdraw', module).add('Withdraw', () => {
  return (
    <EthereumProvider>
      <Withdraw query="1" />;
    </EthereumProvider>
  );
});
