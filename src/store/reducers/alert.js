import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  open: false,
  openDialogBox: false,
  payload: null
}

const setAlert = (state, action) => {
  return updateObject(state, { open: true, payload: action.payload })
}

const removeAlert = (state, action) => {
  return updateObject(state, { open: false, payload: null })
}

const setDialogBox = (state, action) => {
  return updateObject(state, { openDialogBox: true, payload: action.payload })
}

const removeDialogBox = (state, action) => {
  return updateObject(state, { openDialogBox: false, payload: null })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT: return setAlert(state, action)
    case actionTypes.REMOVE_ALERT: return removeAlert(state, action)
    case actionTypes.SET_DIALOG_BOX: return setDialogBox(state, action)
    case actionTypes.REMOVE_DIALOG_BOX: return removeDialogBox(state, action)
    default: return state
  }
}

export default reducer
