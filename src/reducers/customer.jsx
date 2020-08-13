import {
    ADD_CUSTOMER,
    ADD_CUSTOMER_ERROR,
    GET_CUSTOMER,
    EDIT_CUSTOMER,
    GET_DETAIL_CUSTOMER,
    GET_SEARCH_CUSTOMER
} from '../actions/types'

const initialState = {
    customer: {},
    customers : null,
    currentCustomer: {},
    searchCustomer: {},
    loading: true,
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
                customer: payload,
                loading: false
            }
        case EDIT_CUSTOMER:
            return {
                ...state,
                customer: payload,
                loading: false
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
                loading: false,
                counting : initialState.counting +=1
            }
        default:
            return state
    }
}