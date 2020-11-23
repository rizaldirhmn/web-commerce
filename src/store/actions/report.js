import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const getReport = (team_id, page) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}report/list`
  const myData = new FormData()
  myData.set('profile_id', team_id)
  myData.set('page', page)
  myData.set('show', '10')
  myData.set('order_by', '')
  myData.set('order_type', '')
  myData.set('search', '')

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
              type: actions.GET_LIST_REPORT,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_LIST_REPORT,
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
    }
    
}