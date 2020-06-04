
import { combineReducers } from 'redux';
import itensReducer from './modules/itens';
import searchReducer from './modules/search';
import cartReducer from './modules/cart';

const combinedReducers = combineReducers({
    itensReducer,
    searchReducer,
    cartReducer
})

export default combinedReducers;