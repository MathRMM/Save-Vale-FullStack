import styled from 'styled-components';
import { useState } from 'react';
import Map from '../Maps';

import clothes from "../../assets/images/clothes.png"
import toys from "../../assets/images/toys.png"
import food from "../../assets/images/food.png"

export default function Item({ obj }) {
  const [expand, setExpand] = useState(false);
  const [active, setActive] = useState(false);

  function handleClick(){
    setExpand(!expand)
    setActive(true)
  }

  function CategoryIcon({Category}){
    console.log(Category.Category)
    const category = Category.name
    
    const icons = {
      Roupas: clothes, 
      Brinquedos: toys,
      Alimentos: food
    }

    return (
      <h3 className='category' key={Category.id}>
        {category}
        <img src={icons[category]} alt="categoryIcon"/>
      </h3>
    )
  }

  return (
    <Container height={expand}>
      <StyledItem onClick={handleClick}>
        <h1 className="title">{obj.name}</h1>
        <p className="description">{obj.description}</p>
        {obj?.Address.map((address) => (
          <p key={address.id}>{address.neighborhood + ' - ' + address?.City?.name}</p>
        ))}
        {obj?.InstituteCategory.map((category) => (
          <CategoryIcon Category={category.Category}/>
        ))}
        <div className="image">
          <img src={obj.image} alt="Institute"/>
        </div>
      </StyledItem>
      {active && (<Map address={obj.Address} key={obj.id}/>)}
    </Container>
  );
}

const StyledItem = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 3fr 6fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'title title category image'
    'desc desc addr image'
    'desc desc addr image';

  background-color: white;
  border-radius: 20px;
  border: 1px solid gray;
  overflow: hidden;

  .title {
    grid-area: title;
    margin: 6px 0px 5px 6px;
    font-size: 20px;
    font-weight: bold;
  }

  .category {
    grid-area: category;
    
    img{
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  }

  .description {
    grid-area: desc;
    margin: 5px 0px 5px 5px;
  }

  .address {
    grid-area: addr;
  }

  & .image {
    grid-area: image;
    display: flex;
    justify-content: end;
  }

  .image > img {
    width: 120px;
    height: 100%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  .map {
    padding: 0 18px;
    height: ${(props) => (props.height ? '300px' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-out;
  }
`;
