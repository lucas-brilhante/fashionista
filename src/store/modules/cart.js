import { getNumbers, currencyMask } from 'utils'
import createReducer from '../createReducer'

// Actions
const SHOW_CART = 'fashionista/cart/SHOW_CART'
const SET_TOTAL_PRICE = 'fashionista/cart/SET_TOTAL_PRICE'
const SET_ITENS_QTY = 'fashionista/cart/SET_ITENS_QTY'
const SET_CART_ITENS = 'fashionista/cart/SET_CART_ITENS'
const RESET_CART = 'fashionista/cart/RESET_CART'

// Reducer
const initialState = {
  show_cart: false,
  total_price: 0,
  itens_total_qty: 0,
  cart_itens: [],
}

export default createReducer(initialState, {
  [SHOW_CART]: (state, action) => ({ ...state, show_cart: action.payload }),
  [SET_TOTAL_PRICE]: (state, action) => ({
    ...state,
    total_price: action.payload,
  }),
  [SET_ITENS_QTY]: (state, action) => ({
    ...state,
    itens_total_qty: action.payload,
  }),
  [SET_CART_ITENS]: (state, action) => ({
    ...state,
    cart_itens: action.payload,
  }),
  [RESET_CART]: () => initialState,
})

// Actions Creators
export const showCart = (value) => ({
  type: SHOW_CART,
  payload: value,
})

export const resetCart = () => ({
  type: RESET_CART,
})

export const reloadTotalPrice = () => (dispatch, store) => {
  const cart = store().cartReducer.cart_itens
  let totalPrice = 0
  let totalItensQty = 0

  cart.forEach((item) => {
    totalPrice += getNumbers(item.actual_price) * item.qty
    totalItensQty += item.qty
  })

  dispatch({
    type: SET_TOTAL_PRICE,
    payload: currencyMask(totalPrice),
  })
  dispatch({
    type: SET_ITENS_QTY,
    payload: totalItensQty,
  })
}

export const changeQty = (qty, index) => (dispatch, store) => {
  let cart = store().cartReducer.cart_itens

  if (cart) cart = cart.slice()

  cart[index].qty = qty

  dispatch({
    type: SET_CART_ITENS,
    payload: cart,
  })
  dispatch(reloadTotalPrice())
}

export const removeItem = (itemId) => (dispatch, store) => {
  let cart = store().cartReducer.cart_itens

  if (cart) cart = cart.slice().filter((item) => item.id !== itemId)

  dispatch({
    type: SET_CART_ITENS,
    payload: cart,
  })
  dispatch(reloadTotalPrice())
}

export const addItemToCard = (item, size) => (dispatch, store) => {
  const id = `${item.id}_0_${size}`
  const cart = store().cartReducer.cart_itens
  let cartItemIndex = null

  if (cart) cartItemIndex = cart.findIndex((cartItem_) => cartItem_.id === id)

  if (cartItemIndex !== -1) {
    dispatch(changeQty(cart[cartItemIndex].qty + 1, cartItemIndex))
    return
  }

  const itemToCart = {
    id,
    name: item.name,
    style: item.style,
    code_color: item.code_color,
    color_slug: item.color_slug,
    color: item.color,
    on_sale: item.on_sale,
    regular_price: item.regular_price,
    actual_price: item.actual_price,
    discount_percentage: item.discount_percentage,
    installments: item.installments,
    image: item.image,
    size,
    qty: 1,
  }

  dispatch({
    type: SET_CART_ITENS,
    payload: cart ? [...cart, itemToCart] : [itemToCart],
  })
  dispatch(reloadTotalPrice())
}
