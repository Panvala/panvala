import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles';
import Required from './Required';

const StyledLabel = styled.label`
  margin: 2em 0 5em;
  font-size: 0.8em;
  color: ${COLORS.grey3};
`;

type Props = {
  htmlFor?: string;
  required?: boolean;
};

const Label: React.FunctionComponent<Props> = props => {
  if (props.required) {
    return (
      <StyledLabel {...props}>
        {props.children}
        <Required />
      </StyledLabel>
    );
  }
  return <StyledLabel {...props} />;
};

export default Label;
