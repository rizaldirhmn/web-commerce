import * as actions from '../actions/actionTypes'

const initialState = {
    templateCustomer: null,
    listCustomer: null,
    uploadCustomer: null,
    loadingCustomer: false,
    loadingListCustomer: false,
    loadingUploadCustomer: false,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_CUSTOMER_START:
            return {
                ...state,
                loadingCustomer: true
            }
        case actions.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                templateCustomer: payload,
                loadingCustomer: false
            }
        case actions.GET_CUSTOMER_FAIL:
            return {
                ...state,
                error: payload,
                loadingCustomer: false
            }
        case actions.GET_LIST_CUSTOMER_START:
            return {
                ...state,
                loadingListCustomer: true
            }
        case actions.GET_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                listCustomer: payload,
                loadingListCustomer: false
            }
        case actions.GET_LIST_CUSTOMER_FAIL:
            return {
                ...state,
                error: payload,
                loadingListCustomer: false
            }
        case actions.UPLOAD_CUSTOMER_START:
            return {
                ...state,
                loadingUploadCustomer: true
            }
        case actions.UPLOAD_CUSTOMER_SUCCESS:
            return {
                ...state,
                uploadCustomer: payload,
                loadingUploadCustomer: false
            }
        case actions.UPLOAD_CUSTOMER_FAIL:
            return {
                ...state,
                error: payload,
                loadingUploadCustomer: false
            }
        default:
            return state
    }
}