import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`

const Image = styled.img`
  width: 100%;
`;

export default ({ src, alt }: { src: any; alt: any }) => (
  <Container>
    <Wrapper>
      <Image src={src} alt={alt} />
    </Wrapper>
  </Container>
);
