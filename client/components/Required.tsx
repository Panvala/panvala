import * as React from 'react';
import styled from 'styled-components';

const StyledRequired = styled.span`
  color: red;
`;

const Required: React.FunctionComponent = () => {
  return <StyledRequired>{' *'}</StyledRequired>;
};

export default Required;
