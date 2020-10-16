import {
    ADD_CUSTOMER,
    ADD_CUSTOMER_SUCCESS,
    ADD_CUSTOMER_FAILED,
    ADD_CUSTOMER_ERROR,
    GET_CUSTOMER,
    EDIT_CUSTOMER,
    GET_DETAIL_CUSTOMER,
    GET_SEARCH_CUSTOMER,
    GET_SEARCH_CUSTOMER_BUYBACK,
    GET_CUSTOMER_V2,
    GET_SEARCH_CUSTOMER_CLEAR,
    EDIT_CUSTOMER_SUCCESS,
    EDIT_CUSTOMER_FAILED,
} from '../actions/types'

const initialState = {
    customer: {},
    customers : null,
    customers_v2 : null,
    currentCustomer: {},
    searchCustomer: null,
    searchCustomerClear: null,
    searchCustomerBuyback: null,
    loadingSearchCustomerBuyback: true,
    loading: true,
    loadingSearchCustomer: true,
    loadingCustomerV2: true,
    loadingCustomerClear: true,
    loadingAddCustomer: false,
    loadingEditCustomer: false,
    error: {},
    counting : 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_CUSTOMER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                loadingAddCustomer: true
            }
        case ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: payload,
                loadingAddCustomer: false
            }
        case ADD_CUSTOMER_FAILED:
            return {
                ...state,
                customer: payload,
                loadingAddCustomer: false
            }
        case EDIT_CUSTOMER:
            return {
                ...state,
                loadingEditCustomer: true
            }
        case EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: payload,
                loadingEditCustomer: false
            }
        case EDIT_CUSTOMER_FAILED:
            return {
                ...state,
                customer: payload,
                loadingEditCustomer: false
            }
        case GET_CUSTOMER:
            return {
                ...state,
                customers: payload,
                loading: false
            }
        case GET_DETAIL_CUSTOMER:
            return {
                ...state,
                currentCustomer: payload,
                loading: false
            }
        case GET_SEARCH_CUSTOMER:
            return {
                ...state,
                searchCustomer: payload,
                loadingSearchCustomer: false,
            }
        case GET_SEARCH_CUSTOMER_BUYBACK:
            return {
                ...state,
                searchCustomerBuyback: payload,
                loadingSearchCustomerBuyback: false,
            }
        case GET_CUSTOMER_V2:
            return {
                ...state,
                customers_v2: payload,
                loadingCustomerV2: false,
            }
        case GET_SEARCH_CUSTOMER_CLEAR:
            return {
                ...state,
                searchCustomerClear: payload,
                loadingCustomerClear: false,
            }
        default:
            return state
    }
}