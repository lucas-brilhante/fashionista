import React from 'react';
import styled from 'styled-components';
import { getPercentageDiscount, getNumbers } from 'utils';
import { useHistory } from 'react-router-dom';
import {useItens} from 'hooks';

const Home = () => {
  const history = useHistory();
  const itens = useItens();

  const handleClick = (id) => () => {
    history.push(`/product/${id}`)
  }

  return (
    <HomeContent>
      <NumberOfItens>{itens.length} Itens</NumberOfItens>
      <ItensGrid>
        {itens.map((item) => {
          const actual_price = getNumbers(item.actual_price);
          const regular_price = getNumbers(item.regular_price);
          return (
            <Item key={item.id} onClick={handleClick(item.id)}>
              <ImageContainer>
                <ItemImage src={item.image} />
                {actual_price < regular_price &&
                  <Discount>- {getPercentageDiscount(actual_price, regular_price)}%</Discount>}
              </ImageContainer>
              <ItemName>{item.name}</ItemName>

              {actual_price < regular_price &&
                <PriceContainer>
                  <ItemPrice2>{item.regular_price}</ItemPrice2>
                  <ItemPrice>{item.actual_price}</ItemPrice>
                </PriceContainer>
              }

              {!(actual_price < regular_price) &&
                <PriceContainer>
                  <ItemPrice>{item.regular_price}</ItemPrice>
                </PriceContainer>
              }
            </Item>
          )
        })}
      </ItensGrid>
    </HomeContent>
  );
}

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1080px;
  margin: 0 auto;
`;
const NumberOfItens = styled.span`
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
`;

const ItensGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  background: white;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    margin: 9px;
    border: 1px solid rgba(80, 80, 80, 1); 
  }
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  width: 100%;
`;

const ItemImage = styled.img
  .attrs({ alt: 'Item Image' })`
  width: 100%;
  height: 300px;
  padding: 5px;
`;

const Discount = styled.div`
  display: flex;
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  padding: 2px 7px;
  color: #fff;
  font-weight: 400;
`;

const ItemName = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding-top: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  padding: 5px 10px 10px 10px;
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 400;
  padding: 5px;
`;

const ItemPrice2 = styled.span`
  font-size: 14px;
  font-weight: 400;
  padding: 5px;
  color: #555;
  text-decoration: line-through;
`;


export default Home;
