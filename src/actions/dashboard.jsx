
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_PRODUCT_DASHBOARD
} from './types'

export const getProduct = (type) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/product_price?type=${type}`
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
            type: GET_PRODUCT_DASHBOARD,
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