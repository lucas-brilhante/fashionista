import { SHOW_CART, CHANGE_QTY, REMOVE_ITEM, ADD_ITEM_TO_CARD, SET_TOTAL_PRICE, SET_ITENS_QTY } from './consts';
import createReducer from '../createReducer';

const initialState = {
    show_cart: false,
    total_price: 0,
    itens_total_qty: 0,
    cart_itens: [
        {
            "id": "5807_343_0_G",
            "name": "VESTIDO TRANSPASSE BOW",
            "style": "20002605",
            "code_color": "20002605_613",
            "color_slug": "tapecaria",
            "color": "TAPEÇARIA",
            "on_sale": false,
            "regular_price": "R$ 199,90",
            "actual_price": "R$ 199,90",
            "discount_percentage": "",
            "installments": "3x R$ 66,63",
            "image": "https://viniciusvinna.netlify.app/assets/api-fashionista/20002605_615_catalog_1.jpg",
            "size": "G",
            "qty": 2
        }
    ]
}

const cartReducer = createReducer(initialState, {
        [SHOW_CART]: (state, action) => ({ ...state, show_cart: action.payload }),
        [CHANGE_QTY]: (state, action) => ({...state, cart_itens: action.payload}),
        [REMOVE_ITEM]: (state, action) => ({...state, cart_itens: action.payload}),
        [ADD_ITEM_TO_CARD]: (state, action) => ({...state, cart_itens: state.cart_itens.concat(action.payload)}),
        [SET_TOTAL_PRICE]: (state, action) => ({...state, total_price: action.payload}),
        [SET_ITENS_QTY]: (state, action) => ({...state, itens_total_qty: action.payload})
    })

export default cartReducer;