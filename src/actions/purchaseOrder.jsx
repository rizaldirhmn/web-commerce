
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_PURCHASE_ORDER, 
    ADD_PURCHASE_ORDER, 
    GET_PURCHASE_ORDER_DETAIL, 
    ADD_PURCHASE_ORDER_DETAIL,
    DELETE_PURCHASE_ORDER_DETAIL
} from './types'

export const getPurchaseOrder = () => async dispatch => {
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

export const getProductPO = () => async dispatch => {
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

export const getPurchaseOrderDetail = (id) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/purchase_order/${id}/purchase_order_detail`
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
            type: GET_PURCHASE_ORDER_DETAIL,
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

export const addPurchaseOrderDetail = (formData, id, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/purchase_order/${id}/purchase_order_detail`
    const token = sessionStorage.getItem('access_token')

    const myData = new FormData()
    myData.set('id_product', formData.id_product)
    myData.set('qty', formData.qty)

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: myData,
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: ADD_PURCHASE_ORDER_DETAIL,
            payload: res.data
        })

        dispatch(setAlert("New Invoice Added", "success"))
        history.push(`/purchase-order/create/${id}`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const deletePurchaseOrderDetail = (id_po, id_po_detail, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/purchase_order/${id_po}/purchase_order_detail/${id_po_detail}`
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
            type: DELETE_PURCHASE_ORDER_DETAIL,
            payload: res.data
        })

        dispatch(setAlert("Invoice Deleted", "success"))
        history.push(`/purchase-order/create/${id_po}`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const updatePurchaseOrderStatus = (id, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/purchase_order/${id}`
    const token = sessionStorage.getItem('access_token')

    const myData = {
        status: '0'
    }

    try {
        const res = await axios({
            url: endpoint,
            method: "PATCH",
            data: myData,
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

        dispatch(setAlert("Invoice send", "success"))
        history.push(`/purchase-order`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}