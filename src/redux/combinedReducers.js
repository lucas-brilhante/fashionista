
import { combineReducers } from 'redux';
import itemReducer from './item/item_reducer';

const combinedReducers = combineReducers({
    itemReducer
})

export default combinedReducers;