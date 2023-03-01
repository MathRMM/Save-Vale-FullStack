import { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Page from '../../components/Page';
import NavigationBar from '../../components/NavigationBar';

export default function MainPaige() {
  return (
    <>
      <NavigationBar/>
      <Page>
        <Container>
          <Outlet />
        </Container>
      </Page>
    </>
  );
}

//background={'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
  }
`;

const Background = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: ${props => props.isVisible? 1 : -1};
    top: 0;
    right: 0;
    background: #0009;
    transition: all 150ms linear;
    opacity: ${props => props.isVisible? 1 : 0};
`
