import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from 'react-redux'
import { changeQty, removeItem } from 'store';
import { getNumbers } from 'utils';
import { useCart } from 'hooks';

const CartDialog = ({ closeDialog }) => {
    const cart_itens = JSON.parse(localStorage.getItem('@fashionista/cart_itens'));
    const dispatch = useDispatch();
    const { total_price } = useCart();


    const addQty = (item_id, item_qty) => () => {
        dispatch(changeQty(item_id, item_qty + 1));
    }

    const removeQty = (item_id, item_qty) => () => {
        if (item_qty > 1)
            dispatch(changeQty(item_id, item_qty - 1));
    }

    const removeCartItem = (item_id) => () => {
        dispatch(removeItem(item_id));
    }

    const closePopup = () => {
        closeDialog()
    }

    return (
        <CartContent>
            <CartHeader>
                <ArrowLeftIcon onClick={closePopup} />
                <SearchText>Sacola({cart_itens ? cart_itens.length : '0'})</SearchText>
            </CartHeader>
            <ItemList>
                {cart_itens && cart_itens.map((item) => {
                    const actual_price = getNumbers(item.actual_price);
                    const regular_price = getNumbers(item.regular_price);
                    return <div key={item.id}>
                        <Item>
                            <ItemInfoGroup>
                                <ItemImage src={item.image} />
                                <RemoveItem onClick={(removeCartItem(item.id))}>Remover Item</RemoveItem>
                            </ItemInfoGroup>
                            <ItemInfoGroup width={90}>
                                <ItemName>{item.name}</ItemName>
                                <ItemSize>Tam: {item.size}</ItemSize>
                                <ItemQtyGoup>
                                    <ItemButton onClick={removeQty(item.id, item.qty)}>-</ItemButton>
                                    <ItemQty>{item.qty}</ItemQty>
                                    <ItemButton onClick={addQty(item.id, item.qty)}>+</ItemButton>
                                </ItemQtyGoup>
                            </ItemInfoGroup>
                            <ItemValueGroup>
                                <ItemPrice>{(actual_price < regular_price) ? item.actual_price : item.regular_price}</ItemPrice>
                                <ItemParcelPrice>{item.installments}</ItemParcelPrice>
                            </ItemValueGroup>
                        </Item>
                    </div>
                }
                )}
            </ItemList>
            <CartTotalValue>Subtotal - {total_price}</CartTotalValue>
        </CartContent>
    )
}

const CartContent = styled.div`
    display: flex;
    background: #ddd;
    flex-direction: column;
    width: 320px;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    overflow: hidden;
`;

const CartHeader = styled.div`
    display: flex;
    padding: 10px;
    background: #fff;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.3);
`;

const ArrowLeftIcon = styled(FiArrowLeft)`
    font-size: 14px;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

const SearchText = styled.span`
    margin: 0 auto;
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    height: 60vh;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: scroll;
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    background: #eee;
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0,0,0,0.5);
`;

const ItemInfoGroup = styled.div`
    display: flex;
    width: ${({ width }) => width ? width + 'px' : 'auto'};
    flex-direction: column;
    margin-right: auto;
    margin-left: ${({ marginLeft }) => marginLeft ? marginLeft + 'px' : '0'};;
`;

const ItemImage = styled.img.attrs({ alt: 'Item Image' })`
    width: 100px;
    height: 126px;
`;

const RemoveItem = styled.span`
    font-size: 14px;
    color: #ff3333;
    text-decoration: underline;
    cursor: pointer;
    padding-top: 2px;
    padding-left: 3px;
    &:hover {
        color: #672452;
    }
    &:active {
        color: #0f0120;
    }
`;

const ItemQtyGoup = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const ItemSize = styled.span`
    padding: 10px 0px;
    color: #555;
    font-size: 14px;
`;

const ItemName = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
`;

const ItemButton = styled.button`
    display: flex;
    background: #FFFAFA;
    border-color: #5c5c5c;
    color: black;
    font-size: 18px;
    border-radius: 4px;
    border-width: 1px;
    outline: none;
    width: 25px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ItemQty = styled.span`
    padding: 10px
`;

const ItemValueGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemPrice = styled.span`
    font-weight: bold;
    font-size: 15px;
`;

const ItemParcelPrice = styled.span`
    font-size: 13px;
    color: #333;
`;

const CartTotalValue = styled.div`
    display: flex;
    background: #333;
    color: white;
    padding: 10px;
`;

export default CartDialog;