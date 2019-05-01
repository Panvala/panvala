import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
`;

export const StepperTitle = styled.div`
  font-size: 1.5rem;
  color: ${COLORS.grey2};
  margin: 0.5rem 0 1rem;
`;
const CancelButton = styled(Button)`
  color: ${COLORS.grey3};
  font-weight: bold;
  position: absolute;
  top: 2.7rem;
  right: 2.7rem;
`;

const StepperBody = styled.div`
  position: absolute;
  top: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  overflow: hidden;
  width: 490px;
  padding: 2.4em;
  background: white;
  color: ${COLORS.grey2};
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 15;
  display: block;
`;

interface IProps {
  isOpen: boolean;
  handleClose?(): void;
  handleClick?(): any;
  handleCancel?(): any;
  step?: number;
  steps: number;
}
const Stepper: React.SFC<IProps> = props => {
  return (
    <div>
      {props.isOpen && (
        <Wrapper>
          <Overlay onClick={props.handleClick} className="Stepper-overlay" />
          <StepperBody {...props}>
            <StepperTitle>{`Step ${props.step || 1} of ${props.steps}`}</StepperTitle>
            <CancelButton onClick={props.handleCancel}>Cancel</CancelButton>
            {props.children}
          </StepperBody>
        </Wrapper>
      )}
    </div>
  );
};

export default Stepper;
