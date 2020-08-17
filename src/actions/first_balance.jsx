
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_FIRST_BALANCE, ADD_FIRST_BALANCE, ADD_FIRST_BALANCE_ERROR
} from './types'

export const getFirstBalance = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/first_balance`
    const token = sessionStorage.getItem('access_token')

    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: GET_FIRST_BALANCE,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const addFirstBalance = (formData) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/first_balance`
    const token = sessionStorage.getItem('access_token')
    const product = {
        product : formData
    }
    console.log(product)
    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: product,
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: ADD_FIRST_BALANCE,
            payload: res.data
        })

        dispatch(setAlert("New Stock Added", "success"))

    } catch (error) {
        dispatch(setAlert(error.response.message, "error"))
        // console.log(error)
        dispatch({
            payload: { msg: error.response.message, status: error.response.status },
            type: ADD_FIRST_BALANCE_ERROR
        })
    }
}