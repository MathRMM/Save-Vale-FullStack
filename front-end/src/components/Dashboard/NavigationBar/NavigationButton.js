import styled from 'styled-components';

export default function NavigationButton({ active, children }) {
  return (
    <Button active={active}>
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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${props => props.active ? 'background-color: #223047;' : ''}
  color: #fff;

  &:hover {
    background-color: #223047;
  }

  & > *:not(:last-child) {
    margin-bottom: 4px;
  }

  & > *:first-child {
    font-size: 28px;
    color: #124090;
  }

  @media (max-width: 600px) {
    height: 80px;
  }
`;
