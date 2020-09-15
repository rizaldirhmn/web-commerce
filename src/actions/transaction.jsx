
import axios from 'axios'
import { setAlert } from './alert'
import fileDownload from 'js-file-download'
import { 
    GET_TRANSACTION, 
    GET_SEARCH_TRANSACTION, 
    GET_DETAIL_TRANSACTION, 
    DOWNLOAD_REPORT_TRANSACTION_START,
    DOWNLOAD_REPORT_TRANSACTION_SUCCESS, 
    DOWNLOAD_REPORT_TRANSACTION_FAILED
} from './types'

export const getTransaction = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction`
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
            type: GET_TRANSACTION,
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

export const getTransactionSearch = (startDate, endDate, page) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction/search?tanggal=${startDate}/${endDate}&page=${page}`
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
            type: GET_SEARCH_TRANSACTION,
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

export const getDetailTransaction = (id_trx) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction/${id_trx}`
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
            type: GET_DETAIL_TRANSACTION,
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

export const downloadReportTransaction = (id_trx) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/transaction/${id_trx}/invoice`
    const token = sessionStorage.getItem('access_token')

    dispatch({
        type: DOWNLOAD_REPORT_TRANSACTION_START,
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

        fileDownload(res.data, 'report-selling.pdf')
        dispatch({
            type: DOWNLOAD_REPORT_TRANSACTION_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        dispatch({
            type: DOWNLOAD_REPORT_TRANSACTION_FAILED,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}