import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const getTemplateCustomer = (team_id) => async dispatch => {
  dispatch({
    type: actions.GET_CUSTOMER_START
  })
  const endpoint = `${process.env.REACT_APP_BASE_URL}customertemplate/listing`
  const myData = new FormData()
  myData.set('profile_id', team_id)

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
              type: actions.GET_CUSTOMER_SUCCESS,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_CUSTOMER_FAIL,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_CUSTOMER_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getCustomer = (team_id) => async dispatch => {
  dispatch({
    type: actions.GET_LIST_CUSTOMER_START
  })
  const endpoint = `${process.env.REACT_APP_BASE_URL}customer/list`
  const myData = new FormData()
  myData.set('profile_id', team_id)
  myData.set('page', '1')
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
              type: actions.GET_LIST_CUSTOMER_SUCCESS,
              payload: res.data.data
          })
        }else{
          dispatch({
              type: actions.GET_LIST_CUSTOMER_FAIL,
              payload: res.data.message
          })
        }

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_LIST_CUSTOMER_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

// export const uploadCustomer = (file, params, history) => async dispatch => {
//   dispatch({
//     type: actions.UPLOAD_CUSTOMER_START
//   })
//   let data = new FormData()
//   data.append('profile_id', params.id)
//   data.append('file_csv', file )

//   try {
//       const res = await axios({
//           url: "https://dev.api.jrvis.id/customer/import",
//           method: "POST",
//           data: data,
//           onUploadProgress : (progressEvent) => {
//               const {loaded, total} = progressEvent
//               let percent = Math.floor( (loaded * 100 ) / total )
  
//               if( percent < 100 ){
//                   setUploadPercentage(percent)
//               }
//           },
//           headers: { 
//             'Content-Type': 'application/json', 
//             'Accept' : 'application/json', 
//             'Token' : `${sessionStorage.getItem('access_token')}`
//           }
//       });
      
      
//       // setUploadPercentage(100)
//       // setTimeout(() => {
//       //     setUploadPercentage(0)
//       // }, 1000)
//       if(res.data.code === "200"){
//           dispatch({
//             type: actions.UPLOAD_CUSTOMER_SUCCESS
//           })
//           dispatch(setAlert("Customer Added", "success"))
//           handleClose()
//       }else{
//           dispatch({
//             type: actions.UPLOAD_CUSTOMER_FAIL
//           })
//           dispatch(setAlert("Something went wrong", "error"))
//           setErrorUpload(res.data.data)
//       }
//   } catch (error) {
//       console.log(error)
//   }
// }