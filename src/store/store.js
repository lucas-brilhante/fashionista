import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import combinedReducers from 'store/combinedReducers';

export default createStore(combinedReducers, applyMiddleware(thunks));