import React from 'react';
import BudgetProvider from './src/components/BudgetProvider';

// Allows customization of default Gatsby settings affecting server-side rendering.

// see: https://www.gatsbyjs.org/docs/ssr-apis/#wrapRootElement
export const wrapRootElement = ({ element }) => {
  return <BudgetProvider>{element}</BudgetProvider>;
};
