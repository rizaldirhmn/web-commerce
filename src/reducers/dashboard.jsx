import {
    GET_PRODUCT_DASHBOARD, 
    GET_CARD_STATS, 
    GET_NET_INCOME, 
    GET_GOLD_PRICE, 
    GET_PRODUCT_BUYBACK_DASHBOARD, 
    GET_TRANSACTION_SALES,
    GET_GRAFIK_STOCK,
    GET_GRAFIK_STOCK2,
    GET_GRAFIK_STOCK3,
    GET_GRAFIK_STOCK4,
    GET_GRAFIK_STOCK5,
    GET_GRAFIK_STOCK6,
    GET_GRAFIK_HPP,
} from '../actions/types'

const initialState = {
    products : null,
    productsBuyback: null,
    card: null,
    grafikNetIncome : null,
    grafikGoldPrice: null,
    grafikTransactionSales: null,
    loading: true,
    loadingBuyback: true,
    loadingCard: true,
    loadingGrafik: true,
    loadingGoldPrice: true,
    loadingTransactionSales: true,

    grafikStock: null,
    loadingGrafikStock: true,
    grafikStock2: null,
    loadingGrafikStock2: true,
    grafikStock3: null,
    loadingGrafikStock3: true,
    grafikStock4: null,
    loadingGrafikStock4: true,
    grafikStock5: null,
    loadingGrafikStock5: true,
    grafikStock6: null,
    loadingGrafikStock6: true,

    grafikHPP: null,
    loadingGrafikHPP: true,
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
        case GET_GRAFIK_STOCK2:
            return {
                ...state,
                grafikStock2: payload,
                loadingGrafikStock2: false
            }
        case GET_GRAFIK_STOCK3:
            return {
                ...state,
                grafikStock3: payload,
                loadingGrafikStock3: false
            }
        case GET_GRAFIK_STOCK4:
            return {
                ...state,
                grafikStock4: payload,
                loadingGrafikStock4: false
            }
        case GET_GRAFIK_STOCK5:
            return {
                ...state,
                grafikStock5: payload,
                loadingGrafikStock5: false
            }
        case GET_GRAFIK_STOCK6:
            return {
                ...state,
                grafikStock6: payload,
                loadingGrafikStock6: false
            }
        case GET_GRAFIK_HPP:
            return {
                ...state,
                grafikHPP: payload,
                loadingGrafikHPP: false
            }
        default:
            return state
    }
}