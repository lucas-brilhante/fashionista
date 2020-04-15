import React, { useState } from 'react';
import { Dialog } from 'components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPercentageDiscount, brlMask } from 'utils';
import { useHistory } from 'react-router-dom';

const Main = ({ itens }) => {
  const [dialog, setDialog] = useState(false);
  const history = useHistory();

  const closeDialog = () => {
    setDialog(false);
  }

  const handleClick = (id) => () =>{
    history.push(`/product/${id}`)
  }

  return (
    <HomeContent>
      <Dialog active={dialog} component={() => <h1>dialog</h1>} closeDialog={closeDialog} />
      <NumberOfItens>{itens.length} Itens</NumberOfItens>
      <ItensGrid>
        {itens.map((item) => (
          <Item key={item.id} onClick={handleClick(item.id)}>
            <ImageContainer>
              <ItemImage src={item.img_url} />
              {item.price_off > 0 && item.price_off < item.price &&
                <Discount>- {getPercentageDiscount(item.price_off, item.price)}%</Discount>}
            </ImageContainer>
            <ItemName>{item.name}</ItemName>
            { item.price_off > 0 && item.price_off < item.price &&
              <PriceContainer>
                    <ItemPrice2>{brlMask(item.price)}</ItemPrice2>
                    <ItemPrice>{brlMask(item.price_off)}</ItemPrice>
              </PriceContainer>
            }

            { !(item.price_off > 0 && item.price_off < item.price) &&
              <PriceContainer>
                    <ItemPrice>{brlMask(item.price)}</ItemPrice>
              </PriceContainer>
            }

          </Item>
        ))}
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
  justify-content: flex-start;

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }

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
    border: 1px solid rgba(0, 0, 0, 1);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const ItemImage = styled.img
  .attrs({ alt: 'Item Image' })`
  width: 100%;
  height: auto;
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

const mapStateToProps = state => ({
  itens: state.itemReducer
});


export default connect(mapStateToProps, null)(Main);
