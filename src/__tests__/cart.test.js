import {
  addItemToCard,
  removeItem,
  changeQty,
  reloadTotalPrice,
  resetCart,
} from 'store'
import store from 'store/store'
import { currencyMask } from 'utils'
import products from './mocks/products.json'

store.getState().itensReducer = products // load itens from mock

const getItem = (index) => store.getState().itensReducer[index]

const expectedCartItemResult = (item, size, qty) => {
  const id = `${item.id}_0_${size}`
  return {
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
    qty,
  }
}

it('Add VESTIDO FRANZIDO RECORTES to empty cart should return quantity 1', () => {
  store.dispatch(resetCart())
  const expectedResult = [
    // VESTIDO FRANZIDO RECORTES, size: M, quantity: 1
    expectedCartItemResult(getItem(0), 'M', 1),
  ]
  store.dispatch(addItemToCard(getItem(0), 'M'))
  const result = store.getState().cartReducer.cart_itens
  expect(result).toEqual(expectedResult)
})

it('Add 3x VESTIDO FRANZIDO RECORTES to cart should return quantity 3', () => {
  store.dispatch(resetCart())
  const expectedResult = [
    // VESTIDO FRANZIDO RECORTES, size: M, quantity: 1
    expectedCartItemResult(getItem(0), 'M', 3),
  ]
  // Add 3x VESTIDO FRANZIDO RECORTES(size: M)
  store.dispatch(addItemToCard(getItem(0), 'M'))
  store.dispatch(addItemToCard(getItem(0), 'M'))
  store.dispatch(addItemToCard(getItem(0), 'M'))
  const result = store.getState().cartReducer.cart_itens
  expect(result).toEqual(expectedResult)
})

it('Add 1x CALÇA COMFORT TASSEL then change quantity for 4', () => {
  store.dispatch(resetCart())
  const expectedResult = [
    // CALÇA COMFORT TASSEL(size: 40) quantity: 1
    expectedCartItemResult(getItem(1), '40', 4),
  ]
  // Add CALÇA COMFORT TASSEL(size: 40) then change quantity to 4
  store.dispatch(addItemToCard(getItem(1), '40'))
  store.dispatch(changeQty(4, 0)) // CALÇA COMFORT TASSEL index: 0
  const result = store.getState().cartReducer.cart_itens
  expect(result).toEqual(expectedResult)
})

it('Add 2x SAIA DENIM BOTÕES(size: 42) and 3x SAIA DENIM BOTÕES(size: 40) then remove SAIA DENIM BOTÕES(size: 42)', () => {
  store.dispatch(resetCart())
  const expectedResult = [
    // SAIA DENIM BOTÕES(size: 42) quantity: 2  ---- REMOVED
    // expectedCartItemResult(getItem(2), "42", 2),
    // SAIA DENIM BOTÕES(size: 40) quantity: 3
    expectedCartItemResult(getItem(2), '40', 3),
  ]
  // Add SAIA DENIM BOTÕES(size: 42, id: 3787_233_0_42) then change quantity to 2
  store.dispatch(addItemToCard(getItem(2), '42'))
  store.dispatch(changeQty(2, 0)) // SAIA DENIM BOTÕES(size 42) index: 0
  // Add SAIA DENIM BOTÕES(size: 40, id: 3787_233_0_42) then change quantity to 3
  store.dispatch(addItemToCard(getItem(2), '40'))
  store.dispatch(changeQty(3, 1)) // SAIA DENIM BOTÕES(size 40) index: 1
  // Remove SAIA DENIM BOTÕES(size: 42, id: 3787_233_0_42)
  store.dispatch(removeItem('3787_233_0_42'))
  const result = store.getState().cartReducer.cart_itens
  expect(result).toEqual(expectedResult)
})

it('Add 3x VESTIDO FRANZIDO RECORTES to cart should return quantity 3', () => {
  store.dispatch(resetCart())
  const expectedResult = currencyMask(1369.2)
  // Add BLUSA LAÇO ISTAMBUL(size: PP) then change quantity to 4 - R$ 599,60
  store.dispatch(addItemToCard(getItem(3), 'PP'))
  store.dispatch(changeQty(4, 0)) // BLUSA LAÇO ISTAMBUL(size PP) index: 0

  // Add CASACO WHITE FUR(size: M) then change quantity to 3 - R$ 719,70
  store.dispatch(addItemToCard(getItem(5), 'M'))
  store.dispatch(changeQty(3, 1)) // CASACO WHITE FUR(size: M) inxed: 1

  // Add ÓCULOS DE SOL BOLD - R$109,90 but it's in promotion, so R$ 49,90
  store.dispatch(addItemToCard(getItem(7), 'U'))

  // Update Cart Total Price
  store.dispatch(reloadTotalPrice())

  const result = store.getState().cartReducer.total_price
  expect(result).toEqual(expectedResult)
})
