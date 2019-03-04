import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Slates from '../../../pages/index';

afterEach(cleanup);

describe.skip('Slates', () => {
  it('should render correctly Slates component', () => {
    const slates = render(<Slates />);

    expect(slates).toMatchSnapshot();
  });
});
