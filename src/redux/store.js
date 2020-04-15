import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import combinedReducers from './combinedReducers';

const store = createStore(combinedReducers, applyMiddleware(thunks));
export default store;