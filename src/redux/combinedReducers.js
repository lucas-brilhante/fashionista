
import { combineReducers } from 'redux';
import itemReducer from './item/item_reducer';
import searchReducer from './search/search_reducer';
import cartReducer from './cart/cart_reducer';

const combinedReducers = combineReducers({
    itemReducer,
    searchReducer,
    cartReducer
})

export default combinedReducers;