import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const getTeam = () => async dispatch => {
  dispatch({
    type: actions.GET_TEAM_START
  })
  const endpoint = `${process.env.REACT_APP_BASE_URL}team/list`
    try {
        const res = await axios({
            url: endpoint,
            method: "POST",
            data: {},
            headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Token' : `${sessionStorage.getItem('access_token')}`
            }
        });
        if(res.data.code === '200'){
          dispatch({
              type: actions.GET_TEAM_SUCCESS,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_TEAM_FAIL,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_TEAM_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}