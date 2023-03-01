import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import NavigationBar from '../../components/NavigationBar';

import DashboardLayout from '../../layouts/Dashboard';

export default function Dashboard() {
  return (
    <>
      <NavigationBar />
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
  padding: 20px;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
