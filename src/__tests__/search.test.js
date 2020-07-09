import { SearchItem } from 'store';
import store from 'store/store';
import products from './mocks/products.json';

store.getState().itensReducer = products; //load itens from mock

it('SearchItem("ves") should find the itens with name VESTIDO FRANZIDO RECORTES and VESTIDO CURTO FESTIVAL!', () => {
    // VESTIDO FRANZIDO RECORTES and VESTIDO CURTO FESTIVAL array positions
    const expected_result = [store.getState().itensReducer[0], store.getState().itensReducer[6]]
    store.dispatch(SearchItem('ves'));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})

it('SearchItem("cas") should find the item with name CASACO WHITE FUR!', () => {
    const expected_result = [store.getState().itensReducer[5]] // CASACO WHITE FUR array position 
    store.dispatch(SearchItem('cas'));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})

it('SearchItem("cas     ") should find the item with name CASACO WHITE FUR!', () => {
    const expected_result = [store.getState().itensReducer[5]] // CASACO WHITE FUR array position 
    store.dispatch(SearchItem('cas     '));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})

it('SearchItem("     cas     ") should find the item with name CASACO WHITE FUR!', () => {
    const expected_result = [store.getState().itensReducer[5]] // CASACO WHITE FUR array position 
    store.dispatch(SearchItem('     cas     '));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})

it('SearchItem("") should find no itens', () => {
    const expected_result = [];
    store.dispatch(SearchItem(''));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})

it('SearchItem("     ") should find no itens', () => {
    const expected_result = [];
    store.dispatch(SearchItem('     '));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})

it('SearchItem("asdasd") should find no itens', () => {
    const expected_result = [];
    store.dispatch(SearchItem('asdasd'));
    const result = store.getState().searchReducer.itens_searched;
    expect(result).toEqual(expected_result);
})