import {
    GET_PROVINCE, 
    GET_CITY, 
    GET_DISTRICT,
    GET_VILLAGE,
} from '../actions/actionTypes'

const initialState = {
    province : null,
    city : null,
    district : null,
    village: null,
    loadingProvince: true,
    loadingCity: true,
    loadingDistrict: true,
    loadingVillage: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PROVINCE:
            return {
                ...state,
                province: payload,
                loadingProvince: false
            }
        case GET_CITY:
            return {
                ...state,
                city: payload,
                loadingCity: false
            }
        case GET_DISTRICT:
            return {
                ...state,
                district: payload,
                loadingDistrict: false
            }
        case GET_VILLAGE:
            return {
                ...state,
                village: payload,
                loadingVillage: false
            }
        default:
            return state
    }
}