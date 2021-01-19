import * as actions from '../../actions/actionTypes'

const initialState = {
    confirmPaymentList: null,
    updatePaymentStatus: null,
    updateSendStatus: null,
    updateAbortStatus: null,
    loadingAbortStatus: false,
    loadingSendStatus: false,
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
        case actions.UPDATE_STATUS_SENDING_START:
            return {
                ...state,
                loadingSendStatus: true
            }
        case actions.UPDATE_STATUS_SENDING_SUCCESS:
            return {
                ...state,
                updateSendStatus: payload,
                loadingSendStatus: false
            }
        case actions.UPDATE_STATUS_SENDING_FAIL:
            return {
                ...state,
                error: payload,
                loadingSendStatus: false
            }
        case actions.UPDATE_STATUS_ABORT_START:
            return {
                ...state,
                loadingAbortStatus: true
            }
        case actions.UPDATE_STATUS_ABORT_SUCCESS:
            return {
                ...state,
                updateAbortStatus: payload,
                loadingAbortStatus: false
            }
        case actions.UPDATE_STATUS_ABORT_FAIL:
            return {
                ...state,
                error: payload,
                loadingAbortStatus: false
            }
        default:
            return state
    }
}