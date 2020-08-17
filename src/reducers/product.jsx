import { GET_PRODUCT_PO, GET_PRODUCT } from '../actions/types'

const initialState = {
    products: null,
    productPO: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PRODUCT_PO:
            return {
                ...state,
                productPO: payload,
                loading: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                products: payload,
                loading: false
            }
        default:
            return state
    }
}