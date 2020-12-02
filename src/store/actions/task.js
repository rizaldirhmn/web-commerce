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

export const postTask = (team_id, formData, startDate) => async dispatch => {
  console.log('masuk gan')
  dispatch({
      type: actions.POST_TASK_START,
  })
  const endpoint = `${process.env.REACT_APP_BASE_URL}task/create`
  const myData = new FormData()
  myData.set('profile_id', team_id)
  myData.set('user_id', formData.user_id)
  myData.set('customer_id', formData.customer_id)
  myData.set('task_type_id', formData.task_type_id)
  myData.set('code', formData.code)
  myData.set('assign_date', startDate)

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
              type: actions.POST_TASK_END,
              payload: res.data.data
          })
          dispatch(setAlert(res.data.message, "success"))
        }else{
          dispatch({
              type: actions.POST_TASK_END,
              payload: res.data.message
          })
          dispatch(setAlert(res.data.message, "error"))
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.POST_TASK_END,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getLookupTask = (team_id, page, keyword, show) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}lookup-cms/list`
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
              type: actions.GET_LOOKUP_TASK,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_LOOKUP_TASK,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_LOOKUP_TASK,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getTaskType = (team_id, page, keyword, show) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}tasktype/list`
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
              type: actions.GET_TASK_TYPE,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_TASK_TYPE,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_TASK_TYPE,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}