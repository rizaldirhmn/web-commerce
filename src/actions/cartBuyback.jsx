import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_CART_BUYBACK, ADD_TO_CART_BUYBACK, DELETE_CART_ITEM_BUYBACK, DELETE_CART_ALL_ITEM_BUYBACK
} from './types'

export const getCartBuyback = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cart_buyback`
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
            type: GET_CART_BUYBACK,
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

export const addToCartBuyback = (id_product, type, qty) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cart_buyback`
    const token = sessionStorage.getItem('access_token')

    const myData = new FormData()
    myData.set('id_product', id_product)
    myData.set('qty', qty)
    myData.set('type', type)

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data : myData,
            loading: true,
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: ADD_TO_CART_BUYBACK,
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

export const deleteCartItemBuyback = (id_cart) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cart_buyback/${id_cart}`
    const token = sessionStorage.getItem('access_token')

    try {
        const res = await axios({
            url: endpoint,
            method: "DELETE",
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: DELETE_CART_ITEM_BUYBACK,
            payload: res.data
        })

        dispatch(setAlert("Item Deleted", "success"))
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

export const deleteCartAllItemBuyback = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cart_all`
    const token = sessionStorage.getItem('access_token')

    try {
        const res = await axios({
            url: endpoint,
            method: "DELETE",
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: DELETE_CART_ALL_ITEM_BUYBACK,
            payload: res.data
        })

        dispatch(setAlert("All Are Item Deleted", "success"))
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