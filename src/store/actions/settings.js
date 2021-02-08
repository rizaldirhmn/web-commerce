import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

// Fetching List Text
    export const fetchListTextStart = () => {
        return {
        type: actions.GET_TEXT_FOLLOW_UP_WA_START
        }
    }
    
    export const fetchListTextSuccess = (payload) => {
        return {
        type: actions.GET_TEXT_FOLLOW_UP_WA_SUCCESS,
        textFollowUpList: payload
        }
    }
    
    export const fetchListTextFail = (error) => {
        return {
        type: actions.GET_TEXT_FOLLOW_UP_WA_FAIL,
        error: error
        }
    }
    
    export const fetchListText = () => async dispatch => {
        dispatch(fetchListTextStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/text_follow_up`
        try {
            const res = await axios({
                url: endpoint,
                method: "GET",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchListTextSuccess(res.data))

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchListTextFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }

// Fetching List Translate Text
    export const fetchListTranslateTextStart = () => {
        return {
        type: actions.GET_TEXT_TRANSLATE_WA_START
        }
    }

    export const fetchListTranslateTextSuccess = (payload) => {
        return {
        type: actions.GET_TEXT_TRANSLATE_WA_SUCCESS,
        textTranslateWA: payload
        }
    }

    export const fetchListTranslateTextFail = (error) => {
        return {
        type: actions.GET_TEXT_TRANSLATE_WA_FAIL,
        error: error
        }
    }

    export const fetchListTranslateText = (idCheckout) => async dispatch => {
        dispatch(fetchListTranslateTextStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/text_follow_up/${idCheckout}/preview`
        try {
            const res = await axios({
                url: endpoint,
                method: "GET",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchListTranslateTextSuccess(res.data))

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchListTranslateTextFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }

// Fetching Detail Text
    export const fetchDetailTextStart = () => {
        return {
        type: actions.GET_DETAIL_TEXT_FOLLOW_UP_WA_START
        }
    }
    
    export const fetchDetailTextSuccess = (payload) => {
        return {
        type: actions.GET_DETAIL_TEXT_FOLLOW_UP_WA_SUCCESS,
        textFollowUpDetail: payload
        }
    }
    
    export const fetchDetailTextFail = (error) => {
        return {
        type: actions.GET_DETAIL_TEXT_FOLLOW_UP_WA_FAIL,
        error: error
        }
    }
    
    export const fetchDetailText = (id, setFormState) => async dispatch => {
        dispatch(fetchDetailTextStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/text_follow_up/${id}`
        try {
            const res = await axios({
                url: endpoint,
                method: "GET",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchDetailTextSuccess(res.data))
            setFormState({
                values: {
                    title: res.data.title,
                    text: res.data.text
                }
            })

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchDetailTextFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }

// Adding List Text
    export const fetchDataTextStart = () => {
        return {
        type: actions.ADD_TEXT_FOLLOW_UP_WA_START
        }
    }
    
    export const fetchDataTextSuccess = (payload) => {
        return {
        type: actions.ADD_TEXT_FOLLOW_UP_WA_SUCCESS,
        textFollowUpData: payload
        }
    }
    
    export const fetchDataTextFail = (error) => {
        return {
        type: actions.ADD_TEXT_FOLLOW_UP_WA_FAIL,
        error: error
        }
    }
    
    export const addTextFollowUp = (formData) => async dispatch => {
        dispatch(fetchDataTextStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/text_follow_up/store`
        const myData = {
            title: formData.title,
            text: formData.text
        }
        try {
            const res = await axios({
                url: endpoint,
                method: "POST",
                data: myData,
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchDataTextSuccess(res.data))
            dispatch(fetchListText())
            dispatch(setAlert("New Template has created", "success"))

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchDataTextFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }

    export const updateTextFollowUp = (id, formData) => async dispatch => {
        dispatch(fetchDataTextStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/text_follow_up/${id}`
        const myData = {
            title: formData.title,
            text: formData.text
        }
        try {
            const res = await axios({
                url: endpoint,
                method: "PATCH",
                data: myData,
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchDataTextSuccess(res.data))
            dispatch(fetchListText())
            dispatch(setAlert("New Template has edited", "success"))

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchDataTextFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }

    export const deleteTextFollowUp = (id) => async dispatch => {
        dispatch(fetchDataTextStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/text_follow_up/${id}`
        try {
            const res = await axios({
                url: endpoint,
                method: "DELETE",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchDataTextSuccess(res.data))
            dispatch(fetchListText())
            dispatch(setAlert("Template has deleted", "success"))

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchDataTextFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }

// Fetching List Text
    export const fetchListVariableStart = () => {
        return {
        type: actions.GET_VARIABLE_FOLLOW_UP_WA_START
        }
    }

    export const fetchListVariableSuccess = (payload) => {
        return {
        type: actions.GET_VARIABLE_FOLLOW_UP_WA_SUCCESS,
        variableFollowUpList: payload
        }
    }

    export const fetchListVariableFail = (error) => {
        return {
        type: actions.GET_VARIABLE_FOLLOW_UP_WA_FAIL,
        error: error
        }
    }

    export const fetchListVariable = () => async dispatch => {
        dispatch(fetchListVariableStart())
        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/variable_follow_up`
        try {
            const res = await axios({
                url: endpoint,
                method: "GET",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchListVariableSuccess(res.data))

        } catch (error) {
            dispatch(setAlert("Something went wrong", "error"))
            console.log(error)
            dispatch(fetchListVariableFail(error))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
        
    }