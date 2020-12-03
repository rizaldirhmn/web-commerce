import * as actions from '../actions/actionTypes'

const initialState = {
    task: null,
    listTask: null,
    uploadTask: null,
    lookupTask: null,
    taskType: null,
    reassignTask: null,
    cancelTask: null,
    lookupListValue: null,
    loadingTaskType: true,
    loadingLookupTask: true,
    loadingListTask: true,
    loadingUploadTask: false,
    loadingCreateTask: false,
    loadingReassignTask: false,
    loadingCancelTask: false,
    loadingLookupListValue: true,
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
        case actions.GET_LOOKUP_TASK:
            return {
                ...state,
                lookupTask: payload,
                loadingLookupTask: false
            }
        case actions.GET_LOOKUP_LIST_VALUE:
            return {
                ...state,
                lookupListValue: payload,
                loadingLookupListValue: false
            }
        case actions.GET_TASK_TYPE:
            return {
                ...state,
                taskType: payload,
                loadingTaskType: false
            }
        case actions.POST_TASK_START:
            return {
                ...state,
                loadingCreateTask: true
            }
        case actions.POST_TASK_END:
            return {
                ...state,
                task: payload,
                loadingCreateTask: false
            }
        case actions.REASSIGN_TASK_START:
            return {
                ...state,
                loadingReassignTask: true
            }
        case actions.REASSIGN_TASK_END:
            return {
                ...state,
                reassignTask: payload,
                loadingReassignTask: false
            }
        case actions.CANCEL_TASK_START:
            return {
                ...state,
                loadingCancelTask: true
            }
        case actions.CANCEL_TASK_END:
            return {
                ...state,
                cancelTask: payload,
                loadingCancelTask: false
            }
        default:
            return state
    }
}