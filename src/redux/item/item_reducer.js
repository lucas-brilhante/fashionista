import { ADD_ITEM, FETCH_ITENS } from './consts';
import createReducer from '../createReducer';
const initialState = [];

const itemReducer = createReducer(initialState, {
    [FETCH_ITENS]: (state, action) => {
        return action.payload;
    },
    [ADD_ITEM]: (state, action) => {
        return [...state, action.payload];
    }
})

export default itemReducer;