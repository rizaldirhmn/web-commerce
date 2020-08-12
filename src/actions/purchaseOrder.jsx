
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_PURCHASE_ORDER, ADD_PURCHASE_ORDER
} from './types'

export const getPurchaseOrder = (type) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/purchase_order`
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
            type: GET_PURCHASE_ORDER,
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

export const addPurchaseOrder = (history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/purchase_order`
    const token = sessionStorage.getItem('access_token')

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: ADD_PURCHASE_ORDER,
            payload: res.data
        })

        dispatch(setAlert("New Invoice Added", "success"))
        history.push(`/purchase-order/create/${res.data.id}`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}