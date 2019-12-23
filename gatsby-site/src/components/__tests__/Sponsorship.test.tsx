import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Sponsorship from '../Sponsorship';
import { theme } from '../../utils/theme';

describe('Donation', () => {
  let container: RenderResult;

  beforeEach(() => {
    container = render(
      <ThemeProvider theme={theme}>
        <Sponsorship />
      </ThemeProvider>
    );
  });

  test('should render component', () => {
    // Get the element
    const instance = container.getByTestId('sponsorship-container');

    // Snapshot
    expect(instance).toMatchSnapshot();
  });
});
