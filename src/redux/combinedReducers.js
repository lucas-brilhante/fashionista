
import { combineReducers } from 'redux';
import itemReducer from './item/item_reducer';
import searchReducer from './search/search_reducer';

const combinedReducers = combineReducers({
    itemReducer,
    searchReducer
})

export default combinedReducers;