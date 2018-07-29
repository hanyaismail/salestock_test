import axios from 'axios';
import { GET_ITEMS, ITEM_LOADING, SEARCH_ITEMS, GET_ITEM_SLUG, GET_ITEMS_SCROLL } from './types';

export const getItems = (page) => dispatch => {
    console.log('get item')
    dispatch(itemLoading)
    axios.get(`/api/items?page=${page}`)
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        })
}

export const getItemsScroll = (page) => dispatch => {
    dispatch(itemLoading)
    console.log('getItemsScroll', page)
    axios.get(`/api/items?page=${page}`)
        .then(res => {
            dispatch({
                type: GET_ITEMS_SCROLL,
                payload: res.data
            })
        })
}


export const searchItems = (words) => dispatch => {
    dispatch(itemLoading)
    axios.get(`/api/items/search?name=${words}`)
        .then(res => {
            dispatch({
                type: SEARCH_ITEMS,
                payload: res.data
            })
        })
}

export const getItemSlug = (slug) => dispatch => {
    dispatch(itemLoading)
    axios.get(`/api/items/slug/${slug}`)
        .then(res => {
            dispatch({
                type: GET_ITEM_SLUG,
                payload: res.data
            })
        })
}

export const itemLoading = () => {
    return { type: ITEM_LOADING}
}