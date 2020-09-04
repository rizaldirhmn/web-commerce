import {
    GET_PRODUCT_DASHBOARD, 
    GET_CARD_STATS, 
    GET_NET_INCOME, 
    GET_GOLD_PRICE, 
    GET_PRODUCT_BUYBACK_DASHBOARD, 
    GET_TRANSACTION_SALES,
    GET_GRAFIK_STOCK
} from '../actions/types'

const initialState = {
    products : null,
    productsBuyback: null,
    card: null,
    grafikNetIncome : null,
    grafikGoldPrice: null,
    grafikTransactionSales: null,
    grafikStock: null,
    loading: true,
    loadingBuyback: true,
    loadingCard: true,
    loadingGrafik: true,
    loadingGoldPrice: true,
    loadingTransactionSales: true,
    loadingGrafikStock: true,
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
        case GET_PRODUCT_BUYBACK_DASHBOARD:
            return {
                ...state,
                productsBuyback: payload,
                loadingBuyback: false
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
        case GET_TRANSACTION_SALES:
            return {
                ...state,
                grafikTransactionSales: payload,
                loadingTransactionSales: false
            }
        case GET_GRAFIK_STOCK:
            return {
                ...state,
                grafikStock: payload,
                loadingGrafikStock: false
            }
        default:
            return state
    }
}