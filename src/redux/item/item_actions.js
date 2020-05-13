import axios from 'axios';
import { ADD_ITEM } from './consts';
import { getProductId } from 'utils';

export const fetchItens = () => async (dispatch) => {

    const itens = await axios.get('https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog');
    for (let item of itens.data) {
        await dispatch({
            type: ADD_ITEM,
            payload: {
                id: getProductId(item),
                ...item
            }
        })
    }
}

export const findItem = (item_id) => (dispatch, store) => {
    const item = store().itemReducer.filter((item) => item.id === item_id);
    return item[0];
}