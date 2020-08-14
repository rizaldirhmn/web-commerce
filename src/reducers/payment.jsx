import {
    PURCHASE_ITEM_PAY,
    PURCHASE_ITEM_PAY_ERROR
} from '../actions/types'

const initialState = {
    payment: {},
    loading: true,
    error: {},
    counting : 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case PURCHASE_ITEM_PAY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case PURCHASE_ITEM_PAY:
            return {
                ...state,
                payment: payload,
                loading: false
            }
        default:
            return state
    }
}