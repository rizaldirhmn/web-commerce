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

export const postTask = (team_id, formData, startDate, history) => async dispatch => {
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
          history.push(`/task/${team_id}`)
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

export const reassignTask = (formData, history) => async dispatch => {
  dispatch({
      type: actions.REASSIGN_TASK_START,
  })
  const endpoint = `${process.env.REACT_APP_BASE_URL}task/reassign`
  const myData = new FormData()
  myData.set('profile_id', formData.profile_id)
  myData.set('task_id', formData.task_id)
  myData.set('from_user_id', formData.from_user_id)
  myData.set('to_user_id', formData.to_user_id)

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
              type: actions.REASSIGN_TASK_END,
              payload: res.data.data
          })
          dispatch(setAlert(res.data.message, "success"))
          history.push(`/task/${formData.profile_id}`)
        }else{
          dispatch({
              type: actions.REASSIGN_TASK_END,
              payload: res.data.message
          })
          dispatch(setAlert(res.data.message, "error"))
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.REASSIGN_TASK_END,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const updateCancelTask = (formData, history, params) => async dispatch => {
  dispatch({
      type: actions.CANCEL_TASK_START,
  })
  const endpoint = `${process.env.REACT_APP_BASE_URL}task/cancel`
  const myData = new FormData()
  myData.set('profile_id', params)
  myData.set('task_id', formData.task.id)

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
              type: actions.CANCEL_TASK_END,
              payload: res.data.data
          })
          dispatch(setAlert(res.data.message, "success"))
          history.push(`/task/${params}`)
        }else{
          dispatch({
              type: actions.CANCEL_TASK_END,
              payload: res.data.message
          })
          dispatch(setAlert(res.data.message, "error"))
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.CANCEL_TASK_END,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getLookupListTask = (team_id, page, keyword, show, code) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}lookup_value/list`
  const myData = new FormData()
  myData.set('profile_id', team_id)
  myData.set('page', page)
  myData.set('show', show)
  myData.set('order_by', '')
  myData.set('order_type', '')
  myData.set('search', keyword)
  myData.set('code', code)

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
              type: actions.GET_LOOKUP_LIST_VALUE,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_LOOKUP_LIST_VALUE,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_LOOKUP_LIST_VALUE,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}