import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import {
  FcSearch,
  FcHome,
  FcLibrary
} from 'react-icons/fc';

import NavigationButton from './NavigationButton';

export default function NavigationBar() {
  const location = useLocation();

  const sections = [
    {path: "/", name: "Início", icon: "home"},
    {path: "/search", name: "Buscar", icon: "search"},
    {path: "/dashboard", name: "Cadastrar Instituição", icon: "institute"}
]

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  function getIcon(sectionName){
    const icons = {
      search: <FcSearch/>,
      home: <FcHome/>,
      institute: <FcLibrary/>
    }
    return icons[sectionName]
  }

  return (
    <Container>
      {sections.map( section => 
        <Link to={section.path}>
        <NavigationButton active={isActive(section.path)}>
          {getIcon(section.icon)}
          <span>{section.name}</span>
        </NavigationButton>
      </Link>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #151d2b;
  box-shadow: 2px 0 10px 0 rgba(0,0,0,0.1);
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  justify-content: flex-start;
  position: fixed;

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
