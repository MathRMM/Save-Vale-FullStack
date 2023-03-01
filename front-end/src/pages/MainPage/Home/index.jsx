import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

import useInstitutes from '../../../hooks/api/useInstitutes';

import Item from '../../../components/home/Items';
import CarouselSection from '../../../components/home/Carousel';

function HomePage() {
  const { institutes } = useInstitutes([]);
  const [instState, setInstState] = useState([]);

  useEffect(() => {
    if (institutes) setInstState(institutes);
  }, [institutes]);

  return (
    <>
      <CarouselSection/>
      <StyledTypography variant="h4">Todas as instituições</StyledTypography>

      <GridContainer>{institutes && institutes.map((obj) => <Item obj={obj} key={obj.id} />)}</GridContainer>
    </>
  );
}

export default HomePage;

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
  justify-content: center;
`;
