import axios from 'axios';
import { FETCH_ITENS } from './consts';
import { getProductId } from 'utils';

export const fetchItens = () => async (dispatch) => {
    const itens_array = [];
    const itens = await axios.get('https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog');
    for (let item of itens.data) {
        itens_array.push({
            id: getProductId(item),
            ...item
        })
    }

    dispatch({
        type: FETCH_ITENS,
        payload: itens_array.slice()
    })
}

export const findItem = (item_id) => (dispatch, store) => {
    const item = store().itemReducer.filter((item) => item.id === item_id);
    return item[0];
}