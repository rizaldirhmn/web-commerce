import * as actions from '../actions/actionTypes'

const initialState = {
    listReport: null,
    dataReport: null,
    dataReportAbsence: null,
    loadingListReport: true,
    loadingExportReport: false,
    loadingExportReportAbsence: false,
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
        case actions.EXPORT_REPORT_ABSENCE_START:
            return {
                ...state,
                loadingExportReportAbsence: true
            }
        case actions.EXPORT_REPORT_ABSENCE:
            return {
                ...state,
                dataReportAbsence: payload,
                loadingExportReportAbsence: false
            }
        default:
            return state
    }
}