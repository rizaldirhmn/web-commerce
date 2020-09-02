import {
    GET_PURCHASE_ORDER, 
    ADD_PURCHASE_ORDER, 
    GET_PURCHASE_ORDER_DETAIL, 
    ADD_PURCHASE_ORDER_DETAIL,
    DELETE_PURCHASE_ORDER_DETAIL,
    UPDATE_PURCHASE_ORDER_DONE
} from '../actions/types'

const initialState = {
    purchaseOrder: {},
    purchaseOrders : null,
    purchaseOrderDetail : {},
    purchaseOrderDetails : null,
    updatePurchaseOrderDone : null,
    loadingUpdatePurchaseOrderDone : true,
    loading: true,
    counting: 0,
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
                purchaseOrderDetails: payload,
                loading: false
            }
        case ADD_PURCHASE_ORDER:
            return {
                ...state,
                purchaseOrder: payload,
                loading: false
            }
        case ADD_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                purchaseOrderDetail: payload,
                loading: false,
                counting: initialState.counting += 1
            }
        case DELETE_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                purchaseOrderDetail : payload,
                loading: false,
                counting: initialState.counting -= 1
            }
        case UPDATE_PURCHASE_ORDER_DONE:
            return {
                ...state,
                updatePurchaseOrderDone : payload,
                loadingUpdatePurchaseOrderDone: false,
            }
        default:
            return state
    }
}