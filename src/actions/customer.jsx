
import axios from 'axios'
import { setAlert } from './alert'
import { 
    ADD_CUSTOMER,
    GET_CUSTOMER,
    EDIT_CUSTOMER,
    GET_DETAIL_CUSTOMER,
    GET_SEARCH_CUSTOMER,
    GET_SEARCH_CUSTOMER_BUYBACK
} from './types'

export const getCustomer = () => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer`
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
            type: GET_CUSTOMER,
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

export const addCustomer = (formData, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer`

    const myData = new FormData();
    myData.set('id_agent', formData.id_agent);
    myData.set('name', formData.name);
    myData.set('address', formData.address);
    myData.set('status', formData.status);
    myData.set('is_active', formData.is_active);

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: myData,
            loading: true,
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${sessionStorage.getItem('access_token')}`
            }
        });
        dispatch({
            type: ADD_CUSTOMER,
            payload: res.data
        })

        dispatch(setAlert("Customer Added", "success"))
        history.push(`/customer`);
    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const getDetailCustomer = (id) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer/${id}`
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
            type: GET_DETAIL_CUSTOMER,
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

export const editCustomer = (formData, history, id) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer/${id}`
    try {
        const res = await axios({
            url: endpoint,
            method: "PATCH",
            data: formData,
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${sessionStorage.getItem('access_token')}`
            }
        });
        dispatch({
            type: EDIT_CUSTOMER,
            payload: res.data
        })

        dispatch(setAlert("Customer Edited", "success"))
        history.push(`/customer`);
    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const getSearchCustomer = (kata_kunci) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer/search?type=&kata_kunci=${kata_kunci}`
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
            type: GET_SEARCH_CUSTOMER,
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

export const getSearchCustomerAndClear = (params, kata_kunci) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer_and_clear/search?type=${params}&kata_kunci=${kata_kunci}`
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
            type: GET_SEARCH_CUSTOMER,
            payload: res.data.data[0]
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

export const getSearchCustomerAndClearBuyback = (params, kata_kunci) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/customer_and_clear_buyback/search?type=${params}&kata_kunci=${kata_kunci}`
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
            type: GET_SEARCH_CUSTOMER_BUYBACK,
            payload: res.data.data[0]
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