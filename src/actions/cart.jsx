import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_CART, ADD_TO_CART
} from './types'

export const getCart = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cart`
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
            type: GET_CART,
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

export const addToCart = (id_product, type, qty, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cart`
    const token = sessionStorage.getItem('access_token')

    const myData = {
        id_product : id_product,
        qty : qty,
        type : type
    }

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data : myData,
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })

        dispatch(setAlert("Item Added", "success"))
        // history.push(`/cashier`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}