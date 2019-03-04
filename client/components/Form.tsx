import styled from 'styled-components';
import { COLORS } from '../styles';

export const Separator = styled.div`
  border: 1px solid ${COLORS.grey5};
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
  border: 1px solid #f0f5f6;
  color: ${COLORS.text};
`;