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

interface BoxProps {
  flex?: boolean;
  column?: boolean;
  wrap?: boolean;
  bold?: boolean;
}
const Box: any = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  display: ${(props: BoxProps) => (props.flex ? 'flex' : 'block')};
  text-align: left;
  ${space};
  ${color};
  ${layout};
  ${typography};
  ${flexbox};
  ${border};
  ${background}
  ${shadow};
  ${position};
  ${(props: BoxProps) => {
    if (props.flex && props.column) {
      return 'flex-direction: column;';
    }
    return null;
  }}
  ${(props: BoxProps) => {
    if (props.wrap) return 'flex-wrap: wrap;';
    return null;
  }}
  ${(props: BoxProps) => {
    if (props.bold) return 'font-weight: bold;';
    return null;
  }}
`;

Box.displayName = 'Box';

export default Box;
