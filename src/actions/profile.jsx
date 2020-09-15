import axios from 'axios'
import { setAlert } from './alert'
import { 
    EDIT_PROFILE,
    UPDATE_PROFILE,
} from './types'

export const editProfile = (formData, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/profile`
    dispatch({
        type: EDIT_PROFILE,
    })
    try {
        const res = await axios({
            url: endpoint,
            method: "PATCH",
            data: formData,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${sessionStorage.getItem('access_token')}`
            }
        });
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Profile Edited", "success"))
        history.push(`/profile`);
    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: UPDATE_PROFILE,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}