import React from 'react';
import BudgetProvider from './src/components/BudgetProvider';

// Allows customization/extension of default Gatsby settings affecting the browser

// see: https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
export const wrapRootElement = ({ element }) => {
  return <BudgetProvider>{element}</BudgetProvider>;
};
