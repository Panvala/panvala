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

const Box = styled.div`
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

Box.displayName = 'Box';

export default Box;
