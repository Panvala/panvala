import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles';
import Image from './Image';

const InlineImageWrapper = styled.span`
  display: inline-block;
  height: 0.9rem;
  width: 0.9rem;
  margin: 0 5px;
  border: 1px solid ${COLORS.grey4};
  padding: 3px;
`;

const InlineImage: React.SFC<any> = ({ src, alt }) => {
  return (
    <InlineImageWrapper>
      <Image src={src} alt={alt} wide />
    </InlineImageWrapper>
  );
};

export default InlineImage;
