import styled from 'styled-components';
import { space, width, typography, color } from 'styled-system';
import { colors } from '../../styles';

const Text: any = styled.p`
  font-family: 'Roboto';
  color: ${colors.greys.dark};
  ${({ bold }: any) => bold && 'font-weight: bold'};
  ${space};
  ${width};
  ${color};
  ${typography};
`;

Text.displayName = 'Text';

export default Text;
