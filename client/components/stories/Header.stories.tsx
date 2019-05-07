import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../Header';
import NotificationsProvider from '../NotificationsProvider';

storiesOf('Header', module).add('Header', () => (
  <NotificationsProvider>
    <Header />
  </NotificationsProvider>
));
