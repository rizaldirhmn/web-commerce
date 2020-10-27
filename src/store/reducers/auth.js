import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  token: null,
  user: {},
  userData: {},
  uploadUrl: null,
  changing: 0,
  error: {},
  loading: false,
  // authRedirectPath: '/dashboard'
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.tokenId,
    user: action.userId,
    userData: action.userData,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    // case actionTypes.AUTH_LOGOUT: return authLogout(state, action)

    default: return state
  }
}

export default reducer
