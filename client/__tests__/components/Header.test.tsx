import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import Header from '../../components/Header';

afterEach(cleanup);

describe('Header component', () => {
  test('should render correctly', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  // test('fdfds', () => {
  //   const { getByTestId } = render(<Header />);
  //   expect(getByTestId('title-display').textContent).toBe(title);
  // });
});
