import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Withdraw from '../../pages/Withdraw';

storiesOf('Withdraw', module).add('Withdraw', () => <Withdraw query="1" />);
