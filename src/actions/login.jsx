
import axios from 'axios'
import { setAlert } from './alert'
import { 
    ADD_LOGIN,
} from './types'

export const addLogin = (data, history) => async dispatch => {

    const endpoint = `${process.env.REACT_APP_BASE_URL}/admin/auth/login`

    const myData = new FormData();
    myData.set('email', data.email);
    myData.set('password', data.password);

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: myData,
            loading: true,
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept' : 'application/json', 
            }
        });

        sessionStorage.setItem("access_token", res.data.access_token);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("expires_in", '120');
        sessionStorage.setItem("data", JSON.stringify(res.data.partner));

        dispatch({
            type: ADD_LOGIN,
            payload: res.data
        })

        // dispatch(setAlert("Stage Added", "success"))
        history.push(`/dashboard`);
    } catch (error) {
        dispatch(setAlert("Email atau Password Salah", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}