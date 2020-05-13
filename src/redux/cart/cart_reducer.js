import { SHOW_CART, SET_TOTAL_PRICE, SET_ITENS_QTY } from './consts';
import createReducer from '../createReducer';

const initialState = {
    show_cart: false,
    total_price: 0,
    itens_total_qty: 0
}

const cartReducer = createReducer(initialState, {
        [SHOW_CART]: (state, action) => ({ ...state, show_cart: action.payload }),
        [SET_TOTAL_PRICE]: (state, action) => ({...state, total_price: action.payload}),
        [SET_ITENS_QTY]: (state, action) => ({...state, itens_total_qty: action.payload})
    })

export default cartReducer;