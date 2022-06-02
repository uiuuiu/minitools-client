import styled from 'styled-components';

const Container = styled.div`
  border-radius: 50%;
  border: 3px;
  font-size: 14px;
  font-weight: 600;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #61B0F3;
  color: #ffffff
`

type Props = {
  value?: number
}

const CountingCirle = ({ value = 0 }: Props) => {
  return (
    <>
      <Container>
        {value}
      </Container>
    </>
  )
};

export default CountingCirle;
