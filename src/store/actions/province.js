import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_PROVINCE,
    GET_CITY,
    GET_DISTRICT,
    GET_VILLAGE
} from './actionTypes'

export const getProvince = () => async dispatch => {
    const endpoint = `https://dev-api.general.eoatech.com/provinces/search?kata_kunci=`
    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
            }
        });
        dispatch({
            type: GET_PROVINCE,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: GET_PROVINCE,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const getCities = (id_province) => async dispatch => {
    const endpoint = `https://dev-api.general.eoatech.com/regencies/search?kata_kunci=&id_province=${id_province}`
    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
            }
        });
        dispatch({
            type: GET_CITY,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: GET_CITY,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const getDistrict = (id_cities) => async dispatch => {
    const endpoint = `https://dev-api.general.eoatech.com/districts/search?kata_kunci=&id_regencies=${id_cities}`
    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
            }
        });
        dispatch({
            type: GET_DISTRICT,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: GET_DISTRICT,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

export const getVillage = (id_district) => async dispatch => {
    const endpoint = `https://dev-api.general.eoatech.com/villages/search?kata_kunci=&id_district=${id_district}`
    try {
        const res = await axios({
            url: endpoint,
            method: "GET",
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
            }
        });
        dispatch({
            type: GET_VILLAGE,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: GET_VILLAGE,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}