import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DonateButton from '../DonateButton';
import { theme } from '../../utils/theme';

const clickHandler = jest.fn();

describe('DonateButton', () => {
  let container: RenderResult;

  beforeEach(() => {
    // Render
    container = render(
      <ThemeProvider theme={theme}>
        <DonateButton disabled={false} text="Donate now" handleClick={clickHandler} />
      </ThemeProvider>
    );
  });

  test('should render the component', () => {
    // Get the element
    const instance = container.getByText('Donate now');

    // Snapshot
    expect(instance).toMatchSnapshot();
  });

  test('should have been called twice if clicked', () => {
    // Get the element
    const instance = container.getByText('Donate now');

    // Mock: click button
    instance.click();
    instance.click();
    expect(clickHandler).toHaveBeenCalledTimes(2);
  });
});
