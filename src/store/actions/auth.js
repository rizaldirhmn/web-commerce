import * as actions from './actionTypes'
import axios from '../../axios-orders'
import { setAlert } from './alert'

export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
}

export const authSuccess = (token, userId, userData) => {
  return {
    type: actions.AUTH_SUCCESS,
    tokenId: token,
    userId: userId,
    userData: userData
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, history) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password
    }

    axios.post('admin/login', authData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        sessionStorage.setItem('access_token', response.data.Token)
        sessionStorage.setItem('role', response.data.Admin.id_role)
        sessionStorage.setItem('data', JSON.stringify(response.data.Admin))
        history.push(`/dashboard`);
        dispatch(authSuccess(response.data.access_token, response.data.role, response.data.admin))
      })
      .catch(err => {
        // dispatch(authFail(err.response.data.msg_str))
        // dispatch(setAlert(err.response.data.msg_str, 'error'))
        dispatch(setAlert("Email atau Password Salah", "error"))
        console.log(err)
      })
  }
}