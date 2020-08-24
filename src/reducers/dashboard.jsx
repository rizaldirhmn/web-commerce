import {
    GET_PRODUCT_DASHBOARD, GET_CARD_STATS
} from '../actions/types'

const initialState = {
    products : null,
    card: null,
    loading: true,
    loadingCard: true,
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
        case GET_CARD_STATS:
            return {
                ...state,
                card: payload,
                loadingCard: false
            }
        default:
            return state
    }
}