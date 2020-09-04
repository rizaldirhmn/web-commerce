import {
    GET_OTHER_PURCHASE_ORDER, 
    ADD_OTHER_PURCHASE_ORDER, 
    GET_OTHER_PURCHASE_ORDER_DETAIL, 
    ADD_OTHER_PURCHASE_ORDER_DETAIL,
    DELETE_OTHER_PURCHASE_ORDER_DETAIL,
    UPDATE_OTHER_PURCHASE_ORDER_DETAIL
} from '../actions/types'

const initialState = {
    otherPurchaseOrder: {},
    otherPurchaseOrders : null,
    otherPurchaseOrderDetail : {},
    otherPurchaseOrderDetails : null,
    otherUpdatePurchaseOrderDone : null,
    loading: true,
    loadingDetail : true,
    loadingUpdateOtherPurchaseOrderDone: true,
    counting: 0,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_OTHER_PURCHASE_ORDER:
            return {
                ...state,
                otherPurchaseOrders: payload,
                loading: false
            }
        case GET_OTHER_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                otherPurchaseOrderDetails: payload,
                loadingDetail: false
            }
        case ADD_OTHER_PURCHASE_ORDER:
            return {
                ...state,
                otherPurchaseOrder: payload,
                loading: false
            }
        case ADD_OTHER_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                otherPurchaseOrderDetail: payload,
                loadingDetail: false,
                counting: initialState.counting += 1
            }
        case DELETE_OTHER_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                otherPurchaseOrderDetail: payload,
                loadingDetail: false,
                counting: initialState.counting -= 1
            }
        case UPDATE_OTHER_PURCHASE_ORDER_DETAIL:
            return {
                ...state,
                otherUpdatePurchaseOrderDone : payload,
                loadingUpdateOtherPurchaseOrderDone: false,
            }
        default:
            return state
    }
}