import * as React from 'react';
import styled from 'styled-components';

import Header from './Header';

export const LayoutWrapper = styled.div`
  font-family: 'Roboto';
  min-height: 100vh;
  margin: 2em 10em;
`;

export default class Layout extends React.PureComponent {
  render() {
    return (
      <LayoutWrapper>
        <Header />
        {this.props.children}
      </LayoutWrapper>
    );
  }
}
