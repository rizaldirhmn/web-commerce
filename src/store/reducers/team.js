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
                loadingTeam: true
            }
        case actions.GET_TEAM_SUCCESS:
            return {
                ...state,
                teamList: payload,
                loadingTeam: false
            }
        case actions.GET_TEAM_FAIL:
            return {
                ...state,
                error: payload,
                loadingTeam: false
            }
        default:
            return state
    }
}