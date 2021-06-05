import styled from '@emotion/styled';

const Container = styled.div({
  minHeight: '96vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export default function Loading() {
  return (
    <Container>
      <h3>Loading</h3>
    </Container>
  );
}
