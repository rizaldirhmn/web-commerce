import {
    GET_TRANSACTION_BUYBACK,
    GET_SEARCH_TRANSACTION_BUYBACK,
    GET_DETAIL_TRANSACTION_BUYBACK
} from '../actions/types'

const initialState = {
    transactions: null,
    transaction: null,
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_TRANSACTION_BUYBACK:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        case GET_SEARCH_TRANSACTION_BUYBACK:
            return {
                ...state,
                transactions: payload,
                loading: false,
            }
        case GET_DETAIL_TRANSACTION_BUYBACK:
            return {
                ...state,
                transaction: payload,
                loading: false
            }
        default:
            return state
    }
}