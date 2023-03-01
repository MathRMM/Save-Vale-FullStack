import styled from 'styled-components';

export default function NavigationButton({ active, children, onClick }) {
  return (
    <Button active={active} onClick = {onClick}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: 100px;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: "lexend Deca", sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${props => props.active ? 'background-color: #223047;' : ''}
  color: #fff;
  

  &:hover {
    background-color: #223047;
  }

  & > *:first-child {
    font-size: 28px;
    color: #124090;
  }

  @media (max-width: 600px) {
    height: 80px;
  }
`;
