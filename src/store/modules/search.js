import createReducer from '../createReducer';

//Actions
const SEARCH_ITENS = 'fashionista/search/SEARCH_ITENS';
const SET_SEARCH = 'fashionista/search/SET_SEARCH';

//Reducer
const initialState = {
    search_bar: false,
    itens_searched: []
};

export default createReducer(initialState, {
    [SET_SEARCH]: (state, action) => {
        return { ...initialState, search_bar: action.payload };
    },
    [SEARCH_ITENS]: (state, action) => {
        return { ...state, itens_searched: action.payload }
    }
})

//Actions Creators
export const setSearch = (value) => (dispatch,store) => {
    const { search_bar } = store().searchReducer;

    if (search_bar === value)
        return;

    dispatch({
        type: SET_SEARCH,
        payload: value
    })
}

export const SearchItem = (item_name) => (dispatch, store) => {
    const itens = store().itensReducer;
    const item_name_ = item_name.toUpperCase().trim();

    if (item_name_ === '') {
        dispatch({ type: SEARCH_ITENS, payload: [] });
        return;
    }
    const filter = itens.filter((item) => item.name.toUpperCase().trim().includes(item_name_))

    dispatch({ type: SEARCH_ITENS, payload: filter });
}

