import {
    PURCHASE_ITEM_PAY,
    PURCHASE_ITEM_PAY_ERROR,
    PURCHASE_ITEM_PAY_BUYBACK,
    PURCHASE_ITEM_PAY_START
} from '../actions/types'

const initialState = {
    payment: {},
    paymentBuyback: {},
    loading: false,
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
        case PURCHASE_ITEM_PAY_START:
            return {
                ...state,
                loading: true
            }
        case PURCHASE_ITEM_PAY:
            return {
                ...state,
                payment: payload,
                loading: false
            }
        case PURCHASE_ITEM_PAY_BUYBACK:
            return {
                ...state,
                paymentBuyback: payload,
                loading: false
            }
        default:
            return state
    }
}