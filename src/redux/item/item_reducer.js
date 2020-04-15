import { FETCH_ITENS } from './const';
import createReducer from '../createReducer';
const initialState = [];

const itemReducer = createReducer(initialState, {
    [FETCH_ITENS]: (state, action) => {
        return action.payload;
    }
})

export default itemReducer;