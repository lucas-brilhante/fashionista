import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { findItem } from 'redux/index';
import { connect } from 'react-redux';
import { brlMask } from 'utils';

const ProductInfo = ({ findItem }) => {
    const [size_selected, setSizeSelected] = useState('');
    const item = findItem(useParams().id);

    useEffect(()=>{
        setSizeSelected(item.sizes_available[0])
    },[item.sizes_available])

    const handleClick = (size) => () => {
        setSizeSelected(size);
    }

    return (
        <ProductContainer>
            <ProductImg src={item.img_url} />
            <ProductInfoContainer>
                <ProductName>{item.name}</ProductName>
                <ProductValueContainer>
                    <ProductValue>
                        {brlMask(item.price_off!==''?item.price_off:item.price)}
                        <ProductParcel> em até 3x de R$ 30,00</ProductParcel>
                    </ProductValue>
                </ProductValueContainer>
                <ProductSizeText>Escolha o tamanho</ProductSizeText>
                <ProductSizesContainer>
                    {['P', 'M', 'G'].map((size) => {
                        if (item.sizes_available.includes(size))
                            return (
                                <ProductSize key={size}
                                    actived={size_selected === size}
                                    onClick={handleClick(size)}>

                                    {size}
                                </ProductSize>
                            )
                        return <Fragment key={size} />
                    })}
                </ProductSizesContainer>
                <AddProductToCard>Adicionar à Sacola</AddProductToCard>
            </ProductInfoContainer>
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 900px;
    margin: 0 auto;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
`;

const ProductImg = styled.img.attrs({ alt: 'Product Image' })`
    width: calc(250px + 15vw);
    margin: 20px 20px 0 20px;
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
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
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
    findItem: (item_id) => dispatch(findItem(item_id))
})

export default connect(null, mapDispatchToProps)(ProductInfo);