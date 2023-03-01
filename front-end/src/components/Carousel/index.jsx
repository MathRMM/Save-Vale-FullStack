import styled from "styled-components";
import { Carousel as CarouselBootstrap } from "react-bootstrap";

export default function Carousel({children}) {
  return (
    <StyledCarousel>
     {children}
    </StyledCarousel>
  );
}

const StyledCarousel = styled(CarouselBootstrap)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;

  a.carousel-control-prev,
  a.carousel-control-next {
    display: none;
  }

  .carousel-indicators button {
    height: 30px;
    border-radius: 50%;

    &:not(:last-child) {
      margin-right: calc(100vw / 10);
    }
  }

  .carousel-inner {
    width: 100%;
    height: 100%;
  }
`;

/*  <Item
        background={
          "linear-gradient( 90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);"
        }
      >
        <img className="d-block w-100" src={clothes} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Item>
      <Item
        background={
          "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% );"
        }
      >
        <img className="d-block w-100" src={food} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Item>
      <Item background={"linear-gradient(180deg, #2af598 0%, #009efd 100%);"}>
        <img className="d-block w-100" src={toys} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Item> */