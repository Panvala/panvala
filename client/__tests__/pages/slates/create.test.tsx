import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import CreateSlate from '../../../pages/slates/create';
import { AppContext } from '../../../components/Layout';
import { slates } from '../../../__mocks__/slates';

afterEach(cleanup);

describe('CreateSlate', () => {
  it('should render correctly pages/slates/create form component', () => {
    const { container, getByText } = render(
      <AppContext.Provider value={{ slates }}>
        <CreateSlate />
      </AppContext.Provider>
    );
    expect(container).toMatchSnapshot();
    expect(getByText('Select the grants that you would like to add to your slate')).toHaveClass(
      'mv3 f7 black-50'
    );
  });
});
