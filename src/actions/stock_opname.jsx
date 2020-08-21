import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_STOCK_OPNAME, BALANCING_STOCK_OPNAME
} from './types'

export const getStockOpname = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/stock_opname`
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
            type: GET_STOCK_OPNAME,
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

export const balancingStock = (formData, password, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/stock_opname`
    const token = sessionStorage.getItem('access_token')
    const product = {
        product : formData,
        password : password
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
            type: BALANCING_STOCK_OPNAME,
            payload: res.data
        })

        dispatch(setAlert("Stock Balanced", "success"))
        history.push(`/stock-opname`)
    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error.message)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}