import {
    GET_PURCHASE_ORDER, GET_PURCHASE_ORDER_DETAIL
} from '../actions/types'

const initialState = {
    purchaseOrder: {},
    purchaseOrders : null,
    currentPO: {},
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PURCHASE_ORDER:
            return {
                ...state,
                purchaseOrders: payload,
                loading: false
            }
        case GET_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                purchaseOrder: payload,
                loading: false
            }
        default:
            return state
    }
}