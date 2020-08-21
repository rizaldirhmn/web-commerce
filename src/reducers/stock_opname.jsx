import {
    GET_STOCK_OPNAME,
    BALANCING_STOCK_OPNAME
} from '../actions/types'

const initialState = {
    stockOpnames: null,
    stockOpname: null,
    loading: true,
    error: {},
    counting : 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_STOCK_OPNAME:
            return {
                ...state,
                stockOpnames: payload,
                loading: false
            }
        case BALANCING_STOCK_OPNAME:
            return {
                ...state,
                stockOpname: payload,
                loading: false,
                counting : initialState.counting += 1
            }
        default:
            return state
    }
}