import {
    GET_PRODUCT_DASHBOARD, GET_CARD_STATS, GET_NET_INCOME, GET_GOLD_PRICE
} from '../actions/types'

const initialState = {
    products : null,
    card: null,
    grafikNetIncome : null,
    grafikGoldPrice: null,
    loading: true,
    loadingCard: true,
    loadingGrafik: true,
    loadingGoldPrice: true,
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
        case GET_NET_INCOME:
            return {
                ...state,
                grafikNetIncome: payload,
                loadingGrafik: false
            }
        case GET_GOLD_PRICE:
            return {
                ...state,
                grafikGoldPrice: payload,
                loadingGoldPrice: false
            }
        default:
            return state
    }
}