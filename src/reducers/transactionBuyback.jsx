import {
    GET_TRANSACTION_BUYBACK,
    GET_SEARCH_TRANSACTION_BUYBACK,
    GET_DETAIL_TRANSACTION_BUYBACK,
    DOWNLOAD_REPORT_TRANSACTION_BUYBACK_START,
    DOWNLOAD_REPORT_TRANSACTION_BUYBACK_SUCCESS,
    DOWNLOAD_REPORT_TRANSACTION_BUYBACK_FAILED
} from '../actions/types'

const initialState = {
    transactions: null,
    transaction: null,
    downloadTransaction: null,
    loading: true,
    loadingDownload: false,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_TRANSACTION_BUYBACK:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        case GET_SEARCH_TRANSACTION_BUYBACK:
            return {
                ...state,
                transactions: payload,
                loading: false,
            }
        case GET_DETAIL_TRANSACTION_BUYBACK:
            return {
                ...state,
                transaction: payload,
                loading: false
            }
        case DOWNLOAD_REPORT_TRANSACTION_BUYBACK_START:
            return {
                ...state,
                loadingDownload: true
            }
        case DOWNLOAD_REPORT_TRANSACTION_BUYBACK_SUCCESS:
            return {
                ...state,
                downloadTransaction: payload,
                loadingDownload: false
            }
        case DOWNLOAD_REPORT_TRANSACTION_BUYBACK_FAILED:
            return {
                ...state,
                downloadTransaction: payload,
                loadingDownload: false
            }
        default:
            return state
    }
}