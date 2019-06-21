import styled from 'styled-components';
import { color } from 'styled-system';

const A: any = styled.a`
  color: inherit;
  cursor: pointer;
  ${color};
  ${({ bold }) => bold && 'font-weight: bold'};
`;

export default A;
