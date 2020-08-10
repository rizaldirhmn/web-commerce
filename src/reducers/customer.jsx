import {
    ADD_CUSTOMER,
    ADD_CUSTOMER_ERROR,
    GET_CUSTOMER
} from '../actions/types'

const initialState = {
    customer: {},
    customers : [],
    loading: true,
    error: {}
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
        case GET_CUSTOMER:
            return {
                ...state,
                customers: payload,
                loading: false
            }
        default:
            return state
    }
}