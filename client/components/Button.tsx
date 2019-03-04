import React, { Children } from 'react';
import styled from 'styled-components';
import { COLORS, BUTTON_COLORS } from '../styles';
import { IButton } from '../interfaces';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }: any) =>
    type && (BUTTON_COLORS as any)[type] ? (BUTTON_COLORS as any)[type] : COLORS.white};
  color: ${({ active }: any) => (active ? COLORS.primary : COLORS.text)};
  ${({ active }: any) => active && 'box-shadow: 0px 3px 10px rgba(83, 172, 217, 0.16)'};
  letter-spacing: 0.02em;
  font-size: 1em;
  font-weight: 500;
  line-height: 1em;
  border-radius: 0.3rem;
  padding: 0 0.6rem;
  margin: 0 1rem 0 0;
  border: 1px solid transparent;
  height: 2rem;
  cursor: pointer;
  &:focus {
    box-shadow: 0px 3px 10px rgba(83, 172, 217, 0.16);
    outline: none;
  }
`;

const LargeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* background-color: ${({ primary }: { primary?: boolean }) =>
    primary ? COLORS.grey5 : COLORS.grey6}; */
  background-color: ${({ type }: any) => type && (BUTTON_COLORS as any)[type]};
  letter-spacing: 0.02em;
  font-weight: 500;
  padding: 0.7em 1em;
  margin: 0 0.5rem 1rem;
  border: 2px solid ${COLORS.grey5};
  border-radius: 7px;
  cursor: pointer;
`;

const Button: React.FunctionComponent<IButton> = props => {
  if (props.large) {
    return (
      <Wrapper>
        <LargeButton {...props}>{Children.toArray(props.children)}</LargeButton>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <StyledButton {...props}>{Children.toArray(props.children)}</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Button;
