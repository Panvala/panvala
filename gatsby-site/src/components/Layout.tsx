import * as React from 'react';
import { ThemeProvider } from 'styled-components';

// Global styles
import '../css/open-sans.css';
import '../css/tachyons.css';
import '../css/util.css';
import '../css/colors.css';
import '../css/clip-path.css';

import Nav from './Nav';
import Footer from './Footer';
import { theme } from '../utils/theme';
import EthereumProvider from './EthereumProvider';

const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <EthereumProvider>
          {/* put nav here */}
          <div className="overflow-x-hidden">
            <Nav />
            <main>{children}</main>
            <Footer />
          </div>
        </EthereumProvider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
