import { GET_PRODUCT_PO } from '../actions/types'

const initialState = {
    products: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PRODUCT_PO:
            return {
                ...state,
                products: payload,
                loading: false
            }
        default:
            return state
    }
}