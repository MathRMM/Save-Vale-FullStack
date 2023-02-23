import { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import DashboardLayout from '../../layouts/Dashboard';
import NavigationBar from '../../components/NavigationBar';

export default function MainPaige() {
  return (
    <>
      <NavigationBar/>
      <DashboardLayout
        background={'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}
      >
        <Container>
          <Outlet />
        </Container>
      </DashboardLayout>
    </>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
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
