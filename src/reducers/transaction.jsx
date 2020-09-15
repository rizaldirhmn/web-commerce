import {
    GET_TRANSACTION,
    GET_SEARCH_TRANSACTION,
    GET_DETAIL_TRANSACTION,
    DOWNLOAD_REPORT_TRANSACTION_START,
    DOWNLOAD_REPORT_TRANSACTION_SUCCESS,
    DOWNLOAD_REPORT_TRANSACTION_FAILED
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
        case GET_TRANSACTION:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        case GET_SEARCH_TRANSACTION:
            return {
                ...state,
                transactions: payload,
                loading: false,
            }
        case GET_DETAIL_TRANSACTION:
            return {
                ...state,
                transaction: payload,
                loading: false
            }
        case DOWNLOAD_REPORT_TRANSACTION_START:
            return {
                ...state,
                loadingDownload: true
            }
        case DOWNLOAD_REPORT_TRANSACTION_SUCCESS:
            return {
                ...state,
                downloadTransaction: payload,
                loadingDownload: false
            }
        case DOWNLOAD_REPORT_TRANSACTION_FAILED:
            return {
                ...state,
                downloadTransaction: payload,
                loadingDownload: false
            }
        default:
            return state
    }
}