import { createStore, applyMiddleware } from 'redux'
import thunks from 'redux-thunk'
import combinedReducers from 'store/combinedReducers'
import { persistStore } from 'redux-persist'

// Create a store to save global variables

const store = createStore(combinedReducers, applyMiddleware(thunks))
export const persistor = persistStore(store)

export default store
