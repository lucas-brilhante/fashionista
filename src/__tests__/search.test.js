import { SearchItem } from 'store'
import store from 'store/store'
import products from './mocks/products.json'

store.getState().itensReducer = products // load itens from mock

const getItem = (index) => store.getState().itensReducer[index]

it('SearchItem("ves") should find the itens with name VESTIDO FRANZIDO RECORTES and VESTIDO CURTO FESTIVAL!', () => {
  // VESTIDO FRANZIDO RECORTES and VESTIDO CURTO FESTIVAL array positions
  const expectedResult = [getItem(0), getItem(6)]
  store.dispatch(SearchItem('ves'))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})

it('SearchItem("cas") should find the item with name CASACO WHITE FUR!', () => {
  const expectedResult = [getItem(5)] // CASACO WHITE FUR array position
  store.dispatch(SearchItem('cas'))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})

it('SearchItem("cas     ") should find the item with name CASACO WHITE FUR!', () => {
  const expectedResult = [getItem(5)] // CASACO WHITE FUR array position
  store.dispatch(SearchItem('cas     '))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})

it('SearchItem("     cas     ") should find the item with name CASACO WHITE FUR!', () => {
  const expectedResult = [getItem(5)] // CASACO WHITE FUR array position
  store.dispatch(SearchItem('     cas     '))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})

it('SearchItem("") should find no itens', () => {
  const expectedResult = []
  store.dispatch(SearchItem(''))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})

it('SearchItem("     ") should find no itens', () => {
  const expectedResult = []
  store.dispatch(SearchItem('     '))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})

it('SearchItem("asdasd") should find no itens', () => {
  const expectedResult = []
  store.dispatch(SearchItem('asdasd'))
  const result = store.getState().searchReducer.itens_searched
  expect(result).toEqual(expectedResult)
})
