import {
    GET_TRANSACTION,
    GET_SEARCH_TRANSACTION
} from '../actions/types'

const initialState = {
    transactions: null,
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_TRANSACTION:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        case GET_SEARCH_TRANSACTION:
            return {
                ...state,
                transactions: payload,
                loading: false,
            }
        default:
            return state
    }
}