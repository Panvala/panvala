import * as React from 'react';
import styled from 'styled-components';
import {
  space,
  color,
  layout,
  typography,
  flexbox,
  border,
  background,
  shadow,
  position,
} from 'styled-system';

const StyledButton = styled.button`
  box-sizing: 'border-box';
  min-width: 0;
  display: ${props => (props.flex ? 'flex' : 'block')};
  ${space};
  ${color};
  ${layout};
  ${typography};
  ${flexbox};
  ${border};
  ${background}
  ${shadow};
  ${position};
`;

const Button = props => {
  return (
    <StyledButton
      className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4"
      onClick={props.handleClick}
      {...props}
    >
      {props.text}
    </StyledButton>
  );
};

export default Button;
