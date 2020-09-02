import {
    GET_STOCK_HISTORY, GET_STOCK_HISTORY_DETAIL
} from '../actions/types'

const initialState = {
    stockHistory : null,
    detailStockHistory: null,
    loading: true,
    loadingDetailStock: true,
    error: {},
    counting : 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_STOCK_HISTORY:
            return {
                ...state,
                stockHistory: payload,
                loading: false
            }
        case GET_STOCK_HISTORY_DETAIL:
            return {
                ...state,
                detailStockHistory: payload,
                loadingDetailStock: false
            }
        default:
            return state
    }
}