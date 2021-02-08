import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const sendNotifProductStart = () => {
    return {
      type: actions.SEND_NOTIFICATION_PRODUCT_START,
    }
}
  
export const sendNotifProductSuccess = (data) => {
    return {
      type: actions.SEND_NOTIFICATION_PRODUCT_SUCCESS,
      notificationProduct: data
    }
}
  
export const sendNotifProductFail = (error) => {
    return {
      type: actions.SEND_NOTIFICATION_PRODUCT_FAIL,
      error: error
    }
}

export const sendNotifProduct = (formData, idProduct, history) =>  async dispatch => {
    dispatch(sendNotifProductStart());
    const myData = {
        title: formData.title,
        body: formData.body,
        id_product: idProduct
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/notification/product`

        try {
            const res = await axios({
                url: endpoint,
                method: "POST",
                data: myData,
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(sendNotifProductSuccess(res.data))
            dispatch(setAlert('Notification has been sent', 'success'))
            history.push('/notifications')

        } catch (error) {
            dispatch(sendNotifProductFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Send Notification Collection
export const sendNotifProductCollectionStart = () => {
  return {
    type: actions.SEND_NOTIFICATION_PRODUCT_COLLECTION_START,
  }
}

export const sendNotifProductCollectionSuccess = (data) => {
  return {
    type: actions.SEND_NOTIFICATION_PRODUCT_COLLECTION_SUCCESS,
    notificationCollection: data
  }
}

export const sendNotifProductCollectionFail = (error) => {
  return {
    type: actions.SEND_NOTIFICATION_PRODUCT_COLLECTION_FAIL,
    error: error
  }
}

export const sendNotifProductCollection = (formData, idCollection, history) =>  async dispatch => {
  dispatch(sendNotifProductCollectionStart());
  const myData = {
      title: formData.title,
      body: formData.body,
      id_collection: idCollection
  }

    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/notification/collection`

      try {
          const res = await axios({
              url: endpoint,
              method: "POST",
              data: myData,
              headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch(sendNotifProductCollectionSuccess(res.data))
          dispatch(setAlert('Notification has been sent', 'success'))
          history.push('/notifications')

      } catch (error) {
          dispatch(sendNotifProductCollectionFail(error))
          dispatch(setAlert(error, 'error'))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
}

// Send Notification Information
export const sendNotificationInformationStart = () => {
  return {
    type: actions.SEND_NOTIFICATION_INFORMATION_START,
  }
}

export const sendNotificationInformationSuccess = (data) => {
  return {
    type: actions.SEND_NOTIFICATION_INFORMATION_SUCCESS,
    notificationInformation: data
  }
}

export const sendNotificationInformationFail = (error) => {
  return {
    type: actions.SEND_NOTIFICATION_INFORMATION_FAIL,
    error: error
  }
}

export const sendNotificationInformation = (formData, idBanner, history) =>  async dispatch => {
  dispatch(sendNotificationInformationStart());
  const myData = {
      title: formData.title,
      body: formData.body,
      id_banner_info: idBanner
  }

    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/notification/info`

      try {
          const res = await axios({
              url: endpoint,
              method: "POST",
              data: myData,
              headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch(sendNotificationInformationSuccess(res.data))
          dispatch(setAlert('Notification has been sent', 'success'))
          history.push('/notifications')

      } catch (error) {
          dispatch(sendNotificationInformationFail(error))
          dispatch(setAlert(error, 'error'))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
}