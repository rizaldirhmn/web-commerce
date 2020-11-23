import * as actions from '../actions/actionTypes'

const initialState = {
    listReport: null,
    dataReport: null,
    loadingListReport: true,
    loadingExportReport: false,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_LIST_REPORT:
            return {
                ...state,
                listReport: payload,
                loadingListReport: false
            }
        case actions.EXPORT_REPORT_START:
            return {
                ...state,
                loadingExportReport: true
            }
        case actions.EXPORT_REPORT:
            return {
                ...state,
                dataReport: payload,
                loadingExportReport: false
            }
        default:
            return state
    }
}