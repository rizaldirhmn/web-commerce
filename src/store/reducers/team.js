import * as actions from '../actions/actionTypes'

const initialState = {
    teamList: null,
    loadingTeam: false,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_TEAM_START:
            return {
                ...state,
                loading: true
            }
        case actions.GET_TEAM:
            return {
                ...state,
                teamList: payload,
                loading: true
            }
        default:
            return state
    }
}