import fileDownload from 'js-file-download'
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_TRANSACTION_BUYBACK, 
    GET_SEARCH_TRANSACTION_BUYBACK, 
    GET_DETAIL_TRANSACTION_BUYBACK,
    DOWNLOAD_REPORT_TRANSACTION_BUYBACK_START,
    DOWNLOAD_REPORT_TRANSACTION_BUYBACK_SUCCESS, 
    DOWNLOAD_REPORT_TRANSACTION_BUYBACK_FAILED
} from './types'

export const getTransactionBuyback = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction_buyback`
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
            type: GET_TRANSACTION_BUYBACK,
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

export const getTransactionSearchBuyback = (startDate, endDate) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction_buyback/search?tanggal=${startDate}/${endDate}`
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
            type: GET_SEARCH_TRANSACTION_BUYBACK,
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

export const getDetailTransactionBuyback = (id_trx) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction_buyback/${id_trx}`
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
            type: GET_DETAIL_TRANSACTION_BUYBACK,
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

export const downloadReportTransactionBuyback = (id_trx) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction_buyback/${id_trx}/invoice`
    const token = sessionStorage.getItem('access_token')

    dispatch({
        type: DOWNLOAD_REPORT_TRANSACTION_BUYBACK_START,
    })
    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            },
            responseType: 'blob'
        });

        fileDownload(res.data, `INV${id_trx}.pdf`)
        dispatch({
            type: DOWNLOAD_REPORT_TRANSACTION_BUYBACK_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        dispatch({
            type: DOWNLOAD_REPORT_TRANSACTION_BUYBACK_FAILED,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}