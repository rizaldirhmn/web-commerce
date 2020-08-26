import {
    GET_PRODUCT_DASHBOARD, GET_CARD_STATS, GET_NET_INCOME, GET_GOLD_PRICE
} from '../actions/types'

const initialState = {
    products : null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PRODUCT_DASHBOARD:
            return {
                ...state,
                products: payload,
                loading: false
            }
        default:
            return state
    }
}