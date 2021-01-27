import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const getConfirmationPayment = (page, status) => async dispatch => {
    dispatch({
        type: actions.GET_PAYMENT_CONFIRMATION_START,
    })
  const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/bukti_pembayaran/filter?page=${page}&status=${status}`
    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
            }
        });
        dispatch({
            type: actions.GET_PAYMENT_CONFIRMATION,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_PAYMENT_CONFIRMATION_FAIL,
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const updateStatus = (data, history) => async dispatch => {
    dispatch({
        type: actions.UPDATE_STATUS_CONFIRMATION_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/bukti_pembayaran/${data.id}/confirm`
      try {
          const res = await axios({
              url: endpoint,
              method: "PATCH",
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch({
              type: actions.UPDATE_STATUS_CONFIRMATION_SUCCESS,
              payload: res.data
          })
          dispatch(setAlert("Status berhasil diubah", "success"))
          dispatch(getConfirmationPayment(1, 2))
          history.push('/payment-confirmation')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.UPDATE_STATUS_CONFIRMATION_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}

export const updateSendStatus = (data, history) => async dispatch => {
    dispatch({
        type: actions.UPDATE_STATUS_SENDING_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/bukti_pembayaran/${data.id}/send`
      try {
          const res = await axios({
              url: endpoint,
              method: "PATCH",
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch({
              type: actions.UPDATE_STATUS_SENDING_SUCCESS,
              payload: res.data
          })
          dispatch(setAlert("Status berhasil diubah", "success"))
          dispatch(getConfirmationPayment(1, 3))
          history.push('/payment-confirmation')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.UPDATE_STATUS_SENDING_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}

export const updateAbortStatus = (data, history) => async dispatch => {
    dispatch({
        type: actions.UPDATE_STATUS_ABORT_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/bukti_pembayaran/${data.id}/refuse`
      try {
          const res = await axios({
              url: endpoint,
              method: "PATCH",
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch({
              type: actions.UPDATE_STATUS_ABORT_SUCCESS,
              payload: res.data
          })
          dispatch(setAlert("Status berhasil diubah", "success"))
          dispatch(getConfirmationPayment(1, 2))
          history.push('/payment-confirmation')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.UPDATE_STATUS_ABORT_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}