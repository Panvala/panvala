import React from 'react';
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

// import Spinner from '../Spinner';
import ErrorIcon from '../../../img/error.svg';
// import SuccessIcon from '../../img/status-good.svg';

const StyledErrorPopup = styled.article`
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-size: 0.875em;
  margin-top: 8px;
  padding: 16px 8px;
  border-radius: 8px;
  border-width: 2px;
  border-style: inset;
  position: fixed;
  right: 32px;
  top: 16px;

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

export enum ErrorPopupStatusEnums {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export interface ErrorPopupProps {
  message: string;
  isVisible: boolean;
}

const ErrorPopup = (props: ErrorPopupProps) => {
  const { message, isVisible } = props;
  
  return (
    <>
      {isVisible && <StyledErrorPopup className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
        <div className="tc">
          <img className="red" src={ErrorIcon} />
          <h2 className="f5 fw4">{message}</h2>
        </div>
      </StyledErrorPopup>}
    </>
    
  );
};

export default ErrorPopup;
