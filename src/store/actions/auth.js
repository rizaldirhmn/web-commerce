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

export const auth = (tokenId, history) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      google_token: tokenId
    }

    axios.post('auth/googlelogin', authData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => {
        if(response.data.code === "200"){
          sessionStorage.setItem('access_token', response.data.token)
          sessionStorage.setItem('data', JSON.stringify(response.data.data))
          history.push(`/home`);
          dispatch(authSuccess(response.data.token, response.data.data))
        }else{
          dispatch(setAlert(response.data.message, "error"))
        }
      })
      .catch(err => {
        // dispatch(authFail(err.response.data.msg_str))
        // dispatch(setAlert(err.response.data.msg_str, 'error'))
        dispatch(setAlert("Email atau Password Salah", "error"))
        console.log(err)
      })
  }
}