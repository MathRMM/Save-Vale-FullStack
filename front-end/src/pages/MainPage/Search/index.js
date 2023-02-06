import styled from "styled-components";
import { Typography } from "@mui/material";

function SearchPage(){
    return (
        <>
            <StyledTypography variant="h4">Buscar por cidade</StyledTypography>
            <StyledTypography variant="h4">Buscar por categoria</StyledTypography>
        </>
    )
}

export default SearchPage;

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;