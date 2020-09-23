import {
    EDIT_PROFILE, GET_PROFILE, UPDATE_PROFILE
} from '../actions/types'

const initialState = {
    profiles : null,
    profile : null,
    loadingGetProfile: true,
    loading: false,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loadingGetProfile: false
            }
        case EDIT_PROFILE:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        default:
            return state
    }
}