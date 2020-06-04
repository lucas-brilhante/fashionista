import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { showCart, findItem, addItemToCard } from 'store';
import { useDispatch } from 'react-redux';
import { getNumbers } from 'utils';

const ProductInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const item = dispatch(findItem(useParams().id));
    const [size_selected, setSizeSelected] = useState('');

    const handleClick = (size) => () => {
        setSizeSelected(size);
    }

    const addItem = (item, size) => () => {
        dispatch(addItemToCard(item, size));
        dispatch(showCart(true));
    }

    useEffect(() => {
        if (item) {
            for (let size of item.sizes) {
                if (size.available) {
                    setSizeSelected(size.size);
                    break;
                }
            }
        }
        else
            history.push('/not-found');
    }, [item, history])

    if (item) {
        const { name, image, installments, sizes } = item;
        const actual_price = getNumbers(item.actual_price);
        const regular_price = getNumbers(item.regular_price);
        return (
            <ProductContainer>
                <ProductImg src={image} />
                <ProductInfoContainer>
                    <ProductName>{name}</ProductName>
                    <ProductValueContainer>
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
                        <ProductParcel> em até {installments}</ProductParcel>
                    </ProductValueContainer>
                    <ProductSizeText>Escolha o tamanho</ProductSizeText>
                    <ProductSizesContainer>
                        {sizes.map((size) => {
                            if (size.available)
                                return (
                                    <ProductSize key={size.sku}
                                        actived={size_selected === size.size}
                                        onClick={handleClick(size.size)}>
                                        {size.size}
                                    </ProductSize>
                                )
                            return <Fragment key={size.sku} />
                        })}
                    </ProductSizesContainer>
                    <AddProductToCard onClick={addItem(item, size_selected)}>Adicionar à Sacola</AddProductToCard>
                </ProductInfoContainer>
            </ProductContainer>
        )
    }
    return null
}

const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 900px;
    margin: 0 auto;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductImg = styled.img.attrs({ alt: 'Product Image' })`
    width: calc(250px + 15vw);
    height: auto;
    margin: 15px 10px 0px 10px;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,1);
    border-radius: 12px;
`;

const ProductInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

const ProductName = styled.span`
    font-size: 21px;
    font-weight: 500;
    margin-bottom: 15px;
    text-transform: uppercase;
`;

const ProductValueContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const PriceContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ItemPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
  padding-right: 10px;

`;

const ItemPrice2 = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #555;
  text-decoration: line-through;
  padding-right: 10px;
`;

const ProductParcel = styled.span`
    font-size: 15px;
    color: #555;
`;

const ProductSizeText = styled.span`
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 5px;
`;

const ProductSizesContainer = styled.div`
    display:flex;
    flex-direction: row;
    margin-bottom: 30px;
`;

const ProductSize = styled.button`
    overflow: hidden;
    margin-right: 5px;
    background: inherit;
    height: 40px;
    width: 40px;
    outline: none;
    border-radius: 8px;
    transition: opacity 0.2s;
    border: ${({ actived }) => actived ? "2px solid black" : "1px solid rgba(0,0,0,0.2)"};;

    &:hover {
        opacity: ${({ actived }) => actived ? 1 : 0.5};
        cursor: ${({ actived }) => actived ? 'default' : 'pointer'};
    }

    &:active {
        opacity: ${({ actived }) => actived ? 1 : 0.2};
        cursor: ${({ actived }) => actived ? 'default' : 'pointer'};
    }
`;

const AddProductToCard = styled.button`
    display: flex;
    background: linear-gradient(#000, #888);
    padding: 10px;
    color: #fff;
    justify-content: center;
    outline: none;
    border: 1px solid rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.5;
    }
`;


export default ProductInfo;