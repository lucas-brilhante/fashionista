import { FETCH_ITENS } from './const'

export const fetchItens = () => async (dispatch) => {
    const itens = [{
        id: 'sasadaqedfsa',
        img_url: 'https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg',
        name: 'Roupa 1',
        price: '55.54',
        status: 'promotion',
        price_off: 45.00,
        sizes_available: ['P'],
    },
    {
        id: 'sfgw23rewfvsad',
        img_url: 'https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg',
        name: 'Roupa 2',
        price: '75.12',
        status: '',
        price_off: '',
        sizes_available: ['P', 'M'],
    },
    {
        id: "dfsbrbvcfbwf",
        img_url: 'https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg',
        name: 'Roupa 3',
        price: '13.78',
        status: '',
        price_off: '',
        sizes_available: ['P', 'M', 'G'],
    },
    {
        id: "dfsb2121rbvcfbwf",
        img_url: 'https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg',
        name: 'Roupa 3',
        price: '143.78',
        status: '',
        price_off: '',
        sizes_available: ['P', 'G'],
    },
    {
        id: "365rteqwwefe",
        img_url: 'https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg',
        name: 'Roupa 3',
        price: '71.33',
        status: '',
        price_off: '',
        sizes_available: ['M', 'G'],
    }]
    console.log('teste')
    await dispatch({ type: FETCH_ITENS, payload: itens })
}

export const findItem = (item_id) => (dispatch, store) => {
    const item = store().itemReducer.filter((item) => item.id === item_id);
    console.log(item[0]);
    return item[0];
}