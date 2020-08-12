import {
    GET_PURCHASE_ORDER, ADD_PURCHASE_ORDER
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
        case ADD_PURCHASE_ORDER:
            return {
                ...state,
                purchaseOrder: payload,
                loading: false
            }
        default:
            return state
    }
}