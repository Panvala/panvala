import { configure, addParameters } from '@storybook/react';

addParameters({
  options: {
    panelPosition: 'right',
  },
});

const req = require.context('../components/stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
