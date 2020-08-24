import axios from 'axios'
import { setAlert } from './alert'
import { 
    PURCHASE_ITEM_PAY
} from './types'

export const addPayment = (id_customer, input_price, note, history) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/user/payment_cart`
    const token = sessionStorage.getItem('access_token')

    const myData = {
        id_customer : id_customer,
        input_price : input_price,
        note : note
    }

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data : myData,
            loading: true,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `bearer ${token}`
            }
        });

        dispatch({
            type: PURCHASE_ITEM_PAY,
            payload: res.data
        })

        dispatch(setAlert("Purchased", "success"))
        history.push(`/report/selling/detail/${res.data.id}`);

    } catch (error) {
        dispatch(setAlert("Something Went Wrong", "error"))
        console.log(error)
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}