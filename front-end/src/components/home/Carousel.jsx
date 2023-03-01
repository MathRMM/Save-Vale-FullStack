import styled from "styled-components";

import Carousel from "../Carousel";
import { Carousel as BootstrapCarousel } from "react-bootstrap";

import desliz from "../../assets/images/desliz.jpg";
import clothes from "../../assets/images/clothes.png";
import food from "../../assets/images/food.png";
import toys from "../../assets/images/toys.png";

export default function CarouselSection() {
  return (
    <Container>
      <Carousel>
        <Item
          background={
            "linear-gradient(180deg, #614e8a 0%, #69afb4 100%);"
          }
        >
          <img className="d-block w-100" src={desliz} alt="First slide" />
          <Caption>
            <h3>Áreas de riscos!!</h3>
            <p>Diversas famílias estão desabrigadas, e precisam da sua ajuda.</p>
          </Caption>
        </Item>
        {/*  <Item
          background={
            "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% );"
          }
        >
          <img className="d-block w-100" src={food} alt="Second slide" />

          <Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Caption>
        </Item>
        <Item background={"linear-gradient(180deg, #2af598 0%, #009efd 100%);"}>
          <img className="d-block w-100" src={toys} alt="Third slide" />

          <Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Caption>
        </Item> */}
      </Carousel>
    </Container>
  );
}

const Item = styled(BootstrapCarousel.Item)`
  width: 100%;
  height: 100%;
  background: ${(props) => props.background};
  position: relative;

  img {
    height: 300px !important;
    width: 300px !important;
    object-fit: cover;

    border-radius: 50%;
    border: double 5px transparent;

    background-image: linear-gradient(
        43deg,
        #2af598 0%, #009efd 100%
      ),
      radial-gradient(circle at top left, red, blue);
    background-origin: border-box;

    position: absolute;
    bottom: 100px;
    left: 100px;
  }
`;

const Caption = styled(BootstrapCarousel.Caption)``;

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 600px;
`;
