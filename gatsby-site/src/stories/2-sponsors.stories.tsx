import * as React from 'react';
import Sponsors from '../pages/sponsors';
// prettier-ignore
import {
  SponsorsHeader,
} from '../components/Sponsors';

export default {
  title: 'Sponsors',
};

export const header = () => <SponsorsHeader />;

export const fullPage = () => <Sponsors />;
