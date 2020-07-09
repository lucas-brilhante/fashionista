import { api } from 'services'
import { getProductId } from 'utils'
import createReducer from '../createReducer'

// Actions
const FETCH_ITENS = 'fashionista/itens/FETCH_ITENS'

// Reducer
const initialState = []

export default createReducer(initialState, {
  [FETCH_ITENS]: (state, action) => {
    return action.payload
  },
})

// Actions Creators
export const fetchItens = () => async (dispatch) => {
  const itens = await api()
  const itensArray = itens.map((item) => ({
    id: getProductId(item),
    ...item,
  }))

  dispatch({
    type: FETCH_ITENS,
    payload: itensArray.slice(),
  })
}

export const findItem = (itemId) => (_, store) => {
  const item = store().itensReducer.filter((item_) => item_.id === itemId)
  return item[0]
}
