import * as actions from '../actions/actionTypes'

const initialState = {
    listTask: null,
    uploadTask: null,
    loadingListTask: true,
    loadingUploadTask: false,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_LIST_TASK_SUCCESS:
            return {
                ...state,
                listTask: payload,
                loadingListTask: false
            }
        case actions.GET_LIST_TASK_FAIL:
            return {
                ...state,
                error: payload,
                loadingListCustomer: false
            }
        case actions.UPLOAD_TASK_START:
            return {
                ...state,
                loadingUploadTask: true
            }
        case actions.UPLOAD_TASK_SUCCESS:
            return {
                ...state,
                uploadTask: payload,
                loadingUploadTask: false
            }
        case actions.UPLOAD_TASK_FAIL:
            return {
                ...state,
                error: payload,
                loadingUploadTask: false
            }
        default:
            return state
    }
}