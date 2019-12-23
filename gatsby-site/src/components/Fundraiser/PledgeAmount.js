import React from 'react';
import styled from 'styled-components';
import { space, color, layout, typography, flexbox, background, shadow } from 'styled-system';

const StyledButton = styled.button`
  box-sizing: 'border-box';
  width: 90px;
  display: ${props => (props.flex ? 'flex' : 'block')};
  border-radius: 5px;
  ${space};
  ${color};
  ${layout};
  ${typography};
  ${flexbox};
  ${background}
  ${shadow};
`;

const PledgeAmount = props => {
  return (
    <StyledButton
      className="f6 link bn pointer pv3"
      onClick={props.handleClick}
      bg={props.active ? 'marine' : 'greys.semiLight'}
      color={props.active ? 'white' : 'grey'}
      {...props}
    >
      {props.text}
    </StyledButton>
  );
};

export default PledgeAmount;
