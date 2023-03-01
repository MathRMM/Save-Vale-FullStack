import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FcLibrary, FcSearch } from "react-icons/fc";
import { BsList } from "react-icons/bs";

import NavigationButton from "./NavigationButton";

export default function Sidebar({ setVisible }) {
  const [sidebarClick, setSideClick] = useState(false);
  const sideRef = useRef(null);

 const sidebar = {
    sections: {
      institutes: {
        title: "Instituição",
        feats: {
          sign: {
            path: "/dashboard",
            name: "Entrar/Cadastrar sua instituição",
            icon: <FcLibrary />,
          },
          search: {
            path: "/search/institute",
            name: "Buscar por instituição",
            icon: <FcSearch />,
          },
        },
      },
      search: {
        title: "Buscas",
        feats: {
          institute: {
            path: "/search/institute",
            name: "Buscar por categoria",
            icon: <FcSearch />,
          },
          locale: {
            path: "/search",
            name: "Buscar por cidades",
            icon: <FcSearch />,
          },
        },
      },
      about: {
        title: "Conte-me mais",
        feats: {
          website: {
            path: "/about/website",
            name: "Nosso site",
            icon: <FcSearch />,
          },
          institutes: {
            path: "/about/institutes",
            name: "Sobre as intuições",
            icon: <FcLibrary />,
          },
        },
      },
    },
    click: function (e) {
      setSideClick(!sidebarClick);
      setVisible(!sidebarClick);
    },
    isNotClicked: function () {
      return (
        <NavigationButton active={sidebarClick} onClick={this.click}>
          <BsList style={{ color: "white" }}/>
        </NavigationButton>
      );
    },
    isClicked: function () {
      return <Aside>{getSections(this.sections)}</Aside>;
    },
  };

  useEffect(() => {
    const button = document.getElementById("background");
    if (button) {
      button.addEventListener("click", handleClick);
    }
  }, [sidebarClick]);

  function handleClick() {
    sidebar.click();
  }

  return (
    <sidebar ref={sideRef}>
      {sidebarClick ? sidebar.isClicked() : sidebar.isNotClicked()}
    </sidebar>
  );
}

const Aside = styled.aside`
  width: 50%;
  max-width: 250px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10 !important;
  background-color: #151d2b;
  transition: all 200ms linear;

  color: white;

  text-align: center;
  padding: 5% 1%;
  font-size: 20px;

  h1 {
    margin-bottom: 16px;
  }

  > a {
    text-decoration: none;
  }
`;

function getSections(obj) {
  return Object.keys(obj).map((key) => {
    const section = obj[key];
    const feats = section.feats;

    return (
      <>
        <h1>{section.title}</h1>
        {Object.keys(feats).map((key) => {
          const feat = feats[key];

          return (
            <Link to={feat.path}>
              <SidebarButton>
                {feat.icon}
                <span>{feat.name}</span>
              </SidebarButton>
            </Link>
          );
        })}
      </>
    );
  });
}

const SidebarButton = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  color: white;

  display: flex;
  flex-direction: row;
  font-family: "lexend Deca", sans-serif;
  font-size: 14px;

  &:hover {
    background-color: #223047;
  }
  & > *:first-child {
    font-size: 30px;
    color: #124090;
    margin-right: 5px;
  }

  & :not(:last-child) {
    margin-bottom: 20px;
  }

  span {
    text-decoration: none !important;
    text-align: center;
  }
`;
