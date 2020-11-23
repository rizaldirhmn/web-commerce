import * as actions from '../actions/actionTypes'

const initialState = {
    listReport: null,
    loadingListReport: true,
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
        default:
            return state
    }
}