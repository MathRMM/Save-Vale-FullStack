import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FcHome } from "react-icons/fc";

import logo from "../../assets/images/logoWhite.svg";
import NavigationButton from "./NavigationButton";
import Sidebar from "./sidebar";

export default function NavigationBar() {
  const [isVisible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState(false)
  const location = useLocation();
  const main = {
    home: { path: "/", name: "Início", icon: <FcHome /> },
  };

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  function changeColorWithScroll() {
    const scrollY = window.scrollY
    if(scrollY){
      setBgColor(true)
    }else{
      setBgColor(false)
    }
  }
  window.addEventListener("scroll", changeColorWithScroll)

  return (
    <Container background={bgColor}>
      <div className="main">
        {Object.keys(main).map((key) => {
          const section = main[key];
          return (
            <Link to={section.path}>
              <NavigationButton active={isActive(section.path)}>
                {section.icon}
                <span>{section.name}</span>
              </NavigationButton>
            </Link>
          );
        })}
      </div>
      <img src={logo} alt="logo" />
      <Sidebar setVisible={setVisible} />
      <Background isVisible={isVisible} id="background"/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  justify-content: space-between;
  position: fixed;
  background-color: ${props => props.background? "#151d2b" : "transparent"};
  transition: background-color 500ms ease-in;

  > div {
    display: flex;
    flex-direction: row;
    box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    justify-content: flex-start;
  }

  > div.main span {
    margin-left: 5px;
  }

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;

const Background = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: #0009;
  transition: opacity 150ms linear;
  z-index: ${(props) => (props.isVisible ? 5 : -1)};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  display: ${(props) => (props.isVisible ? "block" : "none")} !important;
`;
