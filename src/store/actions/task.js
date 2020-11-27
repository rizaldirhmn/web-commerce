import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const getTask = (team_id, page, keyword, show) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}task/list`
  const myData = new FormData()
  myData.set('profile_id', team_id)
  myData.set('page', page)
  myData.set('show', show)
  myData.set('order_by', '')
  myData.set('order_type', '')
  myData.set('search', keyword)

    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: myData,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Token' : `${sessionStorage.getItem('access_token')}`
            }
        });
        if(res.data.code === '200'){
          dispatch({
              type: actions.GET_LIST_TASK_SUCCESS,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_LIST_TASK_FAIL,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_LIST_TASK_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}