import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const getCategory = (page) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category`
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
            type: actions.GET_CATEGORY,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_CATEGORY,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getSubCategory = (id) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/sub_category`
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
              type: actions.GET_SUB_CATEGORY,
              payload: res.data
          })
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.GET_SUB_CATEGORY,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
  }

export const addCategory = (formData, image, history) => async dispatch => {
    dispatch({
        type: actions.ADD_CATEGORY_START
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category`
    const myData = {
        name: formData.name,
        image: image
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
              type: actions.ADD_CATEGORY_SUCCESS,
              payload: res.data
          })
          history.push('/category')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.ADD_CATEGORY_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}