import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

const Wrapper: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ wide }) => (wide ? '100%' : '70%')};
`;

const StyledImage = styled.img`
  width: 100%;
`;

interface IProps {
  src: string;
  alt: string;
  wide?: boolean;
}

const Image: React.SFC<IProps> = ({ src, alt, wide }) => {
  return (
    <Container>
      <Wrapper wide={wide}>
        <StyledImage src={src} alt={alt} />
      </Wrapper>
    </Container>
  );
};

export default Image;
