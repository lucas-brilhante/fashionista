import { SET_SEARCH, SEARCH_ITENS } from './consts';

export const setSearch = (value) => ({
    type: SET_SEARCH,
    payload: value
})

export const SearchItem = (item_name) => (dispatch,store) => {
    const itens = store().itemReducer;
    const item_name_ = item_name.toUpperCase().trim();

    if(item_name_ === ''){
        dispatch({ type: SEARCH_ITENS, payload: [] });
        return;
    }

    const filter = itens.filter((item) => item.name.toUpperCase().trim().includes(item_name_))

    dispatch({ type: SEARCH_ITENS, payload: filter });

}