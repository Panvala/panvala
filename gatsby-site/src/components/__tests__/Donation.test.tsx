import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Donation from '../Donation';
import { theme } from '../../utils/theme';

const ethPrices: any = {
  student: 50,
  gold: 150,
  platinum: 500,
  diamond: 1500,
  ether: 5000,
  elite: 15000,
};

describe('Donation', () => {
  let container: RenderResult;

  beforeEach(() => {
    container = render(
      <ThemeProvider theme={theme}>
        <Donation ethPrices={ethPrices} />
      </ThemeProvider>
    );
  });

  test('should render the container', () => {
    // Get the element
    const instance = container.getByTestId('donation-container');

    // Snapshot
    expect(instance).toMatchSnapshot();
  });

  test('should contain the donation form when rendered', () => {
    const instance = container.getByTestId('donation-container');
    const form = container.getByTestId('donation-form');

    expect(instance.contains(form));
  });
});
