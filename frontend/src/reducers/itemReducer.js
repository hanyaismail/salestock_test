import { GET_ITEMS, ITEM_LOADING, SEARCH_ITEMS, GET_ITEM_SLUG, GET_ITEMS_SCROLL } from '../actions/types';

const initialState = {
    total_page: null,
    items: [],
    loading: false
}

const itemReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_ITEMS:
            return { ...state, items: action.payload.data, total_page: action.payload.meta.pages, loading: false}
        case GET_ITEMS_SCROLL:
            console.log('reducer', action.payload.data)
            return { ...state, items: [...state.items, ...action.payload.data], total_page: action.payload.meta.pages}
        case SEARCH_ITEMS:
            return { ...state, items: action.payload.data, loading: false}
        case GET_ITEM_SLUG:
            return { ...state, items: action.payload.data, loading: false}
        case ITEM_LOADING:
            return { ...state, loading: true}
        default:
            return state
    }
}

export default itemReducer;