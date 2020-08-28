import {
    GET_FIRST_BALANCE, ADD_FIRST_BALANCE, ADD_FIRST_BALANCE_ERROR
} from '../actions/types'

const initialState = {
    firstBalance: {},
    firstBalances: null,
    loading: true,
    counting: 0,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_FIRST_BALANCE:
            return {
                ...state,
                firstBalances: payload,
                loading: false
            }
        case ADD_FIRST_BALANCE:
            return {
                ...state,
                firstBalance: payload,
                loading: false,
                counting : initialState.counting += 1
            }
        case ADD_FIRST_BALANCE_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state
    }
}