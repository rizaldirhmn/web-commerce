import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const getWarehouse = () => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/warehouse/paginate`
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
        dispatch({
            type: actions.GET_WAREHOUSE,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_WAREHOUSE,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const addWarehouse = (formData, history) => async dispatch => {
    dispatch({
        type: actions.ADD_WAREHOUSE_START
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/warehouse`
    const myData = {
        name: formData.name,
        province: formData.province,
        city: formData.city,
        district: formData.district,
        village: formData.village,
        full_address: formData.full_address,
        code_pos: formData.code_pos,
        number_phone: formData.number_phone
    }

      try {
          const res = await axios({
              url: endpoint,
              method: "POST",
              data: myData,
              loading: true,
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch({
              type: actions.ADD_WAREHOUSE_SUCCESS,
              payload: res.data
          })
          history.push('/warehouse')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.ADD_WAREHOUSE_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}