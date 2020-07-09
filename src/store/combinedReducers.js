import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'
import itensReducer from './modules/itens'
import searchReducer from './modules/search'
import cartReducer from './modules/cart'

const persistConfig = {
  key: 'fashionista',
  storage,
  whitelist: ['cart_itens'],
}

const combinedReducers = combineReducers({
  itensReducer,
  searchReducer,
  cartReducer: persistReducer(persistConfig, cartReducer),
})

export default combinedReducers
