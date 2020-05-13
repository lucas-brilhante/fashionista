import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { showCart, findItem, addItemToCard } from 'redux/index';
import { connect } from 'react-redux';

const ProductInfo = ({ showCart, findItem, addItemToCard }) => {
    const item = findItem(useParams().id);
    const [size_selected, setSizeSelected] = useState('');

    const handleClick = (size) => () => {
        setSizeSelected(size);
    }

    const addItem = (item, size) => () => {
        addItemToCard(item, size);
        showCart(true);
    }

    useEffect(()=>{
        if(item){
            for(let size of item.sizes){
                if(size.available){
                    setSizeSelected(size.size);
                    break;
                }
            }
        }
    },[item])

    if (item){
        return (
            <ProductContainer>
                <ProductImg src={item.image} />
                <ProductInfoContainer>
                    <ProductName>{item.name}</ProductName>
                    <ProductValueContainer>
                        <ProductValue>{item.actual_price}</ProductValue>
                        <ProductParcel> em até {item.installments}</ProductParcel>
                    </ProductValueContainer>
                    <ProductSizeText>Escolha o tamanho</ProductSizeText>
                    <ProductSizesContainer>
                    {item.sizes.map((size) => {
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
                    <AddProductToCard onClick={addItem(item,size_selected)}>Adicionar à Sacola</AddProductToCard>
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
    margin: 15px 20px 0 20px;
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

const ProductValue = styled.span`
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 20px;
    margin-right: 10px;
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



const mapDispatchToProps = dispatch => ({
    showCart: (value) => dispatch(showCart(value)),
    findItem: (item_id) => dispatch(findItem(item_id)),
    addItemToCard: (item, size) => dispatch(addItemToCard(item, size))
})

export default connect(null, mapDispatchToProps)(ProductInfo);