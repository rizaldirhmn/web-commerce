import {
    ADD_LOGIN,
    LOGIN_ERROR
} from '../actions/types'

const initialState = {
    loginData: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_LOGIN:
            return {
                ...state,
                loginData: payload,
                loading: false
            }
        default:
            return state
    }
}