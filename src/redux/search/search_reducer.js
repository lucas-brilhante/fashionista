import { SET_SEARCH, SEARCH_ITENS } from './consts';
import createReducer from '../createReducer';

const initialState = {
    search_bar: false,
    itens_searched: []
};

const searchReducer = createReducer(initialState, {
    [SET_SEARCH]: (state, action) => {
        return {...initialState, search_bar: action.payload};
    },
    [SEARCH_ITENS]: (state, action) => {
        return {...state, itens_searched: action.payload}
    }
})

export default searchReducer;