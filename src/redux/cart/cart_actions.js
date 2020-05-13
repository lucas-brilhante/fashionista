import { SHOW_CART, CHANGE_QTY, REMOVE_ITEM, ADD_ITEM_TO_CARD, SET_TOTAL_PRICE, SET_ITENS_QTY } from './consts';
import {getNumbers, currencyMask} from 'utils';

export const showCart = (value) => ({
    type: SHOW_CART,
    payload: value
})

export const changeQty = (item_id, qty) => (dispatch, store) => {
    let cart = store().cartReducer.cart_itens.slice();

    for (let item of cart) {
        if (item.id === item_id) {
            item.qty = qty
        }
    }

    dispatch({
        type: CHANGE_QTY,
        payload: cart
    })
    dispatch(reloadTotalPrice());
}

export const removeItem = (item_id) => (dispatch, store) => {
    let cart = store().cartReducer.cart_itens.slice();

    cart = cart.filter((item) => item.id !== item_id);

    dispatch({
        type: REMOVE_ITEM,
        payload: cart
    });

    dispatch(reloadTotalPrice());

}

export const addItemToCard = (item, size) => (dispatch, store) => {
    const id = item.id + '_0_' + size;
    const cart = store().cartReducer.cart_itens.filter((cart_item) => cart_item.id === id);

    if (cart[0]){
        dispatch(changeQty(cart[0].id,cart[0].qty+1));
        return
    }

    let item_to_cart = {
        id,
        name: item.name,
        style: item.style,
        code_color: item.code_color,
        color_slug: item.color_slug,
        color: item.color,
        on_sale: item.on_sale,
        regular_price: item.regular_price,
        actual_price: item.actual_price,
        discount_percentage: item.discount_percentage,
        installments: item.installments,
        image: item.image,
        size,
        qty: 1
    };

    dispatch({
        type: ADD_ITEM_TO_CARD,
        payload: item_to_cart
    })

    dispatch(reloadTotalPrice());
}

export const reloadTotalPrice = () => (dispatch,store) => {
    const cart = store().cartReducer.cart_itens;
    let total_price = 0;
    let total_itens_qty = 0;

    for(let itens of cart){
        total_price += getNumbers(itens.actual_price) * itens.qty;
        total_itens_qty += itens.qty;
    }

    dispatch({
        type: SET_TOTAL_PRICE,
        payload: currencyMask(total_price)
    })
    dispatch({
        type: SET_ITENS_QTY,
        payload: total_itens_qty
    })
}