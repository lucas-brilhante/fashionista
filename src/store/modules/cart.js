import createReducer from '../createReducer';
import { getNumbers, currencyMask } from 'utils';

//Actions
const SHOW_CART = 'fashionista/cart/SHOW_CART';
const SET_TOTAL_PRICE = 'fashionista/cart/SET_TOTAL_PRICE';
const SET_ITENS_QTY = 'fashionista/cart/SET_ITENS_QTY';

//Reducer
const initialState = {
    show_cart: false,
    total_price: 0,
    itens_total_qty: 0
}

export default createReducer(initialState, {
    [SHOW_CART]: (state, action) => ({ ...state, show_cart: action.payload }),
    [SET_TOTAL_PRICE]: (state, action) => ({ ...state, total_price: action.payload }),
    [SET_ITENS_QTY]: (state, action) => ({ ...state, itens_total_qty: action.payload })
})

//Actions Creators
export const showCart = (value) => ({
    type: SHOW_CART,
    payload: value
})

export const changeQty = (item_id, qty) => (dispatch) => {
    let cart = JSON.parse(localStorage.getItem('@fashionista/cart_itens'));

    if (cart)
        cart = cart.slice();

    for (let item of cart) {
        if (item.id === item_id) {
            item.qty = qty
        }
    }

    localStorage.setItem('@fashionista/cart_itens', JSON.stringify(cart));
    dispatch(reloadTotalPrice());
}

export const removeItem = (item_id) => (dispatch) => {
    let cart = JSON.parse(localStorage.getItem('@fashionista/cart_itens'));

    if(cart)
        cart = cart.slice().filter((item) => item.id !== item_id);

    localStorage.setItem('@fashionista/cart_itens', JSON.stringify(cart));
    dispatch(reloadTotalPrice());

}

export const addItemToCard = (item, size) => (dispatch) => {
    const id = item.id + '_0_' + size;
    const cart = JSON.parse(localStorage.getItem('@fashionista/cart_itens'));
    let cart_item = null;

    if (cart)
        cart_item = cart.filter((cart_item) => cart_item.id === id)[0];

    if (cart_item) {
        dispatch(changeQty(cart_item.id, cart_item.qty + 1));
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
    localStorage.setItem('@fashionista/cart_itens', JSON.stringify(cart?[...cart,item_to_cart]:[item_to_cart]));
    dispatch(reloadTotalPrice());
}

export const reloadTotalPrice = () => (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('@fashionista/cart_itens'));
    let total_price = 0;
    let total_itens_qty = 0;

    if (cart)
        for (let itens of cart) {
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