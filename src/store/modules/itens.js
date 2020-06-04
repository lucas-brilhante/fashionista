import createReducer from '../createReducer';
import { api } from 'services';
import { getProductId } from 'utils';

//Actions
const FETCH_ITENS = 'fashionista/itens/FETCH_ITENS';

//Reducer
const initialState = [];

export default createReducer(initialState, {
    [FETCH_ITENS]: (state, action) => {
        return action.payload;
    }
})

//Actions Creators
export const fetchItens = () => async (dispatch) => {
    const itens_array = [];
    const itens = await api();

    for (let item of itens) {
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

export const findItem = (item_id) => (_,store) => {
    const item = store().itensReducer.filter((item) => item.id === item_id);
    return item[0];
}