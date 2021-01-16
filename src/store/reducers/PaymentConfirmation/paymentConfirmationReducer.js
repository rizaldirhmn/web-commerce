import * as actions from '../../actions/actionTypes'

const initialState = {
    confirmPaymentList: null,
    updatePaymentStatus: null,
    loadingUpdatePaymentStatus: false,
    loadingConfirmPaymentList: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_PAYMENT_CONFIRMATION:
            return {
                ...state,
                confirmPaymentList: payload,
                loadingConfirmPaymentList: false
            }
        case actions.UPDATE_STATUS_CONFIRMATION_START:
            return {
                ...state,
                loadingUpdatePaymentStatus: true
            }
        case actions.UPDATE_STATUS_CONFIRMATION_SUCCESS:
            return {
                ...state,
                updatePaymentStatus: payload,
                loadingUpdatePaymentStatus: false
            }
        case actions.UPDATE_STATUS_CONFIRMATION_FAIL:
            return {
                ...state,
                error: payload,
                loadingUpdatePaymentStatus: false
            }
        default:
            return state
    }
}