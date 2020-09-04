
import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_OTHER_PURCHASE_ORDER, 
    ADD_OTHER_PURCHASE_ORDER, 
    GET_OTHER_PURCHASE_ORDER_DETAIL, 
    ADD_OTHER_PURCHASE_ORDER_DETAIL,
    DELETE_OTHER_PURCHASE_ORDER_DETAIL,
    UPDATE_OTHER_PURCHASE_ORDER_DETAIL
} from './types'

export const getPurchaseOrder = (startDate, endDate, keyword) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cost/filter?start_date=${startDate}&end_date=${endDate}&kata_kunci=${keyword}`
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
            type: GET_OTHER_PURCHASE_ORDER,
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
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cost`
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
            type: ADD_OTHER_PURCHASE_ORDER,
            payload: res.data
        })

        dispatch(setAlert("New Invoice Added", "success"))
        history.push(`/other-purchase-order/create/${res.data.cost.id}`);

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
            type: GET_OTHER_PURCHASE_ORDER,
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
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cost/${id}/cost_detail`
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
            type: GET_OTHER_PURCHASE_ORDER_DETAIL,
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
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cost/${id}/cost_detail`
    const token = sessionStorage.getItem('access_token')

    const myData = new FormData()
    myData.set('description', formData.description)
    myData.set('value', formData.value)

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: myData,
            loading: true,
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: ADD_OTHER_PURCHASE_ORDER_DETAIL,
            payload: res.data
        })

        dispatch(setAlert("New Invoice Added", "success"))
        history.push(`/other-purchase-order/create/${id}`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const deletePurchaseOrderDetail = (id_cost, id_detail_cost, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cost/${id_cost}/cost_detail/${id_detail_cost}`
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
            type: DELETE_OTHER_PURCHASE_ORDER_DETAIL,
            payload: res.data
        })

        dispatch(setAlert("Item Deleted", "success"))
        history.push(`/other-purchase-order/create/${id_cost}`);

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
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/cost/${id}`
    const token = sessionStorage.getItem('access_token')

    const myData = {
        status: '1'
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
            type: UPDATE_OTHER_PURCHASE_ORDER_DETAIL,
            payload: res.data
        })

        dispatch(setAlert("Invoice send", "success"))
        history.push(`/other-purchase-order`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}