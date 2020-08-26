
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_PRODUCT_DASHBOARD,
    GET_CARD_STATS,
    GET_NET_INCOME,
    GET_GOLD_PRICE
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

export const getCardStats = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/dashboard_grafik/card`
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
            type: GET_CARD_STATS,
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

export const getGrafikNetIncome = (start_date, end_date) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/dashboard_grafik/pendapatan?start_date=${start_date}&end_date=${end_date}`
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
            type: GET_NET_INCOME,
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

export const getGrafikGoldPrice = (id_product, type_customer, start_date, end_date) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/dashboard_grafik/gold_price?id_product=${id_product}&type_customer=${type_customer}&start_date=${start_date}&end_date=${end_date}`
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
            type: GET_GOLD_PRICE,
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