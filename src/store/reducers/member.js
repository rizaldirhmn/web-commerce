import * as actions from '../actions/actionTypes'

const initialState = {
    listMember: null,
    loadingMember: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_MEMBER:
            return {
                ...state,
                listMember: payload,
                loadingMember: false
            }
        default:
            return state
    }
}